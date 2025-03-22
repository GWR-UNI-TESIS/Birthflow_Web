
const NOTIFICATION_ENDPOINTS = {
    NOTIFICATIONS: {
        GET_NOTIFICATIONS: `/api/notification/notifications`,
        GET_PARTOGRAPH_NOTIFICATIONS: (partographId)=> `/api/notification/notifications-partograph/${partographId}`,
    },
};

export { NOTIFICATION_ENDPOINTS };
