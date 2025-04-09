
const NOTIFICATION_ENDPOINTS = {
    NOTIFICATIONS: {
        GET_NOTIFICATIONS: `/api/notification/notifications`,
        GET_PARTOGRAPH_NOTIFICATIONS: (partographId)=> `/api/notification/notifications-partograph/${partographId}`,
        REGISTER_NOTIFICATION_TOKEN: '/api/notification/register-device',
    },
};

export { NOTIFICATION_ENDPOINTS };
