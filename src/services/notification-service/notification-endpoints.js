
const NOTIFICATION_ENDPOINTS = {
    NOTIFICATIONS: {
        GET_NOTIFICATIONS: `/api/notification/notifications`,
        GET_PARTOGRAPH_NOTIFICATIONS: (partographId) => `/api/notification/notifications-partograph/${partographId}`,
        REGISTER_NOTIFICATION_TOKEN: '/api/notification/register-device',
        GET_NOTIFICATION_BY_TOKEN: '/api/notification/notification-token',
        SILENCE_NOTIFICATION: '/api/notification/silenced-notification',
    },
};

export { NOTIFICATION_ENDPOINTS };
