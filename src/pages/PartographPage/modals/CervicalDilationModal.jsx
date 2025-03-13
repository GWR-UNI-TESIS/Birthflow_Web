import { useState } from "react";
import { Modal, Input, Checkbox, Button, Form, DatePicker } from "antd";
import moment from "moment"; // Necesario para manejar valores de fecha y hora

const { Item: FormItem } = Form;

const CervicalDilationModal = ({ visible, onClose }) => {
    const [dilationValue, setDilationValue] = useState("");
    const [hour, setHour] = useState("");
    const [ramOrRem, setRamOrRem] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleSubmit = () => {
        setIsSubmitting(true);
        console.log("Datos guardados:", { dilationValue, hour, ramOrRem });

        setTimeout(() => {
            setIsSubmitting(false);
            setDilationValue("");
            setHour("");
            setRamOrRem(false);
            onClose(); // Cerrar modal después de guardar
        }, 2000);
    };


    return (
        <Modal
            title="Registro de Dilatación Cervical"
            open={visible}
            onCancel={onClose}
            footer={null}
        >
            <Form layout="vertical" onFinish={handleSubmit}>
                <Form.Item label="Dilatación (cm)" required>
                    <Input
                        type="number"
                        min="0"
                        max="10"
                        step="0.5"
                        value={dilationValue}
                        onChange={(e) => setDilationValue(e.target.value)}
                        placeholder="Valor de Dilatación"
                    />
                </Form.Item>

                <Form.Item label="Hora de medición" required>
                    <DatePicker
                        showTime={{ format: "HH:mm" }} // Habilita la selección de hora
                        format="YYYY-MM-DD HH:mm" // Formato de fecha y hora
                        value={hour ? moment(hour) : null} // Convertir a formato de moment.js
                        onChange={(value) => setHour(value ? value.toISOString() : "")} // Guardar en formato ISO
                        style={{ width: "100%" }}
                    />
                </Form.Item>

                <Form.Item>
                    <Checkbox
                        checked={ramOrRem}
                        onChange={(e) => setRamOrRem(e.target.checked)}
                    >
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
