import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const plainAxios = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

export const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});


export const PARTOGRAPH_API = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});


// Agrega un interceptor de respuestas para manejar errores 401
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

PARTOGRAPH_API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return PARTOGRAPH_API(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newTokens = await refreshAccessToken(); // Debe guardar nuevo token en localStorage
        const newToken = localStorage.getItem("accessToken");

        processQueue(null, newToken);
        originalRequest.headers["Authorization"] = "Bearer " + newToken;

        return PARTOGRAPH_API(originalRequest);
      } catch (err) {
        processQueue(err, null);
        logout();
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);