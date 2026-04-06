import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Sidebar from "./components/Sidebar";
import PaymentsTable from "./components/PaymentsTable";
import SupportTable from "./components/SupportTable";
import Login from "./components/Login";
import "./App.css";

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
          <span>Bienvenido, {user.username}</span>
          <button className="logout-btn" onClick={handleLogout}>Cerrar sesión</button>
        </div>
        <div className="tab-content">
          {activeTab === "payments" && <PaymentsTable />}
          {activeTab === "support" && <SupportTable />}
        </div>
      </main>
    </div>
  );
}