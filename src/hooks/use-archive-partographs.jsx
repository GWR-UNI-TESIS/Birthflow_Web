import useSWR from "swr";
import { useFetcher } from "../utils/fetcher";
import { PARTOGRAPH_ENDPOINTS } from "../services/partograph-service/endpoints";

const useArchivePartographs = (userId) => {
    const { fetcher } = useFetcher();

    const shouldFetch = !!userId; // evita llamada si no hay userId

    const { data, error, isLoading } = useSWR(
        shouldFetch ? PARTOGRAPH_ENDPOINTS.PARTOGRAPHS.GET_PARTOGRAPHS_ARCHIVED(userId) : null,
        (url) => fetcher(url, 'GET')
    );

    return {
        data,
        error,
        loading: isLoading,
    };
};

export default useArchivePartographs;