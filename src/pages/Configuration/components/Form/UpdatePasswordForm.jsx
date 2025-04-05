import React from 'react';
import { Form, Button, Input } from 'antd';

const UserForm = () => {
  const [form] = Form.useForm(); // Corrección aquí

  const handleSubmit = (values) => {
    console.log("Datos enviados:", values);
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Form.Item
        label="Nueva Contraseña"
        name="password"
        rules={[{ required: true, message: "Por favor ingrese su nueva contraseña" }]}
      >
        <Input.Password placeholder="Ingrese nueva contraseña" />
      </Form.Item>

      <Form.Item
        label="Confirmar Contraseña"
        name="confirmPassword"
        dependencies={["password"]}
        rules={[
          { required: true, message: "Confirme su nueva contraseña" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Las contraseñas no coinciden"));
            },
          }),
        ]}
      >
        <Input.Password placeholder="Confirme nueva contraseña" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Actualizar Contraseña
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserForm;
