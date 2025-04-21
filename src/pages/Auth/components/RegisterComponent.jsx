

import React from 'react';
import { Form, Button, Input, Alert } from 'antd';

const RegisterComponent = ({ authError, handleRegister, loading }) => {

    return (
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
        </>
    );
};

export default RegisterComponent;