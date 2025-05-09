import { api } from "../api";
import { getDeviceInfo } from "../../utils/device-id";
import { RESET_PASSWORD_ENDPOINTS} from "./endpoints";
import useSWR, { mutate } from "swr";

// Constante para headers comunes
const HEADERS = {
  DEVICE_INFO: "Device-Info",
};



// Función que devuelve los headers comunes para cada solicitud, incluyendo el token si existe
const getCommonHeaders = () => {
  return {
    [HEADERS.DEVICE_INFO]: getDeviceInfo(),
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


// 🔐 Enviar código de reseteo
export const requestResetCode = async (email) => {
  try {
    const result = await api.post(
      RESET_PASSWORD_ENDPOINTS.RESET_PASSWORD.REQUEST_RESET_CODE,
      { email },
      { headers: getCommonHeaders() }
    );
    return processApiResponse(result);
  } catch (error) {
    handleApiError(error);
  }
};

// ✅ Validar OTP
export const validateOtp = async ({ userId, otpCode }) => {
  try {
    const result = await api.post(
      RESET_PASSWORD_ENDPOINTS.RESET_PASSWORD.VALIDATE_OTP,
      { userId, otpCode },
      { headers: getCommonHeaders() }
    );
    return processApiResponse(result);
  } catch (error) {
    handleApiError(error);
  }
};

// 🔄 Cambiar contraseña
export const resetPassword = async ({ userId, otpCode, newPassword }) => {
  try {
    const result = await api.post(
      RESET_PASSWORD_ENDPOINTS.RESET_PASSWORD.RESET_PASSWORD,
      { userId, otpCode, newPassword },
      { headers: getCommonHeaders() }
    );
    return processApiResponse(result);
  } catch (error) {
    handleApiError(error);
  }
};



