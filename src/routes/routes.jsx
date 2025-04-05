import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/LoginPage";
import Configuration from "../pages/Configuration/ConfigurationApp"
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
import PartographHistoryPage from "../pages/PartographHistoryPage";
import GroupsApps from '../pages/groups/GroupsApp';
import ConfigurationApp from "../pages/Configuration/ConfigurationApp";
import UpdateUser from "../pages/Configuration/components/Form/UserInfoUpdateForm";
import PATH from './path';
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Rutas sin LayoutGeneral */}
        <Route path={PATH.WELCOME} element={<Welcome />} />
        <Route path={PATH.LOGIN} element={<Login />} />
        <Route path={PATH.USER_EDIT} element={<UpdateUser />} />
        {/* Rutas con LayoutGeneral */}
        <Route
          path="/*"
          element={
            <LayoutGeneral>
              <Routes>
                <Route
                  path={PATH.HOME}
                  element={
                    <ProtectedRoute>
                      <Home />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={PATH.CREATE_PARTOGRAPH}
                  element={
                    <ProtectedRoute>
                      <CreatePartographPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={PATH.CREATE_GROUP}
                  element={
                    <ProtectedRoute>
                      <GroupsApps />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={PATH.CONFIG}
                  element={
                    <ProtectedRoute>
                      <ConfigurationApp />
                    </ProtectedRoute>
                  }
                />


                <Route
                  path={PATH.TEMPLATE.PARTOGRAPH}
                  element={
                    <ProtectedRoute>
                      <PartographPage />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path={PATH.TEMPLATE.PARTOGRAPH_HISTORY}
                  element={
                    <ProtectedRoute>
                      <PartographHistoryPage />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path={PATH.TEMPLATE.PARTOGRAPH_EDIT}
                  element={
                    <ProtectedRoute>
                      <EditPartographPage />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path={PATH.TEMPLATE.CERVICAL_DILATION_EDIT}
                  element={
                    <ProtectedRoute>
                      <CervicalDilationEditPage />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path={PATH.TEMPLATE.MEDICAL_SURVEILLANCE_EDIT}
                  element={
                    <ProtectedRoute>
                      <MedicalSurveillanceEditPage />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path={PATH.TEMPLATE.CONTRACTION_FREQUENCY_EDIT}
                  element={
                    <ProtectedRoute>
                      <ContractionFrequencyEditPage />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path={PATH.TEMPLATE.FETAL_HEART_RATE_EDIT}
                  element={
                    <ProtectedRoute>
                      <FetalHeartRateEditPage />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path={PATH.TEMPLATE.PRESENTATION_POSITION_VARIETY_EDIT}
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
