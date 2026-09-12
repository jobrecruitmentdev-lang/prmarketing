---
name: automate-gsc-indexing
description: Automates URL submissions to Google Search Console (GSC) using the Web Search Indexing API to accelerate page indexing.
---

# Automating URL submissions to Google Search Console

Automating URL submissions to Google Search Console (GSC) using the **Web Search Indexing API** is the fastest way to get new or updated pages crawled and indexed—often within minutes to a few hours, rather than weeks.

While Google officially recommends this API for short-lived content (like job postings or live streams), many developers and SEO professionals use it successfully to accelerate indexing for standard web pages.

Here is the step-by-step guide to building your own indexing automation.

---

## Step 1: Set up Google Cloud & Authentication

Before writing any code, you need a Service Account to authenticate your API requests without requiring manual user login.

1. **Create a Google Cloud Project:** Go to the [Google Cloud Console](https://console.cloud.google.com/) and create a new project.
2. **Enable the APIs:** Navigate to **APIs & Services > Library**. Search for and enable the **Web Search Indexing API**. (You may also want to enable the **Google Search Console API** if you plan to check indexing statuses).
3. **Create a Service Account:** Go to **IAM & Admin > Service Accounts** and click **Create Service Account**. Give it a descriptive name (e.g., `seo-indexing-bot`).
4. **Generate a JSON Key:** Click on your newly created Service Account, navigate to the **Keys** tab, and click **Add Key > Create new key > JSON**. Download and save this file securely—it contains your authentication credentials.

---

## Step 2: Grant Permissions in Google Search Console

This is the most critical step. If you skip this, the API will return a `Permission Denied` error.

1. Open **Google Search Console**.
2. Select the property (website) you want to automate.
3. Go to **Settings > Users and permissions**.
4. Click **Add User**.
5. Paste the email address of the Service Account you just created (e.g., `seo-indexing-bot@your-project.iam.gserviceaccount.com`).
6. **Set the Permission level to Owner.** (Owner status is strictly required to instruct Google to crawl your site).

---

## Step 3: Build the Automation Logic (Python Example)

A standard automation workflow usually looks like this:

1. Parse your website's XML sitemap to find newly added or recently updated URLs.
2. Filter the URLs to ensure you don't waste API quota on old pages.
3. Send the URLs to the Indexing API.

Here is a simplified Python script to handle the authentication and URL submission.

**Prerequisites:**

```bash
pip install google-auth requests
```

**The Python Script:**

```python
import json
import requests
from google.oauth2 import service_account
from google.auth.transport.requests import AuthorizedSession

# Path to the JSON key you downloaded in Step 1
SERVICE_ACCOUNT_FILE = 'path/to/your/service-account.json'

# The scope required for the Indexing API
SCOPES = ["https://www.googleapis.com/auth/indexing"]
ENDPOINT = "https://indexing.googleapis.com/v3/urlNotifications:publish"

def get_authorized_session():
    """Authenticates the service account and returns an authorized HTTP session."""
    credentials = service_account.Credentials.from_service_account_file(
        SERVICE_ACCOUNT_FILE, scopes=SCOPES)
    return AuthorizedSession(credentials)

def submit_url_for_indexing(url, action="URL_UPDATED"):
    """
    Submits a URL to the Google Indexing API.
    Action can be 'URL_UPDATED' or 'URL_DELETED'.
    """
    session = get_authorized_session()
    
    payload = {
        "url": url,
        "type": action
    }
    
    response = session.post(ENDPOINT, data=json.dumps(payload))
    
    if response.status_code == 200:
        print(f"Success: {url} submitted for indexing.")
    else:
        print(f"Error {response.status_code}: {response.text}")

# Example usage
if __name__ == "__main__":
    target_url = "https://www.yourdomain.com/new-blog-post"
    submit_url_for_indexing(target_url, "URL_UPDATED")
```

---

## Step 4: Scale and Automate the Workflow

To turn a basic script into a hands-off automation, you need to manage limits and handle batches systematically.

### 1. Respect the API Quotas

Google enforces strict daily limits on its APIs:

* **Indexing API:** 200 requests per day (default).
* **URL Inspection API:** 2,000 requests per day.

### 2. Implement Database Tracking

If you have a site with thousands of URLs, you will exceed the 200-URL daily limit. You must track your URLs in a database (like SQLite, PostgreSQL, or even a Google Sheet) to monitor:

* Which URLs are **Pending**, **Submitted**, or **Indexed**.
* The timestamp of the last submission to prevent duplicate pushes.

### 3. Build a "Smart" Pipeline

The most robust setups (often built using cron jobs or no-code tools like n8n/Make) follow this daily logic:

1. **Sync:** Fetch the `sitemap.xml` and parse the `<loc>` and `<lastmod>` tags.
2. **Filter:** Drop any URLs older than 7 days, or URLs you've submitted in the last 48 hours.
3. **Inspect (Optional):** Send the remaining URLs to the **URL Inspection API** to see if Google has already indexed them.
4. **Submit:** Take up to 200 of the "Not on Google" URLs and submit them to the Indexing API as `URL_UPDATED`.
5. **Update:** Log the submitted URLs in your database so they are ignored on tomorrow's run.
