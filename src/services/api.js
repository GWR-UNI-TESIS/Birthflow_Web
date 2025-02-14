import axios from "axios";
import { useAuth } from "../contexts/auth-context";

const API_URL = import.meta.env.VITE_API_URL;

export const plainAxios = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const {refreshAccessToken, logout } = useAuth();
      try {
        const newToken = await refreshAccessToken();
        if (!newToken) throw new Error("Token no válido");
        error.config.headers.Authorization = `Bearer ${newToken}`;
        return api(error.config);
      } catch {
        logout();
      }
    }
    return Promise.reject(error);
  }
);

export default api;
