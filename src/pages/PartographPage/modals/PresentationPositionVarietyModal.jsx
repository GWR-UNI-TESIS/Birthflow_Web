import React, { useState } from "react";
import { Modal, Button, Form, Spin, Select, DatePicker } from "antd";
import { useCatalog } from "../../../contexts/catalog-context";
import moment from "moment"; // Necesario para manejar valores de fecha y hora

const PresentationPositionVarietyModal = ({ visible, onClose }) => {
    const { catalogs, loading: catalogsLoading, error: catalogsError } = useCatalog();
    const [hour, setHour] = useState("");
    const [form] = Form.useForm();

    if(catalogsLoading) return <Spin fullscreen/>;

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
        <Modal title="Altura de la presentacion" open={visible} onCancel={onClose} footer={null}>
            <div style={{ padding: "10px" }}>
                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                    <Form.Item label="Posición" name="posicion" rules={[{ required: true, message: "Campo requerido" }]}>
                        <Select placeholder="Seleccione">
                            {catalogs.positionCatalog.map((opt) => (
                                <Select.Option key={opt.id} value={opt.code}>
                                    {opt.label}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item label="Plano de Hodge" name="planoHodge" rules={[{ required: true, message: "Campo requerido" }]}>
                        <Select placeholder="Seleccione">
                            {catalogs.hodgePlanesCatalog.map((opt) => (
                                <Select.Option key={opt.id} value={opt.description}>
                                    {opt.label}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
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

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Guardar
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    );
};

export default PresentationPositionVarietyModal;