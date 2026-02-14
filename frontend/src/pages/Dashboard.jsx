import { useNavigate } from "react-router-dom";
import ChatBox from "../components/ChatBox";
import Hud from "../components/Hud";

export default function Dashboard() {
  const nav = useNavigate();

  function handleLogout() {
    // later we clear token here
    nav("/");
  }
  const history = JSON.parse(localStorage.getItem("robin_chat") || "[]");

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="profile">
          <div className="history">
            <h4>Recent</h4>
            {history
              .slice(-5)
              .reverse()
              .map((msg, i) => (
                <div key={i} className="history-item">
                  {msg.text.slice(0, 20)}...
                </div>
              ))}
          </div>

          <div className="avatar">R</div>
          <h3>Raj</h3>
          <p className="status">Online</p>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Main */}
      <div className="main-area">
        <Hud />
        <div className="dashboard-header">Robin Assistant</div>
        <ChatBox />
      </div>
    </div>
  );
}
