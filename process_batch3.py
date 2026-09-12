import asyncio
from playwright.async_api import async_playwright
import pandas as pd
import subprocess
from bs4 import BeautifulSoup
import re
import os

raw_file = r"C:\hk\prmarketing\raw_new_leads_batch3.txt"
csv_file = r"C:\hk\prmarketing\master_leads_clean.csv"

def parse_leads():
    with open(raw_file, 'r', encoding='utf-8') as f:
        lines = [line.strip() for line in f if line.strip()]

    leads = []
    current_lead = {}
    
    for line in lines:
        if "Directions" in line or "Category Finder" in line or "BasicNew Website" in line:
            if current_lead.get("Company Name"):
                leads.append(current_lead)
                current_lead = {}
            continue
            
        if not current_lead.get("Company Name"):
            # Clean up the company name
            name = line.split(" | ")[0].split(" - ")[0].strip()
            current_lead["Company Name"] = name
            continue
            
        rating_match = re.search(r'([\d\.]+)\((\d+)\)\s+(.+)', line)
        if rating_match:
            current_lead["Rating & Reviews"] = f"{rating_match.group(1)} ({rating_match.group(2)})"
            current_lead["Niche/Category"] = rating_match.group(3).strip()
            continue
            
        phone_match = re.search(r'(\d{4,5}[\s\-]?\d{5,6})', line)
        if phone_match and not current_lead.get("Phone Number"):
            current_lead["Phone Number"] = phone_match.group(1)
            
    if current_lead.get("Company Name"):
        leads.append(current_lead)
        
    return leads

async def get_gmb_website(page, company_name):
    query = f"{company_name} Ahmedabad"
    url = f"https://www.google.com/maps/search/{query.replace(' ', '+')}"
    try:
        await page.goto(url, wait_until="domcontentloaded", timeout=15000)
        await page.wait_for_timeout(3000)
        website_elements = await page.locator("a:has-text('Website'), a[data-item-id='authority']").all()
        for el in website_elements:
            href = await el.get_attribute("href")
            if href and "google.com" not in href:
                return href
    except Exception:
        pass
    return None

def curl_audit(url):
    try:
        cmd = f'curl.exe -s -L "{url}"'
        result = subprocess.run(cmd, shell=True, capture_output=True, text=True, timeout=10)
        html = result.stdout
        
        cmd_status = f'curl.exe -o NUL -s -w "%{{http_code}}" "{url}"'
        status_res = subprocess.run(cmd_status, shell=True, capture_output=True, text=True, timeout=10)
        http_status = status_res.stdout.strip()
        
        if not html:
            return f"URL: {url} | Status: {http_status} | SEO: Blocked/Empty", "crashed"
            
        soup = BeautifulSoup(html, 'html.parser')
        is_wp = "WordPress" if "wp-content" in html else ""
        
        meta_desc = soup.find("meta", {"name": "description"})
        desc = meta_desc['content'] if meta_desc and meta_desc.has_attr('content') else ""
        
        meta_keywords = soup.find("meta", {"name": "keywords"})
        keywords = meta_keywords['content'] if meta_keywords and meta_keywords.has_attr('content') else ""
        
        seo_grade = "Low"
        if desc and len(desc) > 50:
            seo_grade = "Medium"
        if keywords:
            seo_grade += " (Has Keywords)"
            
        parts = [f"URL: {url}"]
        if is_wp:
            parts.append(is_wp)
        parts.append(f"Status: {http_status}")
        parts.append(f"SEO: {seo_grade}")
        
        if http_status in ['000', '404', '500'] or not http_status:
            return " | ".join(parts), "crashed"
        elif keywords:
            return " | ".join(parts), "outdated"
        else:
            return " | ".join(parts), "live"
    except Exception:
        return f"URL: {url} | Status: Failed | SEO: Timeout", "crashed"

def generate_dynamic_pitch(lead, tech_state):
    rating = lead.get("Rating & Reviews", "")
    niche = lead.get("Niche/Category", "agency")
    
    if tech_state == "ghost":
        return f"I found you on Google Maps, but you have no dedicated website linked. You are a 'Digital Ghost' relying entirely on directories and losing 100% of your direct branded traffic."
    elif tech_state == "crashed":
        return f"I clicked your website link on Google Maps, but your server crashed. You are actively losing buyers because your site is offline."
    elif tech_state == "outdated":
        return f"I just audited your code. Your website is still injecting 'Meta Keywords', which means your webmaster hasn't updated your SEO architecture since 2009."
    else:
        # Standard fallback for live sites
        if "5.0" in rating:
            return f"You have a perfect 5.0 rating! People trust you, but without dedicated local SEO, your competitors are stealing your branded traffic. Are you doing any digital PR right now?"
        else:
            return f"I saw your solid reviews online. As a leading {niche}, you have offline authority, but your digital footprint is missing. Are you running any automated review systems to push you to 5.0?"

async def main():
    print("Parsing Batch 3 leads...")
    leads_list = parse_leads()
    print(f"Found {len(leads_list)} leads to process.")
    
    df = pd.read_csv(csv_file)
    existing_companies = df['Company Name'].str.lower().tolist()
    
    new_rows = []
    
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context()
        page = await context.new_page()
        
        for lead in leads_list:
            comp_name = lead["Company Name"]
            if comp_name.lower() in existing_companies or not comp_name:
                continue
                
            print(f"\nProcessing: {comp_name}")
            website_url = await get_gmb_website(page, comp_name)
            
            tech_state = "ghost"
            tech_summary = "No dedicated website found."
            
            if website_url:
                print(f"-> Found website: {website_url}")
                tech_summary, tech_state = curl_audit(website_url)
                print(f"-> Audit: {tech_summary}")
            else:
                print("-> No website found (Ghost)")
                
            pitch = generate_dynamic_pitch(lead, tech_state)
            
            row = {
                "Company Name": comp_name,
                "Phone Number": lead.get("Phone Number", ""),
                "Niche/Category": lead.get("Niche/Category", ""),
                "Rating & Reviews": lead.get("Rating & Reviews", ""),
                "Personalized Pitch Angle": pitch,
                "Tech Audit Summary": tech_summary,
                "Call Status": "",
                "Time": "",
                "Comment": ""
            }
            new_rows.append(row)
            
        await browser.close()
        
    if new_rows:
        new_df = pd.DataFrame(new_rows)
        df = pd.concat([df, new_df], ignore_index=True)
        df.to_csv(csv_file, index=False)
        print(f"\nSuccessfully added {len(new_rows)} new leads to {csv_file}")
    else:
        print("\nNo new leads to add (all were duplicates).")

if __name__ == "__main__":
    asyncio.run(main())
