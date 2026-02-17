import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    const res = await fetch("https://robin-ai-assistant.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();

    if (data.message) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);
      alert("Login successful!");
      nav("/robin");
    } else {
      alert(data.error || "Login failed");
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="logo">Robin AI</h1>

        <input
          className="auth-input"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="auth-input"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="auth-btn" onClick={handleLogin}>
          Login
        </button>

        <p>
          No account? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
}
