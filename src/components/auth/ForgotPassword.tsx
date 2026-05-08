import React, { useState } from "react";
import { forgotPassword } from "../../services/userService";
import "./ForgotPassword.css";

interface ForgotPasswordProps {
  isOpen: boolean;
  onClose: () => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!email) {
      setError("Por favor, ingresa tu correo electrónico.");
      return;
    }

    setLoading(true);
    try {
      await forgotPassword({ email });
      setSuccess(true);
      setEmail("");
      setTimeout(() => {
        onClose();
        setSuccess(false);
      }, 3000);
    } catch (err: any) {
      setError(err.message || "Error al enviar el correo. Inténtalo más tarde.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="forgot-password-overlay">
      <div className="forgot-password-modal">
        <button className="forgot-password-close" onClick={onClose}>
          ✕
        </button>

        <h2>Restablecer Contraseña</h2>
        <p className="forgot-password-subtitle">
          Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
        </p>

        {success && (
          <div className="success-message">
            ✓ Se ha enviado un enlace de recuperación a tu correo. Por favor, revisa tu bandeja de entrada.
          </div>
        )}

        {error && <div className="forgot-password-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Correo Electrónico</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@correo.com"
            disabled={loading || success}
          />

          <button type="submit" disabled={loading || success}>
            {loading ? "Enviando..." : success ? "¡Enviado!" : "Enviar Enlace"}
          </button>
        </form>

        <p className="forgot-password-cancel">
          ¿Recordaste tu contraseña?{" "}
          <button type="button" onClick={onClose} className="forgot-password-link">
            Volver al Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
