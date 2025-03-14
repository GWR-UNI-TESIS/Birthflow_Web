import React, { useState } from "react";
import { Modal, Button, Form, Input, Select, DatePicker } from "antd";
import FormElement from "../../../components/FormElement";

const ContractionFrequencyModal = ({ visible, onClose }) => {
    const [form] = Form.useForm();
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
                    <Form.Item label="Frec. Contraciones" name="frecuenciaContracciones" rules={[{ required: true, message: "Campo requerido" }]}>
                        <Input placeholder="Frec. Contracciones" type="number" />
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

export default ContractionFrequencyModal;