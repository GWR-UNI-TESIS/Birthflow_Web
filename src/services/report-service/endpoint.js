// Endpoints del módulo de reportes
const REPORT_ENDPOINTS = {
    REPORT: {
        // Genera la imagen del partograma por ID
        GET_PARTOGRAPH_REPORT: (partographId) => `/api/report/generate-partograph-image/${partographId}`,
    },
};

export { REPORT_ENDPOINTS };
