import { useState } from "react";
import { Button, Form, Input, Select } from "antd";
const { Item: FormItem } = Form;
const { Option } = Select;

const Presentacion = () => {
  const [hour, setHour] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);

    console.log("Datos guardados:", { hour });

    setTimeout(() => {
      setIsSubmitting(false);
      setHour("");
    }, 2000);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "60vh",
          backgroundColor: "#f0f2f5",
        }}
      >
        <div
          style={{
            width: "80%",
            maxWidth: "500px",
            padding: "30px",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
            backgroundColor: "#fff",
          }}
        >
          <h2 style={{ marginBottom: "20px", color: "#1890ff" }}>
            Crear Presentacion
          </h2>

          <div
            style={{
              fontSize: "1.2em",
              fontWeight: "bold",
              marginBottom: "10px",
              color: "#333",
            }}
          >
            Posicion <br />
          </div>
          <Form.Item
            name="dolorLocalizacion"
            noStyle
            rules={[{ required: true, message: "Campo requerido" }]}
            style={{ marginBottom: "20px" }}
          >
            <Select placeholder="Seleccione">
              <Option value="oc">Occipito Posterior</Option>
              <Option value="pc2">occipito 2</Option>
              <Option value="oc3">Ocippito 3</Option>
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
            Plano de Hodge <br />
          </div>
          <Form.Item
            name="dolorIntensidad"
            noStyle
            rules={[{ required: true, message: "Campo requerido" }]}
            style={{ marginBottom: "20px" }}
          >
            <Select placeholder="Seleccione">
              <Select.Option value="Plano1">Plano 1</Select.Option>
              <Select.Option value="Plano2">Plano 2</Select.Option>
              <Select.Option value="Plano3">Plano 3</Select.Option>
            </Select>
          </Form.Item>

          <Form
            layout="vertical"
            onFinish={handleSubmit}
            style={{
              marginTop: "20px",
            }}
          >
            <FormItem
              label="Hora de medición"
              required
              validateStatus={!hour ? "error" : ""}
              help={!hour ? "Campo requerido" : ""}
            >
              <Input
                type="time"
                value={hour}
                onChange={(e) => setHour(e.target.value)}
                style={{
                  padding: "12px 16px",
                  fontSize: "1.1em",
                  borderRadius: "6px",
                }}
              />
            </FormItem>

            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={isSubmitting}
                style={{
                  padding: "12px 24px",
                  fontSize: "1.1em",
                  borderRadius: "6px",
                }}
              >
                {isSubmitting ? "Guardando..." : "Guardar Registro"}
              </Button>
            </FormItem>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Presentacion;
