// Endpoints del módulo de Partograma (agrupados por recurso)
const PARTOGRAPH_ENDPOINTS = {
    PARTOGRAPHS: {
        // Listas (por usuario): todos, fijados, archivados
        GET_PARTOGRAPHS: (id) => `/api/partograph/partographs/${id}`,
        GET_PARTOGRAPHS_PIN: (id) => `/api/partograph/partographs/pin/${id}`,
        GET_PARTOGRAPHS_ARCHIVED: (id) => `/api/partograph/partographs/archived/${id}`,

        // Búsqueda global
        SEARCH: `/api/partograph/search`,

        // Partograma (CRUD básico y estado)
        GET_PARTOGRAPH: (partographId) => `/api/partograph/partograph/${partographId}`,
        CREATE_PARTOGRAPH: '/api/partograph/create',
        UPDATE_PARTOGRAPH: '/api/partograph/update',
        DELETE_PARTOGRAPH: (partographId) => `/api/partograph/delete/${partographId}`,
        UPDATE_PARTOGRAPH_STATE: '/api/partograph/update/state',

        // Dilatación cervical
        GET_CERVICAL_DILATION: (id) => `/api/partograph/cervical-dilation/${id}`,
        CREATE_CERVICAL_DILATION: '/api/partograph/create/cervical-dilation',
        UPDATE_CERVICAL_DILATION: '/api/partograph/update/cervical-dilation',
        DELETE_CERVICAL_DILATION: '/api/partograph/delete/cervical-dilation',

        // Vigilancia médica (tabla)
        GET_MEDICAL_SURVEILLANCE: (medicalId) => `/api/partograph/medical-surveillance-table/${medicalId}`,
        CREATE_MEDICAL_SURVEILLANCE: '/api/partograph/create/medical-surveillance-table',
        UPDATE_MEDICAL_SURVEILLANCE: '/api/partograph/update/medical-surveillance-table',
        DELETE_MEDICAL_SURVEILLANCE: '/api/partograph/delete/medical-surveillance-table',

        // Variedad de posición de la presentación
        GET_PRESENTATION_POSITION_VARIETY: (id) => `/api/partograph/presentation-position-variety/${id}`,
        CREATE_PRESENTATION_POSITION_VARIETY: '/api/partograph/create/presentation-position-variety',
        UPDATE_PRESENTATION_POSITION_VARIETY: '/api/partograph/update/presentation-position-variety',
        DELETE_PRESENTATION_POSITION_VARIETY: '/api/partograph/delete/presentation-position-variety',

        // Frecuencia cardiaca fetal
        GET_FETAL_HEART_RATE: (id) => `/api/partograph/fetal-heart-rate/${id}`,
        CREATE_FETAL_HEART_RATE: '/api/partograph/create/fetal-heart-rate',
        UPDATE_FETAL_HEART_RATE: '/api/partograph/update/fetal-heart-rate',

        // Frecuencia de contracciones
        GET_CONTRACTIONS_FREQUENCY: (id) => `/api/partograph/contraction-frequency/${id}`,
        CREATE_CONTRACTIONS_FREQUENCY: '/api/partograph/create/contraction-frequency',
        UPDATE_CONTRACTIONS_FREQUENCY: '/api/partograph/update/contraction-frequency',

        // Nota de parto
        CREATE_BIRTH_NOTE: '/api/partograph/create/childbirth-note',
        UPDATE_BIRTH_NOTE: '/api/partograph/update/childbirth-note',
    },
};

export { PARTOGRAPH_ENDPOINTS };
