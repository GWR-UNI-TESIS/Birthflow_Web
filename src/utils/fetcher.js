// Puedes importar tus funciones de autenticación y de logout
import { useAuth } from "../contexts/auth-context";
import { api } from "../services/api";

let refreshPromise = null;

export const useFetcher = () => {
  const { refreshAccessToken, logout } = useAuth();

  const fetcher = async (url, method = "GET", body = null) => {
    let token = localStorage.getItem("accessToken");

    const getOptions = (token) => ({
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: body,
      url,
    });

    try {
      const response = await api(getOptions(token));
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        try {
          console.warn("Token expirado, intentando refrescar...");

          // Si ya hay un refresh en proceso, esperar a que termine
          if (!refreshPromise) {
            refreshPromise = refreshAccessToken()
              .finally(() => {
                refreshPromise = null;
              });
          }

          await refreshPromise;

          let newToken = localStorage.getItem("accessToken");
          const retryResponse = await api(getOptions(newToken));
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

  return { fetcher };
};
