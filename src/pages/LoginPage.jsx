import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/auth-context';
import { Form, Input, Button, Alert, Spin, Card } from 'antd';

const LoginPage = () => {
    const { login, authError, setAuthError, loading } = useAuth();
    const navigate = useNavigate();


    const handleLogin = async (values) => {
        try {
            setAuthError(null); // Clear previous error before attempting login 
            await login(values);
            navigate('/');
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <Card style={{margin:"100px"}}>

            <Spin spinning={loading} fullscreen />


            <h2>Login</h2>
            {authError && (
                <Alert message="Error" description={authError} type="error" showIcon style={{ marginBottom: 20 }} />
            )}
            <Form
                name="login"
                onFinish={handleLogin}
                layout="vertical"
            >
                <Form.Item
                    label="Username"
                    name="email"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input placeholder="Enter your username" />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password placeholder="Enter your password" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block disabled={loading}>
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default LoginPage;