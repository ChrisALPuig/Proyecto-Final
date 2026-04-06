const API_URL = "http://localhost:8080/api/support";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const getAllSupportRequests = async () => {
  const res = await fetch(API_URL, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) throw new Error("Error al cargar solicitudes");
  return await res.json();
};

export const updateSupportStatus = async (id, status) => {
  const res = await fetch(`${API_URL}/${id}/status`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify({ status }),
  });

  if (!res.ok) throw new Error("Error al actualizar estado");
  return await res.json();
};

// ✅ RESPONDER
export const replyToSupport = async (id, message) => {
  const res = await fetch(`${API_URL}/${id}/reply`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ message }),
  });

  if (!res.ok) throw new Error("Error al responder");
  return await res.json();
};

// ✅ MENSAJES
export const getMessages = async (id) => {
  const res = await fetch(`${API_URL}/${id}/messages`, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) throw new Error("Error al cargar mensajes");
  return await res.json();
};

export const deleteSupport = async (id) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Error al eliminar");
};