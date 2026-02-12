import google.generativeai as genai
from config import GEMINI_API_KEY

genai.configure(api_key=GEMINI_API_KEY)

model = genai.GenerativeModel(
    model_name="gemini-2.5-flash",
    system_instruction=(
        "You are Robin, a voice-based AI assistant like Jarvis. "
        "Speak naturally, clearly, and briefly."
    )
)

chat = model.start_chat(history=[])

def ai_response(command: str) -> str:
    response = chat.send_message(command)
    text = response.text.replace("*", "").replace("\n", " ")
    return text
