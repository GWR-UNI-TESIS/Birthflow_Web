const REPORT_ENDPOINTS = {
    REPORT: {
        GET_PARTOGRAPH_REPORT: (partographId) => `/api/report/generate-partograph-image/${partographId}`,
    },
};

export { REPORT_ENDPOINTS };