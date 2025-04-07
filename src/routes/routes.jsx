import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import AuthPage from "../pages/Auth/Index";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Rutas sin LayoutGeneral */}
        <Route path={PATH.WELCOME} element={<Welcome />} />
        <Route path={PATH.LOGIN} element={<AuthPage />} />
        <Route path={PATH.USER_EDIT} element={<UpdateUser />} />
        {/* Rutas con LayoutGeneral */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <LayoutGeneral>
                <Routes>
                  <Route
                    path={PATH.HOME}
                    element={
                      <Home />
                    }
                  />
                  <Route
                    path={PATH.CREATE_PARTOGRAPH}
                    element={
                      <CreatePartographPage />
                    }
                  />
                  <Route
                    path={PATH.CREATE_GROUP}
                    element={
                      <GroupsApps />
                    }
                  />
                  <Route
                    path={PATH.CONFIG}
                    element={
                      <ConfigurationApp />
                    }
                  />

                  <Route
                    path={PATH.TEMPLATE.PARTOGRAPH}
                    element={
                      <PartographPage />
                    }
                  />

                  <Route
                    path={PATH.TEMPLATE.PARTOGRAPH_HISTORY}
                    element={
                      <PartographHistoryPage />
                    }
                  />

                  <Route
                    path={PATH.TEMPLATE.PARTOGRAPH_EDIT}
                    element={
                      <EditPartographPage />
                    }
                  />

                  <Route
                    path={PATH.TEMPLATE.CERVICAL_DILATION_EDIT}
                    element={
                      <CervicalDilationEditPage />
                    }
                  />

                  <Route
                    path={PATH.TEMPLATE.MEDICAL_SURVEILLANCE_EDIT}
                    element={
                      <MedicalSurveillanceEditPage />
                    }
                  />

                  <Route
                    path={PATH.TEMPLATE.CONTRACTION_FREQUENCY_EDIT}
                    element={
                      <ContractionFrequencyEditPage />
                    }
                  />

                  <Route
                    path={PATH.TEMPLATE.FETAL_HEART_RATE_EDIT}
                    element={
                      <FetalHeartRateEditPage />
                    }
                  />

                  <Route
                    path={PATH.TEMPLATE.PRESENTATION_POSITION_VARIETY_EDIT}
                    element={
                      <PresentationPositionVarietyEditPage />
                    }
                  />
                </Routes>
              </LayoutGeneral>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
