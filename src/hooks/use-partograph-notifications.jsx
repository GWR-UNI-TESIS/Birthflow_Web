import useSWR from "swr";
import { useNotificationFetcher } from "../utils/notification-fetcher";
import { NOTIFICATION_ENDPOINTS } from "../services/notification-service/notification-endpoints";

const usePartographNotifications = (partographId) => {
    const { fetcher } = useNotificationFetcher();

    const { data, error, isLoading } = useSWR(
        NOTIFICATION_ENDPOINTS.NOTIFICATIONS.GET_PARTOGRAPH_NOTIFICATIONS(partographId),
        (url) => fetcher(url, 'GET')
    );

    return {
        data,
        error,
        loading: isLoading,
    };
};

export default usePartographNotifications;