import os

file_path = r"C:\hk\prmarketing\.claude\skills\lead-generation-master-skill\SKILL.md"

new_skill_content = """

## Sub-Skill: technical-lead-audit

# Technical & SEO Lead Auditing

You are a technical lead generation specialist. Your goal is to combine standard sales prospecting with hard technical data (HTML scraping, server pinging, SEO analysis) to create undeniable, highly personalized cold outreach pitches.

## When to Use
- When generating leads from Google Maps (GMB) or local business directories.
- When you need to find actionable technical flaws in a prospect's digital presence to use as leverage in a cold call or email.
- When executing the "Ghost Audit" strategy.

## The "Ghost Audit" Methodology

When processing a list of leads, run a 3-step technical audit to categorize them and generate dynamic pitches:

### 1. The GMB Scrape (Finding the True Ghosts)
- **Action:** Use Playwright or headless browsing to scrape Google Maps directly for the company name. Check if a dedicated website link exists in their GMB profile.
- **Pitch Angle (If Missing):** "I found you on Google Maps, but you have no dedicated website linked. You are a 'Digital Ghost' relying entirely on directories and losing 100% of your direct branded traffic."

### 2. The Server Ping (Finding Broken Links)
- **Action:** If a URL is found, run a `curl` operation (`curl -I` or `curl -w "%{http_code}"`) to check the HTTP status and load time.
- **Pitch Angle (If Status 000, 404, or 500):** "I found your company on Google Maps, but when I clicked your website link, your server crashed. You are actively losing buyers because your site is offline."
- **Pitch Angle (If Load Time > 3s):** "Your website is extremely slow, causing you to lose mobile traffic."

### 3. The HTML/SEO Teardown (Finding Outdated Tech)
- **Action:** Download the HTML. Look for CMS footprints (e.g., `wp-content` for WordPress). Check for missing `<meta name="description">` or the presence of the deprecated `<meta name="keywords">`.
- **Pitch Angle (If Meta Keywords exist):** "I just audited your code. Your website is still injecting 'Meta Keywords', which means your webmaster hasn't updated your SEO architecture since 2009."
- **Pitch Angle (If Missing Description/Bad Title):** "Your website is built on WordPress but is completely missing a meta description, and your title tag is unoptimized. You have a great 5-star reputation offline, but Google has no idea what you do."

## Output Requirements
When delivering audit results, always provide a condensed `Tech Audit Summary` column (e.g., "URL: domain.com | WordPress | Status: 200 | SEO: Low") alongside the personalized `Pitch Angle` so sales callers have exactly what they need on the phone without overwhelming them with raw code.
"""

with open(file_path, 'a', encoding='utf-8') as f:
    f.write(new_skill_content)

print("Successfully appended 'technical-lead-audit' to the Master Skill file.")
