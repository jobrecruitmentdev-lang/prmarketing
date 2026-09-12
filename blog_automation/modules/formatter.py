import re

def auto_detect_and_format_headings(html_content: str) -> str:
    """
    Finds any unformatted numbered or named headings/subheadings and converts 
    them into semantically rich <h2> and <h3> tags.
    """
    # 1. Convert <p>1.1 Something</p> or <p><b>1.1 Something</b></p> to <h3>1.1 Something</h3>
    html_content = re.sub(
        r'<p>\s*(?:<b>|<strong>)?\s*(\d+\.\d+\s+[^<]+?)(?:</b>|</strong>)?\s*</p>',
        r'<h3>\1</h3>',
        html_content,
        flags=re.IGNORECASE
    )
    
    # 2. Convert <p>Phase 1: Something</p> or <p>Phase 2: Something</p> to <h3>
    html_content = re.sub(
        r'<p>\s*(?:<b>|<strong>)?\s*(Phase\s+\d+:\s+[^<]+?)(?:</b>|</strong>)?\s*</p>',
        r'<h3>\1</h3>',
        html_content,
        flags=re.IGNORECASE
    )

    # 3. Convert <p>1. Demystifying...</p> to <h2>
    def to_h2(match):
        text = match.group(1).strip()
        if len(text) < 140 and not text.endswith('.'):
            return f'<h2>{text}</h2>'
        return match.group(0)

    html_content = re.sub(
        r'<p>\s*(?:<b>|<strong>)?\s*(\d+\.\s+[A-Z][^<]+?)(?:</b>|</strong>)?\s*</p>',
        to_h2,
        html_content,
        flags=re.IGNORECASE
    )

    # 4. Handle standalone lines like `1.1 ...` or `1. ...` that might not be wrapped in tags
    html_content = re.sub(
        r'(?m)^(\d+\.\d+\s+[A-Za-z0-9\s:—–\(\)&/,-]+)$',
        r'<h3>\1</h3>',
        html_content
    )

    return html_content

def split_long_paragraphs(html_content: str, max_sentences: int = 2) -> str:
    """
    Intelligently splits dense monolithic <p> blocks into short, bite-sized 
    2-sentence paragraphs at full stops (. / ! / ?), creating generous 
    whitespace and zero visual clutter.
    """
    # First auto-format any plain text headings into h2 / h3
    html_content = auto_detect_and_format_headings(html_content)

    def split_p(match):
        inner = match.group(1).strip()
        if not inner or inner.startswith("<figure") or inner.startswith("<table") or inner.startswith("<ul") or inner.startswith("<ol"):
            return match.group(0)

        # If it's a heading inside <p>, convert to heading
        if re.match(r'^\d+\.\d+\s+', inner):
            return f"<h3>{inner}</h3>"
        if re.match(r'^\d+\.\s+[A-Z]', inner) and len(inner) < 140 and not inner.endswith('.'):
            return f"<h2>{inner}</h2>"

        # Split sentences while respecting acronyms and HTML links
        sentences = re.split(r'(?<=[.!?])\s+(?=[A-Z0-9<"“])', inner)
        
        if len(sentences) <= max_sentences:
            return f"<p>{inner}</p>"

        # Group sentences into max_sentences chunks
        chunks = []
        current_chunk = []
        for s in sentences:
            current_chunk.append(s)
            if len(current_chunk) >= max_sentences:
                chunks.append(" ".join(current_chunk))
                current_chunk = []
        if current_chunk:
            chunks.append(" ".join(current_chunk))

        return "\n\n".join(f"<p>{c.strip()}</p>" for c in chunks if c.strip())

    # Replace all <p>...</p> tags
    processed = re.sub(r'<p>(.*?)</p>', split_p, html_content, flags=re.DOTALL | re.IGNORECASE)
    
    # Strip any accidental nested wrappers or outer article tags
    processed = re.sub(r'</?article[^>]*>', '', processed, flags=re.IGNORECASE)
    processed = re.sub(r'^\s*<div[^>]*class=["\'][^"\']*max-w-[^"\']*["\'][^>]*>', '', processed.strip(), flags=re.IGNORECASE)
    processed = re.sub(r'</div>\s*$', '', processed.strip(), flags=re.IGNORECASE)
    processed = re.sub(r'\n{3,}', '\n\n', processed)
    
    return processed.strip()
