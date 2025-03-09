import { useState } from "react";
import { Button, Form, Input, Select, Space } from "antd";
import Btr from "../HomePage/components/Btr";

const { Item: FormItem } = Form;
const { Option } = Select;

const FrecuenCF = () => {
  const [hour, setHour] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);

    console.log("Datos guardados:", { hour });

    setTimeout(() => {
      setHour("");
    }, 2000);
  };

  return (
    <>
      <Btr />
      <div>
        <h2>Frecuencia cardiaca fetal</h2>
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

          <Form.Item
            name={["minutos", "horas"]}
            noStyle
            rules={[{ required: true, message: "Campo requerido" }]}
          >
            <Select
              placeholder="Seleccione"
              style={{ width: "50%", margin: "auto" }}
            >
              <Option value="minutos">Minutos</Option>
              <Option value="horas">Horas</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name={["minutos", "horas"]}
            noStyle
            rules={[{ required: true, message: "Campo requerido" }]}
          ></Form.Item>
        </Space.Compact>

        <Form layout="vertical" onFinish={handleSubmit} style>
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
            />
          </FormItem>

          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={isSubmitting}
            >
              {isSubmitting ? "Guardando..." : "Guardar Registro"}
            </Button>
          </FormItem>
        </Form>
      </div>
    </>
  );
};

export default FrecuenCF;
