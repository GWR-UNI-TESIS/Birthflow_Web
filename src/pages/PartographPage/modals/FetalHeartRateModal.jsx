import React, { useState } from "react";
import { Modal, Button, Form, Input, Select, DatePicker } from "antd";
import FormElement from "../../../components/FormElement";
import moment from "moment"; // Necesario para manejar valores de fecha y hora

const FetalHeartRateModal = ({ visible, onClose }) => {
    const [form] = Form.useForm();
    const [hour, setHour] = useState("");
    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();

            console.log("Datos enviados:", values);


            // 4️⃣ Cerrar modal y limpiar formulario
            form.resetFields();
            onClose();

            // 5️⃣ Mostrar mensaje de éxito
            message.success("Datos enviados correctamente");
        } catch (error) {
            console.error("Error en el formulario:", error);
        }
    };
    return (
        <Modal title="Frecuencia Cardiaca Fetal" open={visible} onCancel={onClose} footer={null}>
            <div style={{ padding: "10px" }}>
                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                    <Form.Item label="Hora" name="tiempo" rules={[{ required: true, message: "Campo requerido" }]}>
                        <DatePicker
                            placeholder="Seleccionar Fecha"
                            showTime={{ format: "HH:mm" }} // Habilita la selección de hora
                            format="YYYY-MM-DD HH:mm" // Formato de fecha y hora
                            value={hour ? moment(hour) : null} // Convertir a formato de moment.js
                            onChange={(value) => setHour(value ? value.toISOString() : "")} // Guardar en formato ISO
                            style={{ width: "100%" }}
                        />
                    </Form.Item>
                    <Form.Item label="Frecuencia Cardiaca Fetal" name="frecuenciaCardiacaFetal" rules={[{ required: true, message: "Campo requerido" }]}>
                        <FormElement />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Guardar
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    );
};

export default FetalHeartRateModal;