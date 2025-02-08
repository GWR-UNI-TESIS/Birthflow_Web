import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { login as loginService, refreshToken as refreshService } from "../services/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken'));
    const [isAuthenticated, setIsAuthenticated] = useState(!!accessToken);
    const [authError, setAuthError] = useState(null);
    const [loginMessage, setLoginMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [tokenCheckRunning, setTokenCheckRunning] = useState(false); // Avoid multiple calls

    useEffect(() => {
        const interceptor = axios.interceptors.response.use(
            (response) => response,
            async (error) => {
                if (error.response?.status === 401 && !error.config._retry) {
                    error.config._retry = true;
                    try {
                        setLoading(true);
                        const { accessToken: newAccessToken } = await refreshService(
                            accessToken,
                            refreshToken
                        );
                        localStorage.setItem("accessToken", newAccessToken);
                        setAccessToken(newAccessToken);
                        error.config.headers.Authorization = `Bearer ${newAccessToken}`;
                        return api(error.config);
                    } catch (refreshError) {
                        setAuthError(refreshError.response?.data?.message || 'Failed to refresh access token.');
                        handleAuthError();
                        return Promise.reject(refreshError);
                    } finally {
                        setLoading(false);
                    }
                }
                setAuthError(error.response?.data?.message || 'An error occurred.');
                return Promise.reject(error);
            }
        );

        return () => {
            axios.interceptors.response.eject(interceptor);
        };
    }, [refreshToken]);

    const validateAccessToken = async () => {
        try {
            setLoading(true);
            await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/validate-token`, {
                accessToken: accessToken,
            }, {
                headers: {
                    'Device-Info': getDeviceInfo(),
                },
            });
            return true;
        } catch (error) {
            return false;
        } finally {
            setLoading(false);
        }
    };

    const login = async (credentials) => {
        try {
            setLoading(true);
            const response = await loginService(credentials);

            const { statusCode, message, response: responseData } = response.data;

            if (statusCode === 200) {
                setLoginMessage(message);
                const { accessToken, refreshToken } = responseData;

                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
                setAccessToken(accessToken);
                setRefreshToken(refreshToken);
                setIsAuthenticated(true);
                setAuthError(null);
            } else {
                throw new Error(message);
            }
        } catch (error) {
            setAuthError(error.response?.data?.message || 'Login failed.');
            throw new Error(error.response?.data?.message || 'Login failed.');
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setAccessToken(null);
        setRefreshToken(null);
        setIsAuthenticated(false);
    };


    const handleAuthError = () => {
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
                setAuthError,
                loginMessage,
                loading,
                validateAccessToken,
                refreshAccessToken,
                tokenCheckRunning,
                setTokenCheckRunning,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
