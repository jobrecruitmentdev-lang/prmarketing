import os
import datetime
import gspread
import re
import csv
import json
from config import Config, logger

class GoogleSheetsManager:
    def __init__(self):
        self.scopes = [
            "https://www.googleapis.com/auth/spreadsheets",
            "https://www.googleapis.com/auth/drive"
        ]
        self.client = None
        self.sheet = None
        self.worksheet = None
        self._initialized = False

    def _connect(self):
        if self._initialized:
            return
            
        self._initialized = True
        try:
            cred_file = Config.GOOGLE_CREDENTIALS_FILE
            if not os.path.isabs(cred_file):
                cred_file = os.path.join(os.path.dirname(os.path.dirname(__file__)), cred_file)

            authorized_user_file = os.path.join(
                os.path.dirname(cred_file), "authorized_user.json"
            )

            # Check if Service Account JSON is provided (Best practice, 0 browser popups)
            if os.path.exists(cred_file):
                try:
                    with open(cred_file, "r", encoding="utf-8") as f:
                        data = json.load(f)
                    if "type" in data and data["type"] == "service_account":
                        logger.info("Connecting to Google Sheets via Service Account...")
                        self.client = gspread.service_account(filename=cred_file, scopes=self.scopes)
                        self.sheet = self.client.open_by_key(Config.GOOGLE_SHEET_ID)
                        try:
                            self.worksheet = self.sheet.worksheet("Data")
                        except Exception:
                            self.worksheet = self.sheet.sheet1
                        logger.info(f"Connected to Google Sheet: '{self.sheet.title}'")
                        return
                except Exception as e_sa:
                    logger.debug(f"Service account check note: {e_sa}")

            # Only attempt OAuth if authorized_user.json exists (Prevents broken browser popup)
            if os.path.exists(authorized_user_file):
                logger.info("Connecting to Google Sheets via cached authorized user token...")
                self.client = gspread.oauth(
                    scopes=self.scopes,
                    credentials_filename=cred_file,
                    authorized_user_filename=authorized_user_file
                )
                self.sheet = self.client.open_by_key(Config.GOOGLE_SHEET_ID)
                try:
                    self.worksheet = self.sheet.worksheet("Data")
                except Exception:
                    self.worksheet = self.sheet.sheet1
                logger.info(f"Successfully connected to Google Sheet: '{self.sheet.title}'")
                return

            logger.info("Google OAuth token not found. Using local queue (topics_queue.txt) seamlessly.")
        except Exception as e:
            logger.info(f"Google Sheets connection note: {e}. Falling back to topics_queue.txt.")
            self.client = None
            self.worksheet = None

    def get_pending_topics(self, limit=2):
        self._connect()
        existing_stories_dir = os.path.join(Config.WEBSITE_DIR, "app", "startup-stories")

        # 1. Try Google Worksheet if connected
        if self.worksheet:
            try:
                rows = self.worksheet.get_all_values()
                if rows:
                    pending = []
                    start_row = 2 if len(rows) > 0 and ("topic" in rows[0][0].lower() or "keyword" in rows[0][0].lower()) else 1

                    for row_idx, row in enumerate(rows[start_row - 1:], start=start_row):
                        if not row:
                            continue
                        topic = row[0].strip() if len(row) > 0 else ""
                        category = row[1].strip() if len(row) > 1 else "Startup & Innovation"
                        status = row[3].strip().lower() if len(row) > 3 else ""
                        
                        slug = re.sub(r'[^a-z0-9]+', '-', topic.lower()).strip('-')[:80]
                        already_exists_locally = os.path.exists(os.path.join(existing_stories_dir, slug))

                        if topic and status not in ["published", "done", "live"] and not already_exists_locally:
                            pending.append({
                                "row": row_idx,
                                "topic": topic,
                                "category": category,
                                "status": status,
                                "source": "sheet"
                            })
                            if len(pending) >= limit:
                                break
                        elif already_exists_locally and status != "published":
                            self.update_published_status(row_idx, f"https://prmarketingventures.com/startup-stories/{slug}/")
                                
                    if pending:
                        logger.info(f"Discovered {len(pending)} pending topic(s) from Google Sheet.")
                        return pending
            except Exception as e:
                logger.warning(f"Failed to read from Google Sheet: {e}")

        # 2. Local Queue Fallback (topics_queue.txt)
        queue_file = os.path.join(os.path.dirname(os.path.dirname(__file__)), "topics_queue.txt")
        if os.path.exists(queue_file):
            try:
                with open(queue_file, "r", encoding="utf-8") as f:
                    lines = [l.strip() for l in f.readlines() if l.strip()]
                
                pending = []
                for idx, line in enumerate(lines, start=1):
                    if line.startswith("#") or line.startswith("[PUBLISHED]"):
                        continue
                    
                    if "|" in line:
                        parts = line.split("|", 1)
                        topic = parts[0].strip()
                        category = parts[1].strip()
                    else:
                        topic = line
                        category = "Startup & Innovation"

                    slug = re.sub(r'[^a-z0-9]+', '-', topic.lower()).strip('-')[:80]
                    if not os.path.exists(os.path.join(existing_stories_dir, slug)):
                        pending.append({
                            "row": idx,
                            "topic": topic,
                            "category": category,
                            "status": "pending",
                            "source": "file",
                            "raw_line": line
                        })
                        if len(pending) >= limit:
                            break
                            
                if pending:
                    logger.info(f"Discovered {len(pending)} pending topic(s) from local topics_queue.txt.")
                    return pending
            except Exception as e:
                logger.error(f"Error reading local topics queue: {e}")

        return []

    def update_published_status(self, row_idx: int, published_url: str, source: str = "sheet", raw_line: str = None):
        today_str = datetime.date.today().isoformat()
        
        # 1. Update Google Sheet
        if source == "sheet" and self.worksheet and row_idx:
            try:
                self.worksheet.update_cell(row_idx, 4, "Published")
                self.worksheet.update_cell(row_idx, 5, published_url)
                self.worksheet.update_cell(row_idx, 6, today_str)
                logger.info(f"Updated Google Sheet Row {row_idx}: Status='Published', URL='{published_url}'")
            except Exception as e:
                logger.error(f"Failed to update Google Sheet row {row_idx}: {e}")

        # 2. Update local topics_queue.txt
        queue_file = os.path.join(os.path.dirname(os.path.dirname(__file__)), "topics_queue.txt")
        if os.path.exists(queue_file) and raw_line:
            try:
                with open(queue_file, "r", encoding="utf-8") as f:
                    content = f.read()
                updated_line = f"[PUBLISHED] {raw_line} -> {published_url} ({today_str})"
                content = content.replace(raw_line, updated_line, 1)
                with open(queue_file, "w", encoding="utf-8") as f:
                    f.write(content)
                logger.info(f"Updated local queue: '{raw_line}' marked as published.")
            except Exception as e:
                logger.error(f"Failed to update local queue file: {e}")

sheets_manager = GoogleSheetsManager()
