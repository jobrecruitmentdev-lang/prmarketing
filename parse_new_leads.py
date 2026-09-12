import re
import pandas as pd
from lead_gen_script import audit_website, get_website_from_ddg
import time

raw_file = r"C:\hk\prmarketing\raw_new_leads.txt"
clean_csv = r"C:\hk\prmarketing\master_leads_clean.csv"

def condense_tech_data(row):
    if str(row.get('Website Status', '')) == 'No Website' or str(row.get('Website', '')) in ['nan', '', 'None']:
        return "No dedicated website found."
    parts = []
    if str(row.get('Website', '')) not in ['nan', '']:
        parts.append(f"URL: {row['Website']}")
    if str(row.get('Is WordPress', '')) == 'Yes':
        parts.append("WordPress")
    if str(row.get('HTTP Status', '')) != 'nan' and str(row.get('HTTP Status', '')) != '':
        parts.append(f"Status: {row['HTTP Status']}")
    if str(row.get('Topical Authority', '')) != 'nan':
        parts.append(f"SEO: {row['Topical Authority']}")
    return " | ".join(parts)

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
            current_lead["Company Name"] = line
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

def generate_pitch(lead):
    rating_str = lead.get("Rating & Reviews", "")
    niche = lead.get("Niche/Category", "agency")
    
    # Generic smart pitches based on cold-email best practices
    if "5.0" in rating_str:
        return f"You have a perfect 5.0 rating! People trust you, but without dedicated local SEO, your competitors are stealing your branded traffic. Are you doing any digital PR right now?"
    elif "4." in rating_str:
        return f"I saw your solid reviews online. As a leading {niche}, you have offline authority, but your digital footprint is missing. Are you running any automated review systems to push you to 5.0?"
    else:
        return f"Your business has years of experience but your online presence isn't reflecting it yet. We help established agencies transition into massive digital brands."

def main():
    print("Parsing raw leads...")
    leads_list = parse_leads()
    print(f"Found {len(leads_list)} leads.")
    
    df = pd.read_csv(clean_csv)
    
    # Remove duplicates
    existing_companies = df['Company Name'].str.lower().tolist()
    
    new_rows = []
    for lead in leads_list:
        comp_name = lead.get("Company Name", "").split(" : ")[0].strip()
        comp_name = comp_name.split(" - ")[0].strip()
        
        if comp_name.lower() in existing_companies or not comp_name:
            continue
            
        print(f"\nProcessing {comp_name}...")
        url = get_website_from_ddg(comp_name)
        audit_res = audit_website(url)
        
        tech_summary = condense_tech_data(audit_res)
        pitch = generate_pitch(lead)
        
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
        time.sleep(2)
        
    if new_rows:
        new_df = pd.DataFrame(new_rows)
        df = pd.concat([df, new_df], ignore_index=True)
        df.to_csv(clean_csv, index=False)
        print(f"\nAdded {len(new_rows)} new leads to {clean_csv}")
    else:
        print("No new leads to add (all were duplicates).")

if __name__ == "__main__":
    main()
