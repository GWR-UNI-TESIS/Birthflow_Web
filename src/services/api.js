import axios from "axios";
import { useAuth } from "../contexts/auth-context";

const API_URL = import.meta.env.VITE_API_URL;

export const plainAxios = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

export const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});
