import { Button, Form } from "antd";
import Btr from "../HomePage/components/Btr";
import MiFormulario from "../HomePage/components/Formulario";

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
        <MiFormulario placeholder="Hora" />

        <MiFormulario placeholder="Sexo" />

        <MiFormulario placeholder="APGAR" />

        <MiFormulario placeholder="Temperatura" />

        <MiFormulario placeholder="Caputto" />

        <MiFormulario placeholder="Circular" />

        <MiFormulario placeholder="Liquido Amniotico" />

        <MiFormulario placeholder="Miccion" />

        <MiFormulario placeholder="Expulsivo" />

        <MiFormulario placeholder="Placenta" />

        <MiFormulario placeholder="Alumbramiento" />

        <MiFormulario placeholder="Huella plantar" />

        <MiFormulario placeholder="PC" />

        <MiFormulario placeholder="Talla" />

        <MiFormulario placeholder="Brazalete" />

        <MiFormulario placeholder="Huella digital" />

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
