from config import WAKE_WORD
from core.listener import take_command
from core.speech import speak
from core.commands import handle_command
from core.ai import ai_response

def main():
    speak("Robin online. Say hey Robin to activate.")
    active = False

    while True:
        command = take_command()

        if not command:
            continue

        if WAKE_WORD in command:
            active = True
            speak("Yes?")
            continue

        if active:
            result = handle_command(command)

            if result == "sleep":
                active = False

            elif result == "ai":
                reply = ai_response(command)
                speak(reply)

if __name__ == "__main__":
    main()
