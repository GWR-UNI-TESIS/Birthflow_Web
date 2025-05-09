
import React from 'react';
import { Form, Button, Input, Alert } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import PATH from '../../../routes/path';

const LoginComponent = ({ authError, handleLogin, loading }) => {
    const navigate = useNavigate();
    return (
        <>
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
                <Form.Item style={{ textAlign: 'center', marginBottom: 0 }}>
                    <Button type="link" onClick={() => navigate(PATH.FORGET_PASSWORD)}>
                        ¿Olvidaste tu contraseña?
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default LoginComponent;