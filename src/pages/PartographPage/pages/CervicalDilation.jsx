import { useState } from "react";
import { Input, Checkbox, Button, Form } from "antd";


const { Item: FormItem } = Form;

const CervicalDilationPage = () => {
  const [dilationValue, setDilationValue] = useState("");
  const [hour, setHour] = useState("");
  const [ramOrRem, setRamOrRem] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);

    console.log("Datos guardados:", { dilationValue, hour, ramOrRem });

    setTimeout(() => {
      setIsSubmitting(false);
      setDilationValue("");
      setHour("");
      setRamOrRem(false);
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
          height: "100vh",
          backgroundColor: "#f0f2f5",
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "#1890ff" }}>
          Registro de Dilatación Cervical
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
          <FormItem
            label="Dilatación (cm)"
            required
            validateStatus={!dilationValue ? "error" : ""}
            help={!dilationValue ? "Campo requerido" : ""}
          >
            <Input
              type="number"
              min="0"
              max="10"
              step="0.5"
              value={dilationValue}
              onChange={(e) => setDilationValue(e.target.value)}
              placeholder="Valor de Dilatación"
              style={{
                padding: "12px 16px",
                fontSize: "1.1em",
                borderRadius: "6px",
              }}
            />
            <p style={{ color: "#666", marginTop: "8px" }}>
              Valor entre 0 y 10 cm
            </p>
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
            <Checkbox
              checked={ramOrRem}
              onChange={(e) => setRamOrRem(e.target.checked)}
              style={{ fontSize: "1.1em" }}
            >
              RAM/REM
            </Checkbox>
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
    </>
  );
};

export default CervicalDilationPage;
