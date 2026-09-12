import os
import glob
import re
import json
import paramiko

stories = [
    {
        "slug": "ai-agent-workflows-autonomous-operations-startups-2026",
        "title": "AI Agent Workflows and Autonomous Operations for Tech Startups 2026",
        "category": "Startup & Innovation",
        "read_time": "9 min read",
        "summary": "An authoritative strategic blueprint exploring AI Agent Workflows and Autonomous Operations for Tech Startups 2026, covering unit economics, tactical implementation sprints, hiring velocity, and measurable ROI benchmarks.",
        "cover": "/images/guides/ai-agent-workflows-autonomous-operations-startups-2026.jpg",
        "inlines": [
            "/images/guides/ai-agent-workflows-autonomous-operations-startups-2026-inline-1.jpg",
            "/images/guides/ai-agent-workflows-autonomous-operations-startups-2026-inline-2.jpg"
        ]
    },
    {
        "slug": "b2b-abm-high-ticket-lead-scoring-2026",
        "title": "B2B ABM & High-Ticket Lead Scoring Strategy 2026",
        "category": "Marketing Strategy",
        "read_time": "9 min read",
        "summary": "An authoritative strategic blueprint exploring B2B Account-Based Marketing and High-Ticket Lead Scoring 2026, covering unit economics, tactical implementation sprints, hiring velocity, and measurable ROI benchmarks.",
        "cover": "/images/guides/b2b-abm-high-ticket-lead-scoring-2026.jpg",
        "inlines": [
            "/images/guides/b2b-abm-high-ticket-lead-scoring-2026-inline-1.jpg",
            "/images/guides/b2b-abm-high-ticket-lead-scoring-2026-inline-2.jpg"
        ]
    },
    {
        "slug": "2026-seed-pitch-deck-architecture-capital-dynamics",
        "title": "2026 Seed Pitch Deck Architecture: Winning Capital Dynamics",
        "category": "Startup & Innovation",
        "read_time": "9 min read",
        "summary": "An authoritative strategic blueprint exploring Early Stage Pitch Deck Architecture and Seed Capital Dynamics 2026, covering unit economics, tactical implementation sprints, hiring velocity, and measurable ROI benchmarks.",
        "cover": "/images/guides/2026-seed-pitch-deck-architecture-capital-dynamics.jpg",
        "inlines": [
            "/images/guides/2026-seed-pitch-deck-architecture-capital-dynamics-inline-1.jpg",
            "/images/guides/2026-seed-pitch-deck-architecture-capital-dynamics-inline-2.jpg"
        ]
    },
    {
        "slug": "multi-touch-attribution-cac-payback-optimization-2026",
        "title": "Multi-Touch Attribution & CAC Payback Optimization 2026",
        "category": "Marketing Strategy",
        "read_time": "9 min read",
        "summary": "An authoritative strategic blueprint exploring Multi-Touch Attribution and CAC Payback Optimization 2026, covering unit economics, tactical implementation sprints, hiring velocity, and measurable ROI benchmarks.",
        "cover": "/images/guides/multi-touch-attribution-cac-payback-optimization-2026.jpg",
        "inlines": [
            "/images/guides/multi-touch-attribution-cac-payback-optimization-2026-inline-1.jpg",
            "/images/guides/multi-touch-attribution-cac-payback-optimization-2026-inline-2.jpg"
        ]
    }
]

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect("217.21.74.188", port=65002, username="u390470426", password="Prmarketing@10786")

for s in stories:
    cat_slug = "startup-innovation" if s["category"] == "Startup & Innovation" else "marketing-strategy"
    # Get category ID
    cmd_cat = f"mysql -u u390470426_techandcar -p'#T@GIh5Z' u390470426_techandcar -N -e \"SELECT id FROM categories WHERE slug='{cat_slug}' LIMIT 1;\""
    stdin, stdout, stderr = ssh.exec_command(cmd_cat)
    cat_id = stdout.read().decode().strip() or "1"

    # Insert post
    safe_title = s["title"].replace("'", "\\'")
    safe_summary = s["summary"].replace("'", "\\'")
    post_id = s["slug"]

    sql_post = f"""
    INSERT INTO posts (id, type, category_id, title, slug, summary, reading_time, status)
    VALUES ('{post_id}', 'story', {cat_id}, '{safe_title}', '{s["slug"]}', '{safe_summary}', '{s["read_time"]}', 'Published')
    ON DUPLICATE KEY UPDATE title=VALUES(title), summary=VALUES(summary), category_id=VALUES(category_id);
    """
    ssh.exec_command(f"mysql -u u390470426_techandcar -p'#T@GIh5Z' u390470426_techandcar -e \"{sql_post}\"")

    # Insert SEO
    sql_seo = f"""
    INSERT INTO seo_metadata (entity_type, entity_id, meta_title, meta_description, canonical_url, og_title, og_description, og_image)
    VALUES ('post', '{post_id}', '{safe_title} | PR Marketing Ventures', '{safe_summary}', '/startup-stories/{s["slug"]}/', '{safe_title}', '{safe_summary}', '{s["cover"]}')
    ON DUPLICATE KEY UPDATE meta_title=VALUES(meta_title), meta_description=VALUES(meta_description);
    """
    ssh.exec_command(f"mysql -u u390470426_techandcar -p'#T@GIh5Z' u390470426_techandcar -e \"{sql_seo}\"")

print("All 4 live stories populated into Hostinger MySQL database!")
ssh.close()
