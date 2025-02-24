const PARTOGRAPH_ENDPOINTS = {
    PARTOGRAPHS: {
        GET_PARTOGRAPHS: (id) => `/api/partograph/partographs/${id}`,
        SEARCH: `/api/partograph/search`,
        CREATE_PARTOGRAPH: '/api/partograph/create',
        GET_PARTOGRAPH: (partographId) => `/api/partograph/partograph/${partographId}`,
    },
};

export { PARTOGRAPH_ENDPOINTS };
