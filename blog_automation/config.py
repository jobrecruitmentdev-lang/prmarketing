import os
import logging
from dotenv import load_dotenv

load_dotenv()

# Configure centralized logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    handlers=[
        logging.StreamHandler(),
        logging.FileHandler(os.path.join(os.path.dirname(__file__), "logs", "automation.log"), encoding="utf-8")
    ]
)
logger = logging.getLogger("pr_guides_automation")

class Config:
    GOOGLE_SHEET_ID = os.getenv("GOOGLE_SHEET_ID", "1BM2GcQ-0cTlGgNoVA1PDAR6sV7sL1DD6")
    GOOGLE_CREDENTIALS_FILE = os.getenv("GOOGLE_CREDENTIALS_FILE", "credentials.json")
    TRACKING_SHEET_ID = os.getenv("TRACKING_SHEET_ID", "1BM2GcQ-0cTlGgNoVA1PDAR6sV7sL1DD6")
    
    GROQ_API_KEY = os.getenv("GROQ_API_KEY")
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
    NVIDIA_API_KEY = os.getenv("NVIDIA_API_KEY")
    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
    SERPER_API_KEY = os.getenv("SERPER_API_KEY")
    HUGGINGFACE_API_KEY = os.getenv("HUGGINGFACE_API_KEY")
    
    SITE_URL = os.getenv("SITE_URL", "https://prmarketingventures.com")
    WEBSITE_DIR = os.getenv("WEBSITE_DIR", r"C:\hk\prmarketing\website")
