import json
import requests
import xml.etree.ElementTree as ET
import time

HOST = "prmarketingventures.com"
KEY = "prmarketing-indexnow-key"
KEY_LOCATION = f"https://{HOST}/{KEY}.txt"
ENDPOINT = "https://api.indexnow.org/indexnow"

def get_urls_from_sitemap(sitemap_url):
    print(f"Fetching sitemap: {sitemap_url}")
    response = requests.get(sitemap_url)
    response.raise_for_status()
    
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

def submit_to_indexnow(url_list):
    if not url_list:
        print("No URLs to submit.")
        return
        
    if len(url_list) > 10000:
        url_list = url_list[:10000]

    payload = {
        "host": HOST,
        "key": KEY,
        "keyLocation": KEY_LOCATION,
        "urlList": url_list
    }
    
    headers = {
        "Content-Type": "application/json; charset=utf-8"
    }
    
    response = requests.post(ENDPOINT, headers=headers, data=json.dumps(payload))
    
    if response.status_code == 200:
        print(f"Success! {len(url_list)} URLs submitted to IndexNow.")
    elif response.status_code == 202:
        print(f"Accepted! URL received. IndexNow key validation pending.")
    else:
        print(f"Error {response.status_code}: {response.text}")

if __name__ == "__main__":
    sitemap_url = "https://prmarketingventures.com/sitemap.xml"
    try:
        urls = get_urls_from_sitemap(sitemap_url)
        print(f"Found {len(urls)} URLs in the sitemap.")
        submit_to_indexnow(urls)
    except Exception as e:
        print(f"An error occurred: {e}")
