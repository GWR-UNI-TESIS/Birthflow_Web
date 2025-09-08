// Endpoints del módulo de grupos (Share)
const GROUPS_ENDPOINTS = {
    GROUPS: {
        // Listado de grupos
        GET_LIST_GROUPS: `/api/share/groups`,

        // Crear grupo
        CREATE_GROUPS: '/api/share/group/create',

        // Actualizar grupo
        UPDATE_GROUPS: '/api/share/group/update',

        // Obtener usuarios de un grupo (normalmente por id vía query/body)
        GET_USERS_IN_GROUP: '/api/share/group/item',

        // Agregar usuarios a un grupo
        CREATE_USERS_IN_GROUP: '/api/share/group/item/create',

        // Eliminar usuarios de un grupo
        DELETE_USERS_IN_GROUP: '/api/share/group/item/delete',
    },
};

export { GROUPS_ENDPOINTS };
