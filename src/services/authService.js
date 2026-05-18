import { parseJsonResponse } from "./fetchUtils";
import { AUTH_ENDPOINTS } from "../config/apiConfig";

export async function loginAdmin({ username, password }) {
  const res = await fetch(`${AUTH_ENDPOINTS.LOGIN}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) throw new Error("Login failed");
  return parseJsonResponse(res); // Devuelve { token, username, roles }
}