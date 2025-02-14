import useSWR from "swr";
import api from "../api";
import { useAuth } from "../contexts/auth-context";

const useAuthFetcher = (url) => {
    const { accessToken, refreshAccessToken, logout } = useAuth();

    const fetcher = async (url) => {
        if (!accessToken) throw new Error("No access token");

        try {
            const response = await api.get(url, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return response.data;
        } catch (error) {
            if (error.response?.status === 401) {
                try {
                    const newToken = await refreshAccessToken();
                    if (!newToken) throw new Error("Token no válido");

                    const response = await api.get(url, {
                        headers: {
                            Authorization: `Bearer ${newToken}`,
                        },
                    });
                    return response.data;
                } catch {
                    logout();
                }
            }
            throw error;
        }
    };

    return useSWR(url, fetcher, { revalidateOnFocus: false });
};

export default useAuthFetcher;
