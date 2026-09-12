import time
import uuid
import json
import os
import sys
import argparse
from config import Config, logger
from modules.sheets import sheets_manager
from modules.serper import search_google
from modules.groq_llm import generate_blog_and_seo, title_to_slug
from modules.image import generate_and_save_guide_images
from modules.publish import publish_guide

def process_single_topic(topic: str, category: str = "Startup & Innovation", row_idx: int = None, **kwargs):
    logger.info("==================================================================")
    logger.info(f"PROCESSING TOPIC: '{topic}' | Category: '{category}' (Row: {row_idx})")
    logger.info("==================================================================")

    try:
        # Step A: Search for fresh context & background intelligence
        search_results = search_google(topic)
        logger.info(f"Retrieved {len(search_results)} live search context result(s).")

        # Step B: Generate Dynamic 8-Pillar Storytelling Blueprint HTML & SEO Metadata
        generated_data = generate_blog_and_seo(topic, search_results, category_hint=category)
        
        title = generated_data["title"]
        slug = generated_data["slug"]
        summary = generated_data["summary"]
        tag = generated_data["tag"]
        read_time = generated_data["read_time"]
        html_content = generated_data["html"]
        faqs = generated_data["faqs"]

        logger.info(f"Story Title: '{title}'")
        logger.info(f"Story Slug:  '{slug}'")
        logger.info(f"Total Words: {len(html_content.split())} words | FAQs: {len(faqs)}")

        # Step C: Generate HD Startup & Innovation Visual Suite (Strict 2 to 3 Images Total)
        images_data = generate_and_save_guide_images(topic, slug)
        logger.info(f"Visual suite generated: Cover={images_data['cover']}, Inlines={len(images_data['inlines'])}")

        # Step D: Next.js Static Page Creation, Sitemap & Hub Registration, Build & Hostinger Deployment
        publish_result = publish_guide(
            slug=slug,
            title=title,
            summary=summary,
            tag=tag,
            read_time=read_time,
            html_content=html_content,
            faqs=faqs,
            images_data=images_data
        )

        live_url = publish_result.get("live_url", f"https://prmarketingventures.com/startup-stories/{slug}/")

        # Step E: Update Google Sheet / Queue Row Status
        if row_idx is not None and publish_result.get("success"):
            sheets_manager.update_published_status(
                row_idx=row_idx,
                published_url=live_url,
                source=kwargs.get("source", "sheet"),
                raw_line=kwargs.get("raw_line")
            )

        logger.info("==================================================================")
        logger.info(f"  SUCCESS! Story is Live at: {live_url}")
        logger.info("==================================================================")
        return {"success": True, "url": live_url, "title": title}

    except Exception as e:
        logger.error(f"Error processing topic '{topic}': {e}", exc_info=True)
        return {"success": False, "error": str(e)}

def main():
    parser = argparse.ArgumentParser(description="PR Marketing Ventures — Startup Stories Automation Engine")
    parser.add_argument("topic", nargs="?", default=None, help="Optional single topic to publish via CLI")
    parser.add_argument("--batch", type=int, default=2, help="Number of stories to batch publish from Google Sheet (default: 2)")
    args = parser.parse_args()

    logger.info("==================================================================")
    logger.info("  PR MARKETING VENTURES — HD STARTUP STORIES AUTOMATION ENGINE    ")
    logger.info("==================================================================")

    if args.topic:
        logger.info(f"CLI Mode: Processing topic '{args.topic}'")
        res = process_single_topic(args.topic, category="Startup & Innovation")
        if res.get("success"):
            print(f"\n[OK] Live URL: {res['url']}\n")
        return

    # Batch Google Sheets Mode (Default: 2 stories)
    batch_limit = args.batch
    logger.info(f"Connecting to Google Sheet to fetch next {batch_limit} pending topic(s)...")
    pending_topics = sheets_manager.get_pending_topics(limit=batch_limit)
    
    if not pending_topics:
        logger.info("No pending topics found in Google Sheet. All caught up! Exiting.")
        print("\n[INFO] No pending topics in Google Sheet. All stories are up to date.\n")
        return

    logger.info(f"Starting batch publishing for {len(pending_topics)} topic(s)...")
    results = []
    
    for idx, item in enumerate(pending_topics, start=1):
        topic = item["topic"]
        category = item.get("category", "Startup & Innovation")
        row_idx = item.get("row")
        
        logger.info(f"\n>>> [{idx}/{len(pending_topics)}] Publishing: '{topic}'...")
        res = process_single_topic(
            topic=topic,
            category=category,
            row_idx=row_idx,
            source=item.get("source", "sheet"),
            raw_line=item.get("raw_line")
        )
        results.append(res)
        
        if idx < len(pending_topics) and res.get("success"):
            logger.info("Waiting 5 seconds before next story...")
            time.sleep(5)

    print("\n==================================================================")
    print("  BATCH AUTOMATION SUMMARY:")
    for r in results:
        if r.get("success"):
            print(f"  [LIVE] {r.get('title')}\n         -> {r.get('url')}")
        else:
            print(f"  [FAILED] {r.get('error')}")
    print("==================================================================\n")

if __name__ == "__main__":
    main()
