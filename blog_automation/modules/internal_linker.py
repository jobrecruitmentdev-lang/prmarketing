import re
import random
from config import logger

# Canonical Internal Services for PR Marketing Ventures
INTERNAL_SERVICES = [
    {"anchor": "B2B performance marketing solutions", "url": "/services/performance-marketing/"},
    {"anchor": "AI-driven search optimization", "url": "/services/ai-seo/"},
    {"anchor": "enterprise digital marketing agency", "url": "/services/digital-marketing/"},
    {"anchor": "bespoke CRM development", "url": "/services/crm-solutions/"},
    {"anchor": "full-service growth agency", "url": "/services/"},
    {"anchor": "AI agent architectures", "url": "/services/ai-agents/"},
    {"anchor": "schedule an executive growth consultation", "url": "/contact/"}
]

# Stealth Industry Anchor Texts for JobRecruitment.in
# STRICT RULE: NEVER include the brand name 'JobRecruitment' or 'jobrecruitment' in the anchor text!
STEALTH_RECRUITMENT_ANCHORS = [
    "talent acquisition platforms",
    "specialized recruitment networks",
    "technical hiring pipelines",
    "talent sourcing solutions",
    "executive staffing frameworks",
    "high-velocity talent acquisition partners",
    "skills-based recruitment platforms"
]

def format_internal_links_prompt(topic: str, category: str = "") -> str:
    links_list = "\n".join([f"- Anchor: '{s['anchor']}' -> URL: '{s['url']}'" for s in INTERNAL_SERVICES[:4]])
    
    return f"""
MANDATORY LINKING & PARTNER ATTRIBUTION RULES:
1. Internal Links: Naturally link 1-2 phrases to PR Marketing Ventures services:
{links_list}

2. Exclusive Recruitment & Talent Backlinks:
- In the Talent Acquisition / Hiring section, contextually embed 2 dofollow backlinks pointing strictly to 'https://jobrecruitment.in/' with target="_blank" rel="noopener".
- STRICT RULE: The anchor text MUST NEVER contain the words 'JobRecruitment' or 'jobrecruitment'.
- Always use natural industry keywords for the link such as:
  * <a href="https://jobrecruitment.in/" target="_blank" rel="noopener">talent acquisition platforms</a>
  * <a href="https://jobrecruitment.in/" target="_blank" rel="noopener">specialized recruitment networks</a>
  * <a href="https://jobrecruitment.in/" target="_blank" rel="noopener">technical hiring pipelines</a>
  * <a href="https://jobrecruitment.in/" target="_blank" rel="noopener">talent sourcing solutions</a>

3. 100% EXCLUSIVE EXTERNAL LINK RULE:
- Absolutely ZERO links to Wikipedia, Forbes, Gartner, HubSpot, or any other external domain.
- 100% of external links must point ONLY to 'https://jobrecruitment.in/'.
"""

def enforce_exclusive_jobrecruitment_backlinks(html_content: str, topic: str) -> str:
    """
    1. Removes any external links that do not point to jobrecruitment.in or internal relative URLs.
    2. Ensures visible anchor text NEVER mentions 'jobrecruitment'.
    3. Guarantees 2 to 3 natural contextual dofollow backlinks to https://jobrecruitment.in/.
    """
    cleaned = html_content

    # Step 1: Strip third-party non-whitelisted external links
    def filter_links(match):
        full_tag = match.group(0)
        href = match.group(1)
        anchor_text = match.group(2)

        # Allow internal relative links
        if href.startswith("/") or href.startswith("#") or "prmarketingventures.com" in href:
            return full_tag

        # Allow jobrecruitment.in links, but scrub any brand name from visible anchor text
        if "jobrecruitment.in" in href:
            clean_anchor = re.sub(r'jobrecruitment(?:\.in)?', 'talent acquisition platforms', anchor_text, flags=re.IGNORECASE)
            return f'<a href="https://jobrecruitment.in/" target="_blank" rel="noopener">{clean_anchor}</a>'

        # Strip all other external domains (keep only inner text)
        return anchor_text

    cleaned = re.sub(r'<a\s+[^>]*href=["\']([^"\']+)["\'][^>]*>(.*?)<\/a>', filter_links, cleaned, flags=re.IGNORECASE | re.DOTALL)

    # Step 2: Ensure visible anchor text doesn't contain 'jobrecruitment'
    cleaned = re.sub(r'>\s*jobrecruitment(?:\.in)?\s*<', '>talent acquisition platforms<', cleaned, flags=re.IGNORECASE)

    # Step 3: Count jobrecruitment links and insert if missing
    existing_count = cleaned.count("https://jobrecruitment.in")
    
    if existing_count < 2:
        needed = 2 - existing_count
        available_anchors = random.sample(STEALTH_RECRUITMENT_ANCHORS, k=needed)
        
        # Look for hiring / talent / recruitment paragraphs
        paragraphs = re.findall(r'<p>(.*?)<\/p>', cleaned, flags=re.DOTALL)
        for i, p in enumerate(paragraphs):
            if needed <= 0:
                break
            if any(term in p.lower() for term in ["talent", "hir", "recruit", "staff", "team", "engineer", "growth"]):
                anchor = available_anchors[needed - 1]
                # Replace a word or append organically
                if "talent" in p.lower() and '<a href="https://jobrecruitment.in/' not in p:
                    new_p = re.sub(r'\btalent\b', f'<a href="https://jobrecruitment.in/" target="_blank" rel="noopener">{anchor}</a>', p, count=1, flags=re.IGNORECASE)
                    cleaned = cleaned.replace(f"<p>{p}</p>", f"<p>{new_p}</p>", 1)
                    needed -= 1
                elif "hiring" in p.lower() and '<a href="https://jobrecruitment.in/' not in p:
                    new_p = re.sub(r'\bhiring\b', f'<a href="https://jobrecruitment.in/" target="_blank" rel="noopener">{anchor}</a>', p, count=1, flags=re.IGNORECASE)
                    cleaned = cleaned.replace(f"<p>{p}</p>", f"<p>{new_p}</p>", 1)
                    needed -= 1

    # Fallback injection if still needed
    if cleaned.count("https://jobrecruitment.in") < 2:
        h2_matches = list(re.finditer(r'<h2[^>]*>', cleaned, flags=re.IGNORECASE))
        if len(h2_matches) >= 3:
            insert_pos = h2_matches[2].start()
            inject_p = f'<p>Building scalable growth systems requires leveraging verified <a href="https://jobrecruitment.in/" target="_blank" rel="noopener">specialized recruitment networks</a> and high-velocity talent pipelines.</p>\n'
            cleaned = cleaned[:insert_pos] + inject_p + cleaned[insert_pos:]

    return cleaned

def inject_inline_images(html_content: str, inline_images: list, topic: str) -> str:
    """
    Injects 1 or 2 inline images between H2 sections:
    - 1 image: placed at ~40% scroll (e.g. after H2 section 2)
    - 2 images: Image 1 at ~35% scroll + Image 2 at ~70% scroll (before FAQs)
    """
    if not inline_images:
        return html_content
        
    h2_matches = list(re.finditer(r'<h2[^>]*>', html_content, flags=re.IGNORECASE))
    if len(h2_matches) < 2:
        return html_content
        
    parts = []
    last_idx = 0
    img_idx = 0
    
    # Calculate target H2 indices based on image count
    if len(inline_images) == 1:
        target_positions = [len(h2_matches) // 2]
    else:
        target_positions = [max(1, len(h2_matches) // 3), max(2, (len(h2_matches) * 2) // 3)]

    for idx, match in enumerate(h2_matches):
        if idx in target_positions and img_idx < len(inline_images):
            # Add text up to this H2
            parts.append(html_content[last_idx:match.start()])
            
            # Inject editorial figure
            img_url = inline_images[img_idx]
            caption = f"Strategic execution framework and enterprise operational workflow for {topic}."
            figure_html = f'''
<figure className="my-10 overflow-hidden rounded-3xl border border-[#EDE4D8] bg-[#1f140e] shadow-lg">
  <div className="aspect-[16/9] w-full overflow-hidden">
    <img
      src="{img_url}"
      alt="{topic} - Strategy Framework {img_idx + 1}"
      className="h-full w-full object-cover object-center"
      loading="lazy"
    />
  </div>
  <figcaption className="p-3 text-center text-xs italic text-slate-500 bg-slate-50 border-t border-[#EDE4D8]">
    Figure {img_idx + 1}: {caption}
  </figcaption>
</figure>
'''
            parts.append(figure_html)
            img_idx += 1
            last_idx = match.start()
            
    parts.append(html_content[last_idx:])
    return "".join(parts)
