import React, { useState } from "react";
import { Modal, Button, Form, Spin, Select, DatePicker, message } from "antd";
import { useCatalog } from "../../../contexts/catalog-context";
import { createPresentationPositionVariety } from "../../../services/partograph-service/partograph-service";
import { mutate } from "swr";
import { PARTOGRAPH_ENDPOINTS } from "../../../services/partograph-service/endpoints";

const PresentationPositionVarietyModal = ({ visible, onClose, partographId  }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);    
    const { catalogs, loading: catalogsLoading, error: catalogsError } = useCatalog();
    const [form] = Form.useForm();

    if(catalogsLoading) return <Spin fullscreen/>;
   
    const handleClose = () => {
        form.resetFields(); 
        onClose();
    };
    
    if (catalogsLoading) return <Spin fullscreen />;

    const handleSubmit = async (values) => {
        try {
            setIsSubmitting(true);
            await createPresentationPositionVariety({
                id: 0,
                partographId,
                position: values.posicion,
                hodgePlane: values.planoHodge,
                time: values.tiempo.toISOString(),
            });

            // Mutar para actualizar la UI con el nuevo dato
            mutate(PARTOGRAPH_ENDPOINTS.PARTOGRAPHS.GET_PARTOGRAPH(partographId));

            message.success("Variedad de posición registrada exitosamente.");
            setIsSubmitting(false);
            handleClose();// Cerrar modal después de guardar
        } catch (error) {
            setIsSubmitting(false);
            message.error("Error al registrar la variedad de posición.");
        }
    };
    return (
        <Modal title="Altura de la presentacion" open={visible} onCancel={handleClose} footer={null}>
            <div style={{ padding: "10px" }}>
                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                    <Form.Item label="Posición" name="posicion" rules={[{ required: true, message: "Campo requerido" }]}>
                        <Select placeholder="Seleccione">
                            {catalogs.positionCatalog.map((opt) => (
                                <Select.Option key={opt.id} value={opt.id}>
                                    {opt.description}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item label="Plano de Hodge" name="planoHodge" rules={[{ required: true, message: "Campo requerido" }]}>
                        <Select placeholder="Seleccione">
                            {catalogs.hodgePlanesCatalog.map((opt) => (
                                <Select.Option key={opt.id} value={opt.id}>
                                    {opt.description}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Hora" name="tiempo" rules={[{ required: true, message: "Campo requerido" }]}>
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

export default PresentationPositionVarietyModal;