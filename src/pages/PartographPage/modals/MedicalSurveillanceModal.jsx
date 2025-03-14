import React, { useState } from "react";
import { Modal, Button, Form, Input, Select, DatePicker } from "antd";
import FormElement from "../../../components/FormElement";
import ArterialPressure from "../../../components/ArterialPressure";
import UnifiedDropdown from "../../../components/UnifiedDropdown";
import moment from "moment"; // Necesario para manejar valores de fecha y hora


const POSICION_MATERNA_OPTIONS = [
    { value: "Lat.Derecho", label: "Lat. Derecho" },
    { value: "Lat.Izquierdo", label: "Lat. Izquierdo" },
    { value: "Dorsal", label: "Dorsal" },
    { value: "Semisentada", label: "Semisentada" },
    { value: "Sentada", label: "Sentada" },
    { value: "Parada o Caminando", label: "Parada o Caminando" },
];

const DOLOR_LOCALIZACION_OPTIONS = [
    { value: "sacro", label: "Sacro" },
    { value: "Suprapúbico", label: "Suprapúbico" },
];

const DOLOR_INTENSIDAD_OPTIONS = [
    { value: "debil", label: "Débil" },
    { value: "medio", label: "Medio" },
    { value: "fuerte", label: "Fuerte" },


]; const MedicalSurveillanceModal = ({ visible, onClose }) => {
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
        <Modal title="Vigilancia Materna" open={visible} onCancel={onClose} footer={null}>
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

                    <Form.Item label="Posicion Materna" name="posicionMaterna" rules={[{ required: true, message: "Campo requerido" }]}>
                        <Select placeholder="Seleccione">
                            {POSICION_MATERNA_OPTIONS.map((opt) => (
                                <Select.Option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item label="Tensión Arterial" name="tensionArterial" rules={[{ required: true, message: "Campo requerido" }]}>
                        <ArterialPressure onChange={(val) => console.log(val)} />
                    </Form.Item>
                    <Form.Item label="Pulso Materno" name="pulsoMaterno" rules={[{ required: true, message: "Campo requerido" }]}>
                        <FormElement onChange={(val) => console.log(val)} />
                    </Form.Item>

                    <Form.Item label="Frecuencia Cardiaca Fetal" name="frecuenciaCardiacaFetal" rules={[{ required: true, message: "Campo requerido" }]}>
                        <FormElement />
                    </Form.Item>

                    <Form.Item label="Duración Contracciones" name="duracionContracciones" rules={[{ required: true, message: "Campo requerido" }]}>
                        <FormElement />
                    </Form.Item>
                    <Form.Item label="Frec. Contraciones" name="frecuenciaContracciones" rules={[{ required: true, message: "Campo requerido" }]}>
                        <Input placeholder="Frec. Contracciones" type="number" />
                    </Form.Item>

                    <Form.Item name="Dolor">
                        <UnifiedDropdown
                            locationOptions={DOLOR_LOCALIZACION_OPTIONS}
                            intensityOptions={DOLOR_INTENSIDAD_OPTIONS}
                            onChange={(val) => console.log("Dolor seleccionado:", val)}
                        />
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

export default MedicalSurveillanceModal;