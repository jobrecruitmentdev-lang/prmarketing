import asyncio
from playwright.async_api import async_playwright
import pandas as pd
import subprocess
from bs4 import BeautifulSoup
import re
import time
import os

csv_file = r"C:\hk\prmarketing\master_leads_clean.csv"

async def get_gmb_website(page, company_name):
    # Navigate to Google Maps search
    query = f"{company_name} Ahmedabad"
    url = f"https://www.google.com/maps/search/{query.replace(' ', '+')}"
    
    try:
        await page.goto(url, wait_until="domcontentloaded", timeout=15000)
        # Wait a bit for the panel to load
        await page.wait_for_timeout(3000)
        
        # Look for the website button in the GMB panel. In Google maps, it often has the text "Website" or a specific data-item-id
        # We can look for anchor tags containing the word "Website" or having the globe icon
        website_elements = await page.locator("a:has-text('Website'), a[data-item-id='authority']").all()
        for el in website_elements:
            href = await el.get_attribute("href")
            if href and "google.com" not in href:
                return href
    except Exception as e:
        print(f"Error fetching GMB for {company_name}: {e}")
        pass
    return None

def curl_audit(url):
    try:
        # Run curl to get the HTML content and the status code/time
        # We'll do two curl calls to keep it simple, or one that outputs both to different streams.
        # Let's just use curl to get the HTML, and we can extract meta data.
        
        cmd = f'curl.exe -s -L "{url}"'
        result = subprocess.run(cmd, shell=True, capture_output=True, text=True, timeout=15)
        html = result.stdout
        
        cmd_status = f'curl.exe -o NUL -s -w "%{{http_code}}" "{url}"'
        status_res = subprocess.run(cmd_status, shell=True, capture_output=True, text=True, timeout=10)
        http_status = status_res.stdout.strip()
        
        if not html:
            return f"URL: {url} | Status: {http_status} | SEO: Blocked/Empty"
            
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
        
        return " | ".join(parts)
        
    except Exception as e:
        return f"URL: {url} | Status: Failed | SEO: Timeout"

async def main():
    print("Reading CSV...")
    df = pd.read_csv(csv_file)
    
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context()
        page = await context.new_page()
        
        updated_count = 0
        for index, row in df.iterrows():
            summary = str(row.get('Tech Audit Summary', ''))
            
            # If it's a ghost (No dedicated website found)
            if "No dedicated website found" in summary:
                comp_name = str(row['Company Name'])
                print(f"\nSearching GMB via Playwright for: {comp_name}")
                
                website_url = await get_gmb_website(page, comp_name)
                
                if website_url:
                    print(f"-> Found Website on GMB: {website_url}")
                    print(f"-> Running cURL audit for meta data and keywords...")
                    new_summary = curl_audit(website_url)
                    print(f"-> Result: {new_summary}")
                    
                    df.at[index, 'Tech Audit Summary'] = new_summary
                    
                    # Update pitch angle slightly
                    current_pitch = str(df.at[index, 'Personalized Pitch Angle'])
                    if "digital footprint is missing" in current_pitch:
                        df.at[index, 'Personalized Pitch Angle'] = current_pitch.replace(
                            "your digital footprint is missing",
                            "your website isn't ranking outside of Google Maps"
                        )
                    updated_count += 1
                else:
                    print("-> Still a Ghost. No website on GMB.")
                
        await browser.close()
        
    if updated_count > 0:
        df.to_csv(csv_file, index=False)
        print(f"\nSuccessfully updated {updated_count} ghost leads using Playwright and cURL.")
    else:
        print("\nNo new websites were found via GMB Playwright search.")

if __name__ == "__main__":
    asyncio.run(main())
