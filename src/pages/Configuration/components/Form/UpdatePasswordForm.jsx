import React from 'react';
import { Form, Button, Input, message } from 'antd';
import { updateUserPassword } from "../../../../services/account-services/account-service";

const UserForm = () => {
  const [form] = Form.useForm();

  const handleClick = async () => {
    console.log('handleClick ejecutado');

    try {
      const values = await form.validateFields();
      console.log('Valores del formulario:', values);

      const payload = {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      };

      console.log('Llamando a updateUserPassword con:', payload);
      await updateUserPassword(payload);
      message.success("Contraseña actualizada exitosamente");
      form.resetFields();
    } catch (error) {
      console.error('Error en handleClick:', error);
      if (error?.errorFields) {
        return;
      }
      message.error(error.message || "Error al actualizar la contraseña");
    }
  };

  return (
    <Form form={form} layout="vertical">
      <Form.Item
        label="Contraseña Actual"
        name="oldPassword"
        rules={[{ required: true, message: "Ingrese su contraseña actual" }]}
      >
        <Input.Password placeholder="Ingrese su contraseña actual" />
      </Form.Item>

      <Form.Item
        label="Nueva Contraseña"
        name="newPassword"
        rules={[
          { required: true, message: "Ingrese la nueva contraseña" },
          {
            min: 6,
            message: "La nueva contraseña debe tener al menos 6 caracteres",
          },
        ]}
      >
        <Input.Password placeholder="Ingrese nueva contraseña" />
      </Form.Item>

      <Form.Item
        label="Confirmar Contraseña"
        name="confirmPassword"
        dependencies={["newPassword"]}
        rules={[
          { required: true, message: "Confirme la nueva contraseña" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("newPassword") === value) {
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
        <Button type="primary" onClick={handleClick}> 
          Actualizar Contraseña
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserForm;