import { useState, useEffect } from "react";
import {
  updateSupportStatus,
  replyToSupport,
  getMessages,
} from "../services/supportService";
import toast from "react-hot-toast";
import "./SupportModal.css";

export default function SupportModal({ request, onClose }) {
  const [responseText, setResponseText] = useState("");
  const [messages, setMessages] = useState([]);
  const [lightbox, setLightbox] = useState({ open: false, src: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadMessages();
  }, [request.id]);

  const loadMessages = async () => {
    try {
      const data = await getMessages(request.id);
      setMessages(data);
    } catch (err) {
      console.error(err);
      toast.error("Error cargando mensajes");
    }
  };

  const handleSubmit = async () => {
    if (!responseText.trim()) {
      toast.error("La respuesta no puede estar vacía");
      return;
    }

    setLoading(true);

    try {
      // Primero enviamos la respuesta
      await replyToSupport(request.id, responseText);

      // Luego cerramos el ticket
      await updateSupportStatus(request.id, "CLOSED");

      toast.success("Respuesta enviada y ticket cerrado");
      setResponseText("");
      loadMessages();
      onClose(); // Cerramos el modal

    } catch (err) {
      console.error(err);
      toast.error(err.message || "Error al responder y cerrar ticket");
    } finally {
      setLoading(false);
    }
  };

  const renderAttachment = (att, idx) => {
    const isImage = att.type.startsWith("image/");
    const isPDF = att.type === "application/pdf";

    return (
      <div key={idx} className="attachment-item">
        {isImage ? (
          <img
            src={`data:${att.type};base64,${att.data}`}
            alt={att.name}
            className="attachment-thumb"
            onClick={() =>
              setLightbox({ open: true, src: `data:${att.type};base64,${att.data}` })
            }
          />
        ) : isPDF ? (
          <a
            href={`data:${att.type};base64,${att.data}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {att.name}
          </a>
        ) : (
          <span>{att.name}</span>
        )}
      </div>
    );
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✖</button>

        <h3>Ticket #{request.id}</h3>
        <p><strong>Email:</strong> {request.email}</p>
        <p><strong>Order:</strong> {request.orderId}</p>
        <p><strong>Asunto:</strong> {request.subject}</p>
        {request.description && (
          <p className="request-description"><strong>Descripción:</strong> {request.description}</p>
        )}

        {request.attachments?.length > 0 && (
          <div className="attachments-section">
            <strong>Adjuntos:</strong>
            <div className="attachments-grid">{request.attachments.map(renderAttachment)}</div>
          </div>
        )}

        <div className="chat">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={msg.sender === "ADMIN" ? "admin-msg" : "user-msg"}
            >
              <strong>{msg.sender}:</strong> {msg.message}
            </div>
          ))}
        </div>

        <textarea
          placeholder="Escribe tu respuesta..."
          value={responseText}
          onChange={(e) => setResponseText(e.target.value)}
          disabled={loading}
        />

        <div className="modal-actions">
          <button onClick={handleSubmit} disabled={loading}>
            {loading ? "Procesando..." : "Responder y cerrar"}
          </button>
        </div>
      </div>

      {lightbox.open && (
        <div className="lightbox" onClick={() => setLightbox({ open: false, src: "" })}>
          <img src={lightbox.src} alt="Preview" className="lightbox-img" />
        </div>
      )}
    </div>
  );
}