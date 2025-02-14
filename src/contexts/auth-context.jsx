import React, { createContext, useState, useEffect, useContext } from "react";
import { login as loginService, refreshToken as refreshService, validateAccessToken as validateAccessTokenService } from "../services/auth-service";
import { plainAxios } from "../services/api";
import { getDeviceInfo } from "../utils/device-id";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken") || null);
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refreshToken") || null);
    const [authError, setAuthError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (accessToken) {
            handleTokenValidation();
        }
    }, []);

    // 🔹 Validar o refrescar el token
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

    // Validar si el accessToken sigue siendo válido
    const validateAccessToken = async () => {
        if (!accessToken) return false;
        try {
            const { message, response, statusCode } = await validateAccessTokenService(accessToken);
            return response;
        } catch {
            return false;
        }
    };

    // Refrescar Token
    const refreshAccessToken = async () => {
        if (!accessToken || !refreshToken) return null;
        try {
            const newAccessToken = await refreshService(accessToken, refreshToken);
            setAccessToken(newAccessToken);
            localStorage.setItem("accessToken", newAccessToken);
            return newAccessToken;
        } catch {
            logout();
            return null;
        }
    };

    // 🔹 Iniciar sesión
    const login = async (userLogin) => {
        setLoading(true); // Activar el estado de carga
        try {
          // Llamar al servicio de login
          const response = await loginService({
            email: userLogin.email,
            password: userLogin.password,
          });
      
          // Si la respuesta es exitosa, actualizar el estado y localStorage
          setAccessToken(response.accessToken);
          setRefreshToken(response.refreshToken);
          localStorage.setItem("accessToken", response.accessToken);
          localStorage.setItem("refreshToken", response.refreshToken);
      
          // Limpiar el error de autenticación
          setAuthError(null);
      
          // Devolver el mensaje de éxito
          return { success: true, message: response.message };
        } catch (error) {
      
          // Establecer el mensaje de error
          const errorMessage = error.message || "Error al iniciar sesión";
          setAuthError(errorMessage);
      
          setAccessToken(null);
          setRefreshToken(null);
          localStorage.setItem("accessToken", null);
          localStorage.setItem("refreshToken", null);
          // Devolver el mensaje de error
          return { success: false, message: errorMessage };
        } finally {
          setLoading(false); // Desactivar el estado de carga
        }
      };

    // 🔹 Cerrar sesión
    const logout = () => {
        setAccessToken(null);
        setRefreshToken(null);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
    };

    return (
        <AuthContext.Provider
            value={{ accessToken, refreshAccessToken, login, logout, validateAccessToken, authError, setAuthError, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
