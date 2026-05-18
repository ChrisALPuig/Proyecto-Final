import { useState, useEffect, useRef } from "react";
import {
  updateSupportStatus,
  replyToSupport,
  getMessages,
} from "../services/supportService";
import { API_BASE_URL } from "../config/apiConfig";
import toast from "react-hot-toast";
import "./SupportModal.css";

export default function SupportModal({ request, onClose }) {
  const [responseText, setResponseText] = useState("");
  const [messages, setMessages] = useState([]);
  const [lightbox, setLightbox] = useState({ open: false, src: "" });
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    loadMessages();
  }, [request.id]);

  const loadMessages = async () => {
    try {
      const data = await getMessages(request.id);

      // Agregamos el mensaje inicial del usuario
      const initialMsg = {
        id: 0,
        sender: "USER",
        message: request.description,
        attachments: request.attachments || [],
        createdAt: request.createdAt
      };

      setMessages([initialMsg, ...data]);
    } catch (err) {
      console.error(err);
      toast.error("Error cargando mensajes");
    }
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async () => {
    if (!responseText.trim()) {
      toast.error("La respuesta no puede estar vacía");
      return;
    }

    setLoading(true);

    try {
      await replyToSupport(request.id, responseText, "ADMIN");
      toast.success("Respuesta enviada");
      setResponseText("");
      await loadMessages();
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Error al enviar respuesta");
    } finally {
      setLoading(false);
    }
  };

 const renderAttachment = (att, idx) => {
  const fileName = typeof att === "string" ? att : att.fileName;

  const isImage = fileName?.match(/\.(jpg|jpeg|png|gif|webp)$/i);
  const isPDF = fileName?.endsWith(".pdf");

  const fileUrl = `${API_BASE_URL.replace('/api', '')}/uploads/${fileName}`;

  return (
    <div key={idx} className="attachment-item">
      {isImage ? (
        <img
          src={fileUrl}
          className="attachment-thumb"
          onClick={() => setLightbox({ open: true, src: fileUrl })}
        />
      ) : isPDF ? (
        <a href={fileUrl} target="_blank">PDF</a>
      ) : (
        <span>{fileName}</span>
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

        {request.attachments?.length > 0 && (
          <div className="attachments-section">
            <strong>Adjuntos:</strong>
            <div className="attachments-grid">
              {request.attachments.map(renderAttachment)}
            </div>
          </div>
        )}

        <div className="chat" ref={chatRef}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={msg.sender === "admin" ? "admin-msg" : "user-msg"}
            >
              <strong>{msg.sender === "admin" ? "admin" : "usuario"}:</strong> {msg.message}

              {msg.attachments?.map((att, idx) => renderAttachment(att, idx))}

              {msg.createdAt && (
                <div style={{ fontSize: "0.75rem", color: "#666", marginTop: "2px" }}>
                  {new Date(msg.createdAt).toLocaleString()}
                </div>
              )}
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
            {loading ? "Procesando..." : "Responder"}
          </button>
          <button
            onClick={async () => {
              await updateSupportStatus(request.id, "CLOSED");
              toast.success("Ticket cerrado");
              onClose();
            }}
          >
            Cerrar ticket
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