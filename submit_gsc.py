import json
import requests
import xml.etree.ElementTree as ET
from google.oauth2 import service_account
from google.auth.transport.requests import AuthorizedSession

KEY_FILE = r"C:\Users\Dell\Downloads\cosmic-mariner-503804-c4-7af17c1fa5f0.json"
SITEMAP_URL = "https://prmarketingventures.com/sitemap.xml"
ENDPOINT = "https://indexing.googleapis.com/v3/urlNotifications:publish"

def get_urls_from_sitemap(sitemap_url):
    print(f"Fetching sitemap: {sitemap_url}")
    try:
        response = requests.get(sitemap_url, timeout=10)
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

def get_authorized_session():
    credentials = service_account.Credentials.from_service_account_file(
        KEY_FILE, scopes=['https://www.googleapis.com/auth/indexing']
    )
    return AuthorizedSession(credentials)

def submit_to_gsc(session, url):
    payload = {
        "url": url,
        "type": "URL_UPDATED"
    }
    response = session.post(ENDPOINT, json=payload)
    if response.status_code == 200:
        print(f"Success: {url} submitted for indexing.")
    else:
        print(f"Error {response.status_code} for {url}: {response.text}")

if __name__ == "__main__":
    urls = get_urls_from_sitemap(SITEMAP_URL)
    if not urls:
        print("No URLs found. Exiting.")
    else:
        print(f"Found {len(urls)} URLs. Starting GSC submission...")
        try:
            session = get_authorized_session()
            for i, url in enumerate(urls, 1):
                print(f"[{i}/{len(urls)}] Submitting: {url}")
                submit_to_gsc(session, url)
            print(f"Finished! Successfully pushed {len(urls)} URLs to Google Search Console.")
        except Exception as e:
            print(f"Error during authorization or submission: {e}")
