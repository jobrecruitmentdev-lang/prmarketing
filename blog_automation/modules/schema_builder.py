import json
import re
from datetime import date
from config import Config

def build_advanced_schema(
    title: str,
    slug: str,
    description: str,
    category: str,
    faqs: list,
    keywords: list,
    entities: list = None,
    date_published: str = None
) -> str:
    """
    Builds an advanced AEO/GEO semantic JSON-LD schema graph for PR Marketing Ventures guides.
    Creates a cross-linked Schema Web connecting Organization (B-903 Fairdeal House),
    WebSite, WebPage (Speakable), Article (with Wikidata entities for about & mentions),
    Breadcrumbs, and FAQPage.
    """
    if not date_published:
        date_published = date.today().isoformat()
        
    site_url = "https://prmarketingventures.com"
    page_url = f"{site_url}/guides/{slug}/"
    
    # Central Entity IDs
    org_id = f"{site_url}/#organization"
    website_id = f"{site_url}/#website"
    webpage_id = f"{page_url}#webpage"
    article_id = f"{page_url}#article"
    
    # Process About & Mentions entities (Wikidata / Wikipedia / Named Entities)
    about_nodes = []
    mention_nodes = []
    
    if entities and isinstance(entities, list):
        for i, ent in enumerate(entities):
            if not isinstance(ent, dict):
                continue
            name = ent.get("name")
            same_as = ent.get("sameAs") or ent.get("same_as") or ent.get("wikidata_url")
            if not name:
                continue
            node = {
                "@type": "Thing",
                "name": name
            }
            if same_as:
                node["sameAs"] = same_as
                
            if i < 2:
                about_nodes.append(node)
            else:
                mention_nodes.append(node)
                
    if not about_nodes:
        about_nodes.append({
            "@type": "Thing",
            "name": category or "Marketing Strategy & Startup Innovation"
        })
        
    graph = [
        # 1. Organization (Strictly B-903 Fairdeal House)
        {
            "@type": "Organization",
            "@id": org_id,
            "name": "PR Marketing Ventures",
            "url": site_url,
            "logo": f"{site_url}/logo.png",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "B-903, Fairdeal House, Chimanlal Girdharlal Road (C.G. Road), Near Swastik Cross Road, Navrangpura",
                "addressLocality": "Ahmedabad",
                "addressRegion": "Gujarat",
                "postalCode": "380009",
                "addressCountry": "IN"
            },
            "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+918160666408",
                "contactType": "customer support",
                "areaServed": "IN"
            },
            "sameAs": [
                "https://prmarketingventures.com"
            ]
        },
        # 2. Editorial Author
        {
            "@type": "Organization",
            "@id": f"{site_url}/#editorial",
            "name": "PR Marketing Ventures Editorial Team",
            "url": f"{site_url}/about/"
        },
        # 3. WebSite
        {
            "@type": "WebSite",
            "@id": website_id,
            "url": site_url,
            "name": "PR Marketing Ventures",
            "publisher": {"@id": org_id}
        },
        # 4. WebPage with AEO Speakable Specification
        {
            "@type": "WebPage",
            "@id": webpage_id,
            "url": page_url,
            "name": title,
            "description": description,
            "isPartOf": {"@id": website_id},
            "about": about_nodes[0],
            "speakable": {
                "@type": "SpeakableSpecification",
                "cssSelector": [".key-takeaways", ".article-summary", "article h2", ".faq-answer"]
            }
        },
        # 5. Article with E-E-A-T & Knowledge Graph Links
        {
            "@type": "Article",
            "@id": article_id,
            "isPartOf": {"@id": webpage_id},
            "mainEntityOfPage": {"@id": webpage_id},
            "headline": title,
            "description": description,
            "datePublished": date_published,
            "dateModified": date_published,
            "author": {"@id": f"{site_url}/#editorial"},
            "publisher": {"@id": org_id},
            "keywords": keywords,
            "articleSection": category or "Startup & Marketing Strategy",
            "about": about_nodes,
            "mentions": mention_nodes
        },
        # 6. BreadcrumbList
        {
            "@type": "BreadcrumbList",
            "@id": f"{page_url}#breadcrumb",
            "itemListElement": [
                {"@type": "ListItem", "position": 1, "name": "Home", "item": site_url},
                {"@type": "ListItem", "position": 2, "name": "Guides", "item": f"{site_url}/guides/"},
                {"@type": "ListItem", "position": 3, "name": title, "item": page_url}
            ]
        }
    ]
    
    # 7. FAQPage (if faqs exist)
    if faqs and len(faqs) > 0:
        faq_items = []
        for faq in faqs:
            q = faq.get("question") or faq.get("q", "")
            a = faq.get("answer") or faq.get("a", "")
            if q and a:
                faq_items.append({
                    "@type": "Question",
                    "name": q,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": a
                    }
                })
        
        if faq_items:
            graph.append({
                "@type": "FAQPage",
                "@id": f"{page_url}#faq",
                "mainEntity": faq_items,
                "isPartOf": {"@id": webpage_id}
            })

    schema = {
        "@context": "https://schema.org",
        "@graph": graph
    }
    
    return json.dumps(schema, ensure_ascii=False)
