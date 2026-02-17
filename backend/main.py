from fastapi import FastAPI
from pydantic import BaseModel
from core.ai import ai_response
from fastapi.middleware.cors import CORSMiddleware
from db import conn, cursor
import bcrypt
import uuid

origins = [
    "https://robin-ai-assistant.vercel.app",  # your frontend URL
]
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Message(BaseModel):
    text: str

@app.get("/")
def home():
    return {"status": "Robin backend running"}

@app.post("/chat")
def chat(msg: Message):
    reply = ai_response(msg.text)
    return {"reply": reply}

@app.post("/signup")
def signup(data: dict):
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt())

    sql = "INSERT INTO users (username,email,password) VALUES (%s,%s,%s)"
    cursor.execute(sql, (username, email, hashed))
    conn.commit()

    return {"message": "User created"}

@app.post("/login")
def login(data: dict):
    email = data.get("email")
    password = data.get("password")

    cursor.execute("SELECT * FROM users WHERE email=%s", [email])
    user = cursor.fetchone()

    if not user:
        return {"error": "User not found"}

    stored_pw = user.get("password")

    if not stored_pw:
        return {"error": "Account corrupted. Signup again."}

    if bcrypt.checkpw(password.encode(), stored_pw.encode()):
        token = str(uuid.uuid4())
        return {
            "message": "Login success",
            "token": token,
            "username": user["username"]
        }

    return {"error": "Invalid password"}
