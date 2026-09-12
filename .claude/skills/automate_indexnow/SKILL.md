---
name: automate-indexnow
description: A guide and script to automate URL submissions to search engines (Bing, Yandex, etc.) using the IndexNow protocol.
---

# Automating URL Submissions with IndexNow

IndexNow is a simple protocol that allows you to instantly inform participating search engines (like Bing, Yandex, Seznam.cz, and Naver) about the latest content changes on your website. When you submit URLs via IndexNow, it acts as a "ping" telling search engines that a URL has been added, updated, or deleted, so they can quickly reflect this in their search results.

Because participating search engines automatically share IndexNow submissions with each other, you only need to submit your URLs to one endpoint (e.g., `api.indexnow.org` or `bing.com`).

Here is the step-by-step guide to building your own IndexNow automation.

---

## Step 1: Generate and Host your API Key

Unlike Google Search Console, IndexNow uses a simple text file for verification. 

1. **Generate a Key:** Create a random string of characters (minimum 8, maximum 128 characters). It can contain uppercase letters, lowercase letters, numbers, and dashes. 
   *(Example: `my-super-secret-indexnow-key-123`)*

2. **Create the Key File:** Create a UTF-8 encoded text file named exactly like your key, with a `.txt` extension. Inside the file, paste the key itself.
   *(Example: File name `my-super-secret-indexnow-key-123.txt`, containing the text `my-super-secret-indexnow-key-123`)*

3. **Host the File:** Upload this text file to the root directory of your website so it is accessible publicly.
   *(Example: `https://www.yourdomain.com/my-super-secret-indexnow-key-123.txt`)*

---

## Step 2: Build the Automation Logic (Python Example)

A standard automation workflow usually looks like this:

1. Parse your website's XML sitemap to find your URLs.
2. Filter the URLs (if needed).
3. Send up to 10,000 URLs to the IndexNow API in a single POST request.

**Prerequisites:**

```bash
pip install requests
```

**The Python Script:**

```python
import json
import requests

# 1. Configuration
HOST = "www.yourdomain.com" # Just the domain, no https://
KEY = "my-super-secret-indexnow-key-123" # The key you generated in Step 1
KEY_LOCATION = f"https://{HOST}/{KEY}.txt" # Where you hosted the text file

# You can use api.indexnow.org, www.bing.com, etc. They all share the data.
ENDPOINT = "https://api.indexnow.org/indexnow" 

def submit_to_indexnow(url_list):
    """
    Submits a batch of up to 10,000 URLs to the IndexNow protocol.
    """
    if not url_list:
        print("No URLs to submit.")
        return
        
    if len(url_list) > 10000:
        print("Warning: IndexNow accepts a maximum of 10,000 URLs per POST request.")
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

# Example usage
if __name__ == "__main__":
    urls_to_submit = [
        "https://www.yourdomain.com/new-blog-post",
        "https://www.yourdomain.com/about-us-updated"
    ]
    
    submit_to_indexnow(urls_to_submit)
```

---

## Step 3: Best Practices for Automation

* **Scale:** You can submit up to 10,000 URLs per post request. If your site has more, batch them or submit them as soon as content is generated.
* **Frequency:** Do not submit the exact same unchanged URLs too frequently, or you may receive a `429 Too Many Requests` error (potential spam flag). Track your submissions in a database.
* **HTTP Responses:** 
  * `200 OK` - Submitted successfully.
  * `202 Accepted` - Received, but the key file verification is pending.
  * `403 Forbidden` - Key validation failed (check if your `.txt` file is accessible).
  * `422 Unprocessable Entity` - The URLs don't belong to the host, or the request format is wrong.
