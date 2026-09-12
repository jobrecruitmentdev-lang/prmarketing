import sys
import time
import os
import argparse
from config import Config, logger
from modules.sheets import sheets_manager
from modules.serper import search_google
from modules.groq_llm import generate_blog_and_seo
from modules.image import generate_and_save_guide_images
from modules.db_sync import sync_story_to_database
from modules.publish import (
    publish_guide,
    build_and_deploy_to_hostinger,
    submit_to_indexnow
)

def process_single_story_pipeline(topic: str, category: str):
    logger.info("==================================================================")
    logger.info(f"PROCESSING: '{topic}'")
    logger.info(f"CATEGORY:   '{category}'")
    logger.info("==================================================================")

    # Step 1: Live context search
    search_results = search_google(topic)
    logger.info(f"Retrieved {len(search_results)} live search context result(s).")

    # Step 2: Dynamic 8-Pillar Storytelling HTML & Metadata
    gen_data = generate_blog_and_seo(topic, search_results, category_hint=category)
    
    title = gen_data["title"]
    slug = gen_data["slug"]
    summary = gen_data["summary"]
    tag = gen_data["tag"]
    read_time = gen_data["read_time"]
    html_content = gen_data["html"]
    faqs = gen_data["faqs"]

    # Step 3: Anti-Duplicate 4K Ultra-HD Visual Suite
    images_data = generate_and_save_guide_images(topic, slug)

    # Step 4: Sync to Enterprise MySQL Database (Multiple Sections, FAQs, Media, SEO)
    sync_story_to_database(
        slug=slug,
        title=title,
        summary=summary,
        tag=tag,
        read_time=read_time,
        html_content=html_content,
        faqs=faqs,
        images_data=images_data
    )

    # Step 5: Write TSX, Register in Hub with Category, and Sitemap (defer build to end)
    publish_res = publish_guide(
        slug=slug,
        title=title,
        summary=summary,
        tag=tag,
        read_time=read_time,
        html_content=html_content,
        faqs=faqs,
        images_data=images_data,
        category=category,
        skip_deploy=True
    )

    live_url = f"{Config.SITE_URL}/startup-stories/{slug}/"
    return {
        "title": title,
        "slug": slug,
        "category": category,
        "live_url": live_url,
        "success": True
    }

def main():
    parser = argparse.ArgumentParser(description="PR Marketing Ventures — Dual Topic Publisher (1 Startup + 1 Marketing Strategy)")
    parser.add_argument("startup_topic", nargs="?", default=None, help="Startup & Innovation topic")
    parser.add_argument("marketing_topic", nargs="?", default=None, help="Marketing Strategy topic")
    args = parser.parse_args()

    print("\n==================================================================")
    print("  PR MARKETING VENTURES — DUAL TOPIC PUBLISHER                    ")
    print("  [1 Startup & Innovation + 1 Marketing Strategy]                 ")
    print("==================================================================\n")

    startup_item = None
    marketing_item = None

    # If topics not supplied via CLI arguments, pick fresh pending items from queue
    if not args.startup_topic or not args.marketing_topic:
        logger.info("Picking fresh pending topics from non-repeating queue...")
        queue_items = sheets_manager.get_pending_topics(limit=20)
        
        for item in queue_items:
            cat = item.get("category", "").lower()
            top = item.get("topic", "")
            if not startup_item and ("startup" in cat or "innovation" in cat or "ai" in top.lower() or "venture" in top.lower() or "tech" in top.lower()):
                startup_item = item
            elif not marketing_item and ("strategy" in cat or "marketing" in cat or "cro" in top.lower() or "b2b" in top.lower() or "d2c" in top.lower() or "growth" in top.lower() or "cmo" in top.lower()):
                marketing_item = item

    startup_topic = args.startup_topic or (startup_item["topic"] if startup_item else "AI Agent Workflows and Autonomous Operations for Tech Startups 2026")
    marketing_topic = args.marketing_topic or (marketing_item["topic"] if marketing_item else "B2B Account-Based Marketing and High-Ticket Lead Scoring 2026")

    print(f"1. STARTUP & INNOVATION TOPIC:\n   -> '{startup_topic}'\n")
    print(f"2. MARKETING STRATEGY TOPIC:\n   -> '{marketing_topic}'\n")

    stories_to_publish = [
        {"topic": startup_topic, "category": "Startup & Innovation", "queue_item": startup_item},
        {"topic": marketing_topic, "category": "Marketing Strategy", "queue_item": marketing_item}
    ]

    published_results = []
    
    for idx, story in enumerate(stories_to_publish, start=1):
        print(f"\n>>> [{idx}/2] Generating Story for: '{story['topic']}' ({story['category']})...")
        res = process_single_story_pipeline(topic=story["topic"], category=story["category"])
        published_results.append(res)

        # Mark topic as published in queue
        q_item = story.get("queue_item")
        if q_item:
            sheets_manager.update_published_status(
                row_idx=q_item.get("row"),
                published_url=res["live_url"],
                source=q_item.get("source", "file"),
                raw_line=q_item.get("raw_line")
            )

        if idx < len(stories_to_publish):
            time.sleep(2)

    # Compile static export & deploy BOTH stories to Hostinger once!
    print("\n==================================================================")
    print("  COMPILING STATIC EXPORT & DEPLOYING BOTH STORIES TO HOSTINGER...")
    print("==================================================================")
    
    deploy_ok = build_and_deploy_to_hostinger()
    
    if deploy_ok:
        urls = [r["live_url"] for r in published_results]
        urls.append(f"{Config.SITE_URL}/startup-stories/")
        submit_to_indexnow(urls)
        print("\n==================================================================")
        print("  [SUCCESS] BOTH STORIES ARE NOW LIVE ON HOSTINGER:")
        for r in published_results:
            print(f"  [{r['category'].upper()}]")
            print(f"  Title: {r['title']}")
            print(f"  URL:   {r['live_url']}\n")
        print(f"  HUB URL: https://prmarketingventures.com/startup-stories/")
        print("==================================================================\n")
    else:
        print("\n[ERROR] Deployment failed. Check build logs above.\n")

if __name__ == "__main__":
    main()
