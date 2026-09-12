import pandas as pd

input_csv = r"C:\hk\prmarketing\master_leads_enriched.csv"
output_csv = r"C:\hk\prmarketing\master_leads_clean.csv"

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

def main():
    print("Reading Enriched CSV...")
    df = pd.read_csv(input_csv)
    
    # Create the consolidated column
    df['Tech Audit Summary'] = df.apply(condense_tech_data, axis=1)
    
    # Define the exact columns needed for the actual cold calling view
    calling_columns = [
        "Company Name", 
        "Phone Number", 
        "Niche/Category", 
        "Rating & Reviews", 
        "Personalized Pitch Angle", 
        "Tech Audit Summary",
        "Call Status", 
        "Time", 
        "Comment"
    ]
    
    # Filter to only these columns, keeping existing data
    # We use a list comprehension to ensure we only select columns that actually exist
    available_columns = [col for col in calling_columns if col in df.columns]
    
    clean_df = df[available_columns]
    
    clean_df.to_csv(output_csv, index=False)
    print(f"Cleaned calling sheet saved to {output_csv}")

if __name__ == "__main__":
    main()
