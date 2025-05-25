import React, { createContext, useState, useEffect, useContext, useMemo } from "react";
import { notification } from "antd";
import {
    login as loginService,
    refreshToken as refreshService,
    validateAccessToken as validateAccessTokenService,
    register as registerService
} from "../services/auth-service";
import { updateUserInfo } from "../services/account-services/account-service";

import { messaging, getToken, onMessage } from "../utils/firebase";
import { registerNotificationToken } from "../services/notification-service/notification-service";
import { mutate } from "swr";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refreshToken"));
    const [authError, setAuthError] = useState(null);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

    const [authChecked, setAuthChecked] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isTemporalPassword, setIsTemporalPassword] = useState(false);

    const [enabled, setEnabled] = React.useState(true);
    const [threshold, setThreshold] = React.useState(3);
    const [api, contextHolder] = notification.useNotification({
        stack: enabled
            ? {
                threshold,
            }
            : false,
    });

    useEffect(() => {
        const setupNotifications = async () => {
            if (!authChecked || !user || !accessToken) return;

            if (!user) return;

            try {
                const permission = await Notification.requestPermission();

                if (permission !== "granted") {
                    console.warn("Permiso de notificaciones no otorgado:", permission);
                    return;
                }
                const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");

                const currentToken = await getToken(messaging, {
                    vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
                    serviceWorkerRegistration: registration,
                });

                if (currentToken) {
                    // Siempre registrar el token actual al backend
                    await registerNotificationToken({
                        userId: user.id,
                        token: currentToken,
                        deviceInfo: "WEB",
                    });

                    localStorage.setItem("device_token", currentToken);

                    //  Escuchar notificaciones en primer plano
                    onMessage(messaging, (payload) => {
                        const { title, body } = payload.notification || {};

                        api.open({
                            message: title ?? "Nueva notificación",
                            description: body ?? "",
                            placement: "topRight",
                            duration: 5,
                            showProgress: true,
                        });
                    });
                }
            } catch (err) {
                console.error("Error configurando notificaciones FCM:", err);
            }
        };

        setupNotifications();
    }, [authChecked, user, accessToken]);

    useEffect(() => {
        const init = async () => {
            setLoading(true);
            if (!accessToken || accessToken === "null") {
                setAuthChecked(true); // ← importante
                setLoading(false);
                return false;
            };
            try {
                await handleTokenValidation();
            } catch (err) {
                logout();
            } finally {
                setLoading(false);
                setAuthChecked(true); // ← marcar como ya verificado
            }
        };

        init();
    }, []);

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
        localStorage.removeItem("device_token");
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
                if (!newToken)
                    logout();;
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
            updateTokens(response.response);
            setIsTemporalPassword(response.message.includes('Temporal'));
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

    const register = async ({ id, name, secondName, userName, email, phoneNumber }) => {
        setLoading(true);
        try {
            const response = await registerService({ id, name, secondName, userName, email, phoneNumber });
            setAuthError(null);
            return { success: true, message: response.message };
        } catch (error) {
            const errorMessage = error.message || "Error al registar el usuario, vuelva a intentarlo mas tarde";
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
            const updatedUser = await updateUserInfo(updatedUserData);
            localStorage.setItem("user", JSON.stringify(updatedUser));
            setUser(prev => ({ ...prev, ...updatedUser }));
        } catch (error) {
            console.error("Error al actualizar el usuario:", error);
        }
    };

    //  Cerrar sesión
    const logout = () => {
        clearAuthData();
        mutate(() => true, undefined, { revalidate: false });
    };

    //  Memorizar el contexto para evitar renders innecesarios
    const value = useMemo(() => ({
        user,
        setUser,
        register,
        updateUser,
        isTemporalPassword,
        accessToken,
        authChecked,
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
