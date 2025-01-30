import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Instancia de Axios para solicitudes protegidas
const api = axios.create({
  baseURL: API_URL,
});

// Instancia de Axios para solicitudes públicas (login, refresh token)
const plainAxios = axios.create({
  baseURL: API_URL,
});

export { api, plainAxios };