import useSWR from "swr";
import { useFetcher } from "../utils/fetcher";
import { PARTOGRAPH_ENDPOINTS } from "../services/partograph-service/endpoints";

const usePartograh = (partographId) => {
    const { fetcher } = useFetcher();

    const { data, error, isLoading } = useSWR(
        PARTOGRAPH_ENDPOINTS.PARTOGRAPHS.GET_PARTOGRAPH(partographId),
        (url) => fetcher(url, 'GET')
    );

    return {
        data,
        error,
        loading: isLoading,
    };
};

export default usePartograh;