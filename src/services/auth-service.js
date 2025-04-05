import { plainAxios, api } from "./api";
import { getDeviceInfo } from "../utils/device-id";

// Constantes para URLs y headers
const AUTH_URLS = {
  LOGIN: "/api/auth/login",
  REFRESH: "/api/auth/refresh",
  VALIDATE_TOKEN: "/api/auth/validate-token",
};

const HEADERS = {
  DEVICE_INFO: "Device-Info",
};

// Función auxiliar para agregar los headers comunes
const getCommonHeaders = async () => {
  const deviceId = await getDeviceInfo();
  return {
    [HEADERS.DEVICE_INFO]: deviceId,
  };
};
// Función para manejar errores de la API
const handleApiError = (error) => {
  if (error.response) {
    // El servidor respondió con un código de estado fuera del rango 2xx
    const { data } = error.response;
    const errorMessage = data.message || "Error desconocido del servidor";
    throw new Error(errorMessage); // Solo lanzamos el mensaje de error
  } else if (error.request) {
    // La solicitud fue hecha pero no se recibió respuesta
    throw new Error("No se recibió respuesta del servidor");
  } else {
    // Algo salió mal al configurar la solicitud
    throw new Error("Error al configurar la solicitud: " + error.message);
  }
};

// Función para procesar la respuesta de la API
const processApiResponse = (result) => {
  const { statusCode, message, response } = result.data;

  if (statusCode >= 200 && statusCode < 300) {
    // Si el código de estado es exitoso, devolver la respuesta
    return response;
  } else {
    // Si el código de estado indica un error, lanzar un error con el mensaje
    throw new Error(`${message}`);
  }
};

export const login = async (credentials) => {
  try {
    const response = await plainAxios.post(AUTH_URLS.LOGIN, credentials, {
      headers: await getCommonHeaders(),
    });
    return processApiResponse(response); // Devuelve solo la propiedad Response
  } catch (error) {
    handleApiError(error); // Maneja el error y propaga el mensaje
  }
};

export const refreshToken = async (accessToken, refreshToken) => {
  try {
    const response = await plainAxios.post(
      AUTH_URLS.REFRESH,
      { accessToken, refreshToken },
      {
        headers: await getCommonHeaders(),
      }
    );
    return processApiResponse(response); // Devuelve solo la propiedad Response
  } catch (error) {
    handleApiError(error); // Maneja el error y propaga el mensaje
  }
};

export const validateAccessToken = async (accessToken) => {
  try {
    const response = await plainAxios.post(
      AUTH_URLS.VALIDATE_TOKEN,
      { accessToken },
      {
        headers: await getCommonHeaders(),
      }
    );
    return processApiResponse(response); // Devuelve solo la propiedad Response
  } catch (error) {
    handleApiError(error); // Maneja el error y propaga el mensaje
  }
};
