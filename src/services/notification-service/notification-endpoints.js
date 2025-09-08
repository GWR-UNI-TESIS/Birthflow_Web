// Endpoints del módulo de notificaciones
const NOTIFICATION_ENDPOINTS = {
    NOTIFICATIONS: {
        // Listar todas las notificaciones del usuario
        GET_NOTIFICATIONS: `/api/notification/notifications`, // (podría ser string normal; se deja template por consistencia)

        // Listar notificaciones asociadas a un partograma
        GET_PARTOGRAPH_NOTIFICATIONS: (partographId) =>
            `/api/notification/notifications-partograph/${partographId}`,

        // Registrar token de dispositivo para push
        REGISTER_NOTIFICATION_TOKEN: '/api/notification/register-device',

        // Obtener información por token de notificación
        GET_NOTIFICATION_BY_TOKEN: '/api/notification/notification-token',

        // Silenciar notificaciones
        SILENCE_NOTIFICATION: '/api/notification/silenced-notification',
    },
};

export { NOTIFICATION_ENDPOINTS };
