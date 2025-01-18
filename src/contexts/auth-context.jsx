import React, { createContext, useContext, useState } from 'react';
import api from '../api/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken'));
    const [isAuthenticated, setIsAuthenticated] = useState(!!accessToken);
    const [authError, setAuthError] = useState(null);

    useEffect(() => {
        const interceptor = axios.interceptors.request.use(
            async (config) => {
                if (accessToken) {
                    config.headers.Authorization = `Bearer ${accessToken}`;
                }

                try {
                    // Check if token is expired
                    await axios.post(`${process.env.REACT_APP_API_URL}/auth/verify-token`, {
                        token: accessToken,
                    });
                } catch (error) {
                    if (error.response?.status === 401) {
                        try {
                            await refreshAccessToken();
                        } catch (refreshError) {
                            handleAuthError();
                        }
                    }
                }

                return config;
            },
            (error) => Promise.reject(error)
        );

        return () => {
            axios.interceptors.request.eject(interceptor);
        };
    }, [accessToken]);

    const login = async (credentials) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, credentials);
            const { accessToken, refreshToken } = response.data;

            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            setAccessToken(accessToken);
            setRefreshToken(refreshToken);
            setIsAuthenticated(true);
        } catch (error) {
            throw new Error('Login failed.');
        }
    };


    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setAccessToken(null);
        setRefreshToken(null);
        setIsAuthenticated(false);
    };

    const refreshAccessToken = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/refresh-token`, {
                refreshToken,
            });

            const { accessToken: newAccessToken } = response.data;
            localStorage.setItem('accessToken', newAccessToken);
            setAccessToken(newAccessToken);
        } catch (error) {
            throw new Error('Failed to refresh access token.');
        }
    };
    const handleAuthError = () => {
        setAuthError('Session expired. Please log in again.');
        logout();
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                accessToken,
                login,
                logout,
                authError,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
