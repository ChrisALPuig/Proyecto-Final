// src/services/paymentService.js
const API_URL = "http://localhost:8080/api/payments";

export const getAllPayments = async () => {
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
      throw new Error(`Error al cargar pagos: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};