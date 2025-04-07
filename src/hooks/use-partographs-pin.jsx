import useSWR from "swr";
import { useFetcher } from "../utils/fetcher";
import { PARTOGRAPH_ENDPOINTS } from "../services/partograph-service/endpoints";

const usePartographsPin = (userId) => {
    const { fetcher } = useFetcher();

    const { data, error, isLoading } = useSWR(
        PARTOGRAPH_ENDPOINTS.PARTOGRAPHS.GET_PARTOGRAPHS_PIN(userId),
        (url) => fetcher(url, 'GET')
    );

    return {
        data,
        error,
        loading: isLoading,
    };
};

export default usePartographsPin;