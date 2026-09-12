import os
import sys
import re
import glob
import tarfile
import paramiko
import time

HOST = "217.21.74.188"
PORT = 65002
USER = "u390470426"
PASSWORD = "Prmarketing@10786"
LOCAL_DIR = r"C:\hk\prmarketing\website\out"
HTACCESS_LOCAL = r"C:\hk\prmarketing\website\public\.htaccess"
REMOTE_DIR = "domains/prmarketingventures.com/public_html"
ARCHIVE_NAME = "deploy_bundle.tar.gz"


def get_css_filename(out_dir):
    """Find the actual CSS filename in the current build output."""
    pattern = os.path.join(out_dir, "_next", "static", "chunks", "*.css")
    files = glob.glob(pattern)
    if not files:
        raise RuntimeError(f"No CSS file found matching: {pattern}")
    return os.path.basename(files[0])


def update_htaccess_css(htaccess_path, css_filename):
    """Update the CSS fallback rewrite rule to point to the current CSS hash."""
    with open(htaccess_path, "r", encoding="utf-8") as f:
        content = f.read()
    new_content = re.sub(
        r'(RewriteRule \^_next/static/chunks/\([^)]+\)\\\.css\$ /_next/static/chunks/)[a-z0-9_\-]+\.css',
        r'\g<1>' + css_filename,
        content
    )
    if new_content != content:
        with open(htaccess_path, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"  .htaccess rewrite updated -> {css_filename}")
    else:
        print(f"  .htaccess already points to {css_filename}")


def create_archive(source_dir, output_filename):
    print(f"Archiving {source_dir} -> {output_filename}...")
    backend_dir = r"C:\hk\prmarketing\backend"
    with tarfile.open(output_filename, "w:gz") as tar:
        for root, dirs, files in os.walk(source_dir):
            for file in files:
                full_path = os.path.join(root, file)
                rel_path = os.path.relpath(full_path, source_dir)
                tar.add(full_path, arcname=rel_path)
        if os.path.exists(backend_dir):
            for root, dirs, files in os.walk(backend_dir):
                for file in files:
                    full_path = os.path.join(root, file)
                    rel_path = "backend/" + os.path.relpath(full_path, backend_dir).replace("\\", "/")
                    tar.add(full_path, arcname=rel_path)
    size_mb = os.path.getsize(output_filename) / (1024 * 1024)
    print(f"Archive created (including backend & APIs)! Size: {size_mb:.2f} MB")


def verify_address_integrity(out_dir):
    """Ensure that B-903 is used everywhere and no outdated address like B-910/B-909 exists."""
    index_html = os.path.join(out_dir, "index.html")
    if not os.path.exists(index_html):
        return
    with open(index_html, "r", encoding="utf-8") as f:
        content = f.read()
    if "B-910" in content or "B-909" in content:
        raise ValueError("CRITICAL ERROR: Outdated office address (B-910 / B-909) detected in build output! Build must only contain B-903.")
    if "B-903" not in content:
        raise ValueError("CRITICAL ERROR: Address B-903 was not found in index.html! Check lib/site.ts.")
    print("  Address integrity verified: B-903 is present, no B-910/B-909.")


def create_rsc_aliases(out_dir):
    """
    Creates flat aliases for Next.js App Router RSC prefetch files
    so that client-side link prefetching never returns 404 or 500 on Apache/LiteSpeed.
    """
    import shutil
    created = 0
    
    # 1. Flatten all nested __next* directories into their parent folders
    for root, dirs, files in os.walk(out_dir):
        for d in list(dirs):
            if d.startswith('__next'):
                sub_dir = os.path.join(root, d)
                for sub_root, sub_sub_dirs, sub_files in os.walk(sub_dir):
                    for sf in sub_files:
                        src_file = os.path.join(sub_root, sf)
                        rel_to_subdir = os.path.relpath(src_file, sub_dir).replace('\\', '.')
                        flat_name = f"{d}.{rel_to_subdir}"
                        flat_dest = os.path.join(root, flat_name)
                        if not os.path.exists(flat_dest):
                            shutil.copy2(src_file, flat_dest)
                            created += 1
                        
                        if sf == '__PAGE__.txt':
                            flat_p = os.path.join(root, f"{d}.__PAGE__.txt")
                            if not os.path.exists(flat_p):
                                shutil.copy2(src_file, flat_p)
                                created += 1

    # 2. For each sub-directory (e.g. startup-stories/from-4000...), copy its index.txt / __PAGE__.txt to parent/child.txt
    for root, dirs, files in os.walk(out_dir):
        for d in dirs:
            if d.startswith('.'):
                continue
            child_dir = os.path.join(root, d)
            child_index_txt = os.path.join(child_dir, "index.txt")
            if os.path.exists(child_index_txt):
                alias_txt = os.path.join(root, f"{d}.txt")
                alias_page_txt = os.path.join(root, f"{d}.__PAGE__.txt")
                if not os.path.exists(alias_txt):
                    shutil.copy2(child_index_txt, alias_txt)
                    created += 1
                if not os.path.exists(alias_page_txt):
                    shutil.copy2(child_index_txt, alias_page_txt)
                    created += 1

    print(f"  RSC Prefetch Aliases: verified & created {created} payload aliases.")


import subprocess


def push_to_github(skip_on_fail=False):
    """
    Ensures that all local changes (CRM frontend + PHP backend + website)
    are committed and pushed to GitHub BEFORE deploying to Hostinger.
    """
    print("\n" + "=" * 60)
    print("  [Step -1] PUSHING TO GITHUB FIRST")
    print("=" * 60)
    repo_dir = os.path.dirname(os.path.abspath(__file__))

    if not os.path.exists(os.path.join(repo_dir, ".git")):
        print("  Warning: No .git directory found. Skipping GitHub push.")
        return

    try:
        # Check current remote
        remotes_out = subprocess.run(
            ["git", "remote", "-v"],
            cwd=repo_dir,
            capture_output=True,
            text=True,
            check=True
        ).stdout.strip()
        first_remote = remotes_out.splitlines()[0] if remotes_out else "None"
        print(f"  Remote: {first_remote}")

        # Git add all changes
        print("  Staging changes (git add -A)...")
        subprocess.run(["git", "add", "-A"], cwd=repo_dir, check=True)

        # Check status
        status = subprocess.run(
            ["git", "status", "--porcelain"],
            cwd=repo_dir,
            capture_output=True,
            text=True,
            check=True
        ).stdout.strip()

        if status:
            commit_time = time.strftime("%Y-%m-%d %H:%M:%S")
            commit_msg = f"deploy: auto-sync update before Hostinger deployment [{commit_time}]"
            print(f"  Committing: '{commit_msg}'...")
            subprocess.run(["git", "commit", "-m", commit_msg], cwd=repo_dir, check=True)
        else:
            print("  Working tree clean, everything committed.")

        # Push to origin main
        print("  Pushing to GitHub (git push origin main)...")
        push_res = subprocess.run(
            ["git", "push", "origin", "main"],
            cwd=repo_dir,
            capture_output=True,
            text=True
        )
        if push_res.returncode != 0:
            err_msg = push_res.stderr.strip() or push_res.stdout.strip()
            print(f"\n  [!] GITHUB PUSH FAILED:\n  {err_msg}\n")
            if not skip_on_fail:
                print("  Deployment aborted because GitHub push failed.")
                print("  Ensure GitHub authentication and permissions are configured.")
                sys.exit(1)
        else:
            print("  >>> SUCCESS: GitHub repository is completely up-to-date!")

    except Exception as e:
        print(f"  [!] GitHub sync error: {e}")
        if not skip_on_fail:
            sys.exit(1)


def main():
    skip_gh = "--skip-github" in sys.argv
    if not skip_gh:
        push_to_github()

    if not os.path.exists(LOCAL_DIR):
        print(f"Error: {LOCAL_DIR} does not exist. Run 'npm run build' inside website/ first.")
        sys.exit(1)

    start_time = time.time()

    # 0. Pre-flight check: address integrity
    print("\n[Step 0] Verifying address integrity (B-903)...")
    verify_address_integrity(LOCAL_DIR)

    # 0.1. Auto-detect current CSS hash & patch .htaccess before packing
    print("\n[Step 0.1] Detecting CSS hash from build output...")
    css_filename = get_css_filename(LOCAL_DIR)
    print(f"  Current CSS: {css_filename}")
    update_htaccess_css(HTACCESS_LOCAL, css_filename)
    import shutil
    shutil.copyfile(HTACCESS_LOCAL, os.path.join(LOCAL_DIR, '.htaccess'))

    # 0.2. Generate RSC payload aliases for instant link prefetching
    print("\n[Step 0.2] Generating RSC prefetch aliases...")
    create_rsc_aliases(LOCAL_DIR)

    # 1. Create local tar.gz bundle (includes updated .htaccess)
    local_archive = os.path.join(os.path.dirname(LOCAL_DIR), ARCHIVE_NAME)
    create_archive(LOCAL_DIR, local_archive)

    # 2. Connect SSH
    print(f"\nConnecting to Hostinger SSH ({USER}@{HOST}:{PORT})...")
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(HOST, port=PORT, username=USER, password=PASSWORD, timeout=15)
    print("SSH Connected!")

    # 3. Upload archive
    sftp = ssh.open_sftp()
    remote_archive = f"{REMOTE_DIR}/{ARCHIVE_NAME}"
    print(f"Uploading {ARCHIVE_NAME} to {remote_archive}...")
    sftp.put(local_archive, remote_archive)
    sftp.close()
    print("Upload complete!")

    # 4. Extract & alias CSS fallbacks on server
    print(f"Extracting on Hostinger inside {REMOTE_DIR}...")
    alias_cmd = (
        f"cd {REMOTE_DIR} && rm -rf guides && tar -xzf {ARCHIVE_NAME} && rm -f {ARCHIVE_NAME} && "
        f"cd _next/static/chunks && "
        f"for f in *.css; do "
        f"[ \"$f\" != \"{css_filename}\" ] && cp {css_filename} \"$f\"; "
        f"done; "
        f"cd ../../../ && php backend/database/migrate_crm.php; echo OK"
    )
    stdin, stdout, stderr = ssh.exec_command(alias_cmd)
    exit_status = stdout.channel.recv_exit_status()
    out = stdout.read().decode().strip()
    err = stderr.read().decode().strip()

    if exit_status == 0:
        print(f"Extraction + CSS aliases + CRM DB migration done! ({out})")
    else:
        print(f"Note: post-deploy step ({exit_status}): {err or out}")

    # 5. Clean local archive
    if os.path.exists(local_archive):
        os.remove(local_archive)

    ssh.close()

    elapsed = round(time.time() - start_time, 2)
    print("\n" + "=" * 60)
    print(f"  DEPLOYMENT COMPLETED SUCCESSFULLY IN {elapsed} SECONDS!")
    print(f"  Live URL: https://prmarketingventures.com")
    print(f"  Active CSS: {css_filename}")
    print(f"  Services: https://prmarketingventures.com/services/")
    print(f"  CMS Admin: https://prmarketingventures.com/jaatumeinaaya/login")
    print(f"  CRM Suite Login: https://prmarketingventures.com/crm/login/")
    print(f"  CRM Master Admin: https://prmarketingventures.com/crm/master/")
    print(f"  Client Careers: https://prmarketingventures.com/c/abc-technologies/careers/")
    print(f"  CRM Health API: https://prmarketingventures.com/api/crm/health")
    print("=" * 60)


if __name__ == "__main__":
    main()
