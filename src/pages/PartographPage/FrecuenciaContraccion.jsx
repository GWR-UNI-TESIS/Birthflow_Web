import { useState } from "react";
import { Input, Button, Form } from "antd";
import Btr from "../HomePage/components/Botonregreso";
import MiFormulario from "../HomePage/components/Formulario";

const { Item: FormItem } = Form;

const FrecuenciaContraccion = () => {
  const [frecuenciaValue, setFrecuenciaValue] = useState("");
  const [hour, setHour] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);

    console.log("Datos guardados:", { frecuenciaValue, hour });

    setTimeout(() => {
      setIsSubmitting(false);
      setFrecuenciaValue("");
      setHour("");
    }, 2000);
  };

  return (
    <>
      <Btr />
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
        <h2 style={{ marginBottom: "20px", color: "#1890ff" }}>
          Crear Frecuencia de Contraccion
        </h2>

        <Form
          layout="vertical"
          onFinish={handleSubmit}
          style={{
            width: "80%",
            maxWidth: "500px",
            padding: "30px",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
            backgroundColor: "#fff",
          }}
        >
          <FormItem>
            <MiFormulario placeholder="Frecuencia de contracciones" />
          </FormItem>

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
              {isSubmitting ? "Guardando..." : "Guardar"}
            </Button>
          </FormItem>
        </Form>
      </div>
    </>
  );
};

export default FrecuenciaContraccion;
