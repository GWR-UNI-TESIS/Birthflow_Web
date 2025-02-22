import useSWR from "swr";
import { useFetcher } from "../utils/fetcher";
import { NOTIFICATION_ENDPOINTS } from "../services/notification-service";

const useNotifications = () => {
    const { fetcher } = useFetcher();

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

export default useNotifications;