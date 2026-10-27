import os
import sys
import json
import requests
import xml.etree.ElementTree as ET
from google.oauth2 import service_account
from google.auth.transport.requests import AuthorizedSession

# Dual-Key Pool for High-Volume Daily Quota & Failover
KEY_CANDIDATES = [
    os.path.join(os.path.dirname(__file__), "credentials", "google-service-account.json"),
    r"C:\Users\Dell\Downloads\cosmic-mariner-503804-c4-981c45ff145b.json",
]

SITEMAP_URL = "https://prmarketingventures.com/sitemap.xml"
ENDPOINT = "https://indexing.googleapis.com/v3/urlNotifications:publish"

def get_session_from_key(key_path):
    if not os.path.exists(key_path):
        return None, None
    try:
        credentials = service_account.Credentials.from_service_account_file(
            key_path, scopes=['https://www.googleapis.com/auth/indexing']
        )
        session = AuthorizedSession(credentials)
        return session, credentials.service_account_email
    except Exception as e:
        print(f"Warning: Failed to load credentials from {key_path}: {e}")
        return None, None

def get_urls_from_sitemap(sitemap_url):
    print(f"Fetching sitemap: {sitemap_url}")
    try:
        response = requests.get(sitemap_url, timeout=15)
        response.raise_for_status()
    except Exception as e:
        print(f"Failed to fetch sitemap: {e}")
        return []
        
    root = ET.fromstring(response.content)
    namespace = {'ns': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
    urls = []
    
    if 'sitemapindex' in root.tag:
        for sitemap in root.findall('ns:sitemap/ns:loc', namespace):
            urls.extend(get_urls_from_sitemap(sitemap.text))
    else:
        for url in root.findall('ns:url/ns:loc', namespace):
            urls.append(url.text)
            
    return urls

class GscIndexManager:
    def __init__(self):
        self.sessions = []
        for key in KEY_CANDIDATES:
            sess, email = get_session_from_key(key)
            if sess:
                self.sessions.append((sess, email, key))
                
        if not self.sessions:
            raise FileNotFoundError("No valid Google Service Account keys could be authenticated.")
            
        self.active_index = 0

    @property
    def current_session(self):
        return self.sessions[self.active_index][0]

    @property
    def current_email(self):
        return self.sessions[self.active_index][1]

    def switch_to_next_key(self):
        if self.active_index + 1 < len(self.sessions):
            self.active_index += 1
            print(f"\n[Failover] Quota exceeded on previous account. Switched to backup account: {self.current_email}")
            return True
        return False

    def submit_url(self, url, action="URL_UPDATED"):
        payload = {"url": url, "type": action}
        
        while True:
            try:
                response = self.current_session.post(ENDPOINT, json=payload, timeout=15)
                if response.status_code == 200:
                    print(f"  [OK 200] {url}")
                    return True
                elif response.status_code == 429:
                    print(f"  [429 Quota Exceeded on {self.current_email}]")
                    if self.switch_to_next_key():
                        # Retry with next key
                        continue
                    else:
                        print(f"  [ERR 429] All Google accounts exceeded daily publish quota (200/day limit).")
                        return False
                else:
                    print(f"  [ERR {response.status_code}] {url}: {response.text}")
                    return False
            except Exception as e:
                print(f"  [EXCEPTION] {url}: {e}")
                return False

def submit_sitemap_to_gsc(sitemap_url=SITEMAP_URL):
    urls = get_urls_from_sitemap(sitemap_url)
    if not urls:
        print("No URLs found in sitemap.")
        return 0
    
    manager = GscIndexManager()
    print(f"Starting Google Indexing with account: {manager.current_email} (Total available keys: {len(manager.sessions)})")
    print(f"Submitting {len(urls)} URLs...")
    
    success_count = 0
    for i, url in enumerate(urls, 1):
        print(f"[{i}/{len(urls)}]", end=" ")
        if manager.submit_url(url):
            success_count += 1
            
    print(f"\nFinished! Successfully pushed {success_count}/{len(urls)} URLs to Google Search Console.")
    return success_count

if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1].startswith("http"):
        target_url = sys.argv[1]
        manager = GscIndexManager()
        print(f"Using Google Service Account: {manager.current_email}")
        print(f"Submitting single URL: {target_url}")
        manager.submit_url(target_url)
    else:
        submit_sitemap_to_gsc()
