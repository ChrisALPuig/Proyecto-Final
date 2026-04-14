import { IonPage } from "@ionic/react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Setup2FA from "./Setup2FA";
import "./register.css";

interface RegisterResponse {
  token: string;
  username: string;
  roles: string[];
  user: { id: number; email: string; username: string };
}

const Register: React.FC = () => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fieldsError, setFieldsError] = useState({ email: false, username: false, password: false });
  const [showSetup2FA, setShowSetup2FA] = useState(false);
  const [token, setToken] = useState("");
  const [registeredEmail, setRegisteredEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validación de campos vacíos
    const newFieldsError = { email: !email, username: !username, password: !password };
    setFieldsError(newFieldsError);

    if (newFieldsError.email || newFieldsError.username || newFieldsError.password) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password }),
      });

      if (!res.ok) {
        const text = await res.text();

        let friendlyMessage = "Ocurrió un error, inténtalo de nuevo.";
        if (res.status === 400) {
          if (text.includes("Username")) friendlyMessage = "El nombre de usuario ya existe.";
          else if (text.includes("Email")) friendlyMessage = "El correo ya está registrado.";
          else friendlyMessage = text;
        } else if (res.status === 500) {
          friendlyMessage = "Error en el servidor, inténtalo más tarde.";
        }

        throw new Error(friendlyMessage);
      }

      const data: RegisterResponse = await res.json();
      console.log("Registro exitoso:", data);
      
      // Guardar el token y email en el estado
      setToken(data.token);
      setRegisteredEmail(data.user.email);
      
      // Mostrar Setup2FA
      setShowSetup2FA(true);
    } catch (err: any) {
      console.error("Error en registro:", err);
      setError(err.message);
    }
  };

  const handleSetup2FAComplete = () => {
    history.push("/login");
  };

  const handleSetup2FASkip = () => {
    history.push("/login");
  };

  if (showSetup2FA) {
    return (
      <Setup2FA
        token={token}
        email={registeredEmail}
        onComplete={handleSetup2FAComplete}
        onSkip={handleSetup2FASkip}
      />
    );
  }

  return (
    <IonPage>
      <div className="register-page">
        <form className="register-form" onSubmit={handleSubmit}>
          <span className="close-btn" onClick={() => history.push("/home")}>✕</span>
          <h1>Sign Up</h1>

          {error && <div className="error-message">{error}</div>}

          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={fieldsError.email ? "input-error" : ""}
          />

          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={fieldsError.username ? "input-error" : ""}
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={fieldsError.password ? "input-error" : ""}
          />

          <button type="submit">Register</button>

          <p className="login-link">
            Already have an account? <a href="/login">Sign In</a>
          </p>
        </form>
      </div>
    </IonPage>
  );
};

export default Register;