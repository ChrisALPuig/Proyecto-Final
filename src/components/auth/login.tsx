import { IonPage } from "@ionic/react";
import { useState } from "react";
import "./login.css";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Login: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login:", { email, password });
    // Aquí iría la lógica real de login
    login();
    history.push("/home");
  };

  return (
    <IonPage>
      <div className="login-page">
        <form className="login-form" onSubmit={handleSubmit}>
          
          <span className="close-btn" onClick={() => history.push("/home")}>
            ✕
          </span>

          <h1>Sign In</h1>
          
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          
          <button type="submit">Login</button>

          <p className="signup-link">
            Don't have an account? <a href="/register">Sign Up</a>
          </p>
        </form>
      </div>
    </IonPage>
  );
};

export default Login;