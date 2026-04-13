import { IonPage } from "@ionic/react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.tsx";
import "./login.css";

const Login: React.FC = () => {
  const history = useHistory();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fieldsError, setFieldsError] = useState({ email: false, password: false });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const newFieldsError = { email: !email, password: !password };
    setFieldsError(newFieldsError);

    if (newFieldsError.email || newFieldsError.password) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        let friendlyMessage = "Ocurrió un error, inténtalo de nuevo.";
        if (res.status === 401 || res.status === 403) {
          friendlyMessage = "Usuario o contraseña incorrectos.";
        } else if (res.status === 400) {
          friendlyMessage = "Datos inválidos. Revisa tu usuario y contraseña.";
        } else if (res.status === 500) {
          friendlyMessage = "Error del servidor, inténtalo más tarde.";
        }
        throw new Error(friendlyMessage);
      }

      const data = await res.json();
      login(data.token, data.username, data.roles);
      history.push("/home");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <div className="login-page">
        <form className="login-form" onSubmit={handleSubmit}>
          <span className="close-btn" onClick={() => history.push("/home")}>✕</span>
          <h1>Sign In</h1>

          {error && <div className="error-message">{error}</div>}

          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={fieldsError.email ? "input-error" : ""}
            disabled={loading}
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={fieldsError.password ? "input-error" : ""}
            disabled={loading}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="signup-link">
            Don't have an account? <a href="/register">Sign Up</a>
          </p>
        </form>
      </div>
    </IonPage>
  );
};

export default Login;