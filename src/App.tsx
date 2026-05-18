import { useState, useEffect, lazy, Suspense } from "react";
import { jwtDecode } from "jwt-decode";
import Sidebar from "./components/Sidebar";
import Login from "./components/Login";
import "./App.css";

// Lazy load heavy components
const PaymentsTable = lazy(() => import("./components/PaymentsTable"));
const SupportTable = lazy(() => import("./components/SupportTable"));
const Dashboard = lazy(() => import("./components/Dashboard"));

type User = {
  token: string;
  username: string;
  roles: string[];
};

type JwtPayload = {
  sub: string;        // username
  roles: string[];    // roles
  exp: number;        // expiración
};

export default function App() {
  const [activeTab, setActiveTab] = useState("payments");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        setUser({
          token,
          username: decoded.sub,
          roles: decoded.roles || [],
        });
      } catch (err) {
        console.error("Token inválido", err);
        localStorage.removeItem("token");
      }
    }
  }, []);

  const handleLogin = (token: string) => {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const userData: User = {
        token,
        username: decoded.sub,
        roles: decoded.roles || [],
      };
      localStorage.setItem("token", token);
      setUser(userData);
    } catch (err) {
      console.error("Token inválido", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  if (!user) return <Login onLogin={handleLogin} />;

  return (
    <div className="app">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="main-content">
        <div className="header">
          <h1>Admin Dashboard</h1>
        </div>
        <div className="profile-avatar">
          <div className="avatar-icon">👤</div>
          <div className="avatar-info">
            <span>Bienvenido, {user.username}</span>
            <button className="logout-btn" onClick={handleLogout} aria-label="Cerrar sesión">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: 'black' }}>
                <path d="M4 21V3H14V9" stroke="black" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14 14H20" stroke="black" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M17 11L20 14L17 17" stroke="black" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10 12.5C10.8284 12.5 11.5 11.8284 11.5 11C11.5 10.1716 10.8284 9.5 10 9.5C9.17157 9.5 8.5 10.1716 8.5 11C8.5 11.8284 9.17157 12.5 10 12.5Z" fill="black" />
              </svg>
            </button>
          </div>
        </div>
        <div className="tab-content">
          <Suspense fallback={<div></div>}>
            {activeTab === "dashboard" && <Dashboard />}
            {activeTab === "payments" && <PaymentsTable />}
            {activeTab === "support" && <SupportTable />}
          </Suspense>
        </div>
      </main>
    </div>
  );
}