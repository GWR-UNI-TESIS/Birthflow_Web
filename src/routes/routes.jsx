import "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/LoginPage";
import Home from "../pages/HomePage/index";
import Register from "../pages/RegisterPage";
import Welcome from "../pages/WelcomePage";
import PartographPage from "../pages/PartographPage";
import ProtectedRoute from "../components/ProtectedRoute";
import CreatePartographPage from "../pages/CreatePartographPage/index";
import Dilatacion from "../pages/PartographPage/DilatacionCervical";
import NotaParto from "../pages/PartographPage/NotaParto";
import FrecuenCF from "../pages/PartographPage/FrecueCF";
import VigilanciaM from "../pages/PartographPage/VigilanciaM";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dilatacion" element={<Dilatacion />} />
        <Route path="/notaparto" element={<NotaParto />} />
        <Route path="/frecuenciaCF" element={<FrecuenCF />} />
        <Route path="/vigilanciaM" element={<VigilanciaM />} />

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
          path="/dilatacion"
          element={
            <ProtectedRoute>
              <Dilatacion />
            </ProtectedRoute>
          }
        />

        <Route
          path="/notaparto"
          element={
            <ProtectedRoute>
              <NotaParto />
            </ProtectedRoute>
          }
        />

        <Route
          path="/frecuenciaCF"
          element={
            <ProtectedRoute>
              <FrecuenCF />
            </ProtectedRoute>
          }
        />

        <Route
          path="/vigilanciaM"
          element={
            <ProtectedRoute>
              <VigilanciaM />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
