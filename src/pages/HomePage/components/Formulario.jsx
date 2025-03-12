import "react";
import { Form, Input } from "antd"; // Asegúrate de tener Ant Design instalado

// eslint-disable-next-line react/prop-types
const MiFormulario = ({ placeholder }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Valores recibidos:", values);
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      style={{ maxWidth: 600, margin: "auto" }}
    >
      <Form.Item
        name="hora"
        rules={[{ required: true, message: "Campo requerido" }]}
      >
        <Input placeholder={placeholder} />
      </Form.Item>
    </Form>
  );
};

export default MiFormulario;
