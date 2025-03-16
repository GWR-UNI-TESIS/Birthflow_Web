import React, { useState } from "react";
import { Modal, Button, Form, DatePicker, message } from "antd";
import FormElement from "../../../components/FormElement";
import { createFetalHeartRate } from "../../../services/partograph-service/partograph-service";
import { mutate } from "swr";
import { PARTOGRAPH_ENDPOINTS } from "../../../services/partograph-service/endpoints";

const FetalHeartRateModal = ({ visible, onClose, partographId }) => {
    const [form] = Form.useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleClose = () => {
        form.resetFields(); 
        onClose();
    };
    
    const handleSubmit = async (values) => {
        try {
            setIsSubmitting(true);

            await createFetalHeartRate({
                id: 0,
                partographId,
                time: values.tiempo.toISOString(), // Guardar en formato ISO
                value: values.frecuenciaCardiacaFetal, // Convertir a número
            });

            // Mutar para actualizar la UI con el nuevo dato
            mutate(PARTOGRAPH_ENDPOINTS.PARTOGRAPHS.GET_PARTOGRAPH(partographId));

            message.success("Frecuencia Cardíaca Fetal registrada exitosamente.");
            setIsSubmitting(false);
            handleClose();// Cerrar modal después de guardar
        } catch (error) {
            setIsSubmitting(false);
            message.error("Error al registrar la frecuencia cardíaca fetal.");
        }
    };

    return (
        <Modal title="Frecuencia Cardiaca Fetal" open={visible} onCancel={handleClose} footer={null}>
            <div style={{ padding: "10px" }}>
                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                    <Form.Item label="Hora" name="tiempo" rules={[{ required: true, message: "Campo requerido" }]}>
                        <DatePicker
                            placeholder="Seleccionar Fecha"
                            showTime={{ format: "HH:mm" }} // Habilita la selección de hora
                            format="YYYY-MM-DD HH:mm" // Formato de fecha y hora
                            style={{ width: "100%" }}
                        />
                    </Form.Item>
                    <Form.Item label="Frecuencia Cardiaca Fetal"
                        name="frecuenciaCardiacaFetal"
                        valuePropName="value"
                        getValueFromEvent={(val) => val}
                        rules={[{ required: true, message: "Campo requerido" }]}>
                        <FormElement
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block loading={isSubmitting}>
                            {isSubmitting ? "Guardando..." : "Guardar Registro"}
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    );
};

export default FetalHeartRateModal;