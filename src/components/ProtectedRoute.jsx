import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";
import PATH from "../routes/path";
import { Spin } from "antd";

const ProtectedRoute = ({ children }) => {
    const { accessToken, user, loading } = useAuth();
  
    if (loading) {
      return <Spin fullscreen tip="Cargando"/>; // 🔒 Evita que entre mientras validás
    }
  
    if (!accessToken || !user) {
      return <Navigate to={PATH.LOGIN} replace />;
    }
  
    return children;
  };
  
export default ProtectedRoute;
