import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";
import PATH from "../routes/path";
import { Spin } from "antd";

const ProtectedRoute = ({ children }) => {
  const { accessToken, user, loading, authChecked } = useAuth();

  if (loading && !authChecked) {
    return <Spin fullscreen tip="Verificando sesión..." />;
  }

  if (!accessToken || !user) {
    return <Navigate to={PATH.LOGIN} replace />;
  }

  return children;
};

export default ProtectedRoute;
