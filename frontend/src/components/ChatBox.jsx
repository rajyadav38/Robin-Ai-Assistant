import { useState, useRef, useEffect } from "react";
import Message from "./Message";

export default function ChatBox() {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("robin_chat");
    return saved
      ? JSON.parse(saved)
      : [{ text: "Hello, I am Robin. How can I help you?", sender: "bot" }];
  });

  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [listening, setListening] = useState(false);

  const bottomRef = useRef(null);
  function speak(text) {
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 1;
    utter.pitch = 1;
    utter.lang = "en-US";
    speechSynthesis.speak(utter);
  }

  async function sendMessage(text = input) {
    if (!text.trim()) return;

    const userMsg = { text, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTyping(true);

    try {
      const res = await fetch("https://robin-ai-assistant.onrender.com/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();

      setMessages((prev) => [...prev, { text: data.reply, sender: "bot" }]);

      speak(data.reply);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { text: "Backend connection error", sender: "bot" },
      ]);
    }

    setTyping(false);
  }

  // 🎤 Voice recognition
  function startListening() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();

    setListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      sendMessage(transcript);
      setListening(false);
    };

    recognition.onerror = () => {
      setListening(false);
    };
  }

  // auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, i) => (
          <Message key={i} text={msg.text} sender={msg.sender} />
        ))}

        {typing && (
          <div className="message-row bot">
            <div className="message-bubble typing">Robin is thinking...</div>
          </div>
        )}

        <div ref={bottomRef}></div>
      </div>

      <div className="chat-input-area">
        <input
          className="chat-input"
          placeholder="Talk to Robin..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />

        <button className="send-btn" onClick={() => sendMessage()}>
          Send
        </button>

        <button
          className={`mic-btn ${listening ? "listening" : ""}`}
          onClick={startListening}
        >
          🎤
        </button>
      </div>
    </div>
  );
}
