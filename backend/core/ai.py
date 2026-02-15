import google.generativeai as genai
from config import GEMINI_API_KEY
from core.commands import handle_command

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

    # 🔹 First check system commands
    result = handle_command(command.lower())

    if result == "handled":
        # command already executed and spoken
        return "Done."
    
    if result == "confirm_shutdown":
        return "Are you sure you want me to shut down the system?"

    if result == "sleep":
        return "Going silent."

    # 🔹 Otherwise send to Gemini
    response = chat.send_message(command)
    text = response.text.replace("*", "").replace("\n", " ")
    return text
