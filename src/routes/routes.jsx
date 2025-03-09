import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/LoginPage';
import Home from '../pages/HomePage/index';
import Register from '../pages/RegisterPage';
import Welcome from '../pages/WelcomePage';
import PartographPage from '../pages/PartographPage';
import ProtectedRoute from '../components/ProtectedRoute';
import { useAuth } from '../contexts/auth-context';
import CreatePartographPage from '../pages/CreatePartographPage/index';
import GroupsApps from '../pages/groups/GroupsApp';

const AppRoutes = () => {

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
                <Route
                    path="/create-partograph"
                    element={
                        <ProtectedRoute>
                            <CreatePartographPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/create-group"
                    element={
                        <ProtectedRoute>
                            <GroupsApps/>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/partograph/:partographId"
                    element={
                        <ProtectedRoute>
                            <PartographPage />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
};

export default AppRoutes;