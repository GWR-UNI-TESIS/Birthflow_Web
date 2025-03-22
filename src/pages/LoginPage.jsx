import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";
import { Form, Input, Button, Alert, Spin, Card } from "antd";
import { v4 as uuidv4 } from "uuid";

const AuthPage = () => {
  const { login, register, authError, setAuthError, loading, accessToken } = useAuth();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const handleLogin = async (values) => {
    try {
      setAuthError(null);
      await login(values);
      navigate("/");
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
      await register(userData);
      navigate("/");
    } catch (error) {
      setAuthError(error.message);
    }
  };

  useEffect(() => {
    if (accessToken) navigate("/");
  }, [accessToken, navigate]);

  return (
    <div style={{ display: "flex", justifyContent: "center", margin: "50px 0" }}>
      <Card className="auth-card" hoverable style={{ padding: "20px", width: "400px" }}>
        <Spin spinning={loading} fullscreen />

        {isLogin ? (
          <>
            <h2 style={{ textAlign: "center", color: "#1890ff" }}>Iniciar Sesión</h2>
            {authError && (
              <Alert
                message="Error"
                description={authError}
                type="error"
                showIcon
                style={{ marginBottom: 20 }}
              />
            )}
            <Form name="login" onFinish={handleLogin} layout="vertical">
              <Form.Item
                label="Nombre de Usuario o email"
                name="email"
                rules={[{ required: true, message: "Por favor ingresa tu nombre de usuario!" }]}
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
          </>
        ) : (
          <>
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
              <Form.Item label="Nombre" name="name" rules={[{ required: true, message: "Por favor ingresa tu nombre!" }]}> 
                <Input placeholder="Ingresa tu nombre" />
              </Form.Item>
              
              <Form.Item label="Segundo Nombre" name="secondName" rules={[{ required: true, message: "Por favor ingresa tu segundo nombre!" }]}> 
                <Input placeholder="Ingresa tu segundo nombre" />
              </Form.Item>
              
              <Form.Item label="Email" name="email" rules={[{ required: true, message: "Por favor ingresa tu email!" }]}> 
                <Input placeholder="Ingresa tu email" />
              </Form.Item>

              <Form.Item label="Nombre de Usuario" name="username" rules={[{ required: true, message: "Por favor ingresa tu nombre de usuario!" }]}> 
                <Input placeholder="Ingresa tu nombre de usuario" />
              </Form.Item>
              
              <Form.Item label="Número de Teléfono" name="phoneNumber" rules={[{ required: true, message: "Por favor ingresa tu número de teléfono!" }]}> 
                <Input type="number" placeholder="Ingresa tu número de teléfono" />
              </Form.Item>
              
              <Form.Item>
                <Button type="primary" htmlType="submit" block loading={loading}>
                  Registrarse
                </Button>
              </Form.Item>
            </Form>
          </>
        )}

        <Button type="link" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "¿No tienes cuenta? Regístrate aquí" : "¿Ya tienes cuenta? Inicia sesión aquí"}
        </Button>
      </Card>
    </div>
  );
};

export default AuthPage;
