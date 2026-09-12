import os
import re
import glob
import json
from modules.formatter import split_long_paragraphs

base_dir = r"c:\hk\prmarketing\website\app\startup-stories"

new_prose_class = 'className="prose prose-slate max-w-none text-slate-700 [&_h2]:pt-14 [&_h2]:mt-16 [&_h2]:mb-6 [&_h2]:border-t [&_h2]:border-slate-200/80 [&_h2]:font-heading [&_h2]:text-2xl sm:[&_h2]:text-3xl [&_h2]:font-black [&_h2]:tracking-tight [&_h2]:text-ink [&_h3]:mt-10 [&_h3]:mb-4 [&_h3]:font-heading [&_h3]:text-xl sm:[&_h3]:text-2xl [&_h3]:font-black [&_h3]:text-slate-900 [&_p]:text-[17px] sm:[&_p]:text-[19px] [&_p]:leading-[2.0] [&_p]:mb-8 [&_p]:text-slate-700 [&_ul]:my-8 [&_ul]:space-y-4 [&_ul]:pl-6 [&_ul]:list-disc [&_ol]:my-8 [&_ol]:space-y-4 [&_ol]:pl-6 [&_ol]:list-decimal [&_li]:text-[17px] sm:[&_li]:text-[18px] [&_li]:leading-[1.9] [&_li]:text-slate-700 [&_blockquote]:my-10 [&_blockquote]:p-8 [&_blockquote]:bg-primary-soft/40 [&_blockquote]:rounded-2xl [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:italic [&_blockquote]:text-slate-800 [&_table]:w-full [&_table]:my-12 [&_table]:rounded-2xl [&_table]:overflow-hidden [&_table]:border [&_table]:border-slate-200/80 [&_table]:shadow-sm [&_th]:bg-[#1f140e] [&_th]:text-[#d4af37] [&_th]:p-4 [&_th]:text-left [&_th]:font-black [&_th]:text-sm [&_td]:p-4 [&_td]:border-t [&_td]:border-slate-200/80 [&_td]:text-sm [&_td]:text-slate-700 [&_tr:nth-child(even)]:bg-slate-50/60 [&_a]:text-primary [&_a]:font-bold [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-accent-dark"'

for p in glob.glob(os.path.join(base_dir, "*", "page.tsx")):
    print("Upgrading story page:", p)
    with open(p, "r", encoding="utf-8") as f:
        code = f.read()

    # Extract JSON inside dangerouslySetInnerHTML={{ __html: ... }}
    html_match = re.search(r'dangerouslySetInnerHTML=\{\{\s*__html:\s*(".*"|safe_html_json)\s*\}\}', code, flags=re.DOTALL)
    if html_match:
        raw_val = html_match.group(1).strip()
        if raw_val.startswith('"'):
            try:
                raw_html = json.loads(raw_val)
                # Split dense paragraphs into 2-sentence bite-sized blocks & strip outer article/div tags
                formatted_html = split_long_paragraphs(raw_html, max_sentences=2)
                new_json_val = json.dumps(formatted_html)
                code = code[:html_match.start(1)] + new_json_val + code[html_match.end(1):]
            except Exception as e:
                print(f"JSON error in {p}: {e}")

    # Replace prose className
    code = re.sub(r'className="prose prose-slate max-w-none text-slate-700[^"]*"', new_prose_class, code)

    with open(p, "w", encoding="utf-8") as f:
        f.write(code)

print("All 4 story pages updated with Descendant Ultra-Bold classes & 2-sentence paragraph breaks!")
