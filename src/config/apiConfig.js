/**
 * API Configuration para Admin
 * Automatically determines the API base URL based on the environment
 */

const getApiBaseUrl = () => {
  // En desarrollo (localhost)
  if (import.meta.env.DEV) {
    return 'http://localhost:8080/api';
  }

  // En producción
  return 'https://chestgames.onrender.com/api';
};

const getAuthBaseUrl = () => {
  // En desarrollo (localhost)
  if (import.meta.env.DEV) {
    return 'http://localhost:8080/auth';
  }

  // En producción
  return 'https://chestgames.onrender.com/auth';
};

export const API_BASE_URL = getApiBaseUrl();
export const AUTH_BASE_URL = getAuthBaseUrl();

// URLs específicas por servicio
export const API_ENDPOINTS = {
  PAYMENTS: `${API_BASE_URL}/payments`,
  TICKETS: `${API_BASE_URL}/tickets`,
};

export const AUTH_ENDPOINTS = {
  LOGIN: `${AUTH_BASE_URL}/login`,
};

export default API_BASE_URL;