import { api } from "../api";
import { getDeviceInfo } from "../../utils/device-id";
import { GROUPS_ENDPOINTS} from "./groups-endpoints";

// Constante para headers comunes
const HEADERS = {
  DEVICE_INFO: "Device-Info",
  AUTHORIZATION: "Authorization",
};

// Función para obtener el token de autenticación (ajústala según tu implementación)
const getAuthToken = () => {
    // Ejemplo: recuperar el token desde localStorage
    return localStorage.getItem("accessToken") || "";
  };

// Función que devuelve los headers comunes para cada solicitud, incluyendo el token si existe
const getCommonHeaders = () => {
    const token = getAuthToken();
    return {
      [HEADERS.DEVICE_INFO]: getDeviceInfo(),
      ...(token && { [HEADERS.AUTHORIZATION]: `Bearer ${token}` }),
    };
  };

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

// Función para procesar la respuesta de la API
const processApiResponse = (result) => {
  // Se asume que la respuesta tiene la forma: { statusCode, message, response }
  const { statusCode, message, response } = result.data;
  if (statusCode >= 200 && statusCode < 300) {
    return response;
  } else {
    throw new Error(message || "Error desconocido");
  }
};

// Función para listar groups
export const getListGroups = async () => {
  try {
    const response = await api.get(
      GROUPS_ENDPOINTS.GROUPS.GET_LIST_GROUPS,
      { headers: getCommonHeaders() }
    );
    return processApiResponse(response);
  } catch (error) {
    handleApiError(error);
  }
};

// Función para crear un nuevo Groups
export const createGroup = async (payload) => {
  try {
    const response = await api.post(
      GROUPS_ENDPOINTS.GROUPS.CREATE_GROUPS,
      payload,
      { headers: getCommonHeaders() }
    );
    return processApiResponse(response);
  } catch (error) {
    handleApiError(error);
  }
};