import win32com.client
import time

speaker = win32com.client.Dispatch("SAPI.SpVoice")

def speak(text: str):
    print("ROBIN:", text)
    speaker.Speak(text)
    time.sleep(0.3)
