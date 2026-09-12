import pandas as pd

csv_file = r"C:\hk\prmarketing\master_leads_clean.csv"
df = pd.read_csv(csv_file)

# Extract rows that actually have a comment
df_with_comments = df[df['Comment'].notna() & (df['Comment'] != '') & (df['Comment'] != 'nan')]

print("--- CALL DISPOSITION & COMMENT ANALYSIS ---\n")
print(f"Total leads with logged comments: {len(df_with_comments)}\n")

categories = {
    "Follow-up / Call Back": [],
    "WhatsApp/Send Details": [],
    "Rejected / Not Interested / In-House": [],
    "Future Lead / Nurture": [],
    "Busy / Network Issues / Unreachable": [],
    "Other": []
}

for index, row in df_with_comments.iterrows():
    company = row['Company Name']
    comment = str(row['Comment']).lower()
    raw_comment = str(row['Comment'])
    
    if "call" in comment and ("pm" in comment or "again" in comment or "vyasta" in comment):
        categories["Follow-up / Call Back"].append((company, raw_comment))
    elif "whatsapp" in comment or "share detail" in comment:
        categories["WhatsApp/Send Details"].append((company, raw_comment))
    elif "not intrested" in comment or "rejcted" in comment or "inhouse" in comment:
        categories["Rejected / Not Interested / In-House"].append((company, raw_comment))
    elif "future lead" in comment:
        categories["Future Lead / Nurture"].append((company, raw_comment))
    elif "busy" in comment or "switch off" in comment or "network issue" in comment or "didnt here" in comment:
        categories["Busy / Network Issues / Unreachable"].append((company, raw_comment))
    else:
        categories["Other"].append((company, raw_comment))

for category, items in categories.items():
    if items:
        print(f"[{category.upper()}] - {len(items)} leads")
        for company, comment in items:
            print(f"  -> {company}: \"{comment}\"")
        print()
