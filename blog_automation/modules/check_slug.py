import requests
import re
from tenacity import retry, stop_after_attempt, wait_exponential
from config import Config, logger

def create_slug(topic: str) -> str:
    slug = re.sub(r'[^a-z0-9]+', '-', topic.lower())
    return re.sub(r'(^-|-$)', '', slug)

@retry(stop=stop_after_attempt(5), wait=wait_exponential(multiplier=1, min=2, max=10))
def check_slug_by_slug(slug: str) -> bool:
    """Check availability for a pre-built slug (e.g. derived from AI title)."""
    url = f"{Config.API_BASE_URL}/check-slug-external"
    headers = {
        "X-Api-Key": Config.HOSTINGER_API_KEY,
        "User-Agent": "curl/7.81.0",
        "Connection": "close",
        "Content-Type": "application/json"
    }
    logger.info(f"Checking slug availability: {slug}")
    response = requests.post(url, json={"slug": slug}, headers=headers, timeout=10)
    response.raise_for_status()
    data = response.json()
    is_available = data.get("available", False)
    logger.info(f"Slug '{slug}' available: {is_available}")
    return is_available


@retry(stop=stop_after_attempt(5), wait=wait_exponential(multiplier=1, min=2, max=10))
def check_slug_available(topic: str) -> bool:
    slug = create_slug(topic)
    url = f"{Config.API_BASE_URL}/check-slug-external"
    
    headers = {
        "X-Api-Key": Config.HOSTINGER_API_KEY,
        "User-Agent": "curl/7.81.0",
        "Connection": "close",
        "Content-Type": "application/json"
    }
    
    logger.info(f"Checking slug availability: {slug}")
    
    response = requests.post(url, json={"slug": slug}, headers=headers, timeout=10)
    response.raise_for_status()
    
    data = response.json()
    is_available = data.get("available", False)
    
    logger.info(f"Slug '{slug}' available: {is_available}")
    return is_available
