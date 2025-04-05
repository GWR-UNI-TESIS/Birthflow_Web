import React, { createContext, useState, useEffect, useContext, useMemo } from "react";
import { login as loginService, refreshToken as refreshService, validateAccessToken as validateAccessTokenService } from "../services/auth-service";
import { updateUserInfo } from "../services/account-services/account-service";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refreshToken"));
    const [authError, setAuthError] = useState(null);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
    const [loading, setLoading] = useState(false);



    useEffect(() => {
        if (accessToken) {
            handleTokenValidation();
        }
    }, [accessToken]); //  Solo ejecuta cuando `accessToken` cambia

    //  Función para actualizar tokens en el estado y localStorage
    const updateTokens = ({ accessToken, refreshToken, user }) => {
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        setUser(user);
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("user", JSON.stringify(user));
    };

    //  Función para limpiar datos de autenticación
    const clearAuthData = () => {
        setAccessToken(null);
        setRefreshToken(null);
        setUser(null);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
    };

    //  Validar y refrescar token si es necesario
    const handleTokenValidation = async () => {
        try {
            const isValid = await validateAccessToken();
            if (!isValid) {
                const newToken = await refreshAccessToken();
                if (!newToken) throw new Error("No se pudo refrescar el token");
            }
        } catch (error) {
            console.error("Error en la validación del token:", error);
            logout();
        }
    };

    //  Validar si el `accessToken` sigue siendo válido
    const validateAccessToken = async () => {
        if (!accessToken) return false;
        try {
            return await validateAccessTokenService(accessToken);
        } catch {
            return false;
        }
    };

    //  Refrescar `accessToken`
    const refreshAccessToken = async () => {
        if (!refreshToken) return null;
        try {
            const response = await refreshService(accessToken, refreshToken);
            updateTokens(response);
            return response;
        } catch (error) {
            console.error("Error al refrescar token:", error);
            logout();
            return null;
        }
    };

    //  Iniciar sesión
    const login = async ({ email, password }) => {
        setLoading(true);
        try {
            const response = await loginService({ email, password });
            updateTokens(response);
            setAuthError(null);
            return { success: true, message: response.message };
        } catch (error) {
            const errorMessage = error.message || "Error al iniciar sesión";
            setAuthError(errorMessage);
            clearAuthData();
            return { success: false, message: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    // Función para actualizar el usuario en la API y en el contexto
    const updateUser = async (updatedUserData) => {
        try {

            console.log("Antes de editar", user);            
            const updatedUser = await updateUserInfo(updatedUserData);
            localStorage.setItem("user", JSON.stringify(updatedUser));
            setUser(prev => ({ ...prev, ...updatedUser }));          
            console.log("despues de editar", updatedUser);
        } catch (error) {
            console.error("Error al actualizar el usuario:", error);
        }
    };

    //  Cerrar sesión
    const logout = () => {
        clearAuthData();
    };

    //  Memorizar el contexto para evitar renders innecesarios
    const value = useMemo(() => ({
        user,
        setUser,
        updateUser,
        accessToken,
        refreshAccessToken,
        login,
        logout,
        validateAccessToken,
        authError,
        setAuthError,
        loading,
    }), [accessToken, authError, loading, user]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
