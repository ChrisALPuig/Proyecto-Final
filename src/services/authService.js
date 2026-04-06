const API_URL = "http://localhost:8080/auth";

export async function loginAdmin({ username, password }) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) throw new Error("Login failed");
  return res.json(); // Devuelve { token, username, roles }
}