// src/services/paymentService.js
import { parseJsonResponse } from "./fetchUtils";
import { API_ENDPOINTS } from "../config/apiConfig";

export const getAllPayments = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(API_ENDPOINTS.PAYMENTS, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Error al cargar pagos: ${res.status}`);
    }

    return await parseJsonResponse(res);
  } catch (err) {
    console.error(err);
    throw err;
  }
};