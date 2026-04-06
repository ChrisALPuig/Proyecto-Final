// src/components/SupportModal.jsx
import { useState } from "react";
import { updateSupportStatus } from "../services/supportService";
import toast from "react-hot-toast";
import "./SupportModal.css";

export default function SupportModal({ request, onClose }) {
  const [responseText, setResponseText] = useState("");

  if (!request) return null;

  const handleSubmit = async () => {
    if (!responseText.trim()) {
      toast.error("La respuesta no puede estar vacía");
      return;
    }

    try {
      await updateSupportStatus(request.id, "RESOLVED");
      toast.success("Solicitud marcada como resuelta");
      onClose();
    } catch (err) {
      toast.error("Error al actualizar estado");
    }
  };

  const handleCancel = async () => {
    try {
      await updateSupportStatus(request.id, "CANCELLED");
      toast.success("Solicitud cancelada");
      onClose();
    } catch (err) {
      toast.error("Error al cancelar solicitud");
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>✖</button>

        <h3>Solicitud #{request.id}</h3>
        <p><strong>Email:</strong> {request.email}</p>
        <p><strong>Order ID:</strong> {request.orderId}</p>
        <p><strong>Asunto:</strong> {request.subject}</p>
        <p><strong>Descripción:</strong> {request.description}</p>

        {request.attachments && request.attachments.length > 0 && (
          <div>
            <strong>Adjuntos:</strong>
            <ul>
              {request.attachments.map((att, idx) => (
                <li key={idx}>
                  <a
                    href={`data:application/octet-stream;base64,${att}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Archivo {idx + 1}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="response-section">
          <textarea
            placeholder="Escribe tu respuesta..."
            value={responseText}
            onChange={(e) => setResponseText(e.target.value)}
          ></textarea>

          <div className="modal-actions">
            <button className="resolve-btn" onClick={handleSubmit}>
              Responder y marcar como resuelto
            </button>
            <button className="cancel-btn" onClick={handleCancel}>
              Cancelar solicitud
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}