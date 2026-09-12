import os
import re
import subprocess
import requests
import json
from datetime import date
from tenacity import retry, stop_after_attempt, wait_exponential
from config import Config, logger
from modules.internal_linker import inject_inline_images
from modules.formatter import split_long_paragraphs

def generate_tsx_guide_page(
    slug: str,
    title: str,
    summary: str,
    tag: str,
    read_time: str,
    html_content: str,
    faqs: list,
    images_data: dict = None
) -> str:
    today_iso = date.today().isoformat()
    clean_title = title.replace('"', '\\"')
    clean_summary = summary.replace('"', '\\"').replace('\n', ' ')
    
    # Extract images
    cover_image = (images_data or {}).get("cover", f"/images/guides/{slug}.jpg")
    inline_images = (images_data or {}).get("inlines", [])

    # Inject inline images into the article HTML between H2 sections
    final_html = inject_inline_images(html_content, inline_images, title)
    
    # Format FAQs for TypeScript array
    formatted_faqs = []
    for f in (faqs or []):
        q = (f.get("question") or f.get("q", "")).replace('"', '\\"')
        a = (f.get("answer") or f.get("a", "")).replace('"', '\\"').replace('\n', ' ')
        if q and a:
            formatted_faqs.append(f'  {{\n    q: "{q}",\n    a: "{a}",\n  }}')
    
    faqs_ts = "[\n" + ",\n".join(formatted_faqs) + "\n]" if formatted_faqs else "[]"
    
    # Safe component name guaranteed to start with Story...
    component_name = "Story" + "".join(w.capitalize() for w in re.split(r'[^a-zA-Z0-9]', slug)) + "Page"

    # Intelligently split long paragraphs into bite-sized 2-sentence readable blocks
    clean_body = split_long_paragraphs(final_html, max_sentences=2)

    # Safely JSON serialize the HTML body
    safe_html_json = json.dumps(clean_body)

    tsx_code = f'''import type {{ Metadata }} from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import {{ multiBreadcrumbSchema, articleSchema, faqSchema }} from "@/lib/seo";
import {{ IconSparkles, IconTarget, IconCheck, IconArrowRight }} from "@/components/icons";

export const metadata: Metadata = {{
  title: "{clean_title} | PR Marketing Ventures",
  description: "{clean_summary}",
  alternates: {{ canonical: "/startup-stories/{slug}/" }},
  openGraph: {{
    title: "{clean_title} | PR Marketing Ventures",
    description: "{clean_summary}",
    type: "article",
    images: [
      {{
        url: "{cover_image}",
        width: 1920,
        height: 1080,
        alt: "{clean_title}",
      }}
    ],
  }},
}};

const faqs = {faqs_ts};

export default function {component_name}() {{
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{{{
          __html: JSON.stringify([
            multiBreadcrumbSchema([
              {{ name: "Home", path: "/" }},
              {{ name: "Startup Stories", path: "/startup-stories/" }},
              {{ name: "{clean_title}", path: "/startup-stories/{slug}/" }},
            ]),
            articleSchema({{
              title: "{clean_title}",
              description: "{clean_summary}",
              path: "/startup-stories/{slug}/",
              datePublished: "{date.today().isoformat()}",
              dateModified: "{date.today().isoformat()}",
            }}),
            faqSchema(faqs),
          ]),
        }}}}
      />

      <article className="bg-white py-14 sm:py-20">
        <header className="bg-gradient-to-b from-[#f9f6f0] to-white py-12">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <nav className="mb-6 flex items-center gap-2 text-xs font-semibold text-slate-500">
              <Link href="/" className="hover:text-primary">Home</Link>
              <span>/</span>
              <Link href="/startup-stories/" className="hover:text-primary">Startup Stories</Link>
              <span>/</span>
              <span className="text-accent-dark">{tag}</span>
            </nav>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3.5 py-1.5 text-xs font-semibold text-primary">
              <IconSparkles width={{14}} height={{14}} />
              {tag.upper()} BLUEPRINT (2026)
            </span>

            <h1 className="mt-6 font-heading text-3xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">
              {title}
            </h1>

            <div className="mt-6 flex items-center gap-4 text-xs font-medium text-slate-500 border-b border-slate-200 pb-6">
              <span>By: PR Marketing Ventures Growth Team</span>
              <span>•</span>
              <span>Updated: {date.today().strftime("%B %Y")}</span>
              <span>•</span>
              <span>{read_time}</span>
            </div>

            {{/* Featured Hero Banner Image (16:9 Cinema Framing) */}}
            <div className="mt-8 overflow-hidden rounded-3xl border border-[#EDE4D8] bg-[#1f140e] shadow-md aspect-[16/9] w-full">
              <img
                src="{cover_image}"
                alt="{clean_title}"
                className="h-full w-full object-cover object-center"
                loading="eager"
              />
            </div>

            {{/* Executive Summary Box */}}
            <div className="mt-8 rounded-2xl border border-primary/20 bg-primary-soft/60 p-6 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-wider text-accent-dark">
                EXECUTIVE SUMMARY / KEY TAKEAWAYS
              </p>
              <p className="mt-3 text-base sm:text-lg leading-relaxed text-slate-800 font-medium">
                {summary}
              </p>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
          <div
            className="prose prose-slate max-w-none text-slate-700 [&_h2]:pt-14 [&_h2]:mt-16 [&_h2]:mb-6 [&_h2]:border-t [&_h2]:border-slate-200/80 [&_h2]:font-heading [&_h2]:text-2xl sm:[&_h2]:text-3xl [&_h2]:font-black [&_h2]:tracking-tight [&_h2]:text-ink [&_h3]:mt-10 [&_h3]:mb-4 [&_h3]:font-heading [&_h3]:text-xl sm:[&_h3]:text-2xl [&_h3]:font-black [&_h3]:text-slate-900 [&_p]:text-[17px] sm:[&_p]:text-[19px] [&_p]:leading-[2.0] [&_p]:mb-8 [&_p]:text-slate-700 [&_ul]:my-8 [&_ul]:space-y-4 [&_ul]:pl-6 [&_ul]:list-disc [&_ol]:my-8 [&_ol]:space-y-4 [&_ol]:pl-6 [&_ol]:list-decimal [&_li]:text-[17px] sm:[&_li]:text-[18px] [&_li]:leading-[1.9] [&_li]:text-slate-700 [&_blockquote]:my-10 [&_blockquote]:p-8 [&_blockquote]:bg-primary-soft/40 [&_blockquote]:rounded-2xl [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:italic [&_blockquote]:text-slate-800 [&_table]:w-full [&_table]:my-12 [&_table]:rounded-2xl [&_table]:overflow-hidden [&_table]:border [&_table]:border-slate-200/80 [&_table]:shadow-sm [&_th]:bg-[#1f140e] [&_th]:text-[#d4af37] [&_th]:p-4 [&_th]:text-left [&_th]:font-black [&_th]:text-sm [&_td]:p-4 [&_td]:border-t [&_td]:border-slate-200/80 [&_td]:text-sm [&_td]:text-slate-700 [&_tr:nth-child(even)]:bg-slate-50/60 [&_a]:text-primary [&_a]:font-bold [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-accent-dark"
            dangerouslySetInnerHTML={{{{ __html: {safe_html_json} }}}}
          />

          {{/* Structured FAQ Section */}}
          {{faqs.length > 0 && (
            <section className="mt-16 border-t border-slate-200 pt-12">
              <h2 className="font-heading text-2xl font-bold text-ink sm:text-3xl">
                Frequently Asked Questions
              </h2>
              <div className="mt-8 space-y-6">
                {{faqs.map((faq, idx) => (
                  <div key={{idx}} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                    <h3 className="font-heading text-lg font-bold text-ink">
                      {{faq.q}}
                    </h3>
                    <p className="mt-2 text-slate-700 leading-relaxed text-sm sm:text-base">
                      {{faq.a}}
                    </p>
                  </div>
                ))}}
              </div>
            </section>
          )}}

          {{/* Bottom Author & Share Card */}}
          <div className="mt-16 rounded-3xl border border-[#3d2719] bg-[#1f140e] p-8 text-[#fdfbf7] shadow-xl">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#d4af37]">
                  Author Authority & Verification
                </span>
                <h3 className="mt-1 font-heading text-xl font-bold text-[#fdfbf7]">
                  PR Marketing Ventures Growth Engineering
                </h3>
                <p className="mt-2 text-xs text-[#d9cebe] max-w-xl leading-relaxed">
                  Headquartered at B-903 Fairdeal House, Navrangpura, Ahmedabad. We engineer enterprise growth engines, AI search architectures, bespoke CRM systems, and high-velocity marketing pipelines.
                </p>
              </div>
              <Link
                href="/contact/"
                className="shrink-0 inline-flex items-center gap-2 rounded-2xl bg-[#d4af37] px-6 py-3.5 text-sm font-bold text-[#140d09] shadow-md transition-all hover:bg-[#c5a059]"
              >
                <span>Book Strategy Call</span>
                <IconArrowRight width={{16}} height={{16}} />
              </Link>
            </div>
          </div>
        </div>
      </article>

      <CtaBand />
    </>
  );
}}
'''
    return tsx_code

def register_guide_in_hub(slug: str, title: str, summary: str, tag: str, read_time: str, cover_image: str = None, category: str = "Startup & Innovation"):
    hub_file = os.path.join(Config.WEBSITE_DIR, "app", "startup-stories", "page.tsx")
    if not os.path.exists(hub_file):
        logger.warning(f"Startup Stories hub file not found at {hub_file}")
        return
        
    with open(hub_file, "r", encoding="utf-8") as f:
        content = f.read()
        
    if f'slug: "{slug}"' in content:
        logger.info(f"Story '{slug}' already registered in startup-stories hub.")
        return

    clean_summary = summary.replace('"', '\\"').replace('\n', ' ').strip()
    if len(clean_summary) > 165:
        clean_summary = clean_summary[:162].rsplit(' ', 1)[0] + "..."

    clean_title = title.replace('"', '\\"')
    img_val = cover_image or f"/images/guides/{slug}.jpg"
    cat_val = category or "Startup & Innovation"

    new_guide_entry = f'''  {{
    slug: "{slug}",
    title: "{clean_title}",
    desc: "{clean_summary}",
    tag: "{tag}",
    category: "{cat_val}",
    readTime: "{read_time}",
    image: "{img_val}",
  }},'''

    # Insert right after 'const stories: StoryItem[] = ['
    if "const stories: StoryItem[] = [" in content:
        updated = content.replace("const stories: StoryItem[] = [", f"const stories: StoryItem[] = [\n{new_guide_entry}", 1)
    elif "const stories = [" in content:
        updated = content.replace("const stories = [", f"const stories = [\n{new_guide_entry}", 1)
    else:
        logger.warning("Could not find insertion marker in startup-stories page.tsx")
        return
    
    with open(hub_file, "w", encoding="utf-8") as f:
        f.write(updated)
        
    logger.info(f"Successfully registered '{slug}' with image & excerpt in {hub_file}")

def register_guide_in_sitemap(slug: str):
    sitemap_file = os.path.join(Config.WEBSITE_DIR, "app", "sitemap.ts")
    if not os.path.exists(sitemap_file):
        return
        
    with open(sitemap_file, "r", encoding="utf-8") as f:
        content = f.read()
        
    target_entry = f'/startup-stories/{slug}/'
    if target_entry in content:
        logger.info(f"Story '{slug}' already present in sitemap.ts")
        return
        
    new_entry = f'    {{ url: `${{site.url}}/startup-stories/{slug}/`, lastModified, changeFrequency: "weekly", priority: 0.9 }},'
    
    if "// Startup Stories & Authority Hub" in content:
        lines = content.split("\n")
        new_lines = []
        for line in lines:
            new_lines.append(line)
            if "// Startup Stories & Authority Hub" in line:
                new_lines.append(new_entry)
        updated = "\n".join(new_lines)
    else:
        updated = content.replace("return [", f"return [\n{new_entry}", 1)
        
    with open(sitemap_file, "w", encoding="utf-8") as f:
        f.write(updated)
        
    logger.info(f"Successfully registered '{slug}' in {sitemap_file}")

def submit_to_indexnow(urls: list) -> bool:
    if not urls:
        return False
    host = "prmarketingventures.com"
    key = "25c6a1bd74f94073a8ef5b34eb39cc6e"
    key_location = f"https://{host}/{key}.txt"
    endpoint = "https://api.indexnow.org/indexnow"
    payload = {
        "host": host,
        "key": key,
        "keyLocation": key_location,
        "urlList": urls
    }
    headers = {"Content-Type": "application/json; charset=utf-8"}
    try:
        logger.info(f"Submitting {len(urls)} URL(s) to IndexNow...")
        resp = requests.post(endpoint, json=payload, headers=headers, timeout=15)
        return resp.status_code in [200, 202]
    except Exception as e:
        logger.error(f"IndexNow error: {e}")
        return False

def build_and_deploy_to_hostinger() -> bool:
    logger.info("Executing Next.js build and Hostinger deployment...")
    root_dir = os.path.dirname(Config.WEBSITE_DIR)
    
    # Step 1: Build Next.js
    build_res = subprocess.run(
        ["npm", "run", "build"],
        cwd=Config.WEBSITE_DIR,
        shell=True,
        capture_output=True,
        text=True
    )
    if build_res.returncode != 0:
        logger.error(f"Next.js build failed:\n{build_res.stderr or build_res.stdout}")
        return False
        
    logger.info("Next.js build succeeded. Running deploy_to_hostinger.py...")
    
    # Step 2: Deploy to Hostinger
    deploy_res = subprocess.run(
        ["python", "deploy_to_hostinger.py"],
        cwd=root_dir,
        shell=True,
        capture_output=True,
        text=True
    )
    if deploy_res.returncode != 0:
        logger.error(f"Deploy script failed:\n{deploy_res.stderr or deploy_res.stdout}")
        return False
        
    logger.info("Deployment to Hostinger completed successfully!")
    return True

def publish_guide(
    slug: str,
    title: str,
    summary: str,
    tag: str,
    read_time: str,
    html_content: str,
    faqs: list,
    images_data: dict = None,
    category: str = "Startup & Innovation",
    skip_deploy: bool = False
) -> dict:
    guide_dir = os.path.join(Config.WEBSITE_DIR, "app", "startup-stories", slug)
    os.makedirs(guide_dir, exist_ok=True)
    page_file = os.path.join(guide_dir, "page.tsx")
    
    cover_image = (images_data or {}).get("cover", f"/images/guides/{slug}.jpg")

    tsx_content = generate_tsx_guide_page(
        slug=slug,
        title=title,
        summary=summary,
        tag=tag,
        read_time=read_time,
        html_content=html_content,
        faqs=faqs,
        images_data=images_data
    )
    
    with open(page_file, "w", encoding="utf-8") as f:
        f.write(tsx_content)
        
    logger.info(f"Created new startup story page at: {page_file}")
    
    # Register in Hub and Sitemap
    register_guide_in_hub(slug, title, summary, tag, read_time, cover_image=cover_image, category=category)
    register_guide_in_sitemap(slug)
    
    live_url = f"{Config.SITE_URL}/startup-stories/{slug}/"

    if skip_deploy:
        logger.info("skip_deploy is True. Deferring Next.js build & deployment to batch completion.")
        return {
            "success": True,
            "live_url": live_url,
            "slug": slug
        }
    
    # Build & Deploy
    deploy_success = build_and_deploy_to_hostinger()
    
    if deploy_success:
        submit_to_indexnow([live_url])
        
    return {
        "success": deploy_success,
        "live_url": live_url,
        "slug": slug
    }
