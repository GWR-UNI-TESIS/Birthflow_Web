import { api } from "../api";
import { getDeviceInfo } from "../../utils/device-id";
import { NOTIFICATION_ENDPOINTS } from "./notification-endpoints";


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

export const registerNotificationToken = async (payload) => {
    try {
        const response = await api.post(NOTIFICATION_ENDPOINTS.NOTIFICATIONS.REGISTER_NOTIFICATION_TOKEN,
            payload, {
            headers: getCommonHeaders(),
        });
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

export const getNotificationByToken = async (token) => {
    try {
        const response = await api.get(NOTIFICATION_ENDPOINTS.NOTIFICATIONS.GET_NOTIFICATION_BY_TOKEN, {
            params: { token },
            headers: getCommonHeaders(),
        });
        return response.data.response;
    } catch (error) {
        handleApiError(error);
    }
};

export const updateDeviceSilenceStatus = async (token, isSilenced) => {
    try {
        const response = await api.post(NOTIFICATION_ENDPOINTS.NOTIFICATIONS.SILENCE_NOTIFICATION, null, {
            params: { token, isSilenced },
            headers: getCommonHeaders(),
        });
        return response.data.response;
    } catch (error) {
        handleApiError(error);
    }
};