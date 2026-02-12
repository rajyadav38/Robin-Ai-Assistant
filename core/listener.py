import speech_recognition as sr

def take_command() -> str:
    recognizer = sr.Recognizer()

    with sr.Microphone() as source:
        print("Listening...")
        recognizer.adjust_for_ambient_noise(source, duration=0.5)
        audio = recognizer.listen(source)

    try:
        command = recognizer.recognize_google(audio, language="en-in")
        print("YOU:", command)
        return command.lower()
    except:
        return ""
