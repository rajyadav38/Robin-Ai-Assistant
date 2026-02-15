import webbrowser
import os
import time
import sys
def speak(text):
    print(f"ROBIN: {text}")
DANGEROUS_COMMANDS = ["shutdown", "exit", "sleep"]


def handle_command(command: str):
    if "open spotify" in command or "play music" in command:
        speak("Opening Spotify")
        os.startfile("spotify")
        return "handled"

    if "open youtube" in command:
        speak("Opening YouTube")
        webbrowser.open("https://youtube.com")
        return "handled"

    if "open google" in command:
        speak("Opening Google")
        webbrowser.open("https://google.com")
        return "handled"

    if "open whatsapp" in command:
        speak("Opening WhatsApp")
        webbrowser.open("https://web.whatsapp.com")
        return "handled"

    if "time" in command:
        speak(f"The time is {time.strftime('%I:%M %p')}")
        return "handled"

    if "sleep" in command or "stop listening" in command:
        speak("Going silent")
        return "sleep"

    if "exit" in command or "shutdown" in command:
        return "confirm_shutdown"


    return "ai"
