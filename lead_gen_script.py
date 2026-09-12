import pandas as pd
import requests
from bs4 import BeautifulSoup
import time
import subprocess
import warnings
import numpy as np
from duckduckgo_search import DDGS

warnings.filterwarnings("ignore")

# Define file paths
input_csv = r"C:\hk\prmarketing\master_leads_enriched.csv"
output_csv = r"C:\hk\prmarketing\master_leads_enriched.csv"

def get_website_from_ddg(company_name):
    query = f"{company_name} Ahmedabad real estate website"
    try:
        with DDGS() as ddgs:
            results = ddgs.text(query, max_results=3)
            for r in results:
                url = r['href']
                ignore_list = ["justdial.com", "indiamart.com", "facebook.com", "magicbricks.com", "housing.com", "instagram.com", "linkedin.com", "99acres.com", "jdmagicbox.com"]
                if not any(ignored in url.lower() for ignored in ignore_list):
                    return url
    except Exception as e:
        pass
    return ""

def check_website_operations(url):
    if not url or str(url).lower() == 'nan':
        return "N/A", "N/A"
    if not url.startswith('http'):
        url = 'https://' + url
    try:
        cmd = f'curl.exe -o NUL -s -w "%{{http_code}},%{{time_total}}" "{url}"'
        result = subprocess.run(cmd, shell=True, capture_output=True, text=True, timeout=10)
        output = result.stdout.strip()
        if "," in output:
            status_code, time_total = output.split(",")
            return status_code, f"{time_total}s"
        return "Failed", "Timeout/Error"
    except Exception as e:
        return "Failed", "Timeout/Error"

def audit_website(url):
    if not url or str(url).lower() == 'nan':
        return {"Website": "", "Is WordPress": "Unknown", "Meta Title": "", "Meta Description": "", "Topical Authority": "None", "Website Status": "No Website", "HTTP Status": "N/A", "Load Time": "N/A"}
    
    http_status, load_time = check_website_operations(url)
    
    try:
        if not url.startswith('http'):
            url = 'https://' + url
            
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
        res = requests.get(url, headers=headers, timeout=10, verify=False)
        soup = BeautifulSoup(res.text, 'html.parser')
        
        is_wp = "Yes" if "wp-content" in res.text else "No"
        title = soup.title.string.strip() if soup.title and soup.title.string else ""
        meta_desc = soup.find("meta", {"name": "description"})
        desc = meta_desc['content'].strip() if meta_desc and meta_desc.has_attr('content') else ""
        
        status = "Active"
        if not title and not desc:
            status = "Outdated/Poor SEO"
        if http_status != "200" and http_status != "301" and http_status != "302" and http_status != "308":
            status = f"Warning: HTTP {http_status}"
            
        authority = "Low"
        if desc and len(desc) > 50:
            authority = "Medium"
            if is_wp == "Yes":
                authority = "High (Has CMS)"
                
        return {
            "Website": url,
            "Is WordPress": is_wp,
            "Meta Title": title[:60] + "..." if len(title) > 60 else title,
            "Meta Description": desc[:80] + "..." if len(desc) > 80 else desc,
            "Topical Authority": authority,
            "Website Status": status,
            "HTTP Status": http_status,
            "Load Time": load_time
        }
    except Exception as e:
        return {"Website": url, "Is WordPress": "Unknown", "Meta Title": "Error fetching", "Meta Description": "Error", "Topical Authority": "None", "Website Status": "Down/Broken", "HTTP Status": http_status, "Load Time": load_time}

def main():
    print("Reading Master CSV...")
    try:
        df = pd.read_csv(input_csv)
    except Exception as e:
        print("Could not read master CSV.")
        return

    for col in ["HTTP Status", "Load Time", "Website", "Is WordPress", "Meta Title", "Meta Description", "Topical Authority", "Website Status"]:
        if col not in df.columns:
            df[col] = ""
        df[col] = df[col].astype(object)
            
    for index, row in df.iterrows():
        name = str(row['Company Name'])
        url = str(row.get('Website', ''))
        
        if url == '' or url == 'nan' or url == 'None' or url.strip() == '':
            print(f"Searching web for: {name}")
            url = get_website_from_ddg(name)
            if url:
                print(f"  Found URL: {url}")
            else:
                print(f"  No valid URL found.")
            
        if url != '' and url != 'nan' and url != 'None' and url.strip() != '':
            print(f"Auditing Operations & SEO for: {url}")
            audit_res = audit_website(url)
            
            df.at[index, 'Website'] = audit_res['Website']
            df.at[index, 'Is WordPress'] = audit_res['Is WordPress']
            df.at[index, 'Meta Title'] = audit_res['Meta Title']
            df.at[index, 'Meta Description'] = audit_res['Meta Description']
            df.at[index, 'Topical Authority'] = audit_res['Topical Authority']
            df.at[index, 'Website Status'] = audit_res['Website Status']
            df.at[index, 'HTTP Status'] = audit_res['HTTP Status']
            df.at[index, 'Load Time'] = audit_res['Load Time']
        time.sleep(2) # rate limit prevention
        
    df.to_csv(output_csv, index=False)
    print(f"\nOperations check complete. Enriched data updated in {output_csv}")

if __name__ == "__main__":
    main()
