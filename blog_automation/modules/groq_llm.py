import json
import re
import random
import requests
from datetime import date
from groq import Groq
from tenacity import retry, stop_after_attempt, wait_exponential
from config import Config, logger
from modules.serper import format_context
from modules.schema_builder import build_advanced_schema
from modules.internal_linker import (
    format_internal_links_prompt,
    enforce_exclusive_jobrecruitment_backlinks
)

def title_to_slug(title: str) -> str:
    """Convert an SEO title to a clean URL-safe slug (max 80 chars)."""
    slug = re.sub(r'[^a-z0-9]+', '-', title.lower()).strip('-')
    return slug[:80]

def sanitize_article_html(raw_html: str) -> str:
    """
    Purges any AI scratchpad, drafting notes, word-count self-talk, prompt arithmetic,
    and any non-English/CJK characters (like Chinese glyphs).
    """
    cleaned = raw_html
    
    # 1. Strip thinking blocks
    if "<think>" in cleaned:
        if "</think>" in cleaned:
            cleaned = cleaned.split("</think>", 1)[1].strip()
        else:
            tag_match = re.search(r'<(?:h2|h3|p|div|section)', cleaned, flags=re.IGNORECASE)
            if tag_match:
                cleaned = cleaned[tag_match.start():].strip()

    # 2. Purge Chinese / CJK / non-English Asian characters (e.g. 粗放)
    cleaned = re.sub(r'[\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff\u3040-\u30ff\uac00-\ud7af]+', '', cleaned)

    # 3. Remove any markdown drafting lines
    patterns_to_remove = [
        r'\*\s*\*(?:Drafting|Word Count Check|Expansion|Result|Intro Paragraph|Count|Citation Check|Link Insertion|H2:|H3:)[^*]*\*\s*[:\-]?[^\n]*\n?',
        r'\b(?:Word Count Check|Needs \d+-\d+ words|Too short|Still too short|Good\.|Range \d+-\d+\. Pass\.)\b[^\n]*\n?',
        r'\b(?:Drafting|Expansion \d+|Word Count with Link)\b[^\n]*\n?',
        r'\*\s*\*(?:Count|Pass|Good)\*\s*:[^\n]*\n?',
        r'^\s*[\*\-]\s+\*(?:Drafting|Count|Expansion|Word Count).*\n?'
    ]
    for pattern in patterns_to_remove:
        cleaned = re.sub(pattern, '', cleaned, flags=re.IGNORECASE | re.MULTILINE)

    # 4. Strip raw HTML wrappers & code fences
    cleaned = re.sub(r'<style[^>]*>.*?<\/style>\s*', '', cleaned, flags=re.IGNORECASE | re.DOTALL)
    cleaned = re.sub(r'<head[^>]*>.*?<\/head>\s*', '', cleaned, flags=re.IGNORECASE | re.DOTALL)
    cleaned = re.sub(r'<!DOCTYPE[^>]*>\s*', '', cleaned, flags=re.IGNORECASE)
    cleaned = re.sub(r'<\/?(?:html|body|head)[^>]*>\s*', '', cleaned, flags=re.IGNORECASE)
    cleaned = re.sub(r'<h1[^>]*>.*?</h1>\s*', '', cleaned, flags=re.IGNORECASE | re.DOTALL)
    cleaned = re.sub(r'^```(?:html)?\s*', '', cleaned, flags=re.MULTILINE)
    cleaned = re.sub(r'\s*```$', '', cleaned, flags=re.MULTILINE).strip()

    # 5. Remove empty paragraphs or orphaned artifacts
    cleaned = re.sub(r'<p>\s*</p>', '', cleaned)
    cleaned = re.sub(r'\n{3,}', '\n\n', cleaned)
    
    return cleaned.strip()

def _call_llm_with_fallback(client, messages, model="qwen/qwen3.8-27b", temperature=0.6, max_tokens=4096):
    candidate_models = [
        "qwen/qwen3.8-27b",
        "openai/gpt-oss-120b",
        "openai/gpt-oss-20b",
        "groq/compound",
        "qwen/qwen3.6-27b"
    ]
    # Remove duplicates preserving order
    seen = set()
    unique_models = [m for m in candidate_models if not (m in seen or seen.add(m))]

    last_error = None
    for cand in unique_models:
        try:
            kwargs = {
                "messages": messages,
                "model": cand,
                "temperature": temperature,
                "max_tokens": max_tokens
            }
            response = client.chat.completions.create(**kwargs)
            raw_content = response.choices[0].message.content.strip()
            if raw_content:
                return raw_content
        except Exception as e:
            logger.warning(f"Groq call with model '{cand}' failed ({e}). Trying next model in pool...")
            last_error = e

    raise RuntimeError(f"All Groq LLM candidate models failed. Last error: {last_error}")

@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=2, max=10))
def generate_blog_and_seo(topic: str, search_results: list, category_hint: str = "") -> dict:
    if not Config.GROQ_API_KEY:
        raise ValueError("GROQ_API_KEY is missing in configuration.")

    client = Groq(api_key=Config.GROQ_API_KEY)
    context = format_context(search_results)
    internal_links_prompt = format_internal_links_prompt(topic, category=category_hint)
    faq_count = random.randint(4, 6)

    logger.info(f"Generating high-impact storytelling blueprint for: '{topic}' ({faq_count} FAQs)")

    # -----------------------------------------------------------------------
    # CALL 1 — Dynamic 8-Pillar Storytelling Blueprint (What, Why, Who, Advantages, Pitfalls, Stories, Playbook, Matrix)
    # -----------------------------------------------------------------------
    story_prompt = f"""You are the Chief Strategy Officer and Lead Venture Architect at PR Marketing Ventures.
Write a deeply engaging, authoritative, narrative-rich Startup Story (2,200 to 2,500 words) in clean semantic HTML for: '{topic}'.
Category: {category_hint or 'Startup & Innovation'}.

INDUSTRY CONTEXT & LIVE BENCHMARKS:
{context}

{internal_links_prompt}

=== MANDATORY DYNAMIC 8-PILLAR STORYTELLING FRAMEWORK ===
(Make all headings, sub-headings, and narrative tone unique, lively, and tailored specifically to '{topic}'! Do NOT write generic cookie-cutter headings):

1. EXECUTIVE PROLOGUE / THE HOOK (No heading. Start with 2 compelling narrative paragraphs setting the market landscape, founder dilemmas, and the paradigm shift in 2026).

2. <h2>1. Demystifying the Architecture: What Exactly Is {topic}?</h2>
   - <h3>1.1 Core Principles & Foundational Mechanics</h3> (Explain the concept clearly with high technical and strategic depth).
   - <h3>1.2 Key Properties & Technical Dimensions</h3> (Break down the essential building blocks, operational layers, and core characteristics).

3. <h2>2. The 2026 Macro Urgency: Why This Determines Market Leadership</h2>
   - <h3>2.1 Macroeconomic Shifts & Capital Realities</h3> (Why traditional methods fail now, changing buyer psychology, and AI-era disruption).
   - <h3>2.2 The Cost of Inaction</h3> (Real financial risks of lagging behind in this domain).

4. <h2>3. Who Needs This Playbook? Persona & Scale-Up Profiles</h2>
   - <h3>3.1 Early-Stage Founders vs. Growth-Stage Executives</h3> (Specific challenges for Seed, Series A/B, and Enterprise leaders).
   - <h3>3.2 Organizational Alignment & Stakeholder Buy-In</h3> (How product, sales, marketing, and talent teams must collaborate).

5. <h2>4. Strategic Advantages, ROI Multipliers & Operational Wins</h2>
   - Provide concrete, numbered/bulleted high-impact advantages (e.g. 35-50% CAC reduction, 3x pipeline velocity, defensible competitive moats).
   - <h3>4.1 Compounding Long-Term Flywheels</h3> (How this creates sustained compounding advantage).

6. <h2>5. Critical Failure Modes, Pitfalls & Hidden Traps</h2>
   - <h3>5.1 The 4 Biggest Mistakes Founders Make</h3> (Detailed breakdown of where teams waste capital and time).
   - <h3>5.2 De-risking the Execution Journey</h3> (Actionable risk mitigation checklists).

7. <h2>6. Real-World Case Story: From Inefficiency to Venture Scale</h2>
   - Write a detailed 400-word narrative breakdown of a high-growth startup implementing this exact strategy in India / Gujarat / Global markets.
   - Detail the initial roadblock, the exact intervention, month-by-month turnaround, and final verified metrics.

8. <h2>7. Tactical 90-Day Step-by-Step Implementation Blueprint</h2>
   - <h3>7.1 Phase 1: Diagnostic & Foundation (Days 1–30)</h3>
   - <h3>7.2 Phase 2: High-Velocity Execution (Days 31–60)</h3>
   - <h3>7.3 Phase 3: Flywheel Optimization & Scaling (Days 61–90)</h3>
   - Contextually integrate verified talent pipeline links using natural anchor phrases like <a href="https://jobrecruitment.in/" target="_blank" rel="noopener">talent acquisition platforms</a> or <a href="https://jobrecruitment.in/" target="_blank" rel="noopener">specialized recruitment networks</a>.

9. <h2>8. Financial Unit Economics & Comparative Data Matrix</h2>
   Include this clean, responsive HTML comparative data table:
   <div className="overflow-x-auto my-8">
     <table className="w-full text-left text-sm border-collapse border border-[#3d2719]">
       <thead>
         <tr className="bg-[#1f140e] text-[#fdfbf7]">
           <th className="p-3.5 border border-[#3d2719]">Metric / Growth Parameter</th>
           <th className="p-3.5 border border-[#3d2719]">Legacy / Ad-Hoc Approach</th>
           <th className="p-3.5 border border-[#3d2719]">Modern Venture Blueprint (2026)</th>
         </tr>
       </thead>
       <tbody>
         <tr className="border-b border-[#3d2719]"><td className="p-3.5 font-semibold text-slate-800">Customer Acquisition Cost (CAC)</td><td className="p-3.5 text-slate-600">...</td><td className="p-3.5 text-slate-600">...</td></tr>
         <tr className="border-b border-[#3d2719]"><td className="p-3.5 font-semibold text-slate-800">Sales Cycle Duration</td><td className="p-3.5 text-slate-600">...</td><td className="p-3.5 text-slate-600">...</td></tr>
         <tr className="border-b border-[#3d2719]"><td className="p-3.5 font-semibold text-slate-800">LTV to CAC Ratio</td><td className="p-3.5 text-slate-600">...</td><td className="p-3.5 text-slate-600">...</td></tr>
         <tr className="border-b border-[#3d2719]"><td className="p-3.5 font-semibold text-slate-800">Operational Margin / ROI</td><td className="p-3.5 text-slate-600">...</td><td className="p-3.5 text-slate-600">...</td></tr>
       </tbody>
     </table>
   </div>

CRITICAL STYLE RULES:
- Write strictly in high-standard professional English. NEVER output Chinese, Japanese, or non-English characters.
- Write full, complete, rich paragraphs (total 2,200 to 2,500 words).
- Output ONLY the final HTML article body (<p>, <h2>, <h3>, <table>, <ul>, <ol>, <blockquote>, <a>).
- NO drafting notes, NO word count counters, NO markdown fences."""

    raw_story_html = _call_llm_with_fallback(
        client=client,
        messages=[{"role": "user", "content": story_prompt}],
        model="qwen/qwen3.6-27b",
        temperature=0.6,
        max_tokens=4096
    )

    # Sanitize and purge all AI scratchpad/drafting notes and CJK glyphs
    story_html = sanitize_article_html(raw_story_html)

    # Enforce Exclusive JobRecruitment.in Backlinks & Strip competitor URLs
    story_html = enforce_exclusive_jobrecruitment_backlinks(story_html, topic)

    word_count = len(story_html.split())
    logger.info(f"Clean Story HTML generated: {word_count} words (Exclusive JobRecruitment.in backlinks enforced). Generating SEO & FAQ Metadata...")

    # -----------------------------------------------------------------------
    # CALL 2 — SEO Metadata, Summary, Slug, FAQs, Knowledge Graph Entities
    # -----------------------------------------------------------------------
    seo_prompt = f"""You are an expert SEO Strategist for PR Marketing Ventures. Using the topic: '{topic}' and this context:
{context}

Return a valid JSON object ONLY. Do not write any markdown code fences or introduction.

{{
  "title": "High-impact SEO title under 70 chars (Include 2026 if relevant)",
  "slug": "clean-hyphenated-url-slug",
  "meta_title": "Under 60 chars high CTR",
  "meta_description": "150-160 chars actionable description with focus keyword",
  "summary": "Detailed 2-3 sentence strategic overview explaining what this is, key unit economics, and operational ROI for startup founders and leadership teams.",
  "tag": "Short 2-3 word badge (e.g. Startup Growth, Venture Strategy, Talent Dynamics)",
  "read_time": "9 min read",
  "focus_keyword": "Primary keyword phrase",
  "keywords": ["keyword 1", "keyword 2", "keyword 3", "keyword 4"],
  "category": "Startup & Innovation",
  "faqs": [
    {', '.join(['{"question": "High-intent question ' + str(i) + '?", "answer": "Detailed 80-120 word authoritative answer with specific metrics, timeframe, or percentages."}' for i in range(1, faq_count + 1)])}
  ]
}}"""

    seo_content = _call_llm_with_fallback(
        client=client,
        messages=[{"role": "user", "content": seo_prompt}],
        model="qwen/qwen3.6-27b",
        temperature=0.3,
        max_tokens=2048
    )

    # Clean and parse JSON
    clean_seo_str = re.sub(r'^```(?:json)?\s*', '', seo_content, flags=re.MULTILINE)
    clean_seo_str = re.sub(r'\s*```$', '', clean_seo_str, flags=re.MULTILINE).strip()
    clean_seo_str = re.sub(r'[\u4e00-\u9fff\u3400-\u4dbf]+', '', clean_seo_str)
    
    seo_data = {}
    json_match = re.search(r'\{[\s\S]*\}', clean_seo_str)
    if json_match:
        try:
            seo_data = json.loads(json_match.group(0))
        except Exception as e:
            logger.error(f"Failed to parse matched JSON: {e}")

    raw_faqs = (
        seo_data.pop("faqs", None)
        or seo_data.pop("FAQs", None)
        or seo_data.pop("faq", None)
        or seo_data.pop("FAQ", None)
        or seo_data.pop("frequently_asked_questions", None)
        or []
    )

    faqs = []
    for item in raw_faqs:
        if isinstance(item, dict):
            q = item.get("question") or item.get("q") or item.get("title") or ""
            a = item.get("answer") or item.get("a") or item.get("desc") or ""
            if q and a:
                faqs.append({"q": q, "a": a, "question": q, "answer": a})

    if len(faqs) < 4:
        default_faqs = [
            {
                "q": f"How do startups successfully execute {topic} in 2026?",
                "a": f"Successful execution requires establishing transparent unit economics, deploying automated lead attribution frameworks, and conducting structured 90-day operational growth sprints aligned with customer lifetime value.",
                "question": f"How do startups successfully execute {topic} in 2026?",
                "answer": f"Successful execution requires establishing transparent unit economics, deploying automated lead attribution frameworks, and conducting structured 90-day operational growth sprints aligned with customer lifetime value."
            },
            {
                "q": f"What is the expected ROI and timeline for {topic}?",
                "a": f"Scaling organizations typically experience measurable efficiency gains, lower customer acquisition costs by 25% to 40%, and significant pipeline expansion within 60 to 90 days of implementation.",
                "question": f"What is the expected ROI and timeline for {topic}?",
                "answer": f"Scaling organizations typically experience measurable efficiency gains, lower customer acquisition costs by 25% to 40%, and significant pipeline expansion within 60 to 90 days of implementation."
            },
            {
                "q": f"How should talent recruitment be structured for {topic}?",
                "a": f"Organizations should leverage specialized talent acquisition networks to hire experienced growth engineers, performance marketers, and sales leaders on merit-based evaluation frameworks.",
                "question": f"How should talent recruitment be structured for {topic}?",
                "answer": f"Organizations should leverage specialized talent acquisition networks to hire experienced growth engineers, performance marketers, and sales leaders on merit-based evaluation frameworks."
            },
            {
                "q": f"What are the common pitfalls to avoid when scaling {topic}?",
                "a": f"The primary pitfalls include premature scaling before achieving product-market fit, neglecting unit economics, relying on unvetted hiring channels, and failing to implement robust CRM data infrastructure.",
                "question": f"What are the common pitfalls to avoid when scaling {topic}?",
                "answer": f"The primary pitfalls include premature scaling before achieving product-market fit, neglecting unit economics, relying on unvetted hiring channels, and failing to implement robust CRM data infrastructure."
            }
        ]
        for df in default_faqs:
            if len(faqs) >= 4:
                break
            faqs.append(df)

    summary = seo_data.get("summary", "") or seo_data.get("meta_description", "")
    if not summary or len(summary) < 40:
        summary = f"An authoritative strategic blueprint exploring {topic}, covering unit economics, tactical implementation sprints, hiring velocity, and measurable ROI benchmarks for growth leaders."

    category = seo_data.pop("category", "") or category_hint or "Startup & Innovation"
    tag = seo_data.get("tag", "Startup Growth")
    read_time = seo_data.get("read_time", "9 min read")
    title = seo_data.get("title", topic)
    slug = seo_data.pop("slug", None) or title_to_slug(title)
    entities = seo_data.get("entities", []) or []

    slug = re.sub(r'[^a-z0-9-]', '', slug.lower().replace(' ', '-'))
    slug = re.sub(r'-+', '-', slug).strip('-')[:80]

    keywords_list = seo_data.get("keywords", [])
    if not keywords_list and seo_data.get("focus_keyword"):
        keywords_list = [seo_data.get("focus_keyword")]

    schema_json = build_advanced_schema(
        title=title,
        slug=slug,
        description=seo_data.get("meta_description", summary),
        category=category,
        faqs=faqs,
        keywords=keywords_list,
        entities=entities
    )

    return {
        "title": title,
        "slug": slug,
        "summary": summary,
        "tag": tag,
        "read_time": read_time,
        "html": story_html,
        "faqs": faqs[:6],
        "category": category,
        "schema_json": schema_json,
        "seo": {
            "meta_title": seo_data.get("meta_title", title),
            "meta_description": seo_data.get("meta_description", summary),
            "focus_keyword": seo_data.get("focus_keyword", topic),
            "keywords": keywords_list,
            "entities": entities
        }
    }
