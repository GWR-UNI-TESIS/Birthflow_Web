const PATH = {
    // Rutas estáticas
    WELCOME: '/welcome',
    LOGIN: '/login',
    FORGET_PASSWORD: '/forget-password',
    USER_EDIT: '/config/userEdit',
    HOME: '/',
    ARCHIVED: '/partographs/archived',
    CONFIG: '/config',
    CREATE_PARTOGRAPH: '/create-partograph',
    GROUPS: '/groups',
  
    // Rutas con parámetros (para uso en navegación)
    PARTOGRAPH: (id) => `/partograph/${id}`,
    PARTOGRAPH_READ_ONLY: (id) => `/partograph/read-only/${id}`,
    PARTOGRAPH_EDIT: (id) => `/partograph/${id}/edit`,
    PARTOGRAPH_HISTORY: (id) => `/partograph/${id}/history`,
    CERVICAL_DILATION_EDIT: (partographId, dilationId) => `/partograph/${partographId}/cervical-dilation/${dilationId}/edit`,
    MEDICAL_SURVEILLANCE_EDIT: (partographId, medicalId) => `/partograph/${partographId}/medical-surveillance/${medicalId}/edit`,
    CONTRACTION_FREQUENCY_EDIT: (partographId, contractionId) => `/partograph/${partographId}/contraction-frequency/${contractionId}/edit`,
    FETAL_HEART_RATE_EDIT: (partographId, heartRateId) => `/partograph/${partographId}/fetal-heart-rate/${heartRateId}/edit`,
    PRESENTATION_POSITION_VARIETY_EDIT: (partographId, positionVarietyId) => `/partograph/${partographId}/presentation-position-variety/${positionVarietyId}/edit`,
    USERS_IN_GROUP: (id) => `/groups/${id}/users`,
    // Plantillas de rutas (para Router)
    TEMPLATE: {
      PARTOGRAPH: '/partograph/:partographId',
      PARTOGRAPH_READ_ONLY: '/partograph/read-only/:partographId',
      PARTOGRAPH_EDIT: '/partograph/:partographId/edit',
      PARTOGRAPH_HISTORY: '/partograph/:partographId/history',
      CERVICAL_DILATION_EDIT: '/partograph/:partographId/cervical-dilation/:dilationId/edit',
      MEDICAL_SURVEILLANCE_EDIT: '/partograph/:partographId/medical-surveillance/:medicalId/edit',
      CONTRACTION_FREQUENCY_EDIT: '/partograph/:partographId/contraction-frequency/:contractionId/edit',
      FETAL_HEART_RATE_EDIT: '/partograph/:partographId/fetal-heart-rate/:heartRateId/edit',
      PRESENTATION_POSITION_VARIETY_EDIT: '/partograph/:partographId/presentation-position-variety/:positionVarietyId/edit',
      USERS_IN_GROUP: '/groups/:groupId/users',
    },
  };
  
  
export default PATH;