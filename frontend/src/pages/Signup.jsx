import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const nav = useNavigate();

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="logo">Create Account</h1>

        <input className="auth-input" placeholder="Username" />
        <input className="auth-input" placeholder="Email" />
        <input className="auth-input" type="password" placeholder="Password" />
        <input
          className="auth-input"
          type="password"
          placeholder="Confirm Password"
        />

        <button className="auth-btn" onClick={() => nav("/")}>
          Signup
        </button>

        <p>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}
