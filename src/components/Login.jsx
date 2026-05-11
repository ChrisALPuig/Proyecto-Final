import { useState } from "react";
import { loginAdmin } from "../services/authService";
import "./Login.css";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Por favor completa todos los campos");
      return;
    }

    setLoading(true);
    try {
      const data = await loginAdmin({ username, password });
      onLogin(data.token);
    } catch (err) {
      setError("Usuario o contraseña incorrectos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Admin Login</h2>
          <p className="login-subtitle">Acceso a panel administrativo</p>
          
          {error && (
            <div className="error-box">
              <p className="error">{error}</p>
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="username">Usuario</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              disabled={loading}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={loading}
              required
            />
          </div>
          
          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? "Cargando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
}