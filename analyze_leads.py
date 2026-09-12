import pandas as pd

csv_file = r"C:\hk\prmarketing\master_leads_clean.csv"
df = pd.read_csv(csv_file)

total_leads = len(df)
ghosts = 0
crashed = 0
outdated = 0
live_but_poor_seo = 0

for summary in df['Tech Audit Summary'].fillna(''):
    summary = str(summary).lower()
    if "no dedicated website" in summary or "blocked/empty" in summary:
        ghosts += 1
    elif "status: 000" in summary or "status: 404" in summary or "status: 500" in summary or "timeout" in summary or "crashed" in summary or "failed" in summary:
        crashed += 1
    elif "keywords" in summary:
        outdated += 1
    elif "status: 200" in summary or "status: 301" in summary or "status: 302" in summary:
        live_but_poor_seo += 1

print("--- LEAD ANALYSIS ---")
print(f"Total Leads: {total_leads}")
print(f"Digital Ghosts (No Site / Local/FB Only): {ghosts}")
print(f"Crashed/Dead Servers: {crashed}")
print(f"Outdated SEO (Meta Keywords): {outdated}")
print(f"Live but Poor/Medium SEO: {live_but_poor_seo}")
