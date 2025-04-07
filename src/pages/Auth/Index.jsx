import { useEffect, useState } from "react";
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

const AuthPage = () => {
  const { login, register, authError, setAuthError, loading, accessToken } = useAuth();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const handleLogin = async (values) => {
    try {
      setAuthError(null);
      await login(values);
      navigate(PATH.HOME);
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
      <Divider type="vertical" style={{ height: '100%' }}  className="auth-image-container" />
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
            {isLogin ? (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <h2 style={{ textAlign: "center", color: "#1890ff" }}>Iniciar Sesión</h2>
                {authError && (
                  <Alert
                    message="Error"
                    description={authError}
                    type="error"
                    showIcon
                    closable
                    style={{ marginBottom: 20 }}
                  />
                )}
                <Form name="login" onFinish={handleLogin} layout="vertical">
                  <Form.Item
                    label="Nombre de Usuario o email"
                    name="email"
                    rules={[
                      { required: true, message: "Por favor ingresa tu nombre de usuario!" },
                    ]}
                  >
                    <Input placeholder="Ingresa tu nombre de usuario" />
                  </Form.Item>

                  <Form.Item
                    label="Contraseña"
                    name="password"
                    rules={[{ required: true, message: "Por favor ingresa tu contraseña!" }]}
                  >
                    <Input.Password placeholder="Ingresa tu contraseña" />
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit" block loading={loading}>
                      Iniciar Sesión
                    </Button>
                  </Form.Item>
                </Form>
              </motion.div>
            ) : (
              <motion.div
                key="register"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <h2 style={{ textAlign: "center", color: "#1890ff" }}>Registro</h2>
                {authError && (
                  <Alert
                    message="Error"
                    description={authError}
                    type="error"
                    showIcon
                    style={{ marginBottom: 20 }}
                  />
                )}
                <Form name="register" onFinish={handleRegister} layout="vertical">
                  <Form.Item label="Nombre" name="name" rules={[{ required: true }]}>
                    <Input placeholder="Ingresa tu nombre" />
                  </Form.Item>

                  <Form.Item label="Apellido" name="secondName" rules={[{ required: true }]}>
                    <Input placeholder="Ingresa tu apellido" />
                  </Form.Item>

                  <Form.Item label="Email" name="email" rules={[{ required: true }]}>
                    <Input placeholder="Ingresa tu email" />
                  </Form.Item>

                  <Form.Item label="Nombre de Usuario" name="username" rules={[{ required: true }]}>
                    <Input placeholder="Ingresa tu nombre de usuario" />
                  </Form.Item>

                  <Form.Item label="Número de Teléfono" name="phoneNumber" rules={[{ required: true }]}>
                    <Input type="number" placeholder="Ingresa tu número de teléfono" />
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit" block loading={loading}>
                      Registrarse
                    </Button>
                  </Form.Item>
                </Form>
              </motion.div>
            )}
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