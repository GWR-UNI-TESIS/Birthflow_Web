import React, { useEffect } from "react";
import { Modal, Button, Form, Input, message } from "antd";
import { createBirthNote, updateBirthNote } from "../../../services/partograph-service/partograph-service";
import { mutate } from "swr";
import { PARTOGRAPH_ENDPOINTS } from "../../../services/partograph-service/endpoints";
const ChildbirthNoteModal = ({ visible, onClose, partographId, initialData }) => {
    const [form] = Form.useForm();

    const handleClose = () => {
        form.resetFields();
        onClose();
    };
    useEffect(() => {
        if (visible) {
            if (initialData) {
                form.setFieldsValue(initialData);
            }
        }
    }, [visible, initialData]);


    const handleSubmit = async (values) => {
        try {
            const payload = {
                partographId,
                description: values.description,
                date: values.date,
                hour: values.hour,
                sex: values.sex,
                apgar: values.apgar,
                peso: values.peso,
                temperature: values.temperature,
                caputto: values.caputto,
                circular: values.circular,
                lamniotico: values.lamniotico,
                miccion: values.miccion,
                meconio: values.meconio,
                pa: values.pa,
                expulsivo: values.expulsivo,
                placenta: values.placenta,
                alumbramiento: values.alumbramiento,
                huellaPlantar: values.huellaPlantar,
                pc: values.pc,
                talla: values.talla,
                brazalete: values.brazalete,
                huellaDig: values.huellaDig,
            };

            if (initialData) {
                await updateBirthNote(payload);
                message.success("Nota de parto actualizada exitosamente.");
            } else {
                await createBirthNote(payload);
                message.success("Nota de parto registrada exitosamente.");
            }

            mutate(PARTOGRAPH_ENDPOINTS.PARTOGRAPHS.GET_PARTOGRAPH(partographId));
            handleClose();
        } catch (error) {
            message.error("Error al procesar la nota de parto.");
        }
    };

    return (
        <Modal title={initialData ? "Editar Nota de Parto" : "Crear Nota de Parto"} open={visible} onCancel={handleClose} footer={null}>
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item label="Descripción" name="description" rules={[{ required: true, message: "Campo requerido" }]}>
                    <Input.TextArea rows={2} />
                </Form.Item>
                <Form.Item label="Fecha" name="date" rules={[{ required: true, message: "Campo requerido" }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Hora" name="hour" rules={[{ required: true, message: "Campo requerido" }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="Sexo" name="sex">
                    <Input />
                </Form.Item>

                <Form.Item label="APGAR" name="apgar">
                    <Input />
                </Form.Item>
                <Form.Item label="Peso" name="peso">
                    <Input />
                </Form.Item>
                <Form.Item label="Temperatura" name="temperature">
                    <Input />
                </Form.Item>

                <Form.Item label="Caput Succedaneum" name="caputto">
                    <Input />
                </Form.Item>

                <Form.Item label="Circular" name="circular">
                    <Input />
                </Form.Item>

                <Form.Item label="Líquido Amniótico" name="lamniotico">
                    <Input />
                </Form.Item>

                <Form.Item label="Micción" name="miccion">
                    <Input />
                </Form.Item>

                <Form.Item label="Meconio" name="meconio">
                    <Input />
                </Form.Item>

                <Form.Item label="PA" name="pa">
                    <Input />
                </Form.Item>

                <Form.Item label="Expulsivo" name="expulsivo">
                    <Input />
                </Form.Item>

                <Form.Item label="Placenta" name="placenta">
                    <Input />
                </Form.Item>

                <Form.Item label="Alumbramiento" name="alumbramiento">
                    <Input />
                </Form.Item>

                <Form.Item label="Huella Plantar" name="huellaPlantar">
                    <Input />
                </Form.Item>

                <Form.Item label="PC (Perímetro Cefálico)" name="pc">
                    <Input />
                </Form.Item>

                <Form.Item label="Talla" name="talla">
                    <Input />
                </Form.Item>

                <Form.Item label="Brazalete" name="brazalete">
                    <Input />
                </Form.Item>

                <Form.Item label="Huella Digital" name="huellaDig">
                    <Input />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        {initialData ? "Actualizar Nota" : "Guardar Nota"}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ChildbirthNoteModal;
