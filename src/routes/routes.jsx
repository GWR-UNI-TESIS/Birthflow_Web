import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/LoginPage';
import Home from '../pages/HomePage';
import Register from '../pages/RegisterPage';
import Welcome from '../pages/WelcomePage';
import ProtectedRoute from '../components/ProtectedRoute';
import { useAuth } from '../contexts/auth-context';
const AppRoutes = () => {

  const { login, logout } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;