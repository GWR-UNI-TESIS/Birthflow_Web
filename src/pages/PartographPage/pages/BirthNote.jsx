import React from "react";
import { Form, Input, Button } from "antd";

const FormularioPartograma = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Datos del formulario:", values);
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600, margin: "auto" }}
    >
      <Form.Item label="Hora" name="hora" rules={[{ required: true, message: "Por favor ingresa la hora" }]}>
        <Input placeholder="Hora" />
      </Form.Item>

      <Form.Item label="Sexo" name="sexo" rules={[{ required: true, message: "Por favor ingresa el sexo" }]}>
        <Input placeholder="Sexo" />
      </Form.Item>

      <Form.Item label="APGAR" name="apgar" rules={[{ required: true, message: "Por favor ingresa el APGAR" }]}>
        <Input placeholder="APGAR" />
      </Form.Item>

      <Form.Item label="Temperatura" name="temperatura" rules={[{ required: true, message: "Por favor ingresa la temperatura" }]}>
        <Input placeholder="Temperatura" />
      </Form.Item>

      <Form.Item label="Caputto" name="caputto" rules={[{ required: true, message: "Por favor ingresa el Caputto" }]}>
        <Input placeholder="Caputto" />
      </Form.Item>

      <Form.Item label="Circular" name="circular" rules={[{ required: true, message: "Por favor ingresa el Circular" }]}>
        <Input placeholder="Circular" />
      </Form.Item>

      <Form.Item label="Líquido Amniótico" name="liquidoAmniotico" rules={[{ required: true, message: "Por favor ingresa el líquido amniótico" }]}>
        <Input placeholder="Líquido Amniótico" />
      </Form.Item>

      <Form.Item label="Micción" name="miccion" rules={[{ required: true, message: "Por favor ingresa la micción" }]}>
        <Input placeholder="Micción" />
      </Form.Item>

      <Form.Item label="Expulsivo" name="expulsivo" rules={[{ required: true, message: "Por favor ingresa el expulsivo" }]}>
        <Input placeholder="Expulsivo" />
      </Form.Item>

      <Form.Item label="Placenta" name="placenta" rules={[{ required: true, message: "Por favor ingresa la placenta" }]}>
        <Input placeholder="Placenta" />
      </Form.Item>

      <Form.Item label="Alumbramiento" name="alumbramiento" rules={[{ required: true, message: "Por favor ingresa el alumbramiento" }]}>
        <Input placeholder="Alumbramiento" />
      </Form.Item>

      <Form.Item label="Huella Plantar" name="huellaPlantar" rules={[{ required: true, message: "Por favor ingresa la huella plantar" }]}>
        <Input placeholder="Huella Plantar" />
      </Form.Item>

      <Form.Item label="PC" name="pc" rules={[{ required: true, message: "Por favor ingresa el PC" }]}>
        <Input placeholder="PC" />
      </Form.Item>

      <Form.Item label="Talla" name="talla" rules={[{ required: true, message: "Por favor ingresa la talla" }]}>
        <Input placeholder="Talla" />
      </Form.Item>

      <Form.Item label="Brazalete" name="brazalete" rules={[{ required: true, message: "Por favor ingresa el brazalete" }]}>
        <Input placeholder="Brazalete" />
      </Form.Item>

      <Form.Item label="Huella Digital" name="huellaDigital" rules={[{ required: true, message: "Por favor ingresa la huella digital" }]}>
        <Input placeholder="Huella Digital" />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Guardar
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormularioPartograma;
