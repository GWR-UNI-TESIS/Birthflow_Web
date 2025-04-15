import { api } from "../api";
import { getDeviceInfo } from "../../utils/device-id";
import { SHARE_ENDPOINTS } from "./endpoints";

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

export const searchUserGroups = async (query) => {
    try {
        const response = await api.get(
            SHARE_ENDPOINTS.SHARE.SEARCH_USERS_GROUPS, {
            headers: getCommonHeaders(),
            params: {
                query,
            },
        }
        );
        return processApiResponse(response);
    } catch (error) {
        handleApiError(error);
    }
};

export const searchUsers = async (query) => {
    try {
        const response = await api.get(
            SHARE_ENDPOINTS.SHARE.SEARCH_USERS, {
            headers: getCommonHeaders(),
            params: {
                query,
            },
        }
        );
        return processApiResponse(response);
    } catch (error) {
        handleApiError(error);
    }
};

export const assignUserGroupsToPartograph = async (partographId, permissionTypeId, list) => {
    const payload = {
        partographId,
        permissionTypeId,
        searchUserGroupDtos: list.map((item) => ({
            name: item.name,
            userId: item.type === "User" ? item.userId : null,
            groupId: item.type === "Group" ? item.groupId : null,
            type: item.type,
        })),
    };

    try {
        const response = await api.post(
            SHARE_ENDPOINTS.SHARE.ASSIGN_USERS_GROUPS,
            payload,
            { headers: getCommonHeaders() }
        );
        return processApiResponse(response);
    } catch (error) {
        handleApiError(error);
    }
};

export const getAssignedUserGroups = async (partographId) => {
    try {
        const response = await api.get(
            SHARE_ENDPOINTS.SHARE.GET_USERS_GROUPS, {
            headers: getCommonHeaders(),
            params: {
                partographId,
            },
        }
        );
        return processApiResponse(response);
    } catch (error) {
        handleApiError(error);
    }
};



