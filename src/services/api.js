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
