import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
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
import ArchivePartographsPage from "../pages/ArchivePage/index";
import PartographReadOnlyPage from "../pages/PartographReadOnlyPage/index";
import GroupsApps from '../pages/groups/index';
import ConfigurationApp from "../pages/Configuration/ConfigurationApp";
import UpdateUser from "../pages/Configuration/components/Form/UserInfoUpdateForm";
import PATH from './path';
import AuthPage from "../pages/Auth/Index";
import { AnimatePresence } from "framer-motion";
import UsersInGroup from "../pages/groups/pages/UsersInGroup";



const InnerRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Rutas sin LayoutGeneral */}
        <Route path={PATH.WELCOME} element={<PageWrapper><Welcome /></PageWrapper>} />
        <Route path={PATH.LOGIN} element={<PageWrapper><AuthPage /></PageWrapper>} />
        <Route path={PATH.USER_EDIT} element={<PageWrapper><UpdateUser /></PageWrapper>} />

        {/* Rutas con LayoutGeneral */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <LayoutGeneral>
                <Routes location={location} key={location.pathname}>
                  <Route path={PATH.ARCHIVED} element={<PageWrapper><ArchivePartographsPage /></PageWrapper>} />
                  <Route path={PATH.HOME} element={<PageWrapper><Home /></PageWrapper>} />
                  <Route path={PATH.CREATE_PARTOGRAPH} element={<PageWrapper><CreatePartographPage /></PageWrapper>} />
                  <Route path={PATH.GROUPS} element={<PageWrapper><GroupsApps /></PageWrapper>} />
                  <Route path={PATH.TEMPLATE.USERS_IN_GROUP} element={<PageWrapper><UsersInGroup /></PageWrapper>} />
                  <Route path={PATH.CONFIG} element={<PageWrapper><ConfigurationApp /></PageWrapper>} />
                  <Route path={PATH.TEMPLATE.PARTOGRAPH} element={<PageWrapper><PartographPage /></PageWrapper>} />
                  <Route path={PATH.TEMPLATE.PARTOGRAPH_READ_ONLY} element={<PageWrapper><PartographReadOnlyPage /></PageWrapper>} />
                  <Route path={PATH.TEMPLATE.PARTOGRAPH_HISTORY} element={<PageWrapper><PartographHistoryPage /></PageWrapper>} />
                  <Route path={PATH.TEMPLATE.PARTOGRAPH_EDIT} element={<PageWrapper><EditPartographPage /></PageWrapper>} />
                  <Route path={PATH.TEMPLATE.CERVICAL_DILATION_EDIT} element={<PageWrapper><CervicalDilationEditPage /></PageWrapper>} />
                  <Route path={PATH.TEMPLATE.MEDICAL_SURVEILLANCE_EDIT} element={<PageWrapper><MedicalSurveillanceEditPage /></PageWrapper>} />
                  <Route path={PATH.TEMPLATE.CONTRACTION_FREQUENCY_EDIT} element={<PageWrapper><ContractionFrequencyEditPage /></PageWrapper>} />
                  <Route path={PATH.TEMPLATE.FETAL_HEART_RATE_EDIT} element={<PageWrapper><FetalHeartRateEditPage /></PageWrapper>} />
                  <Route path={PATH.TEMPLATE.PRESENTATION_POSITION_VARIETY_EDIT} element={<PageWrapper><PresentationPositionVarietyEditPage /></PageWrapper>} />
                </Routes>
              </LayoutGeneral>
            </ProtectedRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  );

}
const AppRoutes = () => {
  return (
    <Router>
      <InnerRoutes />
    </Router>
  );
};

export default AppRoutes;
