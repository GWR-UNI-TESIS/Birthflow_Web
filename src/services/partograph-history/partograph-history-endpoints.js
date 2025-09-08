// Endpoints del historial de partograma
const PARTOGRAPH_HISTORY_ENDPOINTS = {
    PARTOGRAPH_HISTORY: {
        // Obtener historial por ID de partograma
        GET_PARTOGRAPH_HISTORY: (partographId) => `/api/partographhistory/${partographId}`,
    },
};

export { PARTOGRAPH_HISTORY_ENDPOINTS };
