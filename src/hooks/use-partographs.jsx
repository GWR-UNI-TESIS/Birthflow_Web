import useSWR from "swr";
import { useFetcher } from "../utils/fetcher";
import { PARTOGRAPH_ENDPOINTS } from "../services/partograph-service/endpoints";

const usePartographs = (filters) => {
    const { fetcher } = useFetcher();

    const fetchPartographs = async () => {
        if (!filters) return null;
        const response = await fetcher(PARTOGRAPH_ENDPOINTS.PARTOGRAPHS.SEARCH, 'POST', filters,
        );
        return response;
    };

    const { data, error, isLoading } = useSWR(filters, fetchPartographs);

    return {
        data,
        error,
        loading: isLoading,
        mutate: () => mutate(PARTOGRAPH_ENDPOINTS.GET_PARTOGRAPH(partographId)),
    };
};

export default usePartographs;