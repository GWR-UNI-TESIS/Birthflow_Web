import { Button, Form, Input, Select } from "antd";
import Btr from "../HomePage/components/Botonregreso";
import TimeSelector from "../HomePage/components/input";

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

const VigilanciaMaterna = () => {
  const [form] = Form.useForm();

  const options = [
    { value: "Hora", label: "Hora" },
    { value: "Minutos", label: "Minutos" },
    { value: "Segundos", label: "Segundos" },
  ];

  return (
    <>
      <Btr />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Form
          {...formItemLayout}
          form={form}
          style={{
            maxWidth: "80%",
            margin: "20px 0",
            border: "1px solid #d9d9d9",
            padding: "30px",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
            backgroundColor: "#fff",
          }}
        >
          <div
            style={{
              fontSize: "1.5em",
              fontWeight: "bold",
              marginBottom: "20px",
              textAlign: "center",
              color: "#1890ff",
            }}
          >
            Vigilancia Medica
          </div>

          <Form.Item
            name="tiempo"
            rules={[{ required: true, message: "Campo requerido" }]}
          >
            <Input
              placeholder="Tiempo"
              style={{
                marginBottom: "20px",
                padding: "12px 16px",
                fontSize: "1.1em",
                borderRadius: "6px",
              }}
            />
          </Form.Item>

          <div
            style={{
              fontSize: "1.2em",
              fontWeight: "bold",
              marginBottom: "15px",
              color: "#333",
            }}
          >
            Posición materna
          </div>
          <Form.Item
            name="posicionMaterna"
            noStyle
            rules={[{ required: true, message: "Campo requerido" }]}
            style={{ marginBottom: "20px" }}
          >
            <Select placeholder="Seleccione">
              <Select.Option value="Lat.Derecho">Lat. Derecho</Select.Option>
              <Select.Option value="Lat.Izquierdo">
                Lat. Izquierdo
              </Select.Option>
              <Select.Option value="Frecuencia">Frecuencia</Select.Option>
            </Select>
          </Form.Item>

          <div
            style={{
              fontSize: "1.2em",
              fontWeight: "bold",
              marginBottom: "10px",
              color: "#333",
            }}
          >
            <br /> Tensión Arterial
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <Form.Item
              name="tensionArterialSistolica"
              style={{ marginRight: "10px" }}
            >
              <Input
                placeholder="Sistólica"
                style={{
                  width: "120px",
                  padding: "10px 16px",
                  fontSize: "1.1em",
                  borderRadius: "6px",
                }}
              />
            </Form.Item>
            <span
              style={{
                fontSize: "1.3em",
                fontWeight: "bold",
                color: "#333",
                padding: "8px",
                marginRight: "10px",
              }}
            >
              /
            </span>
            <Form.Item name="tensionArterialDiastolica">
              <Input
                placeholder="Diastólica"
                style={{
                  width: "120px",
                  padding: "10px 16px",
                  fontSize: "1.1em",
                  borderRadius: "6px",
                }}
              />
            </Form.Item>
          </div>

          <div
            style={{
              fontSize: "1.2em",
              fontWeight: "bold",
              marginBottom: "15px",
              color: "#333",
            }}
          >
            Pulso Materno
          </div>
          <Form.Item name="pulsoMaterno" style={{ marginBottom: "20px" }}>
            <TimeSelector
              placeholder="Seleccione"
              options={options}
              errorMessage="Por favor, seleccione un tiempo"
              style={{
                padding: "10px 16px",
                fontSize: "1.1em",
                borderRadius: "6px",
              }}
            />
          </Form.Item>

          <div
            style={{
              fontSize: "1.2em",
              fontWeight: "bold",
              marginBottom: "15px",
              color: "#333",
            }}
          >
            Frecuencia Cardiaca Fetal
          </div>
          <Form.Item
            name="frecuenciaCardiacaFetal"
            style={{ marginBottom: "20px" }}
          >
            <TimeSelector placeholder="Seleccione" options={options} />
          </Form.Item>

          <div
            style={{
              fontSize: "1.2em",
              fontWeight: "bold",
              marginBottom: "15px",
              color: "#333",
            }}
          >
            Duración Contracciones
          </div>
          <Form.Item
            name="duracionContracciones"
            style={{ marginBottom: "20px" }}
          >
            <TimeSelector
              placeholder="Seleccione"
              options={options}
              errorMessage="Por favor, seleccione un tiempo"
            />
          </Form.Item>

          <Form.Item
            name="frecuenciaContracciones"
            rules={[{ required: true, message: "Campo requerido" }]}
          >
            <Input
              placeholder="Frec. Contracciones"
              style={{
                marginBottom: "20px",
                padding: "12px 16px",
                fontSize: "1.1em",
                borderRadius: "6px",
              }}
            />
          </Form.Item>

          <div
            style={{
              fontSize: "1.2em",
              fontWeight: "bold",
              marginBottom: "15px",
              color: "#333",
            }}
          >
            Dolor Localización
          </div>
          <Form.Item
            name="dolorLocalizacion"
            noStyle
            rules={[{ required: true, message: "Campo requerido" }]}
            style={{ marginBottom: "20px" }}
          >
            <Select placeholder="Seleccione">
              <Select.Option value="sacro">Sacro</Select.Option>
              <Select.Option value="s2">Sacro 2</Select.Option>
              <Select.Option value="s3">Sacro 3</Select.Option>
            </Select>
          </Form.Item>

          <div
            style={{
              fontSize: "1.2em",
              fontWeight: "bold",
              marginBottom: "15px",
              color: "#333",
            }}
          >
            Dolor Intensidad
          </div>
          <Form.Item
            name="dolorIntensidad"
            noStyle
            rules={[{ required: true, message: "Campo requerido" }]}
            style={{ marginBottom: "20px" }}
          >
            <Select placeholder="Seleccione">
              <Select.Option value="debil">Débil</Select.Option>
              <Select.Option value="medio">Medio</Select.Option>
              <Select.Option value="fuerte">Fuerte</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            wrapperCol={{ offset: 6, span: 16 }}
            style={{ marginTop: "20px" }}
          >
            <Button
              type="primary"
              htmlType="submit"
              style={{
                padding: "12px 24px",
                fontSize: "1.1em",
                borderRadius: "6px",
              }}
            >
              Guardar
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default VigilanciaMaterna;
