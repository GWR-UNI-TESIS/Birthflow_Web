import React, { useEffect, useState } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { Form, Input, Checkbox, Button, DatePicker, message, Breadcrumb, Layout, theme, Typography } from "antd";
import { getCervicalDilation, updateCervicalDilation } from "../../../services/partograph-service/partograph-service";
import { mutate } from "swr";
import BackButton from "../../../components/ReturnButton";
import { PARTOGRAPH_ENDPOINTS } from "../../../services/partograph-service/endpoints";
import dayjs from "dayjs";

const CervicalDilationEditPage = () => {
    const { partographId, dilationId } = useParams();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await getCervicalDilation(dilationId);
                form.setFieldsValue({
                    dilation: response.value,
                    hour: dayjs(response.hour),
                    ramOrRem: response.remOrRam,
                });
                setIsLoading(false);
            } catch (error) {
                message.error("Error al cargar la dilatación cervical.");
                setIsLoading(false);
            }
        };
        fetchData();
    }, [dilationId, form]);

    const handleSubmit = async (values) => {
        try {
            setIsSubmitting(true);
            await updateCervicalDilation({
                id: dilationId,
                partographId,
                value: parseFloat(values.dilation),
                hour: values.hour.toISOString(),
                remOrRam: values.ramOrRem || false,
            });

            // Mutar para actualizar el partograma en la UI
            mutate(PARTOGRAPH_ENDPOINTS.PARTOGRAPHS.GET_PARTOGRAPH(partographId));

            message.success("Dilatación actualizada exitosamente.");
            setIsSubmitting(false);
            navigate(`/partograph/${partographId}`); // Redirigir de vuelta al partograma
        } catch (error) {
            message.error("Error al actualizar la dilatación cervical.");
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div style={{ marginLeft: "1rem", display: "flex", gap: "1rem", alignItems: "center" }}>
                <BackButton />
                <Breadcrumb items={[
                    { title: <NavLink to="/">Home</NavLink> },
                    { title: <NavLink to={`/partograph/${partographId}`}>Partograma</NavLink> },
                    { title: "Editar Dilatacion Cervical" }
                ]} />
            </div>
            <Layout.Content style={{ margin: "1rem", color: 'lightblue' }}>
                <div style={{ background: colorBgContainer, minHeight: 280, padding: 10, borderRadius: borderRadiusLG }}>

                    <div style={{ maxWidth: "700px", padding: 25, margin: "0 auto", marginTop: "20px" }}>
                        <Typography.Title level={3}>Editar Dilatacion Cervical</Typography.Title>
                        <Form form={form} layout="vertical" onFinish={handleSubmit}>
                            <Form.Item label="Dilatación (cm)" name="dilation" rules={[{ required: true, message: "Campo requerido" }]}>
                                <Input type="number" min="0" max="10" step="0.5" placeholder="Valor de Dilatación" />
                            </Form.Item>

                            <Form.Item label="Hora de medición" name="hour" rules={[{ required: true, message: "Campo requerido" }]}>
                                <DatePicker showTime={{ format: "HH:mm" }} format="YYYY-MM-DD HH:mm" style={{ width: "100%" }} />
                            </Form.Item>

                            <Form.Item label="Ram o Rem" name="ramOrRem" valuePropName="checked">
                                <Checkbox>RAM/REM</Checkbox>
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" block loading={isSubmitting}>
                                    {isSubmitting ? "Guardando..." : "Guardar Cambios"}
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </Layout.Content>
        </>
    );
};

export default CervicalDilationEditPage;
