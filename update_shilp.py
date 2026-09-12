import pandas as pd
from lead_gen_script import audit_website
from parse_new_leads import condense_tech_data

clean_csv = r"C:\hk\prmarketing\master_leads_clean.csv"
url = "https://www.shilpgroup.com/"

print(f"Auditing {url}...")
audit_res = audit_website(url)
tech_summary = condense_tech_data(audit_res)
print(f"Result: {tech_summary}")

print("Updating CSV...")
df = pd.read_csv(clean_csv)

# Find Shilp Skyline
mask = df['Company Name'].str.contains('Shilp Skyline', case=False, na=False)
if mask.any():
    idx = df[mask].index[0]
    
    # Update the tech audit summary
    df.at[idx, 'Tech Audit Summary'] = tech_summary
    
    # If the current pitch angle mentions "digital footprint is missing", update it since they have a site
    current_pitch = df.at[idx, 'Personalized Pitch Angle']
    if "digital footprint is missing" in current_pitch:
        df.at[idx, 'Personalized Pitch Angle'] = "I noticed Shilp Skyline at Adani Shantigram is part of the larger Shilp Group. Your reviews are solid, but we could build dedicated landing pages for specific luxury projects to increase direct high-intent conversions."
        
    df.to_csv(clean_csv, index=False)
    print("CSV updated successfully.")
else:
    print("Could not find Shilp Skyline in the CSV.")
