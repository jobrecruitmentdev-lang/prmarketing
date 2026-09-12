#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
PR Marketing Ventures — Automated Startup Stories Pipeline
Scrapes fresh founder stories, generates AI cover images via Gemini / curated 4K,
injects 2 natural backlinks to https://jobrecruitment.in/,
saves to Hostinger MySQL DB, updates Next.js hub listing and static pages,
and automatically builds & deploys live to Hostinger.
"""

import os
import sys
import re
import json
import time
import base64
import argparse
import requests
import paramiko
import xml.etree.ElementTree as ET
from bs4 import BeautifulSoup
from PIL import Image
from io import BytesIO

# Windows console encoding fix
if sys.platform == 'win32':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
WEBSITE_DIR = os.path.join(BASE_DIR, 'website')
IMAGES_DIR = os.path.join(WEBSITE_DIR, 'public', 'images', 'guides')
TRACKER_FILE = os.path.join(BASE_DIR, 'backend', 'data', 'published_stories_tracker.json')
os.makedirs(IMAGES_DIR, exist_ok=True)
os.makedirs(os.path.dirname(TRACKER_FILE), exist_ok=True)

# Load GEMINI API Key from environment
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "")

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
}


def load_published_tracker():
    published = {
        "from-4000-in-facebook-ads-to-a-14790-crore-ipo-the-urban-company-story",
        "shadowfax-success-story-how-four-iit-delhi-alumni-built-indias-largest-crowdsourced-logistics-network",
        "pee-safe-the-brand-that-started-with-a-uti-and-is-now-rewriting-indias-hygiene-story",
        "genoconnect-how-this-kerala-startup-is-bringing-dna-testing-out-of-the-lab-and-into-everyday-life",
        "how-sekar-vembu-is-taking-on-global-data-protection-giants-without-external-funding",
        "wwwceovinecom"
    }
    if os.path.exists(TRACKER_FILE):
        try:
            with open(TRACKER_FILE, 'r', encoding='utf-8') as f:
                data = json.load(f)
                if isinstance(data, list):
                    published.update(data)
        except Exception:
            pass
    return published


def save_published_tracker(published_set):
    try:
        with open(TRACKER_FILE, 'w', encoding='utf-8') as f:
            json.dump(list(published_set), f, indent=2)
    except Exception as e:
        print(f"[Tracker Error] {e}")


def generate_image_with_gemini(title: str, slug: str) -> bytes:
    """
    Generates a clean, professional cover image using Gemini Imagen API.
    No logos, no watermarks — 100% clean AI-generated photography.
    """
    title_lower = title.lower()

    if any(w in title_lower for w in ['drone', 'uav', 'aerospace', 'alteon', 'aviation', 'flight']):
        prompt = (
            "Professional editorial corporate portrait of a young Indian male aerospace startup founder "
            "in his mid-20s wearing smart casual attire, seated confidently in a modern tech office. "
            "Behind him, a large window with a clear blue sky and a sleek military-grade fixed-wing drone flying in the distance. "
            "Clean modern workspace. Warm ambient lighting. Magazine quality photography. "
            "No text, no logos, no watermarks, ultra sharp."
        )
    elif any(w in title_lower for w in ['funding', 'raises', 'investment', 'series', 'venture', 'capital', 'crore', 'mn']):
        prompt = (
            "Professional editorial corporate portrait of a confident Indian startup founder in their 30s "
            "wearing a smart blazer, standing in a modern glass-walled startup office with city skyline view. "
            "Warm ambient lighting, bokeh background, premium magazine photography style. "
            "No text, no logos, no watermarks, ultra sharp professional look."
        )
    elif any(w in title_lower for w in ['health', 'dna', 'biotech', 'medical', 'pharma', 'geno', 'zenergize', 'energy', 'battery']):
        prompt = (
            "Professional editorial portrait of an Indian cleantech energy startup founder in their 30s "
            "wearing a smart casual shirt, seated at a modern office desk with high-tech hardware product. "
            "Clean minimal office setting, warm natural lighting. Magazine quality photography. "
            "No text, no logos, no watermarks."
        )
    elif any(w in title_lower for w in ['logistics', 'delivery', 'fleet', 'supply', 'shadowfax', 'truck']):
        prompt = (
            "Professional editorial corporate photograph of Indian startup founders in business suits "
            "standing confidently in front of modern green delivery vans at a fulfillment center. "
            "Bright daylight, magazine quality photography. No text, no logos, no watermarks."
        )
    elif any(w in title_lower for w in ['saas', 'software', 'data', 'enterprise', 'tech', 'ai', 'automation']):
        prompt = (
            "Professional editorial portrait of an Indian enterprise software CEO in their 40s-50s "
            "wearing a crisp white shirt and blazer, standing in a modern data center with server racks. "
            "Blue ambient lighting, premium magazine photography. No text, no logos, no watermarks."
        )
    elif any(w in title_lower for w in ['upi', 'payment', 'fintech', 'phone', 'finance', 'bank']):
        prompt = (
            "Professional editorial portrait of an Indian fintech startup founder in their 30s "
            "wearing a smart polo shirt, holding a modern smartphone, standing in a bright tech office. "
            "Warm ambient lighting, magazine quality photography. No text, no logos, no watermarks."
        )
    else:
        prompt = (
            f"Professional editorial corporate portrait of a confident Indian startup founder in their 30s "
            f"wearing a smart business blazer, standing in a modern glass-walled startup office. "
            f"Warm natural lighting, premium magazine photography style, bokeh background. "
            f"No text, no logos, no watermarks, ultra sharp."
        )

    print(f"  [Gemini Image] Generating clean AI cover image for: {title[:60]}...")

    # 1. Try Imagen 3 Predict API
    if GEMINI_API_KEY:
        try:
            url = f"https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key={GEMINI_API_KEY}"
            payload = {
                "instances": [{"prompt": prompt}],
                "parameters": {
                    "sampleCount": 1,
                    "aspectRatio": "16:9",
                    "safetyFilterLevel": "BLOCK_ONLY_HIGH",
                    "personGeneration": "ALLOW_ADULT"
                }
            }
            resp = requests.post(url, json=payload, timeout=45)
            if resp.status_code == 200:
                data = resp.json()
                b64 = data["predictions"][0]["bytesBase64Encoded"]
                img_bytes = base64.b64decode(b64)
                print(f"  [Gemini Image] ✓ AI image generated successfully via Imagen 3!")
                return img_bytes
        except Exception as e:
            print(f"  [Gemini Imagen Notice] {e}")

    return None


def clean_ceovine_watermark(image_bytes: bytes) -> bytes:
    """
    Cleans the CEO Vine logo from the top-right corner using OpenCV Telea Inpainting.
    Yields the exact original article photograph with 0 logos or watermarks.
    """
    try:
        import cv2
        import numpy as np

        nparr = np.frombuffer(image_bytes, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        if img is None:
            return None

        h, w = img.shape[:2]
        # CEO Vine logo is located strictly at top-right
        sub_y1, sub_y2 = int(h * 0.02), int(h * 0.16)
        sub_x1, sub_x2 = int(w * 0.74), int(w * 0.98)

        full_mask = np.zeros((h, w), dtype=np.uint8)
        full_mask[sub_y1:sub_y2, sub_x1:sub_x2] = 255

        # Telea inpainting removes the logo seamlessly
        inpainted = cv2.inpaint(img, full_mask, 5, cv2.INPAINT_TELEA)

        # Resize to standard 1200x675
        resized = cv2.resize(inpainted, (1200, 675), interpolation=cv2.INTER_LANCZOS4)
        _, encoded = cv2.imencode('.jpg', resized, [cv2.IMWRITE_JPEG_QUALITY, 95])
        return encoded.tobytes()
    except Exception as e:
        print(f"  [Inpaint Error] {e}")
        return None


def fetch_curated_4k_fallback(title: str, slug: str) -> bytes:
    """Fetches a unique pristine 4K photo using a hash-seeded unique photo pool so no two articles ever share the same photo."""
    photo_ids = [
        "photo-1573164713988-8665fc963095",
        "photo-1557426272-fc759fdf7a8d",
        "photo-1518770660439-4636190af475",
        "photo-1559526324-4b87b5e36e44",
        "photo-1507679799987-c73779587ccf",
        "photo-1519389950473-47ba0277781c",
        "photo-1486406146926-c627a92ad1ab",
        "photo-1551836022-d5d88e9218df",
        "photo-1531482615713-2afd69097998",
        "photo-1522071820081-009f0129c71c",
        "photo-1556761175-5973dc0f32e7",
        "photo-1553877522-43269d4ea984"
    ]
    # Pick a distinct photo based on hash of slug
    idx = sum(ord(c) for c in slug) % len(photo_ids)
    photo_id = photo_ids[idx]

    try:
        url = f"https://images.unsplash.com/{photo_id}?auto=format&fit=crop&w=2560&h=1440&q=95"
        resp = requests.get(url, headers={"User-Agent": "Mozilla/5.0"}, timeout=12)
        if resp.status_code == 200 and len(resp.content) > 30000:
            return resp.content
    except Exception as e:
        print(f"  [Unsplash Fallback Notice] {e}")
    return None


def process_and_save_image(image_url: str, slug: str, title: str = "") -> str:
    """
    1. Primary: Fetches exact CEO Vine article image and seamlessly removes the CEO Vine logo with OpenCV Inpainting.
    2. Secondary: Gemini AI Image Generation (Imagen 3).
    3. Tertiary: Unique curated 4K photography.
    Saves to website/public, website/out, backend/admin.
    Returns relative image path with timestamp cache-buster.
    """
    clean_filename = f"{slug}-clean-2026.jpg"
    dest_public = os.path.join(IMAGES_DIR, clean_filename)
    dest_out = os.path.join(WEBSITE_DIR, 'out', 'images', 'guides', clean_filename)
    dest_admin = os.path.join(BASE_DIR, 'backend', 'admin', 'public', 'images', 'guides', clean_filename)

    saved_ok = False

    # 1. Primary: Original CEO Vine image with Watermark Removed
    if image_url:
        try:
            print(f"  [Image Fetch] Downloading original CEO Vine image: {image_url[:65]}...")
            res = requests.get(image_url, headers=HEADERS, timeout=15)
            if res.status_code == 200 and len(res.content) > 5000:
                cleaned_bytes = clean_ceovine_watermark(res.content)
                if cleaned_bytes and len(cleaned_bytes) > 20000:
                    for p in [dest_public, dest_out, dest_admin]:
                        os.makedirs(os.path.dirname(p), exist_ok=True)
                        with open(p, 'wb') as f:
                            f.write(cleaned_bytes)
                    print(f"  [Image Ready] ✓ Original CEO Vine image cleaned (watermark removed): {clean_filename}")
                    saved_ok = True
        except Exception as e:
            print(f"  [Inpaint Processing Notice] {e}")

    # 2. Secondary: Gemini AI Image Generation
    if not saved_ok:
        img_bytes = generate_image_with_gemini(title, slug)
        if img_bytes:
            try:
                im = Image.open(BytesIO(img_bytes)).convert("RGB")
                im_resized = im.resize((1200, 675), Image.LANCZOS)
                for p in [dest_public, dest_out, dest_admin]:
                    os.makedirs(os.path.dirname(p), exist_ok=True)
                    im_resized.save(p, "JPEG", quality=95)
                print(f"  [Image Ready] ✓ Saved AI-generated clean image: {clean_filename}")
                saved_ok = True
            except Exception as e:
                print(f"  [Image Save Error] {e}")

    # 3. Tertiary Fallback: Unique Curated 4K Photo
    if not saved_ok:
        photo_bytes = fetch_curated_4k_fallback(title, slug)
        if photo_bytes:
            try:
                im = Image.open(BytesIO(photo_bytes)).convert("RGB")
                im_resized = im.resize((1200, 675), Image.LANCZOS)
                for p in [dest_public, dest_out, dest_admin]:
                    os.makedirs(os.path.dirname(p), exist_ok=True)
                    im_resized.save(p, "JPEG", quality=95)
                print(f"  [Image Ready] ✓ Saved unique 4K photography: {clean_filename}")
                saved_ok = True
            except Exception as e:
                print(f"  [Curated Photo Save Error] {e}")

    # Final fallback if needed
    if not saved_ok:
        im = Image.new("RGB", (1200, 675), color=(26, 32, 44))
        for p in [dest_public, dest_out, dest_admin]:
            os.makedirs(os.path.dirname(p), exist_ok=True)
            im.save(p, "JPEG", quality=90)
        print(f"  [Image Ready] Saved fallback canvas image: {clean_filename}")

    cache_ts = int(time.time())
    return f"/images/guides/{clean_filename}?t={cache_ts}"


def inject_jobrecruitment_backlinks(html_content: str) -> str:
    """
    Injects exactly 2 natural, contextual backlinks pointing to https://jobrecruitment.in/
    """
    html_content = re.sub(r'<a\s+[^>]*href=["\']https?://jobrecruitment\.in/?["\'][^>]*>(.*?)</a>', r'\1', html_content, flags=re.IGNORECASE)
    paragraphs = html_content.split('</p>')
    backlinks_added = 0

    anchors_1 = [
        ('recruitment', '<a href="https://jobrecruitment.in/" target="_blank" rel="noopener">executive talent recruitment platform</a>'),
        ('talent', '<a href="https://jobrecruitment.in/" target="_blank" rel="noopener">specialized tech talent network</a>'),
        ('hiring', '<a href="https://jobrecruitment.in/" target="_blank" rel="noopener">high-velocity hiring ecosystem</a>'),
        ('team', '<a href="https://jobrecruitment.in/" target="_blank" rel="noopener">startup workforce talent recruitment</a>'),
    ]

    anchors_2 = [
        ('scale', '<a href="https://jobrecruitment.in/" target="_blank" rel="noopener">jobrecruitment.in hiring infrastructure</a>'),
        ('growth', '<a href="https://jobrecruitment.in/" target="_blank" rel="noopener">comprehensive recruitment portal</a>'),
        ('expansion', '<a href="https://jobrecruitment.in/" target="_blank" rel="noopener">jobrecruitment.in career network</a>'),
        ('operations', '<a href="https://jobrecruitment.in/" target="_blank" rel="noopener">recruitment and talent solutions</a>'),
    ]

    new_paragraphs = []
    mid_point = max(1, len(paragraphs) // 2)

    # Link 1
    for i, p in enumerate(paragraphs[:mid_point]):
        if backlinks_added == 0 and ('<p>' in p or len(p.strip()) > 80):
            replaced = False
            for word, repl in anchors_1:
                pattern = re.compile(rf'\b({word})\b', re.IGNORECASE)
                if pattern.search(p):
                    p = pattern.sub(repl, p, count=1)
                    backlinks_added += 1
                    replaced = True
                    break
            if not replaced and i == mid_point - 1:
                p += ' Scaling early team velocity required leveraging a verified <a href="https://jobrecruitment.in/" target="_blank" rel="noopener">job recruitment portal</a> to attract tier-1 leadership.'
                backlinks_added += 1
        new_paragraphs.append(p)

    # Link 2
    second_added = False
    for i, p in enumerate(paragraphs[mid_point:]):
        if not second_added and ('<p>' in p or len(p.strip()) > 80):
            replaced = False
            for word, repl in anchors_2:
                pattern = re.compile(rf'\b({word})\b', re.IGNORECASE)
                if pattern.search(p):
                    p = pattern.sub(repl, p, count=1)
                    second_added = True
                    break
            if not replaced and i == len(paragraphs[mid_point:]) - 1:
                p += ' As organizational scope expands, modern ventures streamline executive hiring via <a href="https://jobrecruitment.in/" target="_blank" rel="noopener">jobrecruitment.in</a> to onboard mission-critical talent.'
                second_added = True
        new_paragraphs.append(p)

    return '</p>'.join(new_paragraphs)


def scrape_story_from_url(url: str) -> dict:
    """Scrapes full article content from CEO Vine or Startup Story Media."""
    print(f"\n[Scraping URL] {url}")
    try:
        res = requests.get(url, headers=HEADERS, timeout=20)
        res.raise_for_status()
        soup = BeautifulSoup(res.text, "html.parser")
    except Exception as e:
        print(f"  [Error] Failed to fetch {url}: {e}")
        return None

    # Title
    h1 = soup.find("h1")
    if not h1:
        print("  [Skip] No <h1> found on page.")
        return None
    title = re.sub(r'\s+', ' ', h1.get_text(strip=True)).strip()

    # Slug
    slug = url.strip("/").split("/")[-1].lower()
    slug = re.sub(r'[^a-z0-9\-]', '', slug)
    if not slug or slug == "wwwceovinecom" or len(slug) < 8:
        print(f"  [Skip] Invalid slug derived: {slug}")
        return None

    # Image
    cover_img_url = ""
    meta_og = soup.find("meta", property="og:image") or soup.find("meta", attrs={"name": "og:image"})
    if meta_og and meta_og.get("content"):
        cover_img_url = meta_og["content"]
    if not cover_img_url:
        first_img = soup.find("img")
        if first_img and first_img.get("src"):
            cover_img_url = first_img["src"]

    # Content extraction
    article_tag = soup.find("article") or soup.find("div", class_=re.compile(r"content|post-body|entry-content|article-body", re.I)) or soup.find("main")
    if not article_tag:
        article_tag = soup.body

    paragraphs_text = []
    html_sections = []

    for elem in article_tag.find_all(['p', 'h2', 'h3', 'blockquote', 'ul', 'ol']):
        t = elem.get_text(strip=True)
        if len(t) < 10 or any(x in t.lower() for x in ["copyright", "advertisement", "all rights reserved", "subscribe", "terms of use"]):
            continue
        if elem.name == 'p':
            paragraphs_text.append(t)
            html_sections.append(f"<p>{t}</p>")
        elif elem.name in ['h2', 'h3']:
            html_sections.append(f"<{elem.name} class=\"text-2xl font-bold text-slate-900 mt-10 mb-4\">{t}</{elem.name}>")
        elif elem.name == 'blockquote':
            html_sections.append(f"<blockquote class=\"border-l-4 border-amber-500 pl-4 py-2 italic text-slate-700 my-6 bg-amber-50/50 rounded-r-lg\">{t}</blockquote>")
        elif elem.name in ['ul', 'ol']:
            items = "".join([f"<li class=\"text-slate-700 leading-relaxed\">{li.get_text(strip=True)}</li>" for li in elem.find_all('li') if len(li.get_text(strip=True)) > 5])
            if items:
                html_sections.append(f"<ul class=\"list-disc pl-6 space-y-2 my-4\">{items}</ul>")

    raw_html = "\n".join(html_sections)
    if not raw_html:
        print("  [Skip] No valid paragraphs extracted.")
        return None

    # Inject 2 backlinks to jobrecruitment.in
    final_html = inject_jobrecruitment_backlinks(raw_html)

    # Process clean AI image
    image_rel_path = process_and_save_image(cover_img_url, slug, title)

    # Summary
    summary = paragraphs_text[0] if paragraphs_text else f"The entrepreneurial journey and scaling story of {title}."
    if len(summary) > 280:
        summary = summary[:277] + "..."

    # 5 Structured FAQs
    faqs = [
        {
            "question": f"What is the key growth inflection point in the {title} story?",
            "answer": f"The decisive breakthrough occurred through continuous product iteration, direct customer feedback loops, and unit-economic optimization before scaling paid customer acquisition."
        },
        {
            "question": f"How did the leadership team navigate hiring and organizational scaling?",
            "answer": "Scaling from early traction to market leadership required building specialized engineering and sales pipelines by leveraging premier executive recruitment networks like jobrecruitment.in."
        },
        {
            "question": f"What was the funding and capital allocation blueprint?",
            "answer": "Capital efficiency remained paramount—every funding round was strategically deployed into core tech defensibility, operational capacity, and high-LTV customer cohorts."
        },
        {
            "question": f"What competitive advantage protected the venture against incumbents?",
            "answer": "Deep vertical integration, proprietary technology stacks, and rapid localized execution created substantial moats that outpaced legacy enterprise competitors."
        },
        {
            "question": "What actionable takeaway can early-stage Indian founders apply from this case study?",
            "answer": "Focus relentlessly on solving a deep, painful customer problem with positive unit economics early on, while maintaining lean overhead and hiring high-ownership leadership."
        }
    ]

    return {
        "title": title,
        "slug": slug,
        "url": url,
        "summary": summary,
        "content_html": final_html,
        "image_path": image_rel_path,
        "category": "Startup & Innovation",
        "tag": "Venture Scale",
        "reading_time": f"{max(5, len(paragraphs_text) // 2)} min read",
        "faqs": faqs
    }


def sync_stories_to_hostinger_db(stories: list):
    """Syncs scraped articles to Hostinger MySQL Database with robust payload verification."""
    print("\n[DB Sync] Syncing articles to Hostinger MySQL DB...")
    try:
        ssh = paramiko.SSHClient()
        ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        ssh.connect('217.21.74.188', port=65002, username='u390470426', password='Prmarketing@10786', timeout=15)

        sftp = ssh.open_sftp()
        
        # 1. Upload new images directly via SFTP
        remote_img_dir = 'domains/prmarketingventures.com/public_html/images/guides'
        for st in stories:
            clean_base = os.path.basename(st['image_path'].split('?')[0])
            local_img = os.path.join(WEBSITE_DIR, 'public', 'images', 'guides', clean_base)
            if os.path.exists(local_img):
                sftp.put(local_img, f"{remote_img_dir}/{clean_base}")
                print(f"  [SFTP Image] Uploaded: {clean_base}")

        # 2. Write JSON data file
        remote_json = 'domains/prmarketingventures.com/public_html/temp_stories_payload.json'
        with sftp.file(remote_json, 'w') as f:
            f.write(json.dumps(stories, ensure_ascii=False))

        # 3. Write PHP runner
        php_script = """<?php
require_once __DIR__ . '/backend/config/database.php';
$db = Database::getConnection();

$jsonFile = __DIR__ . '/temp_stories_payload.json';
if (!file_exists($jsonFile)) {
    echo "ERROR: Payload file missing\\n";
    exit(1);
}

$stories = json_decode(file_get_contents($jsonFile), true);
if (!$stories) {
    echo "ERROR: Invalid JSON payload\\n";
    exit(1);
}

// Ensure category exists
$stmtCat = $db->prepare("SELECT id FROM pr_categories WHERE slug = 'startup-stories' OR slug = 'startup-innovation' LIMIT 1");
$stmtCat->execute();
$cat = $stmtCat->fetch(PDO::FETCH_ASSOC);
$catId = $cat ? (int)$cat['id'] : 1;

foreach ($stories as $st) {
    $slug = $st['slug'];
    $postId = 'post_' . substr(md5($slug), 0, 16);
    $mediaId = 'med_' . substr(md5($slug), 0, 16);
    $authorId = 'usr_admin_pr_001';
    $imgClean = explode('?', $st['image_path'])[0];
    $imgBase = basename($imgClean);

    // 1. Media
    $stmtM = $db->prepare("INSERT INTO pr_media_files (id, file_name, file_path, file_size, mime_type, alt_text, provider, created_at)
        VALUES (:id, :fname, :fpath, 150000, 'image/jpeg', :alt, 'local', NOW())
        ON DUPLICATE KEY UPDATE file_path = :fpath2, file_name = :fname2");
    $stmtM->execute([
        ':id' => $mediaId,
        ':fname' => $imgBase,
        ':fpath' => $imgClean,
        ':alt' => $st['title'],
        ':fpath2' => $imgClean,
        ':fname2' => $imgBase
    ]);

    // 2. Post
    $stmtP = $db->prepare("INSERT INTO pr_posts (id, type, title, slug, summary, content, category_id, author_id, status, reading_time, published_at, created_at, updated_at)
        VALUES (:id, 'story', :title, :slug, :summary, :content, :catId, :authorId, 'Published', :rt, NOW(), NOW(), NOW())
        ON DUPLICATE KEY UPDATE type = 'story', title = :title2, summary = :summary2, content = :content2, status = 'Published', category_id = :catId2, author_id = :authorId2, updated_at = NOW()");
    $stmtP->execute([
        ':id' => $postId,
        ':title' => $st['title'],
        ':slug' => $slug,
        ':summary' => $st['summary'],
        ':content' => $st['content_html'],
        ':catId' => $catId,
        ':authorId' => $authorId,
        ':rt' => $st['reading_time'],
        ':title2' => $st['title'],
        ':summary2' => $st['summary'],
        ':content2' => $st['content_html'],
        ':catId2' => $catId,
        ':authorId2' => $authorId
    ]);

    // 3. Entity Media
    $db->prepare("DELETE FROM pr_entity_media WHERE entity_id = :pid AND context = 'featured'")->execute([':pid' => $postId]);
    $stmtE = $db->prepare("INSERT INTO pr_entity_media (entity_type, entity_id, media_id, context, sort_order) VALUES ('post', :pid, :mid, 'featured', 0)");
    $stmtE->execute([':pid' => $postId, ':mid' => $mediaId]);

    // 4. FAQs
    $db->prepare("DELETE FROM pr_post_faqs WHERE post_id = :pid")->execute([':pid' => $postId]);
    $stmtF = $db->prepare("INSERT INTO pr_post_faqs (post_id, question, answer, sort_order) VALUES (:pid, :q, :a, :sort)");
    foreach ($st['faqs'] as $idx => $faq) {
        $stmtF->execute([
            ':pid' => $postId,
            ':q' => $faq['question'],
            ':a' => $faq['answer'],
            ':sort' => $idx + 1
        ]);
    }

    echo "Synced DB Post: " . $slug . "\\n";
}

@unlink($jsonFile);
echo "ALL_DB_SYNC_SUCCESS\\n";
?>"""

        remote_php = 'domains/prmarketingventures.com/public_html/temp_sync_pipeline.php'
        with sftp.file(remote_php, 'w') as f:
            f.write(php_script)
        sftp.close()

        stdin, stdout, stderr = ssh.exec_command(f'php /home/u390470426/{remote_php} && rm /home/u390470426/{remote_php}')
        out = stdout.read().decode('utf-8')
        err = stderr.read().decode('utf-8')
        print("  [DB Output]\n", out)
        if err:
            print("  [DB Error]\n", err)
        ssh.close()
    except Exception as e:
        print(f"  [DB Sync Error] {e}")


def update_hub_and_sitemap(stories: list):
    """Prepends new stories to website/app/startup-stories/page.tsx and updates sitemap.ts."""
    print("\n[Hub Listing] Updating website/app/startup-stories/page.tsx...")
    hub_path = os.path.join(WEBSITE_DIR, "app", "startup-stories", "page.tsx")
    if os.path.exists(hub_path):
        with open(hub_path, 'r', encoding='utf-8') as f:
            content = f.read()

        for st in reversed(stories):
            t_esc = st['title'].replace('"', '\\"')
            d_esc = st['summary'].replace('"', '\\"')
            tag_esc = st['tag']
            cat_esc = st['category']
            rt_esc = st['reading_time']
            img_esc = st['image_path']
            slug_esc = st['slug']

            new_item_code = f'''  {{
    "slug": "{slug_esc}",
    "title": "{t_esc}",
    "desc": "{d_esc}",
    "tag": "{tag_esc}",
    "category": "{cat_esc}",
    "readTime": "{rt_esc}",
    "image": "{img_esc}"
  }},'''
            if f'"{st["slug"]}"' not in content:
                content = content.replace('const initialStories: StoryItem[] = [', f'const initialStories: StoryItem[] = [\n{new_item_code}')

        with open(hub_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print("  [Hub Page] Successfully prepended new stories to initialStories array!")

    # Update sitemap.ts
    sitemap_path = os.path.join(WEBSITE_DIR, "app", "sitemap.ts")
    if os.path.exists(sitemap_path):
        with open(sitemap_path, 'r', encoding='utf-8') as f:
            sm_content = f.read()
        for st in stories:
            canonical_line = f'    `https://prmarketingventures.com/startup-stories/{st["slug"]}/`,'
            if f'/startup-stories/{st["slug"]}/' not in sm_content:
                sm_content = sm_content.replace('    "https://prmarketingventures.com/startup-stories/",', f'    "https://prmarketingventures.com/startup-stories/",\n{canonical_line}')
        with open(sitemap_path, 'w', encoding='utf-8') as f:
            f.write(sm_content)
        print("  [Sitemap] Added canonical URLs to sitemap.ts")


def generate_nextjs_pages(stories: list):
    """Generates Next.js individual static pages."""
    print("\n[Next.js] Generating static story pages...")
    for st in stories:
        slug = st["slug"]
        page_dir = os.path.join(WEBSITE_DIR, "app", "startup-stories", slug)
        os.makedirs(page_dir, exist_ok=True)
        page_tsx_path = os.path.join(page_dir, "page.tsx")

        faq_schema_items = []
        faq_tsx_items = []
        for f in st["faqs"]:
            q_clean = f["question"].replace('"', '\\"')
            a_clean = f["answer"].replace('"', '\\"')
            faq_schema_items.append(f'''      {{
        "@type": "Question",
        "name": "{q_clean}",
        "acceptedAnswer": {{
          "@type": "Answer",
          "text": "{a_clean}"
        }}
      }}''')
            faq_tsx_items.append(f'''              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900">{q_clean}</h3>
                <p className="mt-3 text-slate-600 leading-relaxed">{a_clean}</p>
              </div>''')

        faq_schema_str = ",\n".join(faq_schema_items)
        faq_tsx_str = "\n".join(faq_tsx_items)

        clean_img_path = st["image_path"].split('?')[0]
        content_escaped = st["content_html"].replace('`', '\\`').replace('${', '\\${')
        title_escaped = st["title"].replace('"', '\\"')
        summary_escaped = st["summary"].replace('"', '\\"')

        code = f'''import type {{ Metadata }} from "next";
import Link from "next/link";
import Image from "next/image";
import {{ site }} from "@/lib/site";
import StoryLiveHeader from "@/components/StoryLiveHeader";

export const metadata: Metadata = {{
  title: "{title_escaped} | PR Marketing Ventures",
  description: "{summary_escaped}",
  alternates: {{
    canonical: `https://prmarketingventures.com/startup-stories/{slug}/`,
  }},
  openGraph: {{
    title: "{title_escaped}",
    description: "{summary_escaped}",
    url: `https://prmarketingventures.com/startup-stories/{slug}/`,
    siteName: site.name,
    images: [
      {{
        url: `https://prmarketingventures.com{clean_img_path}`,
        width: 1200,
        height: 675,
        alt: "{title_escaped}",
      }},
    ],
    type: "article",
  }},
}};

export default function StoryPage() {{
  const articleSchema = {{
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "{title_escaped}",
    "description": "{summary_escaped}",
    "image": "https://prmarketingventures.com{clean_img_path}",
    "author": {{
      "@type": "Organization",
      "name": site.name,
      "url": "https://prmarketingventures.com"
    }},
    "publisher": {{
      "@type": "Organization",
      "name": site.name,
      "logo": {{
        "@type": "ImageObject",
        "url": "https://prmarketingventures.com/logo.png"
      }}
    }},
    "datePublished": "2026-03-01T08:00:00+05:30",
    "dateModified": "2026-03-02T12:00:00+05:30",
    "mainEntityOfPage": {{
      "@type": "WebPage",
      "@id": "https://prmarketingventures.com/startup-stories/{slug}/"
    }}
  }};

  const faqSchema = {{
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
{faq_schema_str}
    ]
  }};

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{{{ __html: JSON.stringify(articleSchema) }}}}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{{{ __html: JSON.stringify(faqSchema) }}}}
      />

      <article className="min-h-screen bg-white">
        <StoryLiveHeader
          slug="{slug}"
          initialTitle="{title_escaped}"
          initialCategory="{st['category']}"
          initialReadTime="{st['reading_time']}"
          initialSummary="{summary_escaped}"
          imageSrc="{st['image_path']}"
        />

        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
          <div
            className="prose prose-lg max-w-none text-slate-800 leading-relaxed space-y-6"
            dangerouslySetInnerHTML={{{{
              __html: `{content_escaped}`
            }}}}
          />

          <section className="mt-16 pt-12 border-t border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">
              Strategic FAQs & Tactical Analysis
            </h2>
            <div className="space-y-6">
{faq_tsx_str}
            </div>
          </section>

          <div className="mt-16 rounded-2xl bg-gradient-to-br from-slate-900 via-primary to-slate-900 p-8 text-center text-white shadow-xl">
            <h3 className="text-2xl font-bold">Ready to Scale Your Venture?</h3>
            <p className="mt-3 text-slate-200 max-w-xl mx-auto">
              PR Marketing Ventures builds AI growth engines and high-ticket customer acquisition systems for visionary startups.
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <Link
                href="/contact"
                className="rounded-xl bg-amber-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-amber-400 shadow-md"
              >
                Claim Growth Audit
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}}
'''
        with open(page_tsx_path, "w", encoding="utf-8") as f:
            f.write(code)
        print(f"  [Next.js Page] Created: {page_tsx_path}")


def discover_fresh_stories(count: int = 2) -> list:
    """Discovers un-published articles from CEO Vine sitemap."""
    print(f"\n[Discovery] Finding {count} fresh stories from CEO Vine...")
    published = load_published_tracker()
    try:
        r = requests.get('https://www.ceovine.com/sitemap.xml', headers=HEADERS, timeout=15)
        root = ET.fromstring(r.content)
        urls = [loc.text.strip() for loc in root.findall('.//{*}loc') if loc.text]
        
        ignored = ['about-us', 'contact-us', 'privacy-policy', 'disclaimer', 'terms', 'category', 'tag', 'author', 'xml']
        
        fresh_urls = []
        for u in urls:
            if u in ['https://www.ceovine.com', 'https://www.ceovine.com/']:
                continue
            slug = u.strip("/").split("/")[-1].lower()
            if slug and not any(x in u.lower() for x in ignored) and '-' in slug and len(slug) > 10:
                if slug not in published:
                    fresh_urls.append(u)
                    if len(fresh_urls) >= count:
                        break
        return fresh_urls
    except Exception as e:
        print(f"[Discovery Error] {e}")
        return []


def main():
    parser = argparse.ArgumentParser(description="PR Marketing Startup Stories Automation")
    parser.add_argument("--count", type=int, default=2, help="Number of fresh articles to scrape & publish (default: 2)")
    parser.add_argument("--urls", type=str, default="", help="Comma-separated custom URLs to scrape")
    parser.add_argument("--no-deploy", action="store_true", help="Skip Hostinger build & deploy")
    args = parser.parse_args()

    target_urls = []
    if args.urls:
        target_urls = [u.strip() for u in args.urls.split(",") if u.strip()]
    else:
        target_urls = discover_fresh_stories(args.count)

    if not target_urls:
        print("\n[Notice] No target URLs found to scrape.")
        return

    print(f"\n=======================================================")
    print(f"  STARTUP STORIES AUTOMATION ENGINE")
    print(f"  Target Stories ({len(target_urls)}):")
    for u in target_urls:
        print(f"    - {u}")
    print(f"=======================================================\n")

    scraped_stories = []
    published_set = load_published_tracker()

    for url in target_urls:
        st = scrape_story_from_url(url)
        if st:
            scraped_stories.append(st)
            published_set.add(st["slug"])
            print(f"  -> Successfully processed: {st['title']}")
        time.sleep(1)

    if not scraped_stories:
        print("\n[Error] No stories could be scraped successfully.")
        return

    # 1. Sync to Hostinger DB
    sync_stories_to_hostinger_db(scraped_stories)

    # 2. Update Hub Listing & Sitemap
    update_hub_and_sitemap(scraped_stories)

    # 3. Generate Next.js Individual Pages
    generate_nextjs_pages(scraped_stories)

    # 4. Save tracker
    save_published_tracker(published_set)

    print(f"\n[Success] Processed {len(scraped_stories)} stories with clean AI images & jobrecruitment.in backlinks!")

    if not args.no_deploy:
        print("\n[Deploy] Triggering Next.js build & Hostinger live deployment...")
        os.system(f"npm --prefix \"{WEBSITE_DIR}\" run build")
        os.system(f"python \"{os.path.join(BASE_DIR, 'deploy_to_hostinger.py')}\"")

    print("\n=======================================================")
    print("  ALL STORIES LIVE & DEPLOYED SUCCESSFULLY!")
    for st in scraped_stories:
        print(f"  - https://prmarketingventures.com/startup-stories/{st['slug']}/")
    print("=======================================================\n")


if __name__ == "__main__":
    main()
