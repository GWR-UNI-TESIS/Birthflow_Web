import { api } from "../services/api";

export const useNotificationFetcher = () => {
    const fetcher = async (url, method = "GET", body = null) => {
        let token = localStorage.getItem("accessToken");

        const getOptions = (token) => ({
            method,
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            data: body,
            url,
        });

        try {
            const response = await api(getOptions(token));
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || "Error en la solicitud");
        }
    };


    return { fetcher };
};
