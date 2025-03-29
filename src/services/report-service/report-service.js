// src/services/partograph/getPartographPdf.js
import { api } from "../api";
import { getDeviceInfo } from "../../utils/device-id";
import { REPORT_ENDPOINTS } from "./endpoint";


// Función para manejar errores de la API
const handleApiError = (error) => {
    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      const { data } = error.response;
      const errorMessage = data.message || "Error desconocido del servidor";
      throw new Error(errorMessage);
    } else if (error.request) {
      // La solicitud fue hecha pero no se recibió respuesta
      throw new Error("No se recibió respuesta del servidor");
    } else {
      // Error al configurar la solicitud
      throw new Error("Error al configurar la solicitud: " + error.message);
    }
  };

  
const getAuthToken = () => {
    return localStorage.getItem("accessToken") || "";
};

const getCommonHeaders = () => {
    const token = getAuthToken();
    return {
        "Device-Info": getDeviceInfo(),
        ...(token && { Authorization: `Bearer ${token}` }),
        Accept: "application/pdf",
    };
};

export const getPartographPdf = async (partographId) => {
    try {
        const response = await api.get( REPORT_ENDPOINTS.REPORT.GET_PARTOGRAPH_REPORT(partographId), {
            headers: getCommonHeaders(),
            responseType: "blob",
        });
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};