import { useState } from "react";
import { Input, Button, Form } from "antd";

const { Item: FormItem } = Form;

const ContractionFrequency = () => {
    const [form] = Form.useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (values) => {
        setIsSubmitting(true);

        console.log("Datos guardados:", values);

        setTimeout(() => {
            setIsSubmitting(false);
            form.resetFields();
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
                <h2 style={{ marginBottom: "20px", color: "#1890ff" }}>
                    Crear Frecuencia de Contracción
                </h2>

                <Form
                    form={form}
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
                        label="Frecuencia de contracciones"
                        name="frecuencia"
                        rules={[{ required: true, message: "Campo requerido" }]}
                    >
                        <Input
                            placeholder="Frecuencia de contracciones"
                            style={{
                                padding: "12px 16px",
                                fontSize: "1.1em",
                                borderRadius: "6px",
                            }}
                        />
                    </FormItem>

                    <FormItem
                        label="Hora de medición"
                        name="hora"
                        rules={[{ required: true, message: "Campo requerido" }]}
                    >
                        <Input
                            type="time"
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

export default ContractionFrequency;
