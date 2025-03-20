import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";
import { Form, Input, Button, Alert, Spin, Card } from "antd";

const AuthPage = () => {
  const { login, register, authError, setAuthError, loading, accessToken } =
    useAuth();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true); // Estado para alternar entre login y registro

  const handleLogin = async (values) => {
    try {
      setAuthError(null);
      await login(values);
      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleRegister = async (values) => {
    try {
      setAuthError(null);
      await register(values);
      navigate("/");
    } catch (error) {
      setAuthError(error.message);
    }
  };

  useEffect(() => {
    if (accessToken) navigate("/");
  }, [accessToken]);

  return (
    <>
      <div
        style={{ display: "flex", justifyContent: "center", margin: "50px 0" }}
      >
        <Card className="auth-card" hoverable>
          <Spin spinning={loading} fullscreen />

          <div
            style={{
              fontSize: "1.5em",
              fontWeight: "bold",
              marginBottom: "20px",
              textAlign: "center",
              color: "#1890ff",
            }}
          >
            <h2 className="auth-title">
              {isLogin ? "Iniciar Sesión" : "Registro"}
            </h2>
          </div>

          {authError && (
            <Alert
              message="Error"
              description={authError}
              type="error"
              showIcon
              style={{ marginBottom: 20 }}
            />
          )}
          <Form
            name={isLogin ? "login" : "register"}
            onFinish={isLogin ? handleLogin : handleRegister}
            layout="vertical"
          >
            {!isLogin && (
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Por favor ingresa tu email!" },
                ]}
              >
                <Input placeholder="Ingresa tu email" />
              </Form.Item>
            )}

            <Form.Item
              label="Nombre de Usuario"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Por favor ingresa tu nombre de usuario!",
                },
              ]}
            >
              <Input placeholder="Ingresa tu nombre de usuario" />
            </Form.Item>

            <Form.Item
              label="Contraseña"
              name="password"
              rules={[
                { required: true, message: "Por favor ingresa tu contraseña!" },
              ]}
            >
              <Input.Password placeholder="Ingresa tu contraseña" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading}>
                {isLogin ? "Iniciar Sesión" : "Registrarse"}
              </Button>
            </Form.Item>
          </Form>

          <Button type="link" onClick={() => setIsLogin(!isLogin)}>
            {isLogin
              ? "¿No tienes cuenta? Regístrate aquí"
              : "¿Ya tienes cuenta? Inicia sesión aquí"}
          </Button>
        </Card>
      </div>
    </>
  );
};

export default AuthPage;
