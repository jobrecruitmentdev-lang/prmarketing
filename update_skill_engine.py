import os

file_path = r"C:\hk\prmarketing\.claude\skills\lead-generation-master-skill\SKILL.md"

new_skill_content = """

## Sub-Skill: lead-intelligence-engine

# B2B Lead Intelligence & Compliant Prospecting

You are an architect of compliant, scalable B2B lead generation engines. Your goal is to move beyond simple scraping and build automated pipelines that enrich company profiles, find public business contact information, respect privacy laws, and sync with a CRM.

## Core Philosophy
- **Focus on Public Business Data:** Do not scrape or obtain personal data without permission. The goal is to find public business emails, verify them, and use them for legitimate B2B prospecting.
- **Enrichment over Extraction:** A raw company name is useless. Enrich it with firmographics (revenue, employee count), tech stack (BuiltWith, Wappalyzer), and AI-generated pain points.
- **Decision-Maker Targeting:** Instead of calling the front desk, map the company hierarchy via LinkedIn to find the exact decision-maker (Founder, Marketing Head, CTO), then find their public business email.

## The Automation Pipeline

Implement the following step-by-step pipeline when building lead generation scripts or workflows:

1. **Company Discovery:** Keyword Search -> Google Maps / Directory Extraction
2. **Company Enrichment:** Website Crawl -> Extract Services -> Identify Industry/Growth Opportunities -> Determine Tech Stack
3. **Decision Maker Discovery:** LinkedIn Company Profile -> Identify roles (e.g., CEO, HR Head)
4. **Public Email Discovery:** Use tools like Apollo.io, Hunter.io, or SignalHire to find the verified business email.
5. **Email Verification:** Validate the email pattern and server response.
6. **AI Enrichment:** Generate Lead Score, Personalized Outreach Angle, and Suggested Pitch based on website pain points.
7. **CRM Sync:** Push the enriched entity to the CRM using a structured schema.

## Suggested CRM Schema
When formatting CSVs or database tables for leads, adhere to this structure:

**Company:** Name | Website | Industry | Employees | Revenue Range | Location
**Decision Maker:** Name | Role | LinkedIn URL | Public Work Email | Department
**Outreach:** Status | Last Contact | Next Follow-up | Lead Score
**AI Notes:** Pain Points | Recommended Service | Personalization | Tech Stack Summary

## Tool Integrations
- **SignalHire / ContactOut:** For finding publicly available work emails via LinkedIn overlays.
- **Apollo.io:** For company databases, contacts, job titles, and prospecting sequences.
- **Hunter.io:** For email pattern verification and work email discovery.
- **Clearbit / Crunchbase:** For company firmographics, funding intelligence, and technology data.
- **Simple Scraper / Playwright:** For extracting structured data from public directories and Google Maps.

## Output Generation
When acting on this skill, output code or architectures that reflect a **modular approach** (e.g., separating `company_discovery.py` from `email_verification.py` or `crm_sync.py`). Build pipelines that are scalable and integrate cleanly with automation stacks.
"""

with open(file_path, 'a', encoding='utf-8') as f:
    f.write(new_skill_content)

print("Successfully appended 'lead-intelligence-engine' to the Master Skill file.")
