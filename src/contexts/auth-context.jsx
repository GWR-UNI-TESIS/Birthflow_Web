import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const getDeviceInfo = () => {
    const userAgent = navigator.userAgent;
    const platform = navigator.platform;
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;

    return `Platform: ${platform}; User-Agent: ${userAgent}; Screen: ${screenWidth}x${screenHeight}`;
};


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
                        await refreshAccessToken();
                        error.config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
                        error.config.headers['Device-Info'] = getDeviceInfo();
                        return axios(error.config);
                    } catch (refreshError) {
                        setAuthError(refreshError.response?.data?.message || 'Failed to refresh access token.');
                        handleAuthError();
                        return Promise.reject(refreshError);
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
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, credentials, {
                headers: {
                    'Device-Info': getDeviceInfo(),
                },
            });

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

    const refreshAccessToken = async () => {
        try {
            setLoading(true);
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/refresh`, {
                accessToken,
                refreshToken,
            }, {
                headers: {
                    'Device-Info': getDeviceInfo(),
                },
            });

            const { accessToken: newAccessToken } = response.data;
            localStorage.setItem('accessToken', newAccessToken);
            setAccessToken(newAccessToken);
            return true;
        } catch (error) {
            setAuthError(error.response?.data?.message || 'Failed to refresh access token.');
            throw new Error('Failed to refresh access token.');
        } finally {
            setLoading(false);
        }
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
