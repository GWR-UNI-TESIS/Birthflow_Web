import React, { useState } from "react";
import { Modal, Button, Form, Input, Select, DatePicker, message } from "antd";
import { createContractionsFrequency } from "../../../services/partograph-service/partograph-service";
import { mutate } from "swr";
import { PARTOGRAPH_ENDPOINTS } from "../../../services/partograph-service/endpoints";
import dayjs from "dayjs";

const ContractionFrequencyModal = ({ visible, onClose, partographId }) => {
    const [form] = Form.useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const handleClose = () => {
        form.resetFields(); 
        onClose();
    };
    
    const handleSubmit = async (values) => {
        try {
            setIsSubmitting(true);
            await createContractionsFrequency({
                id: 0,
                partographId,
                value: values.frecuenciaContracciones,
                time: dayjs(values.hour).format("YYYY-MM-DDTHH:mm:ss"),
            });

            // Mutar para actualizar la UI con los nuevos datos
            mutate(PARTOGRAPH_ENDPOINTS.PARTOGRAPHS.GET_PARTOGRAPH(partographId));

            message.success("Frecuencia de contracciones registrada exitosamente.");
            setIsSubmitting(false);
            handleClose();// Cerrar modal después de guardar
        } catch (error) {
            setIsSubmitting(false);
            message.error("Error al registrar la frecuenciam de contracciones.");
        }
    };
    return (
        <Modal title="Agregar Frecuencia de Contracciones" open={visible} onCancel={handleClose} footer={null}>
            <div style={{ padding: "10px" }}>
                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                    <Form.Item label="Frec. Contraciones" name="frecuenciaContracciones" rules={[{ required: true, message: "Campo requerido" }]}>
                        <Input placeholder="Frec. Contracciones" type="number" />
                    </Form.Item>

                    <Form.Item label="Hora" name="hour" rules={[{ required: true, message: "Campo requerido" }]}>
                        <DatePicker
                            placeholder="Seleccionar Fecha"
                            showTime={{ format: "HH:mm" }} // Habilita la selección de hora
                            format="YYYY-MM-DD HH:mm" // Formato de fecha y hora
                            style={{ width: "100%" }}
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

export default ContractionFrequencyModal;