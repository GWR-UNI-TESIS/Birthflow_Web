// Endpoints del módulo de "Share"
const SHARE_ENDPOINTS = {
    SHARE: {
        // Buscar usuarios y/o grupos
        SEARCH_USERS_GROUPS: `/api/share/search-user-group`,

        // Asignar usuarios a grupos
        // OJO: la ruta usa "asign" (sin segunda 's'); verifica si es intencional.
        ASSIGN_USERS_GROUPS: `/api/share/asign-user-group`,

        // Obtener asignaciones usuario-grupo
        GET_USERS_GROUPS: `/api/share/asign-user-group/get`,

        // Buscar usuarios
        SEARCH_USERS: `/api/share/search-user`,
    },
};

export { SHARE_ENDPOINTS };
