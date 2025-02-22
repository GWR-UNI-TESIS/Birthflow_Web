const API_URL = import.meta.env.VITE_API_URL;

const PARTOGRAPH_ENDPOINTS = {
    PARTOGRAPHS: {
        GET_PARTOGRAPHS: (id) => `/api/partograph/partographs/${id}`,
        SEARCH: `/api/partograph/search`
    },
};

export { PARTOGRAPH_ENDPOINTS };
