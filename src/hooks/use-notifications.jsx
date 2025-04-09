import useSWR from "swr";
import { useNotificationFetcher } from "../utils/notification-fetcher";
import { NOTIFICATION_ENDPOINTS } from "../services/notification-service/notification-endpoints";

const useNotifications = () => {
    const { fetcher } = useNotificationFetcher();

    const { data, error, isLoading } = useSWR(
        NOTIFICATION_ENDPOINTS.NOTIFICATIONS.GET_NOTIFICATIONS,
        (url) => fetcher(url, 'GET')
    );

    return {
        data,
        error,
        loading: isLoading,
    };
};

export const mutateNotifications = () =>
    globalMutate(NOTIFICATION_ENDPOINTS.NOTIFICATIONS.GET_NOTIFICATIONS);

export default useNotifications;