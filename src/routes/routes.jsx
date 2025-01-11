import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import { useAuth } from '../contexts/auth-context';

const PrivateRoute = ({ children }) => {
    const { authTokens } = useAuth();
    return authTokens ? children : <Navigate to="/login" />;
};

const AppRoutes = () => (
    <Router>
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/home" element={<PrivateRoute><HomePage /></PrivateRoute>} />
            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    </Router>
);

export default AppRoutes;
