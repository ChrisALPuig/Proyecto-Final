import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../contexts/AuthContext.tsx";
import { useNotification } from "../../contexts/NotificationContext.tsx";
import { replyToTicket } from "../../services/ticketService.ts";
import "./TicketModal.css";

interface Ticket {
  id: number;
  email: string;
  orderId: string;
  subject: string;
  description: string;
  status: string;
  createdAt: string;
  responses?: {
    id: number;
    message: string;
    responder: "USER" | "ADMIN" | "user" | "admin";
    respondedAt: string;
  }[];
}

interface TicketModalProps {
  ticket: Ticket;
  isOpen: boolean;
  onClose: () => void;
  onTicketUpdated?: () => void;
}

const TicketModal: React.FC<TicketModalProps> = ({
  ticket,
  isOpen,
  onClose,
  onTicketUpdated,
}) => {
  const { token } = useAuth();
  const { addNotification } = useNotification();
  const [responseText, setResponseText] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmCloseOpen, setConfirmCloseOpen] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [ticket]);

  const handleSubmitResponse = async () => {
    if (!responseText.trim()) {
      alert("La respuesta no puede estar vacía");
      return;
    }

    setLoading(true);

    try {
      await replyToTicket(ticket.id, responseText, token!);
      alert("Respuesta enviada");
      setResponseText("");
      onTicketUpdated?.();
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Error al enviar respuesta");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseTicket = () => {
    setConfirmCloseOpen(true);
  };

  const submitCloseTicket = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8080/api/tickets/${ticket.id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`,
        },
        body: "status=CLOSED",
      });

      if (!res.ok) throw new Error("Error al cerrar ticket");
      addNotification({
        id: `support-ticket-closed-${ticket.id}-${Date.now()}`,
        title: "Ticket cerrado",
        message: `Tu ticket #${ticket.id} ha sido cerrado.`,
        createdAt: new Date().toISOString(),
        read: false,
        link: `/ticket/${ticket.id}`,
      });
      onTicketUpdated?.();
      setConfirmCloseOpen(false);
      onClose();
    } catch (err: any) {
      alert(err.message || "Error al cerrar ticket");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="ticket-modal-overlay" onClick={onClose}>
      <div className="ticket-modal" onClick={(e) => e.stopPropagation()}>
        <div className="ticket-modal-header">
          <div className="header-top">
            <h2>Ticket #{ticket.id}</h2>
            <div className="header-right">
              <button className="ticket-modal-close" onClick={onClose}>
                ✖
              </button>
              <span className={`ticket-modal-status ${ticket.status.toLowerCase()}`}>
                {ticket.status === "OPEN" ? "Abierto" : "Cerrado"}
              </span>
            </div>
          </div>
        </div>

        <div className="ticket-modal-info">
          <p>
            <strong>Email:</strong> {ticket.email}
          </p>
          <p>
            <strong>Orden:</strong> {ticket.orderId || "N/A"}
          </p>
          <p>
            <strong>Asunto:</strong> {ticket.subject}
          </p>
        </div>

        <div className="ticket-modal-messages" ref={chatRef}>
          {/* Mensaje inicial del usuario */}
          <div className="modal-message user-message">
            <div className="message-header">
              <strong>usuario</strong>
              <span className="message-time">
                {new Date(ticket.createdAt).toLocaleString()}
              </span>
            </div>
            <p className="message-content">{ticket.description}</p>
          </div>

          {/* Respuestas del admin */}
          {ticket.responses && ticket.responses.length > 0 ? (
            ticket.responses.map((resp) => {
              const isAdminResponse = resp.responder?.toString().toLowerCase() === "admin";
              return (
                <div
                  key={resp.id}
                  className={`modal-message ${
                    isAdminResponse ? "admin-message" : "user-message"
                  }`}
                >
                  <div className="message-header">
                    <strong>{isAdminResponse ? "admin" : "usuario"}</strong>
                    <span className="message-time">
                      {new Date(resp.respondedAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="message-content">{resp.message}</p>
                </div>
              );
            })
          ) : (
            <div className="no-responses">
              <p>Sin respuestas aún</p>
            </div>
          )}
        </div>

        {ticket.status === "OPEN" && (
          <>
            <div className="ticket-modal-response">
              <textarea
                placeholder="Escribe tu respuesta..."
                value={responseText}
                onChange={(e) => setResponseText(e.target.value)}
                disabled={loading}
                className="response-textarea"
              />
            </div>

            <div className="ticket-modal-actions">
              <button
                className="btn-respond"
                onClick={handleSubmitResponse}
                disabled={loading}
              >
                {loading ? "Procesando..." : "Responder"}
              </button>
              <button
                className="btn-close-ticket"
                onClick={handleCloseTicket}
                disabled={loading}
              >
                Cerrar ticket
              </button>
            </div>
          </>
        )}

        {confirmCloseOpen && (
          <div className="confirm-overlay" onClick={() => setConfirmCloseOpen(false)}>
            <div className="confirm-popup" onClick={(e) => e.stopPropagation()}>
              <h3>¿Estás seguro?</h3>
              <p>¿Deseas cerrar este ticket?</p>
              <div className="confirm-actions">
                <button
                  className="btn-cancel"
                  type="button"
                  onClick={() => setConfirmCloseOpen(false)}
                  disabled={loading}
                >
                  Cancelar
                </button>
                <button
                  className="btn-confirm"
                  type="button"
                  onClick={submitCloseTicket}
                  disabled={loading}
                >
                  {loading ? "Cerrando..." : "Confirmar cierre"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketModal;
