import requests
from tenacity import retry, stop_after_attempt, wait_exponential
from config import Config, logger

class ApiManager:
    def __init__(self):
        self.headers = {
            "X-Api-Key": Config.HOSTINGER_API_KEY,
            "User-Agent": "curl/7.81.0",
            "Connection": "close",
            "Content-Type": "application/json"
        }
        # In a local setup or dev, this should point to localhost API
        self.base_url = Config.API_BASE_URL.replace("/blogs", "") if "/blogs" in Config.API_BASE_URL else Config.API_BASE_URL

    @retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=2, max=10))
    def get_pending_topics(self, limit=15):
        url = f"{self.base_url}/automation/topics/pending?limit={limit}"
        logger.info(f"Fetching pending topics from DB: {url}")
        
        response = requests.get(url, headers=self.headers, timeout=10)
        response.raise_for_status()
        
        return response.json()

    @retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=2, max=10))
    def update_topic_status(self, topic_id, status):
        url = f"{self.base_url}/automation/topics/status"
        logger.info(f"Updating topic ID {topic_id} status to {status}")
        
        payload = {
            "id": topic_id,
            "status": status
        }
        response = requests.patch(url, json=payload, headers=self.headers, timeout=10)
        response.raise_for_status()
        return response.json()

api_manager = ApiManager()
