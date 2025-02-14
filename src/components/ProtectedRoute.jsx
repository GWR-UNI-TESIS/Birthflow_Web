import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";

const ProtectedRoute = ({ children }) => {
    const { accessToken, loading } = useAuth();

    if (loading) return <p>Cargando...</p>;

    return accessToken ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;