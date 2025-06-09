import React, { useState } from "react";
import { Modal, Button, Form, Input, Select, DatePicker, message } from "antd";
import FormElement from "../../../components/FormElement";
import ArterialPressure from "../../../components/ArterialPressure";
import UnifiedDropdown from "../../../components/UnifiedDropdown";
import { createMedicalSurveillance } from "../../../services/partograph-service/partograph-service";
import { mutate } from "swr";
import { PARTOGRAPH_ENDPOINTS } from "../../../services/partograph-service/endpoints";
import dayjs from "dayjs";

const POSICION_MATERNA_OPTIONS = [
    { value: "Lat. Derecho", label: "Lat. Derecho" },
    { value: "Lat. Izquierdo", label: "Lat. Izquierdo" },
    { value: "Dorsal", label: "Dorsal" },
    { value: "Semisentada", label: "Semisentada" },
    { value: "Sentada", label: "Sentada" },
    { value: "Parada o Caminando", label: "Parada o Caminando" },
];

const DOLOR_LOCALIZACION_OPTIONS = [
    { value: "Sacro", label: "Sacro" },
    { value: "Suprapubico", label: "Suprapubico" },
];

const DOLOR_INTENSIDAD_OPTIONS = [
    { value: "Debil", label: "Debil" },
    { value: "Medio", label: "Medio" },
    { value: "Fuerte", label: "Fuerte" },
]; 

const MedicalSurveillanceModal = ({ visible, onClose, partographId }) => {
    const [form] = Form.useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleClose = () => {
        form.resetFields();
        onClose();
    };


    const handleSubmit = async (values) => {
        try {
            setIsSubmitting(true);
            const payload = {
                id: 0, // Se envía 0 si es un nuevo registro
                partographId,
                maternalPosition: values.posicionMaterna,
                arterialPressure: values.tensionArterial.toString(),
                maternalPulse: values.pulsoMaterno.toString(),
                fetalHeartRate: "N/A",
                contractionsDuration: values.duracionContracciones.toString(),
                frequencyContractions: "N/A",
                pain: values.dolor ? values.dolor.toString() : "",
                letter: 'A', // Se envía vacío si no hay valor
                time: dayjs(values.hour).format("YYYY-MM-DDTHH:mm:ss"),
            };

            await createMedicalSurveillance(payload);
            // Mutar para actualizar la UI con el nuevo dato
            mutate(PARTOGRAPH_ENDPOINTS.PARTOGRAPHS.GET_PARTOGRAPH(partographId));

            message.success("Elemento de la tabla de vigilancia medica registrada exitosamente.");
            setIsSubmitting(false);
            handleClose();// Cerrar modal después de guardar
        } catch (error) {
            setIsSubmitting(false);
            message.error("Error al registrar la vigilancia medica.");
        }
    };

    return (
        <Modal title="Vigilancia Materna" open={visible} onCancel={handleClose} footer={null}>
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item label="Hora" name="hour" rules={[{ required: true, message: "Campo requerido" }]}>
                    <DatePicker showTime={{ format: "HH:mm" }} format="YYYY-MM-DD HH:mm" style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item label="Posición Materna" name="posicionMaterna" rules={[{ required: true, message: "Campo requerido" }]}>
                    <Select placeholder="Seleccione">
                        {POSICION_MATERNA_OPTIONS.map((opt) => (
                            <Select.Option key={opt.value} value={opt.value}>
                                {opt.description}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Tensión Arterial"
                    name="tensionArterial"
                    valuePropName="value"
                    getValueFromEvent={(val) => val}
                    rules={[{ required: true, message: "Campo requerido" }]}
                >
                    <ArterialPressure />
                </Form.Item>

                <Form.Item
                    label="Pulso Materno"
                    name="pulsoMaterno"
                    valuePropName="value"
                    getValueFromEvent={(val) => val}
                    rules={[{ required: true, message: "Campo requerido" }]}
                >
                    <FormElement />
                </Form.Item>

                {/*
                <Form.Item
                    label="Frecuencia Cardíaca Fetal"
                    name="frecuenciaCardiacaFetal"
                    valuePropName="value"
                    getValueFromEvent={(val) => val}
                    rules={[{ required: true, message: "Campo requerido" }]}
                >
                    <FormElement />
                </Form.Item>
                */}
              
                <Form.Item
                    label="Duración Contracciones"
                    name="duracionContracciones"
                    valuePropName="value"
                    getValueFromEvent={(val) => val}
                    rules={[{ required: true, message: "Campo requerido" }]}
                >
                    <FormElement />
                </Form.Item>
                {/*
                <Form.Item label="Frecuencia de Contracciones" name="frecuenciaContracciones" rules={[{ required: true, message: "Campo requerido" }]}>
                    <Input placeholder="Frecuencia de Contracciones" type="number" />
                </Form.Item>
                */}

                <Form.Item label="Dolor" name="dolor" rules={[{ required: true, message: "Campo requerido" }]} valuePropName="value" getValueFromEvent={(val) => val}>
                    <UnifiedDropdown locationOptions={DOLOR_LOCALIZACION_OPTIONS} intensityOptions={DOLOR_INTENSIDAD_OPTIONS} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" block loading={isSubmitting}>
                        {isSubmitting ? "Guardando..." : "Guardar Registro"}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default MedicalSurveillanceModal;