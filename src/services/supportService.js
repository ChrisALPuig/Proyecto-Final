// src/services/supportService.js
const API_URL = "http://localhost:8080/api/support";

export const getAllSupportRequests = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Error al cargar solicitudes: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const updateSupportStatus = async (id, status) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_URL}/${id}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    if (!res.ok) {
      throw new Error(`Error al actualizar estado: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};