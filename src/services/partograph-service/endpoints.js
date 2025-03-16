const PARTOGRAPH_ENDPOINTS = {
    PARTOGRAPHS: {
        GET_PARTOGRAPHS: (id) => `/api/partograph/partographs/${id}`,
        SEARCH: `/api/partograph/search`,
        GET_PARTOGRAPH: (partographId) => `/api/partograph/partograph/${partographId}`,
        CREATE_PARTOGRAPH: '/api/partograph/create',
        UPDATE_PARTOGRAPH: '/api/partograph/update',
        DELETE_PARTOGRAPH: (partographId) => `/api/partograph/delete/${partographId}`,
        UPDATE_PARTOGRAPH_STATE: '/api/partograph/update/state',
        GET_CERVICAL_DILATION: (id) => `/api/partograph/cervical-dilation/${id}`,
        CREATE_CERVICAL_DILATION: '/api/partograph/create/cervical-dilation',
        UPDATE_CERVICAL_DILATION: '/api/partograph/update/cervical-dilation',
        DELETE_CERVICAL_DILATION: '/api/partograph/delete/cervical-dilation',
        CREATE_MEDICAL_SURVEILLANCE: '/api/partograph/create/medical-surveillance-table',
        UPDATE_MEDICAL_SURVEILLANCE: '/api/partograph/create/medical-surveillance-table',
        DELETE_MEDICAL_SURVEILLANCE: '/api/partograph/delete/medical-surveillance-table',
        CREATE_PRESENTATION_POSITION_VARIETY: '/api/partograph/create/presentation-position-variety',
        UPDATE_PRESENTATION_POSITION_VARIETY: '/api/partograph/update/presentation-position-variety',
        DELETE_PRESENTATION_POSITION_VARIETY: '/api/partograph/update/presentation-position-variety',
        CREATE_FETAL_HEART_RATE: '/api/partograph/create/fetal-heart-rate',
        UPDATE_FETAL_HEART_RATE: '/api/partograph/update/fetal-heart-rate',
        CREATE_CONTRACTIONS_FREQUENCY: '/api/partograph/create/contraction-frequency',
        UPDATE_CONTRACTIONS_FREQUENCY: '/api/partograph/update/contraction-frequency',
        CREATE_BIRTH_NOTE: '/api/partograph/create/childbirth-note',
        UPDATE_BIRTH_NOTE: '/api/partograph/update/childbirth-note',
    },
};

export { PARTOGRAPH_ENDPOINTS };
