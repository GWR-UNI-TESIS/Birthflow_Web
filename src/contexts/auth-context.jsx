import React, { createContext, useContext, useState } from 'react';
import api from '../api/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() => ({
        accessToken: localStorage.getItem('accessToken'),
        refreshToken: localStorage.getItem('refreshToken'),
    }));

    const login = async (credentials) => {
        const response = await api.post('/api/auth/login', credentials);
        const { accessToken, refreshToken } = response.data;

        setAuthTokens({ accessToken, refreshToken });
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
    };

    const refreshToken = async () => {
        try {
            const response = await api.post('/api/auth/refresh', {
                refreshToken: authTokens.refreshToken,
            });
            const { accessToken } = response.data;

            setAuthTokens((prev) => ({ ...prev, accessToken }));
            localStorage.setItem('accessToken', accessToken);
        } catch (error) {
            logout();
            throw error;
        }
    };

    const logout = () => {
        setAuthTokens(null);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    };

    return (
        <AuthContext.Provider value={{ authTokens, login, refreshToken, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
