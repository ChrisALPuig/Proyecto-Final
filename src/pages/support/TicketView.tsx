import React, { useState, useEffect } from "react";
import SupportHeader from "../../components/support/SupportHeader.tsx";
import "../../components/support/FormularioComponente.css";

interface Message {
  sender: "user" | "admin";
  message: string;
  attachments?: { name: string; type: string; data: string }[];
  createdAt: string;
}

interface TicketViewProps {
  ticketData: {
    id: number;
    email: string;
    subject: string;
    description: string;
    attachments: { name: string; type: string; data: string }[];
  };
}

const TicketView: React.FC<TicketViewProps> = ({ ticketData }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/support/${ticketData.id}/messages`);
        if (!res.ok) throw new Error("Error al obtener mensajes");
        const data: Message[] = await res.json();
        setMessages([
          {
            sender: "user",
            message: ticketData.description,
            attachments: ticketData.attachments,
            createdAt: new Date().toISOString(),
          },
          ...data
        ]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, [ticketData]);

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <>
      <SupportHeader />
      <div className="support-content">
        <h1 className="title-contact-uno">{ticketData.subject}</h1>

        <div className="chat" style={{ maxHeight: "400px", overflowY: "auto" }}>
          {messages.map((msg, i) => (
            <div
              key={i}
              className={msg.sender === "user" ? "user-msg" : "admin-msg"}
            >
              <p>{msg.message}</p>
              {msg.attachments &&
                msg.attachments.map((att, idx) => (
                  <img
                    key={idx}
                    src={`data:${att.type};base64,${att.data}`}
                    alt={att.name}
                    className="attachment-thumb"
                    style={{ marginTop: "6px", maxHeight: "100px", cursor: "pointer" }}
                    onClick={() => window.open(`data:${att.type};base64,${att.data}`, "_blank")}
                  />
                ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TicketView;