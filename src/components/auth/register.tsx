import { IonPage } from "@ionic/react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./register.css";

const Register: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Register:", { email, username, password });
    // Aquí iría la lógica real de registro
    login();
    history.push("/home");
  };

  return (
    <IonPage>
      <div className="register-page">
        <form className="register-form" onSubmit={handleSubmit}>
          {/* ✖ Cruz para cerrar */}
          <span className="close-btn" onClick={() => history.push("/")}>
            ✕
          </span>

          <h1>Sign Up</h1>

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
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