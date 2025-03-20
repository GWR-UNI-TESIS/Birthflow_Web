import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/LoginPage";
import Home from "../pages/HomePage/index";
import Welcome from "../pages/WelcomePage";
import PartographPage from "../pages/PartographPage";
import ProtectedRoute from "../components/ProtectedRoute";
import CreatePartographPage from "../pages/CreatePartographPage/index";
import LayoutGeneral from "../components/LayoutGeneral";
import CervicalDilationEditPage from "../pages/PartographPage/pages/CervicalDilationEditPage";
import MedicalSurveillanceEditPage from "../pages/PartographPage/pages/MedicalSurveillanceEditPage";
import ContractionFrequencyEditPage from "../pages/PartographPage/pages/ContractionFrequencyEditpage";
import FetalHeartRateEditPage from "../pages/PartographPage/pages/FetalHeartRateEditPage";
import PresentationPositionVarietyEditPage from "../pages/PartographPage/pages/PresentationPositionVarietyEditPage";
import EditPartographPage from "../pages/PartographPage/pages/EditPartographPage";

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
                <Route
                  path="/partograph/:partographId/edit"
                  element={
                    <ProtectedRoute>
                      <EditPartographPage />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/partograph/:partographId/cervical-dilation/:dilationId/edit"
                  element={
                    <ProtectedRoute>
                      <CervicalDilationEditPage />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/partograph/:partographId/medical-surveillance/:medicalId/edit"
                  element={
                    <ProtectedRoute>
                      <MedicalSurveillanceEditPage />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/partograph/:partographId/contraction-frequency/:contractionId/edit"
                  element={
                    <ProtectedRoute>
                      <ContractionFrequencyEditPage />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/partograph/:partographId/fetal-heart-rate/:heartRateId/edit"
                  element={
                    <ProtectedRoute>
                      <FetalHeartRateEditPage />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/partograph/:partographId/presentation-position-variety/:positionVarietyId/edit"
                  element={
                    <ProtectedRoute>
                      <PresentationPositionVarietyEditPage />
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
