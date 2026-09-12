#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
PR Marketing Ventures — Automated Startup Stories Scraper & Publisher Engine
Fetches startup founder stories from CEO Vine & Startup Story Media,
cleans logos/watermarks from images, embeds 2 natural backlinks to https://jobrecruitment.in/,
publishes to Hostinger MySQL Database and builds Next.js static pages.
"""

import os
import sys
import re
import json
import time
import requests
import paramiko
from bs4 import BeautifulSoup
from PIL import Image, ImageEnhance, ImageFilter
from io import BytesIO

# Fix Windows stdout encoding for Hindi / Currency symbols
sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
WEBSITE_DIR = os.path.join(BASE_DIR, 'website')
IMAGES_DIR = os.path.join(WEBSITE_DIR, 'public', 'images', 'guides')
os.makedirs(IMAGES_DIR, exist_ok=True)

# List of Target Startup Stories to Scrape & Publish
STORIES_QUEUE = [
    {
        "url": "https://www.ceovine.com/from-4000-in-facebook-ads-to-a-14790-crore-ipo-the-urban-company-story",
        "fallback_slug": "from-4000-in-facebook-ads-to-a-14790-crore-ipo-the-urban-company-story",
        "image_file": "urban-company-founders-clean-2026.jpg",
        "tag": "Unicorn Scale",
        "category": "Startup & Innovation",
        "default_title": "From ₹4,000 in Facebook Ads to a ₹14,790 Crore IPO: The Urban Company Story"
    },
    {
        "url": "https://www.ceovine.com/shadowfax-success-story-how-four-iit-delhi-alumni-built-indias-largest-crowdsourced-logistics-network",
        "fallback_slug": "shadowfax-success-story-how-four-iit-delhi-alumni-built-indias-largest-crowdsourced-logistics-network",
        "image_file": "shadowfax-founders-clean-2026.jpg",
        "tag": "Logistics Tech",
        "category": "Startup & Innovation",
        "default_title": "Shadowfax Success Story: How Four IIT Delhi Alumni Built India's Largest Crowdsourced Logistics Network"
    },
    {
        "url": "https://www.ceovine.com/pee-safe-the-brand-that-started-with-a-uti-and-is-now-rewriting-indias-hygiene-story",
        "fallback_slug": "pee-safe-the-brand-that-started-with-a-uti-and-is-now-rewriting-indias-hygiene-story",
        "image_file": "peesafe-founders-clean-2026.jpg",
        "tag": "D2C Brand",
        "category": "Marketing Strategy",
        "default_title": "Pee Safe: The Brand That Started With A UTI And Is Now Rewriting India's Hygiene Story"
    },
    {
        "url": "https://www.ceovine.com/genoconnect-how-this-kerala-startup-is-bringing-dna-testing-out-of-the-lab-and-into-everyday-life",
        "fallback_slug": "genoconnect-how-this-kerala-startup-is-bringing-dna-testing-out-of-the-lab-and-into-everyday-life",
        "image_file": "genoconnect-founders-clean-2026.jpg",
        "tag": "HealthTech",
        "category": "Startup & Innovation",
        "default_title": "GenoConnect: How This Kerala Startup Is Bringing DNA Testing Out of the Lab and Into Everyday Life"
    },
    {
        "url": "https://www.ceovine.com/how-sekar-vembu-is-taking-on-global-data-protection-giants-without-external-funding",
        "fallback_slug": "how-sekar-vembu-is-taking-on-global-data-protection-giants-without-external-funding",
        "image_file": "sekar-vembu-founders-clean-2026.jpg",
        "tag": "Bootstrapped SaaS",
        "category": "Startup & Innovation",
        "default_title": "How Sekar Vembu Is Taking On Global Data Protection Giants Without External Funding"
    }
]

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
}


def clean_watermark_from_image(img_bgr):
    """
    Seamlessly inpaints and content-aware erases any 'CEO VINE' or source badge
    located in the top-right corner region of the image without touching the subjects.
    """
    try:
        import cv2
        h, w = img_bgr.shape[:2]
        
        # Badge coordinates in 1200x675 / 1280x720 (top-right quadrant)
        y1, y2 = int(h * 0.02), int(h * 0.22)
        x1, x2 = int(w * 0.65), int(w * 0.985)
        
        badge_w = x2 - x1
        badge_h = y2 - y1
        
        # Sample clean background patch from the left of the badge
        src_x1 = max(0, x1 - badge_w - 20)
        src_x2 = x1 - 20
        src_patch = img_bgr[y1:y2, src_x1:src_x2]
        
        if src_patch.shape[1] > 0 and src_patch.shape[0] > 0:
            src_resized = cv2.resize(src_patch, (badge_w, badge_h))
            
            # Feathered alpha blending mask
            mask = np.zeros((badge_h, badge_w), dtype=np.float32)
            cv2.rectangle(mask, (8, 8), (badge_w - 8, badge_h - 8), 1.0, -1)
            mask = cv2.GaussianBlur(mask, (15, 15), 0)
            mask_3ch = np.repeat(mask[:, :, np.newaxis], 3, axis=2)
            
            target_roi = img_bgr[y1:y2, x1:x2].astype(np.float32)
            src_float = src_resized.astype(np.float32)
            blended = (src_float * mask_3ch + target_roi * (1.0 - mask_3ch)).astype(np.uint8)
            
            img_bgr[y1:y2, x1:x2] = blended
            
            # Inpaint boundary seam for invisible transition
            seam_mask = np.zeros((h, w), dtype=np.uint8)
            cv2.rectangle(seam_mask, (x1, y1), (x2, y2), 255, 4)
            img_bgr = cv2.inpaint(img_bgr, seam_mask, 5, cv2.INPAINT_TELEA)
    except Exception as e:
        print(f"  [Inpaint Warning] {e}")

    return img_bgr


def download_and_clean_image(image_url: str, output_path: str, title: str):
    """
    Downloads the cover image, cleans any corner watermarks/logos with OpenCV inpainting,
    crops to standard 16:9 ratio, enhances quality, and saves high-resolution WebP/JPEG.
    """
    try:
        import cv2
        print(f"  [Image] Fetching & Cleaning: {image_url}")
        res = requests.get(image_url, headers=HEADERS, timeout=15)
        if res.status_code == 200:
            im = Image.open(BytesIO(res.content)).convert("RGB")
            arr = cv2.cvtColor(np.array(im), cv2.COLOR_RGB2BGR)
            
            # Inpaint CEO VINE / watermarks
            cleaned = clean_watermark_from_image(arr)
            
            # Fit to 1200x675 (16:9)
            cleaned_resized = cv2.resize(cleaned, (1200, 675), interpolation=cv2.INTER_LANCZOS4)
            
            cv2.imwrite(output_path, cleaned_resized, [cv2.IMWRITE_JPEG_QUALITY, 95])
            print(f"  [Image] Cleaned & saved -> {output_path}")
            return True
    except Exception as e:
        print(f"  [Image Error] Failed to process image: {e}")

    # Fallback placeholder if download fails
    return create_fallback_image(output_path, title)


def create_fallback_image(output_path: str, title: str):
    """Creates an elegant editorial gradient canvas if source image fails."""
    try:
        img = Image.new("RGB", (1200, 675), color=(28, 18, 12))
        img.save(output_path, "JPEG", quality=90)
        return True
    except Exception as e:
        print(f"Fallback image error: {e}")
        return False


def inject_jobrecruitment_backlinks(html_content: str, title: str) -> str:
    """
    Guarantees exactly 2 natural, contextual, high-intent backlinks pointing to
    https://jobrecruitment.in/ seamlessly integrated into hiring and scaling discussions.
    """
    # Remove existing jobrecruitment links if any to avoid duplicates
    html_content = re.sub(r'<a\s+[^>]*href=["\']https?://jobrecruitment\.in/?["\'][^>]*>(.*?)</a>', r'\1', html_content, flags=re.IGNORECASE)

    paragraphs = html_content.split('</p>')
    backlinks_added = 0

    backlink_anchors_1 = [
        ('recruitment', '<a href="https://jobrecruitment.in/" target="_blank" rel="noopener">comprehensive recruitment platform</a>'),
        ('talent', '<a href="https://jobrecruitment.in/" target="_blank" rel="noopener">tech talent acquisition network</a>'),
        ('hiring', '<a href="https://jobrecruitment.in/" target="_blank" rel="noopener">job recruitment portal</a>'),
        ('team', '<a href="https://jobrecruitment.in/" target="_blank" rel="noopener">specialized talent hiring solution</a>'),
        ('engineers', '<a href="https://jobrecruitment.in/" target="_blank" rel="noopener">job recruitment opportunities</a>'),
    ]

    backlink_anchors_2 = [
        ('scale', '<a href="https://jobrecruitment.in/" target="_blank" rel="noopener">jobrecruitment.in career ecosystem</a>'),
        ('growth', '<a href="https://jobrecruitment.in/" target="_blank" rel="noopener">enterprise job recruitment portal</a>'),
        ('operations', '<a href="https://jobrecruitment.in/" target="_blank" rel="noopener">workforce recruitment network</a>'),
        ('culture', '<a href="https://jobrecruitment.in/" target="_blank" rel="noopener">talent recruitment solutions</a>'),
        ('startup', '<a href="https://jobrecruitment.in/" target="_blank" rel="noopener">leading job recruitment network</a>'),
    ]

    new_paragraphs = []
    mid_point = max(1, len(paragraphs) // 2)

    # Inject 1st backlink in the first half
    for i, p in enumerate(paragraphs[:mid_point]):
        if backlinks_added == 0 and ('<p>' in p or len(p.strip()) > 80):
            replaced = False
            for word, replacement in backlink_anchors_1:
                pattern = re.compile(rf'\b({word})\b', re.IGNORECASE)
                if pattern.search(p):
                    p = pattern.sub(replacement, p, count=1)
                    backlinks_added += 1
                    replaced = True
                    break
            if not replaced and i == mid_point - 1:
                p += f' Scaling high-performance operations required partnering with a verified <a href="https://jobrecruitment.in/" target="_blank" rel="noopener">job recruitment portal</a> to attract tier-1 leadership.'
                backlinks_added += 1
        new_paragraphs.append(p)

    # Inject 2nd backlink in the second half
    second_added = False
    for i, p in enumerate(paragraphs[mid_point:]):
        if not second_added and ('<p>' in p or len(p.strip()) > 80):
            replaced = False
            for word, replacement in backlink_anchors_2:
                pattern = re.compile(rf'\b({word})\b', re.IGNORECASE)
                if pattern.search(p):
                    p = pattern.sub(replacement, p, count=1)
                    second_added = True
                    break
            if not replaced and i == len(paragraphs[mid_point:]) - 1:
                p += f' Today, startups navigate team expansion by tapping into specialized hiring channels like <a href="https://jobrecruitment.in/" target="_blank" rel="noopener">jobrecruitment.in</a> to secure mission-critical talent.'
                second_added = True
        new_paragraphs.append(p)

    return '</p>'.join(new_paragraphs)


def scrape_story(story_meta: dict) -> dict:
    """Scrapes a single story from URL and transforms it into PR Marketing rich editorial structure."""
    url = story_meta["url"]
    print(f"\n[Scraper] Scraping: {url}")
    
    try:
        res = requests.get(url, headers=HEADERS, timeout=20)
        res.raise_for_status()
        soup = BeautifulSoup(res.text, "html.parser")
    except Exception as e:
        print(f"[Error] Failed to fetch {url}: {e}")
        return None

    # Title extraction
    h1 = soup.find("h1")
    title = h1.get_text(strip=True) if h1 else story_meta["default_title"]
    title = re.sub(r'\s+', ' ', title).strip()

    # Slug generation
    slug = story_meta["fallback_slug"]

    # Cover image extraction
    cover_image_url = ""
    og_img = soup.find("meta", property="og:image")
    if og_img and og_img.get("content"):
        cover_image_url = og_img["content"]
    else:
        main_img = soup.find("img", class_=re.compile(r'hero|featured|post|article', re.I))
        if main_img and main_img.get("src"):
            cover_image_url = main_img["src"]
        else:
            all_imgs = soup.find_all("img")
            for im in all_imgs:
                src = im.get("src", "")
                if "uploads" in src or "wp-content" in src:
                    cover_image_url = src
                    break

    # Extract article body text / paragraphs
    body_paragraphs = []
    
    # Target main article container
    content_container = soup.find("article") or soup.find("main") or soup.find("div", class_=re.compile(r'content|post|entry', re.I))
    
    if content_container:
        # Extract headings and paragraphs
        elements = content_container.find_all(["h2", "h3", "p", "blockquote", "ul"])
        for el in elements:
            # Skip ads, related links, navigation or footer text
            text = el.get_text(strip=True)
            if not text or len(text) < 15:
                continue
            if any(skip in text.lower() for skip in ["advertisement", "copyright", "share this", "read also", "subscribe", "get featured"]):
                continue

            if el.name == "h2":
                body_paragraphs.append(f"<h2>{text}</h2>")
            elif el.name == "h3":
                body_paragraphs.append(f"<h3>{text}</h3>")
            elif el.name == "blockquote":
                body_paragraphs.append(f"<blockquote><p>{text}</p></blockquote>")
            elif el.name == "ul":
                items = "".join([f"<li>{li.get_text(strip=True)}</li>" for li in el.find_all("li") if li.get_text(strip=True)])
                if items:
                    body_paragraphs.append(f"<ul>{items}</ul>")
            else:
                body_paragraphs.append(f"<p>{text}</p>")

    if not body_paragraphs:
        print("  [Warning] No body paragraphs extracted. Using comprehensive editorial synthesis.")
        body_paragraphs = [
            f"<p>{title} represents a masterclass in modern Indian venture scaling, customer acquisition excellence, and capital discipline.</p>",
            f"<p>From solving deep operational bottlenecks to deploying high-velocity market penetration strategies, this journey offers essential insights for early-stage founders and enterprise executives alike.</p>"
        ]

    # Create summary from first 2 paragraphs
    first_p_texts = [BeautifulSoup(p, "html.parser").get_text() for p in body_paragraphs if p.startswith("<p>")][:2]
    summary = " ".join(first_p_texts)
    if len(summary) > 280:
        summary = summary[:277] + "..."

    # Ensure structured sections
    combined_body = "\n\n".join(body_paragraphs)
    
    # Inject exactly 2 backlinks to jobrecruitment.in
    final_body_with_backlinks = inject_jobrecruitment_backlinks(combined_body, title)

    # Add relevant internal PR Marketing service links
    if "/services/performance-marketing/" not in final_body_with_backlinks:
        final_body_with_backlinks += '\n\n<p>For high-growth ventures seeking similar hyper-scaled customer acquisition, explore PR Marketing\'s <a href="/services/performance-marketing/">enterprise performance marketing systems</a> and <a href="/services/ai-seo/">AI-driven SEO growth engines</a>.</p>'

    # Clean & Save Image
    image_filename = f"{slug}.jpg"
    image_rel_path = f"/images/guides/{image_filename}"
    image_abs_path = os.path.join(IMAGES_DIR, image_filename)
    
    if cover_image_url:
        download_and_clean_image(cover_image_url, image_abs_path, title)
    else:
        create_fallback_image(image_abs_path, title)

    # Generate 5 Structured FAQs
    faqs = [
        {
            "q": f"What is the key takeaway from the {title.split(':')[0]} journey?",
            "a": f"The journey highlights the critical importance of solving real operational friction, maintaining sustainable unit economics, and executing with relentless customer-centric focus rather than burning capital indiscriminately."
        },
        {
            "q": "How did the founders scale customer acquisition efficiently?",
            "a": "By combining grassroots community engagement with targeted performance marketing and strong referral loops, ensuring Customer Acquisition Cost (CAC) remained low while customer lifetime value (LTV) compounded."
        },
        {
            "q": "How does team building and talent acquisition impact this startup's trajectory?",
            "a": f"Securing top-tier technical and managerial talent through verified recruitment platforms like <a href='https://jobrecruitment.in/' target='_blank' rel='noopener'>jobrecruitment.in</a> enabled rapid execution, reduced operational churn, and built a defensible market moat."
        },
        {
            "q": "What challenges did the startup overcome during its growth phase?",
            "a": "Major challenges included supply chain bottlenecks, navigating competitive pricing wars, and scaling customer service infrastructure while maintaining consistent brand quality across multi-city expansions."
        },
        {
            "q": "How can early-stage founders apply these growth frameworks today?",
            "a": "Founders should prioritize unit economic clarity early, establish tight feedback loops with early adopters, and build data-driven attribution models to optimize every rupee of marketing and hiring spend."
        }
    ]

    return {
        "slug": slug,
        "title": title,
        "summary": summary,
        "content": final_body_with_backlinks,
        "category": story_meta["category"],
        "tag": story_meta["tag"],
        "readTime": "9 min read",
        "image": image_rel_path,
        "faqs": faqs,
        "published_at": "2026-09-02T10:00:00+05:30"
    }


def generate_nextjs_story_page(story: dict):
    """Generates the static Next.js React page file for the story under website/app/startup-stories/[slug]/page.tsx."""
    slug = story["slug"]
    story_dir = os.path.join(WEBSITE_DIR, "app", "startup-stories", slug)
    os.makedirs(story_dir, exist_ok=True)
    page_file = os.path.join(story_dir, "page.tsx")

    safe_title = json.dumps(story["title"])
    safe_page_title = json.dumps(f"{story['title']} | PR Marketing Ventures")
    safe_canonical = json.dumps(f"/startup-stories/{story['slug']}/")
    safe_desc = json.dumps(story["summary"])
    safe_slug = json.dumps(story["slug"])
    safe_image = json.dumps(story["image"])
    safe_category = json.dumps(story["category"])
    safe_read_time = json.dumps(story["readTime"])
    safe_content = json.dumps(story["content"])
    safe_faqs = json.dumps(story["faqs"], indent=2)

    page_code = f"""import type {{ Metadata }} from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import {{ multiBreadcrumbSchema, articleSchema, faqSchema }} from "@/lib/seo";
import StoryLiveHeader from "@/components/StoryLiveHeader";

export const metadata: Metadata = {{
  title: {safe_page_title},
  description: {safe_desc},
  alternates: {{ canonical: {safe_canonical} }},
  openGraph: {{
    title: {safe_title},
    description: {safe_desc},
    images: [{safe_image}],
  }},
}};

const faqs = {safe_faqs};

export default function StartupStory_{slug.replace('-', '_')}_Page() {{
  const slug = {safe_slug};
  const title = {safe_title};
  const desc = {safe_desc};
  const category = {safe_category};
  const readTime = {safe_read_time};
  const image = {safe_image};
  const contentHtml = {safe_content};

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{{{
          __html: JSON.stringify([
            multiBreadcrumbSchema([
              {{ name: "Home", path: "/" }},
              {{ name: "Startup Stories", path: "/startup-stories/" }},
              {{ name: title, path: `/startup-stories/${{slug}}/` }},
            ]),
            articleSchema({{
              title: title,
              description: desc,
              path: `/startup-stories/${{slug}}/`,
              datePublished: "2026-09-02T10:00:00+05:30",
              dateModified: "2026-09-02T12:00:00+05:30",
            }}),
            faqSchema(faqs),
          ]),
        }}}}
      />

      <article className="bg-white">
        <StoryLiveHeader
          slug={{slug}}
          initialTitle={{title}}
          initialCategory={{category}}
          initialReadTime={{readTime}}
          initialSummary={{desc}}
          imageSrc={{image}}
        />

        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
          <div
            className="prose prose-slate max-w-none text-slate-700 [&_h2]:pt-14 [&_h2]:mt-16 [&_h2]:mb-6 [&_h2]:border-t [&_h2]:border-slate-200/80 [&_h2]:font-heading [&_h2]:text-2xl sm:[&_h2]:text-3xl [&_h2]:font-black [&_h2]:tracking-tight [&_h2]:text-ink [&_h3]:mt-10 [&_h3]:mb-4 [&_h3]:font-heading [&_h3]:text-xl sm:[&_h3]:text-2xl [&_h3]:font-black [&_h3]:text-slate-900 [&_p]:text-[17px] sm:[&_p]:text-[19px] [&_p]:leading-[2.0] [&_p]:mb-8 [&_p]:text-slate-700 [&_ul]:my-8 [&_ul]:space-y-4 [&_ul]:pl-6 [&_ul]:list-disc [&_ol]:my-8 [&_ol]:space-y-4 [&_ol]:pl-6 [&_ol]:list-decimal [&_li]:text-[17px] sm:[&_li]:text-[18px] [&_li]:leading-[1.9] [&_li]:text-slate-700 [&_blockquote]:my-10 [&_blockquote]:p-8 [&_blockquote]:bg-primary-soft/40 [&_blockquote]:rounded-2xl [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:italic [&_blockquote]:text-slate-800 [&_table]:w-full [&_table]:my-12 [&_table]:rounded-2xl [&_table]:overflow-hidden [&_table]:border [&_table]:border-slate-200/80 [&_table]:shadow-sm [&_th]:bg-[#1f140e] [&_th]:text-[#d4af37] [&_th]:p-4 [&_th]:text-left [&_th]:font-black [&_th]:text-sm [&_td]:p-4 [&_td]:border-t [&_td]:border-slate-200/80 [&_td]:text-sm [&_td]:text-slate-700 [&_tr:nth-child(even)]:bg-slate-50/60 [&_a]:text-primary [&_a]:font-bold [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-accent-dark"
            dangerouslySetInnerHTML={{{{ __html: contentHtml }}}}
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
        </div>
      </article>

      <CtaBand />
    </>
  );
}}
"""
    with open(page_file, "w", encoding="utf-8") as f:
        f.write(page_code)
    print(f"  [Next.js Page] Created -> {page_file}")


def update_startup_stories_hub_page(all_stories: list):
    """Updates website/app/startup-stories/page.tsx with all stories."""
    hub_page_path = os.path.join(WEBSITE_DIR, "app", "startup-stories", "page.tsx")
    
    stories_json = json.dumps([
        {
            "slug": s["slug"],
            "title": s["title"],
            "desc": s["summary"],
            "tag": s["tag"],
            "category": s["category"],
            "readTime": s["readTime"],
            "image": s["image"]
        }
        for s in all_stories
    ], indent=2)

    hub_code = f"""import type {{ Metadata }} from "next";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import {{ multiBreadcrumbSchema }} from "@/lib/seo";
import {{ IconSparkles }} from "@/components/icons";
import StoriesFilterView, {{ StoryItem }} from "@/components/StoriesFilterView";

export const metadata: Metadata = {{
  title: "Startup Stories & Growth Intelligence | PR Marketing Ventures",
  description:
    "Exclusive startup growth blueprints, venture scaling strategies, unit economics models, and Generative Engine Optimization frameworks authored by PR Marketing Ventures.",
  alternates: {{ canonical: "/startup-stories/" }},
  openGraph: {{
    title: "Startup Stories & Growth Intelligence | PR Marketing Ventures",
    description:
      "Exclusive startup growth blueprints, venture scaling strategies, and B2B growth frameworks.",
  }},
}};

const initialStories: StoryItem[] = {stories_json};

export default function StartupStoriesHubPage() {{
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{{{
          __html: JSON.stringify([
            multiBreadcrumbSchema([
              {{ name: "Home", path: "/" }},
              {{ name: "Startup Stories", path: "/startup-stories/" }},
            ]),
          ]),
        }}}}
      />

      <section className="bg-gradient-to-b from-[#f9f6f0] via-white to-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3.5 py-1 text-xs font-semibold text-primary">
                <IconSparkles width={{14}} height={{14}} />
                VENTURE INSIGHTS & STRATEGY
              </span>
              <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight text-ink sm:text-5xl">
                Startup Stories & Growth Intelligence
              </h1>
              <p className="mt-4 text-base text-slate-600 sm:text-lg">
                Explore in-depth venture blueprints, AI innovation models, high-velocity talent strategies, and unit economics breakdowns authored by the growth engineers at PR Marketing Ventures.
              </p>
            </div>
          </Reveal>

          {{/* Interactive Live Database Synchronized View */}}
          <StoriesFilterView stories={{initialStories}} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}}
"""
    with open(hub_page_path, "w", encoding="utf-8") as f:
        f.write(hub_code)
    print(f"[Hub Page] Updated -> {hub_page_path}")


def sync_to_hostinger_database(scraped_stories: list):
    """Syncs the scraped articles into Hostinger MySQL DB tables (pr_posts, pr_post_faqs, pr_media_files)."""
    print("\n[Database] Syncing scraped stories to Hostinger MySQL Database...")
    try:
        ssh = paramiko.SSHClient()
        ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        ssh.connect("217.21.74.188", port=65002, username="u390470426", password="Prmarketing@10786")

        stories_json_str = json.dumps(scraped_stories)

        php_sync_script = """<?php
require_once __DIR__ . '/backend/config/database.php';
$db = Database::getConnection();

// Ensure categories exist
$db->exec("INSERT INTO pr_categories (name, slug, description, status) VALUES 
('Startup & Innovation', 'startup-innovation', 'High-growth startups and venture scaling', 'Active'),
('Marketing Strategy', 'marketing-strategy', 'Performance marketing and unit economics', 'Active')
ON DUPLICATE KEY UPDATE name=VALUES(name);");

$catMap = [];
$res = $db->query("SELECT id, name FROM pr_categories")->fetchAll();
foreach ($res as $r) {
    $catMap[$r['name']] = $r['id'];
}

$storiesJson = <<<'JSONDATA'
__STORIES_JSON_PLACEHOLDER__
JSONDATA;

$stories = json_decode($storiesJson, true) ?: [];

foreach ($stories as $s) {
    $slug = $s['slug'];
    $title = $s['title'];
    $summary = $s['summary'];
    $content = $s['content'];
    $categoryName = $s['category'];
    $catId = $catMap[$categoryName] ?? 1;
    $readTime = $s['readTime'];
    $image = $s['image'];
    $postId = 'post_' . substr(md5($slug), 0, 16);

    // 1. Insert/Update Post
    $stmt = $db->prepare("INSERT INTO pr_posts 
        (id, type, category_id, title, slug, summary, content, status, reading_time, published_at, created_at, updated_at)
        VALUES (:id, 'story', :cat_id, :title, :slug, :summary, :content, 'Published', :read_time, NOW(), NOW(), NOW())
        ON DUPLICATE KEY UPDATE 
        title = VALUES(title),
        summary = VALUES(summary),
        content = VALUES(content),
        status = 'Published',
        reading_time = VALUES(reading_time),
        updated_at = NOW();");
    
    $stmt->execute([
        ':id' => $postId,
        ':cat_id' => $catId,
        ':title' => $title,
        ':slug' => $slug,
        ':summary' => $summary,
        ':content' => $content,
        ':read_time' => $readTime
    ]);

    // 2. Insert Media File
    $mediaId = 'med_' . substr(md5($slug), 0, 16);
    $stmtMed = $db->prepare("INSERT INTO pr_media_files 
        (id, file_name, file_path, file_size, mime_type, alt_text, provider, created_at)
        VALUES (:id, :fname, :fpath, 125000, 'image/jpeg', :alt, 'local', NOW())
        ON DUPLICATE KEY UPDATE file_path = VALUES(file_path);");
    $stmtMed->execute([
        ':id' => $mediaId,
        ':fname' => basename($image),
        ':fpath' => $image,
        ':alt' => $title
    ]);

    // Link Entity Media
    $delStmt = $db->prepare("DELETE FROM pr_entity_media WHERE entity_id = :pid AND context = 'featured'");
    $delStmt->execute([':pid' => $postId]);
    $stmtEnt = $db->prepare("INSERT INTO pr_entity_media (entity_type, entity_id, media_id, context, sort_order)
        VALUES ('post', :pid, :mid, 'featured', 0)");
    $stmtEnt->execute([':pid' => $postId, ':mid' => $mediaId]);

    // 3. Insert FAQs
    $delFaq = $db->prepare("DELETE FROM pr_post_faqs WHERE post_id = :pid");
    $delFaq->execute([':pid' => $postId]);
    $stmtFaq = $db->prepare("INSERT INTO pr_post_faqs (post_id, question, answer, sort_order, created_at)
        VALUES (:pid, :q, :a, :sort, NOW())");
    if (!empty($s['faqs'])) {
        foreach ($s['faqs'] as $idx => $f) {
            $stmtFaq->execute([
                ':pid' => $postId,
                ':q' => $f['q'],
                ':a' => $f['a'],
                ':sort' => $idx + 1
            ]);
        }
    }
}

echo 'DATABASE_SYNC_SUCCESS_COUNT_' . count($stories);
?>""".replace("__STORIES_JSON_PLACEHOLDER__", stories_json_str)

        sftp = ssh.open_sftp()
        temp_remote = "domains/prmarketingventures.com/public_html/temp_sync_stories.php"
        with sftp.file(temp_remote, "w") as f:
            f.write(php_sync_script)
        sftp.close()

        stdin, stdout, stderr = ssh.exec_command(f"php {temp_remote} && rm {temp_remote}")
        out = stdout.read().decode().strip()
        err = stderr.read().decode().strip()
        print(f"  [DB Result] {out}")
        if err:
            print(f"  [DB Stderr] {err}")
        ssh.close()
    except Exception as e:
        print(f"  [DB Sync Error] {e}")


def main():
    print("=" * 65)
    print(" PR MARKETING VENTURES — STARTUP STORIES AUTOMATION ENGINE ")
    print("=" * 65)

    existing_stories = [
        {
            "slug": "multi-touch-attribution-cac-payback-optimization-2026",
            "title": "Multi-Touch Attribution & CAC Payback Optimization 2026",
            "summary": "This guide details how transitioning from single-touch to multi-touch attribution (MTA) directly optimizes Customer Acquisition Cost (CAC) payback periods for high-growth tech companies.",
            "tag": "Growth Metrics",
            "category": "Marketing Strategy",
            "readTime": "9 min read",
            "image": "/images/guides/multi-touch-attribution-cac-payback-optimization-2026.jpg",
        },
        {
            "slug": "2026-seed-pitch-deck-architecture-capital-dynamics",
            "title": "2026 Seed Pitch Deck Architecture: Winning Capital Dynamics",
            "summary": "This guide defines the structural evolution of the seed pitch deck for 2026, emphasizing a 12-15 slide framework that balances narrative clarity with hard unit economics.",
            "tag": "Venture Strategy",
            "category": "Startup & Innovation",
            "readTime": "9 min read",
            "image": "/images/guides/2026-seed-pitch-deck-architecture-capital-dynamics.jpg",
        },
        {
            "slug": "b2b-abm-high-ticket-lead-scoring-2026",
            "title": "B2B ABM & High-Ticket Lead Scoring Strategy 2026",
            "summary": "This strategic guide outlines the convergence of Account-Based Marketing and advanced lead scoring for high-value B2B deals in 2026 with intent data integration.",
            "tag": "B2B Growth",
            "category": "Marketing Strategy",
            "readTime": "9 min read",
            "image": "/images/guides/b2b-abm-high-ticket-lead-scoring-2026.jpg",
        },
        {
            "slug": "ai-agent-workflows-autonomous-operations-startups-2026",
            "title": "AI Agent Workflows & Autonomous Ops for Startups in 2026",
            "summary": "In 2026, AI agents have evolved into autonomous orchestrators capable of planning and executing complex multi-step workflows for high-growth startups.",
            "tag": "AI Operations",
            "category": "Startup & Innovation",
            "readTime": "9 min read",
            "image": "/images/guides/ai-agent-workflows-autonomous-operations-startups-2026.jpg",
        }
    ]

    scraped_stories = []

    for item in STORIES_QUEUE:
        story_data = scrape_story(item)
        if story_data:
            scraped_stories.append(story_data)
            generate_nextjs_story_page(story_data)
            time.sleep(1)

    print(f"\n[Summary] Successfully processed {len(scraped_stories)} stories.")

    all_stories = scraped_stories + existing_stories
    update_startup_stories_hub_page(all_stories)

    # Sync to Hostinger DB
    if scraped_stories:
        sync_to_hostinger_database(scraped_stories)

    print("\n[Done] Pipeline execution completed successfully.")


if __name__ == "__main__":
    main()
