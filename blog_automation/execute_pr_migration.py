import paramiko
import json

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect("217.21.74.188", port=65002, username="u390470426", password="Prmarketing@10786")

# 1. Upload pr_schema.sql
with open(r"C:\hk\prmarketing\backend\database\pr_schema.sql", "r", encoding="utf-8") as f:
    sql_schema = f.read()

sftp = ssh.open_sftp()
with sftp.file("domains/prmarketingventures.com/public_html/backend/database/pr_schema.sql", "w") as f:
    f.write(sql_schema)
sftp.close()

# 2. Execute pr_schema.sql into MySQL
stdin, stdout, stderr = ssh.exec_command("mysql -u u390470426_techandcar -p'#T@GIh5Z' u390470426_techandcar < domains/prmarketingventures.com/public_html/backend/database/pr_schema.sql")
print("pr_schema.sql Execution:")
print("Stdout:", stdout.read().decode())
print("Stderr:", stderr.read().decode())

# 3. Create PHP password hash for Admin@PR2026!
hash_cmd = "php -r \"echo password_hash('Admin@PR2026!', PASSWORD_BCRYPT);\""
stdin, stdout, stderr = ssh.exec_command(hash_cmd)
admin_hash = stdout.read().decode().strip()

update_user_sql = f"""
INSERT INTO pr_users (id, email, username, password_hash, first_name, last_name, role, status)
VALUES ('usr_admin_pr_001', 'admin@prmarketingventures.com', 'admin', '{admin_hash}', 'PR Marketing', 'Admin', 'SuperAdmin', 'Active')
ON DUPLICATE KEY UPDATE password_hash='{admin_hash}', status='Active';
"""
ssh.exec_command(f"mysql -u u390470426_techandcar -p'#T@GIh5Z' u390470426_techandcar -e \"{update_user_sql}\"")
print(f"Admin User set up with verified hash for password: Admin@PR2026!")

# 4. Populate the 4 live PR Stories into pr_posts, pr_post_sections, pr_post_faqs
stories = [
    {
        "slug": "ai-agent-workflows-autonomous-operations-startups-2026",
        "title": "AI Agent Workflows and Autonomous Operations for Tech Startups 2026",
        "category_slug": "startup-innovation",
        "read_time": "9 min read",
        "summary": "An authoritative strategic blueprint exploring AI Agent Workflows and Autonomous Operations for Tech Startups 2026, covering unit economics, tactical implementation sprints, hiring velocity, and measurable ROI benchmarks.",
        "cover": "/images/guides/ai-agent-workflows-autonomous-operations-startups-2026.jpg",
        "inlines": [
            "/images/guides/ai-agent-workflows-autonomous-operations-startups-2026-inline-1.jpg",
            "/images/guides/ai-agent-workflows-autonomous-operations-startups-2026-inline-2.jpg"
        ]
    },
    {
        "slug": "b2b-abm-high-ticket-lead-scoring-2026",
        "title": "B2B ABM & High-Ticket Lead Scoring Strategy 2026",
        "category_slug": "marketing-strategy",
        "read_time": "9 min read",
        "summary": "An authoritative strategic blueprint exploring B2B Account-Based Marketing and High-Ticket Lead Scoring 2026, covering unit economics, tactical implementation sprints, hiring velocity, and measurable ROI benchmarks.",
        "cover": "/images/guides/b2b-abm-high-ticket-lead-scoring-2026.jpg",
        "inlines": [
            "/images/guides/b2b-abm-high-ticket-lead-scoring-2026-inline-1.jpg",
            "/images/guides/b2b-abm-high-ticket-lead-scoring-2026-inline-2.jpg"
        ]
    },
    {
        "slug": "2026-seed-pitch-deck-architecture-capital-dynamics",
        "title": "2026 Seed Pitch Deck Architecture: Winning Capital Dynamics",
        "category_slug": "startup-innovation",
        "read_time": "9 min read",
        "summary": "An authoritative strategic blueprint exploring Early Stage Pitch Deck Architecture and Seed Capital Dynamics 2026, covering unit economics, tactical implementation sprints, hiring velocity, and measurable ROI benchmarks.",
        "cover": "/images/guides/2026-seed-pitch-deck-architecture-capital-dynamics.jpg",
        "inlines": [
            "/images/guides/2026-seed-pitch-deck-architecture-capital-dynamics-inline-1.jpg",
            "/images/guides/2026-seed-pitch-deck-architecture-capital-dynamics-inline-2.jpg"
        ]
    },
    {
        "slug": "multi-touch-attribution-cac-payback-optimization-2026",
        "title": "Multi-Touch Attribution & CAC Payback Optimization 2026",
        "category_slug": "marketing-strategy",
        "read_time": "9 min read",
        "summary": "An authoritative strategic blueprint exploring Multi-Touch Attribution and CAC Payback Optimization 2026, covering unit economics, tactical implementation sprints, hiring velocity, and measurable ROI benchmarks.",
        "cover": "/images/guides/multi-touch-attribution-cac-payback-optimization-2026.jpg",
        "inlines": [
            "/images/guides/multi-touch-attribution-cac-payback-optimization-2026-inline-1.jpg",
            "/images/guides/multi-touch-attribution-cac-payback-optimization-2026-inline-2.jpg"
        ]
    }
]

for s in stories:
    cmd_cat = f"mysql -u u390470426_techandcar -p'#T@GIh5Z' u390470426_techandcar -N -e \"SELECT id FROM pr_categories WHERE slug='{s['category_slug']}' LIMIT 1;\""
    stdin, stdout, stderr = ssh.exec_command(cmd_cat)
    cat_id = stdout.read().decode().strip() or "1"

    safe_title = s["title"].replace("'", "\\'")
    safe_summary = s["summary"].replace("'", "\\'")
    post_id = s["slug"]

    # 1. Insert post into pr_posts
    sql_post = f"""
    INSERT INTO pr_posts (id, type, category_id, title, slug, summary, reading_time, status)
    VALUES ('{post_id}', 'story', {cat_id}, '{safe_title}', '{s["slug"]}', '{safe_summary}', '{s["read_time"]}', 'Published')
    ON DUPLICATE KEY UPDATE title=VALUES(title), summary=VALUES(summary), category_id=VALUES(category_id), status='Published';
    """
    ssh.exec_command(f"mysql -u u390470426_techandcar -p'#T@GIh5Z' u390470426_techandcar -e \"{sql_post}\"")

    # 2. Insert media into pr_media_files and pr_entity_media
    media_id = f"med_{s['slug']}_cover"
    sql_med = f"""
    INSERT INTO pr_media_files (id, file_name, file_path, alt_text, provider)
    VALUES ('{media_id}', '{s["slug"]}.jpg', '{s["cover"]}', '{safe_title}', 'local')
    ON DUPLICATE KEY UPDATE file_path=VALUES(file_path);

    INSERT INTO pr_entity_media (entity_type, entity_id, media_id, context, sort_order)
    VALUES ('post', '{post_id}', '{media_id}', 'featured', 0)
    ON DUPLICATE KEY UPDATE media_id=VALUES(media_id);
    """
    ssh.exec_command(f"mysql -u u390470426_techandcar -p'#T@GIh5Z' u390470426_techandcar -e \"{sql_med}\"")

    # 3. Insert SEO into pr_seo_metadata
    sql_seo = f"""
    INSERT INTO pr_seo_metadata (entity_type, entity_id, meta_title, meta_description, canonical_url, og_title, og_description, og_image)
    VALUES ('post', '{post_id}', '{safe_title} | PR Marketing Ventures', '{safe_summary}', '/startup-stories/{s["slug"]}/', '{safe_title}', '{safe_summary}', '{s["cover"]}')
    ON DUPLICATE KEY UPDATE meta_title=VALUES(meta_title), meta_description=VALUES(meta_description), og_image=VALUES(og_image);
    """
    ssh.exec_command(f"mysql -u u390470426_techandcar -p'#T@GIh5Z' u390470426_techandcar -e \"{sql_seo}\"")

print("Migration completed successfully! pr_* tables created and populated with PR Marketing stories!")
ssh.close()
