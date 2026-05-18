import { API_ENDPOINTS } from "../config/apiConfig";

const API_URL = API_ENDPOINTS.TICKETS;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

// ===================== ADMIN =====================

export const getAllSupportRequests = async () => {
  const res = await fetch(`${API_URL}/admin/all`, { headers: getAuthHeaders() });
  if (!res.ok) throw new Error("Error al cargar solicitudes");
  return await res.json();
};

export const updateSupportStatus = async (id: number, status: string) => {
  const formData = new FormData();
  formData.append("status", status);

  const res = await fetch(`${API_URL}/${id}/status`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    body: formData,
  });

  if (!res.ok) throw new Error("Error al actualizar estado");
  return await res.json();
};

export const deleteSupport = async (id: number) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  if (!res.ok) throw new Error("Error al eliminar ticket");
};

// ===================== USUARIO =====================

export const getUserTickets = async (email: string) => {
  const res = await fetch(`${API_URL}/user/${email}`, { headers: getAuthHeaders() });
  if (!res.ok) throw new Error("Error al cargar tickets del usuario");
  return await res.json();
};

export const getTicketById = async (id: number) => {
  const res = await fetch(`${API_URL}/${id}`, { headers: getAuthHeaders() });
  if (!res.ok) throw new Error("Error al cargar ticket");
  return await res.json();
};

// ===================== FUNCIONES AUX =====================

// Obtener mensajes formateados para TicketView
export const getMessages = async (id: number) => {
  const ticket = await getTicketById(id);

  const messages = [
  {
    sender: "user",
    message: ticket.description,
    attachments: ticket.attachmentUrls || [],
    createdAt: ticket.createdAt || new Date(),
  },
  ...(ticket.responses || []).map((resp: any) => ({
  sender: resp.responder === "ADMIN" ? "admin" : "user",
  message: resp.message,
  attachments: resp.attachments || [],
  createdAt: resp.respondedAt,
})),
];

  return messages;
};

// Responder ticket
export const replyToSupport = async (
  id: number,
  message: string,
  responder: "USER" | "ADMIN"
) => {
  const formData = new FormData();
  formData.append("message", message);
  formData.append("responder", responder);

  const res = await fetch(`${API_URL}/${id}/response`, {
    method: "POST",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    body: formData,
  });

  if (!res.ok) throw new Error("Error al responder ticket");
  return await res.json();
};

// Crear ticket
export const createTicket = async (
  email: string,
  orderId: string,
  subject: string,
  description: string,
  attachments?: File[]
) => {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("orderId", orderId);
  formData.append("subject", subject);
  formData.append("description", description);

  attachments?.forEach((file) => formData.append("attachments", file));

  const res = await fetch(`${API_URL}/create`, {
    method: "POST",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    body: formData,
  });

  if (!res.ok) throw new Error("Error al crear ticket");
  return await res.json();
};