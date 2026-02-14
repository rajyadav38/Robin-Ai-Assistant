import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="logo">Robin AI</h1>

        <input className="auth-input" placeholder="Email" />
        <input className="auth-input" type="password" placeholder="Password" />

        <button className="auth-btn" onClick={() => nav("/robin")}>
          Login
        </button>

        <p>
          No account? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
}
