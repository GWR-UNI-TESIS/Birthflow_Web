import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";
import PATH from "../routes/path";
import { Spin } from "antd";

// Ruta protegida: solo permite acceso si el usuario está autenticado
const ProtectedRoute = ({ children }) => {
  const { accessToken, user, loading, authChecked } = useAuth();

  // Mientras se verifica la sesión, muestra un spinner
  if (loading && !authChecked) {
    return <Spin fullscreen tip="Verificando sesión..." />;
  }

  // Si no hay token o usuario, redirige al login
  if (!accessToken || !user) {
    return <Navigate to={PATH.LOGIN} replace />;
  }

  // Si todo está bien, renderiza la ruta protegida
  return children;
};

export default ProtectedRoute;
