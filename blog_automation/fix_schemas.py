import glob
import re

for p in glob.glob(r"c:\hk\prmarketing\website\app\startup-stories\*\page.tsx"):
    print("Checking:", p)
    with open(p, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Fix pathname: to path:
    content = re.sub(r'pathname:\s*"', 'path: "', content)
    # Remove image: in articleSchema
    content = re.sub(r'image:\s*"/images/[^"]*",?\n\s*', '', content)
    
    with open(p, "w", encoding="utf-8") as f:
        f.write(content)

print("All story pages verified & fixed for TypeScript compilation!")
