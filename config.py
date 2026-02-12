from dotenv import load_dotenv
import os

load_dotenv(override=True)

WAKE_WORD = "hey robin"
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY not set")

print("Loaded Key:", GEMINI_API_KEY)
