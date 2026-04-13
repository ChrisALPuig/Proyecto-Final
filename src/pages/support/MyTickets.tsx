import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext.tsx";
import { getUserTickets } from "../../services/ticketService.ts";
import { useHistory } from "react-router-dom";
import { IonPage, IonContent } from "@ionic/react";
import SupportHeader from "../../components/support/SupportHeader.tsx";
import TicketModal from "../../components/support/TicketModal.tsx";
import { useNotification } from "../../contexts/NotificationContext.tsx";
import "./MyTickets.css";

interface Ticket {
  id: number;
  email: string;
  orderId: string;
  subject: string;
  description: string;
  status: string;
  createdAt: string;
  responses?: any[];
}

const MyTickets: React.FC = () => {
  const { token, isAuthenticated } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const history = useHistory();
  const { addNotification } = useNotification();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        if (!isAuthenticated || !token) {
          setError("Debes estar autenticado para ver tus tickets");
          setLoading(false);
          return;
        }

        const data = await getUserTickets(token);
        setTickets(data);
      } catch (err) {
        console.error(err);
        setError("Error al cargar tus tickets");
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [token, isAuthenticated]);

  const handleViewTicket = (ticketId: number) => {
    const ticket = tickets.find(t => t.id === ticketId);
    if (ticket) {
      setSelectedTicket(ticket);
      setIsModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedTicket(null);
  };

  const handleTicketUpdated = async () => {
    // Recargar los tickets después de una actualización
    try {
      if (isAuthenticated && token) {
        const data = await getUserTickets(token);
        setTickets(data);
        if (selectedTicket) {
          const updated = data.find((t: Ticket) => t.id === selectedTicket.id);
          if (updated) {
            setSelectedTicket(updated);
          }
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div className="my-tickets-container"><p>Cargando tus tickets...</p></div>;
  }

  if (error) {
    return <div className="my-tickets-container error"><p>{error}</p></div>;
  }

  return (
    <IonPage>
      <SupportHeader />
      <IonContent fullscreen>
        <div className="my-tickets-container">
      <h1>Mis Tickets</h1>

      {tickets.length === 0 ? (
        <div className="no-tickets">
          <p>No tienes tickets abiertos.</p>
          <button className="btn-create-ticket" onClick={() => history.push("/form")}>
            Crear nuevo ticket
          </button>
        </div>
      ) : (
        <div className="tickets-list">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="ticket-card">
              <div className="ticket-header">
                <div className="ticket-info">
                  <h3>Ticket #{ticket.id}</h3>
                  <p className="ticket-subject">{ticket.subject}</p>
                </div>
                <span className={`status ${ticket.status.toLowerCase()}`}>
                  {ticket.status === "OPEN" ? "Abierto" : "Cerrado"}
                </span>
              </div>

              <div className="ticket-body">
                <p className="ticket-description">{ticket.description}</p>
                <div className="ticket-meta">
                  <span>📧 {ticket.email}</span>
                  <span>📦 Orden: {ticket.orderId || "N/A"}</span>
                  <span>
                    📅 {ticket.createdAt ? new Date(ticket.createdAt).toLocaleDateString() : "N/A"}
                  </span>
                </div>
              </div>

              <div className="ticket-responses">
                {ticket.responses && ticket.responses.length > 0 ? (
                  <p className="response-count">
                    ✓ {ticket.responses.length} respuesta{ticket.responses.length > 1 ? "s" : ""}
                  </p>
                ) : (
                  <p className="no-response">Sin respuestas aún</p>
                )}
              </div>

              <button
                className="btn-view-ticket"
                onClick={() => handleViewTicket(ticket.id)}
              >
                Ver detalles
              </button>
            </div>
          ))}
        </div>
      )}
      </div>
      </IonContent>

      {selectedTicket && (
        <TicketModal
          ticket={selectedTicket}
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onTicketUpdated={handleTicketUpdated}
        />
      )}
    </IonPage>
  );
};

export default MyTickets;
