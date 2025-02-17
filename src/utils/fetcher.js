// Puedes importar tus funciones de autenticación y de logout
import { useAuth } from "../contexts/auth-context";
import { api } from "../services/api";

const fetcher = async (url, method = "GET", body = null,) => {
  let token = localStorage.getItem("accessToken");
  const options = {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    data: body, // Axios usa `data` en lugar de `body`
    url, // Axios requiere `url` en su configuración
  };

  try {
    // Intento inicial
    const response = await api(options);
    return response.data;
  } catch (error) {
    // Captura el error si no hay respuesta del servidor (error en request)
    if (error.request) {
      console.error("Error en el request:", error);
    }

    // Captura el error si el servidor responde con un código de estado 401
    if (error.response?.status === 401) {
      try {
        console.warn("Token expirado, intentando refrescar...");
        const { refreshAccessToken, logout } = useAuth();
        const newToken = await refreshAccessToken();
        if (!newToken) throw new Error("Token no válido");

        localStorage.setItem("accessToken", newToken);

        // Reintentar la solicitud con el nuevo token
        options.headers.Authorization = `Bearer ${newToken}`;
        const retryResponse = await api(options);

        return retryResponse.data;
      } catch (refreshError) {
        console.error("Error al refrescar el token:", refreshError);
        logout();
        throw new Error("No se pudo refrescar el token o sesión expirada");
      }
    }

    throw new Error(error.response?.data?.message || "Error en la solicitud");
  }
};

export default fetcher;
