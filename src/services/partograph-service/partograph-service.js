import { api } from "../api";
import { getDeviceInfo } from "../../utils/device-id";
import { PARTOGRAPH_ENDPOINTS } from "./endpoints";
import useSWR, { mutate } from "swr";

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

// Función para crear un nuevo partograph
export const getPartograph = async (partographId) => {
  try {
    const response = await api.get(
      PARTOGRAPH_ENDPOINTS.PARTOGRAPHS.GET_PARTOGRAPH(partographId),
      { headers: getCommonHeaders() }
    );
    return processApiResponse(response);
  } catch (error) {
    handleApiError(error);
  }
};


// Función para crear un nuevo partograph
export const createPartograph = async (payload) => {
  try {
    const response = await api.post(
      PARTOGRAPH_ENDPOINTS.PARTOGRAPHS.CREATE_PARTOGRAPH,
      payload,
      { headers: getCommonHeaders() }
    );
    return processApiResponse(response);
  } catch (error) {
    handleApiError(error);
  }
};

export const updatePartograph = async (payload) => {
  try {
    const response = await api.patch(
      PARTOGRAPH_ENDPOINTS.PARTOGRAPHS.UPDATE_PARTOGRAPH,
      payload,
      { headers: getCommonHeaders() }
    );
    mutate(PARTOGRAPH_ENDPOINTS.PARTOGRAPHS.GET_PARTOGRAPH(payload.partographId));

    return processApiResponse(response);
  } catch (error) {
    handleApiError(error);
  }
};

export const deletePartograph = async (partographId) => {
  try {
    const response = await api.patch(
      PARTOGRAPH_ENDPOINTS.PARTOGRAPHS.DELETE_PARTOGRAPH(partographId),
      { headers: getCommonHeaders() }
    );
    mutate(PARTOGRAPH_ENDPOINTS.PARTOGRAPHS.GET_PARTOGRAPHS);
    return processApiResponse(response);
  } catch (error) {
    handleApiError(error);
  }
};


export const getCervicalDilation = async (id) => {
  try {
    const response = await api.get(
      PARTOGRAPH_ENDPOINTS.PARTOGRAPHS.GET_CERVICAL_DILATION(id),
      { headers: getCommonHeaders() }
    );
    return processApiResponse(response);
  } catch (error) {
    handleApiError(error);
  }
};

export const createCervicalDilation = async (payload) => {
  try {
    const response = await api.post(
      PARTOGRAPH_ENDPOINTS.PARTOGRAPHS.CREATE_CERVICAL_DILATION,
      payload,
      { headers: getCommonHeaders() }
    );
    mutate(PARTOGRAPH_ENDPOINTS.PARTOGRAPHS.GET_PARTOGRAPH(payload.partographId));
    return processApiResponse(response);
  } catch (error) {
    handleApiError(error);
  }
};

export const updateCervicalDilation = async (payload) => {
  try {
    const response = await api.patch(
      PARTOGRAPH_ENDPOINTS.PARTOGRAPHS.UPDATE_CERVICAL_DILATION,
      payload,
      { headers: getCommonHeaders() }
    );
    mutate(PARTOGRAPH_ENDPOINTS.PARTOGRAPHS.GET_PARTOGRAPH(payload.partographId));
    return processApiResponse(response);
  } catch (error) {
    handleApiError(error);
  }
};

export const deleteCervicalDilation = async (payload) => {
  try {
    const response = await api.delete(
      PARTOGRAPH_ENDPOINTS.PARTOGRAPHS.DELETE_CERVICAL_DILATION,
      payload,
      { headers: getCommonHeaders() }
    );
    mutate(PARTOGRAPH_ENDPOINTS.PARTOGRAPHS.GET_PARTOGRAPH(payload.partographId));
    return processApiResponse(response);
  } catch (error) {
    handleApiError(error);
  }
};


export const getMedicalSurveillance = async (id) => {
  try {
    const response = await api.get(
      PARTOGRAPH_ENDPOINTS.PARTOGRAPHS.GET_MEDICAL_SURVEILLANCE(id),
      { headers: getCommonHeaders() }
    );
    return processApiResponse(response);
  } catch (error) {
    handleApiError(error);
  }
};

export const createMedicalSurveillance = async (payload) => {
  try {
    const response = await api.post(
      PARTOGRAPH_ENDPOINTS.PARTOGRAPHS.CREATE_MEDICAL_SURVEILLANCE,
      payload,
      { headers: getCommonHeaders() }
    );
    mutate(PARTOGRAPH_ENDPOINTS.PARTOGRAPHS.GET_PARTOGRAPH(payload.partographId));
    return processApiResponse(response);
  } catch (error) {
    handleApiError(error);
  }
};

export const updateMedicalSurveillance = async (payload) => {
  try {
    const response = await api.patch(
      PARTOGRAPH_ENDPOINTS.PARTOGRAPHS.UPDATE_MEDICAL_SURVEILLANCE,
      payload,
      { headers: getCommonHeaders() }
    );
    mutate(PARTOGRAPH_ENDPOINTS.PARTOGRAPHS.GET_PARTOGRAPH(payload.partographId));
    return processApiResponse(response);
  } catch (error) {
    handleApiError(error);
  }
};

export const deleteMedicalSurveillance = async (payload) => {
  try {
    const response = await api.delete(
      PARTOGRAPH_ENDPOINTS.PARTOGRAPHS.DELETE_MEDICAL_SURVEILLANCE,
      payload,
      { headers: getCommonHeaders() }
    );
    mutate(PARTOGRAPH_ENDPOINTS.PARTOGRAPHS.GET_PARTOGRAPH(payload.partographId));
    return processApiResponse(response);
  } catch (error) {
    handleApiError(error);
  }
};

export const getPresentationPositionVariety = async (id) => {
  try {
    const response = await api.get(
      PARTOGRAPH_ENDPOINTS.PARTOGRAPHS.GET_PRESENTATION_POSITION_VARIETY(id),
      { headers: getCommonHeaders() }
    );
    return processApiResponse(response);
  } catch (error) {
    handleApiError(error);
  }
};


export const createPresentationPositionVariety = async (payload) => {
  try {
    const response = await api.post(
      PARTOGRAPH_ENDPOINTS.PARTOGRAPHS.CREATE_PRESENTATION_POSITION_VARIETY,
      payload,
      { headers: getCommonHeaders() }
    );
    mutate(PARTOGRAPH_ENDPOINTS.PARTOGRAPHS.GET_PARTOGRAPH(payload.partographId));
    return processApiResponse(response);
  } catch (error) {
    handleApiError(error);
  }
};

export const updatePresentationPositionVariety = async (payload) => {
  try {
    const response = await api.patch(
      PARTOGRAPH_ENDPOINTS.PARTOGRAPHS.UPDATE_PRESENTATION_POSITION_VARIETY,
      payload,
      { headers: getCommonHeaders() }
    );
    mutate(PARTOGRAPH_ENDPOINTS.PARTOGRAPHS.GET_PARTOGRAPH(payload.partographId));
    return processApiResponse(response);
  } catch (error) {
    handleApiError(error);
  }
};

export const deletePresentationPositionVariety = async (payload) => {
  try {
    const response = await api.delete(
      PARTOGRAPH_ENDPOINTS.PARTOGRAPHS.DELETE_PRESENTATION_POSITION_VARIETY,
      payload,
      { headers: getCommonHeaders() }
    );
    mutate(PARTOGRAPH_ENDPOINTS.PARTOGRAPHS.GET_PARTOGRAPH(payload.partographId));
    return processApiResponse(response);
  } catch (error) {
    handleApiError(error);
  }
};

export const getFetalHeartRate = async (id) => {
  try {
    const response = await api.get(
      PARTOGRAPH_ENDPOINTS.PARTOGRAPHS.GET_FETAL_HEART_RATE(id),
      { headers: getCommonHeaders() }
    );
    return processApiResponse(response);
  } catch (error) {
    handleApiError(error);
  }
};

export const createFetalHeartRate = async (payload) => {
  try {
    const response = await api.post(
      PARTOGRAPH_ENDPOINTS.PARTOGRAPHS.CREATE_FETAL_HEART_RATE,
      payload,
      { headers: getCommonHeaders() }
    );
    mutate(PARTOGRAPH_ENDPOINTS.PARTOGRAPHS.GET_PARTOGRAPH(payload.partographId));
    return processApiResponse(response);
  } catch (error) {
    handleApiError(error);
  }
};

export const updateFetalHeartRate = async (payload) => {
  try {
    const response = await api.delete(
      PARTOGRAPH_ENDPOINTS.PARTOGRAPHS.UPDATE_FETAL_HEART_RATE,
      payload,
      { headers: getCommonHeaders() }
    );
    mutate(PARTOGRAPH_ENDPOINTS.PARTOGRAPHS.GET_PARTOGRAPH(payload.partographId));

    return processApiResponse(response);
  } catch (error) {
    handleApiError(error);
  }
};

export const getContractionsFrequency = async (id) => {
  try {
    const response = await api.get(
      PARTOGRAPH_ENDPOINTS.PARTOGRAPHS.GET_CONTRACTIONS_FREQUENCY(id),
      { headers: getCommonHeaders() }
    );
    return processApiResponse(response);
  } catch (error) {
    handleApiError(error);
  }
};

export const createContractionsFrequency = async (payload) => {
  try {
    const response = await api.post(
      PARTOGRAPH_ENDPOINTS.PARTOGRAPHS.CREATE_CONTRACTIONS_FREQUENCY,
      payload,
      { headers: getCommonHeaders() }
    );
    mutate(PARTOGRAPH_ENDPOINTS.PARTOGRAPHS.GET_PARTOGRAPH(payload.partographId));
    return processApiResponse(response);
  } catch (error) {
    handleApiError(error);
  }
};

export const updateContractionsFrequency = async (payload) => {
  try {
    const response = await api.patch(
      PARTOGRAPH_ENDPOINTS.PARTOGRAPHS.UPDATE_CONTRACTIONS_FREQUENCY,
      payload,
      { headers: getCommonHeaders() }
    );
    mutate(PARTOGRAPH_ENDPOINTS.PARTOGRAPHS.GET_PARTOGRAPH(payload.partographId));
    return processApiResponse(response);
  } catch (error) {
    handleApiError(error);
  }
};

export const createBirthNote = async (payload) => {
  try {
    const response = await api.post(
      PARTOGRAPH_ENDPOINTS.PARTOGRAPHS.CREATE_BIRTH_NOTE,
      payload,
      { headers: getCommonHeaders() }
    );
    mutate(PARTOGRAPH_ENDPOINTS.PARTOGRAPHS.GET_PARTOGRAPH(payload.partographId));
    return processApiResponse(response);
  } catch (error) {
    handleApiError(error);
  }
};

export const updateBirthNote = async (payload) => {
  try {
    const response = await api.patch(
      PARTOGRAPH_ENDPOINTS.PARTOGRAPHS.UPDATE_BIRTH_NOTE,
      payload,
      { headers: getCommonHeaders() }
    );
    mutate(PARTOGRAPH_ENDPOINTS.PARTOGRAPHS.GET_PARTOGRAPH(payload.partographId));
    return processApiResponse(response);
  } catch (error) {
    handleApiError(error);
  }
};


export const updatePartographState = async (payload) => {
  try {
    const response = await api.patch(
      PARTOGRAPH_ENDPOINTS.PARTOGRAPHS.UPDATE_PARTOGRAPH_STATE,
      payload,
      { headers: getCommonHeaders() }
    );
    mutate(PARTOGRAPH_ENDPOINTS.PARTOGRAPHS.GET_PARTOGRAPH(payload.partographId));
    return processApiResponse(response);
  } catch (error) {
    handleApiError(error);
  }
};



