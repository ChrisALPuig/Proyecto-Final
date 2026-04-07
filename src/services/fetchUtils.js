export const parseJsonResponse = async (res) => {
  const text = await res.text();
  if (!text) return null;

  const contentType = res.headers.get("content-type") || "";
  if (!contentType.includes("application/json") && !contentType.includes("text/json")) {
    throw new Error(
      `Respuesta inesperada del servidor: ${res.status} ${res.statusText} (${contentType}). Contenido: ${text.slice(0, 500)}`
    );
  }

  try {
    return JSON.parse(text);
  } catch (error) {
    const cleanedText = text.replace(/[\u0000-\u001F\u2028\u2029]+/g, "");
    try {
      return JSON.parse(cleanedText);
    } catch (innerError) {
      throw new Error(
        `Error al parsear JSON de la respuesta: ${error.message}. Intento limpiado: ${innerError.message}. Contenido: ${text.slice(0, 500)}`
      );
    }
  }
};
