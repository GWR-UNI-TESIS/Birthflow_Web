import { useState } from "react";
import { Input, Checkbox, Button, Form } from "antd";
import Btr from "../HomePage/components/Btr";

const { Item: FormItem } = Form;

const DilatacionCervical = () => {
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
      <Btr />
      <h2>Registro de Dilatación Cervical</h2>

      <Form layout="vertical" onFinish={handleSubmit}>
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
          />
          <p>Valor entre 0 y 10 cm</p>
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
          />
        </FormItem>

        <FormItem>
          <Checkbox
            checked={ramOrRem}
            onChange={(e) => setRamOrRem(e.target.checked)}
          >
            RAM/REM
          </Checkbox>
        </FormItem>

        <FormItem>
          <Button type="primary" htmlType="submit" block loading={isSubmitting}>
            {isSubmitting ? "Guardando..." : "Guardar Registro"}
          </Button>
        </FormItem>
      </Form>
    </>
  );
};

export default DilatacionCervical;
