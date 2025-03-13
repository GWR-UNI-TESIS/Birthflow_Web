import { useState } from "react";
import { Button, Form, Input, Select, Space } from "antd";

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
                        Frecuencia cardiaca fetal
                    </h2>
                    <Space.Compact>
                        <Input
                            style={{
                                width: "50%",
                                margin: "auto",
                                padding: "12px 16px",
                                fontSize: "1.1em",
                                borderRadius: "6px",
                            }}
                            placeholder=" "
                        />
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
                                style={{
                                    width: "60%",
                                    margin: "auto",
                                    fontSize: "1.1em",
                                }}
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

export default FrecuenCF;
