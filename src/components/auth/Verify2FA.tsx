import React, { useState } from 'react';
import { verifyLogin2FA } from '../../services/twoFactorService.ts';
import './Verify2FA.css';

interface Verify2FAProps {
  email: string;
  onSuccess: (token: string, username: string, roles: string[]) => void;
  onCancel: () => void;
}

const Verify2FA: React.FC<Verify2FAProps> = ({ email, onSuccess, onCancel }) => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (code.length !== 6 || !/^[0-9]{6}$/.test(code)) {
      setError('El código debe tener 6 dígitos.');
      return;
    }

    setLoading(true);
    try {
      const data = await verifyLogin2FA({ email, code });
      onSuccess(data.token, data.username, data.roles);
    } catch (err: any) {
      setError(err.message || 'Código inválido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="verify-2fa-overlay" onClick={onCancel}>
      <div className="verify-2fa-container" onClick={(e) => e.stopPropagation()}>
        <span className="close-btn" onClick={onCancel}>✕</span>
        <h2>Verificación en dos pasos</h2>
        <p>Tu cuenta tiene activada la autenticación de dos factores. Ingresa el código de 6 dígitos de tu app autenticadora.</p>

        <form className="verify-2fa-form" onSubmit={handleSubmit}>
          <label>Código de autenticación</label>
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
            disabled={loading}
          />

          {error && <div className="error-message">{error}</div>}

          <div className="verify-2fa-buttons">
            <button type="button" className="btn-skip" onClick={onCancel} disabled={loading}>
              Cancelar
            </button>
            <button type="submit" className="btn-activate" disabled={loading || code.length !== 6}>
              {loading ? 'Verificando...' : 'Verificar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Verify2FA;
