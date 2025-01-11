import api from '../api/api';
import { useAuth } from '../contexts/auth-context';

export const useAxios = () => {
    const { refreshToken, logout } = useAuth();

    api.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;

            if (error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;

                try {
                    await refreshToken();
                    const accessToken = localStorage.getItem('accessToken');
                    originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
                    return api(originalRequest);
                } catch (err) {
                    logout();
                    throw err;
                }
            }

            return Promise.reject(error);
        }
    );

    return api;
};
