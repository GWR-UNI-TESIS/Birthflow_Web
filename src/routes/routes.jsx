import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/LoginPage";
import Home from "../pages/HomePage/index";
import Register from "../pages/RegisterPage";
import Welcome from "../pages/WelcomePage";
import PartographPage from "../pages/PartographPage";
import ProtectedRoute from "../components/ProtectedRoute";
import CreatePartographPage from "../pages/CreatePartographPage/index";
import LayoutGeneral from "../components/LayoutGeneral"; // Importa tu layout

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Rutas sin LayoutGeneral */}
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas con LayoutGeneral */}
        <Route
          path="/*"
          element={
            <LayoutGeneral>
              <Routes>
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
                  path="/partograph/:partographId"
                  element={
                    <ProtectedRoute>
                      <PartographPage />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </LayoutGeneral>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
