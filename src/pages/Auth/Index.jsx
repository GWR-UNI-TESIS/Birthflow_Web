import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";
import {
  Form,
  Input,
  Button,
  Alert,
  Spin,
  message,
  Divider,
} from "antd";
import { v4 as uuidv4 } from "uuid";
import PATH from "../../routes/path";
import { motion, AnimatePresence } from "framer-motion";
import logo from '../../assets/imagen-login.jpg';
import LoginComponent from "./components/LoginComponent";
import RegisterComponent from "./components/RegisterComponent";

const AuthPage = () => {
  const { login, register, authError, setAuthError, loading, accessToken } = useAuth();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const hasAnimatedOnce = useRef(false);

  const handleLogin = async (values) => {
    try {
      setAuthError(null);
      var result = await login(values);
      if (result.success) {
        navigate(PATH.HOME);
      }
    } catch (error) {
      setAuthError(error.message);
    }
  };

  const handleRegister = async (values) => {
    try {
      setAuthError(null);
      const userData = {
        id: uuidv4(),
        name: values.name,
        secondName: values.secondName,
        userName: values.username,
        email: values.email,
        phoneNumber: values.phoneNumber,
      };
      const result = await register(userData);
      if (result.success) {
        message.success(
          "Tu solicitud será revisada por un administrador. Te llegará un correo con la resolución.",
          5
        );
      } else {
        setAuthError(result.message || "Error en el registro.");
      }
    } catch (error) {
      setAuthError(error.message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: "100vh",
        width: "100%",
      }}
    >
      {/* Columna de la imagen */}
      <div
        className="auth-image-container"
        style={{
          flex: 1,
          backgroundColor: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",

        }}
      >
        <motion.img
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          src={logo}
          alt="Birthflow"
          style={{
            width: "100%",
            height: "100%",
            resizeMode: 'stretch',
            objectFit: "contain",
          }}
        />
      </div>
      <Divider type="vertical" style={{ height: '100%' }} className="auth-image-container" />
      {/* Formulario */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          backgroundColor: "#fff",
        }}
        className="login-container"
      >
        <div
          style={{
            width: "100%",
            maxWidth: "400px",
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "30px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            backgroundColor: "#fff",
          }}
        >
          <Spin spinning={loading} fullscreen tip={"Cargando ....."} />

          <AnimatePresence mode="wait">

            <motion.div
              initial={!hasAnimatedOnce.current ? { opacity: 0, x: 50 } : false}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              onAnimationComplete={() => { hasAnimatedOnce.current = true; }}
            >{ }
              {isLogin ? <LoginComponent authError={authError} handleLogin={handleLogin} loading={loading} /> : <RegisterComponent authError={authError} handleRegister={handleRegister} loading={loading} />}
            </motion.div>

          </AnimatePresence>

          <Button type="link" onClick={() => setIsLogin(!isLogin)} block>
            {isLogin
              ? "¿No tienes cuenta? Regístrate aquí"
              : "¿Ya tienes cuenta? Inicia sesión aquí"}
          </Button>
        </div>
      </div>

      {/* Estilos responsivos */}
      <style>
        {`
        @media (max-width: 768px) {
          div[style*="flex-direction: row"] {
            flex-direction: column !important;
          }

          div[style*="background-color: #eaeaea"] {
            height: 200px;
          }
          
          .auth-image-container {
            display: none !important;
            visibility: hidden !important; 
          }
          
          .login-containerr {
            flex-direction: column;
          }
        }
        `}
      </style>
    </div>
  );

};

export default AuthPage;