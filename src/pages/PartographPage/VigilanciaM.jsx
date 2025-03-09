import { Button, Form, Input, Select, Space } from "antd";
import Btr from "../HomePage/components/Btr";
import MiFormulario from "../HomePage/components/Formulario";

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 34 },
    sm: { span: 14 },
  },
};

const Notaparto = () => {
  const [form] = Form.useForm();
  return (
    <>
      <Btr />
      <Form
        {...formItemLayout}
        form={form}
        style={{ maxWidth: 600, margin: "auto" }}
      >
        <Form.Item rules={[{ required: true, message: "Campo requerido" }]}>
          <Input placeholder="Tiempo" />
        </Form.Item>

        <Form.Item
          name={["Lat.Derecho", "Lat.Izquierdo", "Frecuencia"]}
          noStyle
          rules={[{ required: true, message: "Campo requerido" }]}
        >
          <Select
            placeholder="Seleccione"
            style={{ width: "50%", margin: "auto" }}
          >
            <Option value="Lat.Derecho">Lat. Derecho</Option>
            <Option value="Lat.Izquierdo">Lat. Izquierdo</Option>
            <Option value="Frecuencia">Frecuencia</Option>
          </Select>
        </Form.Item>

        <Space.Compact>
          <Input style={{ width: "50%", margin: "auto" }} placeholder=" " />
          <span
            style={{
              fontSize: "1.1em",
              fontWeight: "bold",
              color: "black",
              padding: "8px",
              marginRight: "2px",
            }}
          >
            X
          </span>
          <Input style={{ width: "50%", margin: "auto" }} placeholder=" " />
        </Space.Compact>

        <MiFormulario placeholder="vaca" />

        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Guardar
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Notaparto;
