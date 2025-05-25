import { useState } from "react";
import { Modal, Input, Checkbox, Button, Form, DatePicker, message } from "antd";
import { createCervicalDilation } from "../../../services/partograph-service/partograph-service";
import { mutate } from "swr";
import { PARTOGRAPH_ENDPOINTS } from "../../../services/partograph-service/endpoints";
import dayjs from "dayjs";

const CervicalDilationModal = ({ visible, onClose, partographId }) => {
    const [form] = Form.useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleClose = () => {
        form.resetFields();
        onClose();
    };

    //Metodo para guardar la informacion
    const handleSubmit = async (values) => {
        try {
            setIsSubmitting(true);
            await createCervicalDilation({
                id: 0,
                partographId,
                value: parseFloat(values.dilation),
                hour: dayjs(values.hour).format("YYYY-MM-DDTHH:mm:ss"),
                remOrRam: values.ramOrRem || false,
            });

            // Mutar para actualizar el partograma en la UI
            mutate(PARTOGRAPH_ENDPOINTS.PARTOGRAPHS.GET_PARTOGRAPH(partographId));

            message.success("Dilatación registrada exitosamente.");
            setIsSubmitting(false);
            handleClose();// Cerrar modal después de guardar
        } catch (error) {
            message.error("Error al guardar la dilatación cervical.");
            setIsSubmitting(false);
        }
    };

    return (
        <Modal
            title="Registro de Dilatación Cervical"
            open={visible}
            onCancel={handleClose}
            footer={null}
        >
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item label="Dilatación (cm)" name="dilation" required>
                    <Input
                        type="number"
                        min="0"
                        max="11"
                        step="0.5"
                        placeholder="Valor de Dilatación"
                    />
                </Form.Item>

                <Form.Item label="Hora de medición" name="hour" required>
                    <DatePicker
                        showTime={{ format: "HH:mm" }} // Habilita la selección de hora
                        format="YYYY-MM-DD HH:mm" // Formato de fecha y hora
                        style={{ width: "100%" }}
                    />
                </Form.Item>

                <Form.Item label="Ram o Rem" name="ramOrRem" valuePropName="checked">
                    <Checkbox>
                        RAM/REM
                    </Checkbox>
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

export default CervicalDilationModal;
