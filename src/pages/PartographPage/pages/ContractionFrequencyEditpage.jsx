import React, { useEffect, useState } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { Form, Input, Button, DatePicker, message, Breadcrumb, Layout, Typography, Spin } from "antd";
import { getContractionsFrequency, updateContractionsFrequency } from "../../../services/partograph-service/partograph-service";
import { mutate } from "swr";
import BackButton from "../../../components/ReturnButton";
import { PARTOGRAPH_ENDPOINTS } from "../../../services/partograph-service/endpoints";
import dayjs from "dayjs";

const ContractionFrequencyEditPage = () => {
    const { partographId, contractionId } = useParams();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await getContractionsFrequency(contractionId);
                console.log("Datos recibidos:", response);

                form.setFieldsValue({
                    frecuenciaContracciones: response.value, // Debe ser un número
                    tiempo: dayjs(response.time), // Convertir fecha a formato válido para DatePicker
                });

                setIsLoading(false);
            } catch (error) {
                message.error("Error al cargar la frecuencia de contracciones.");
                setIsLoading(false);
            }
        };
        fetchData();
    }, [contractionId, form]);

    const handleSubmit = async (values) => {
        try {
            setIsSubmitting(true);
            await updateContractionsFrequency({
                id: contractionId,
                partographId,
                value: values.frecuenciaContracciones,
                time: dayjs(values.hour).format("YYYY-MM-DDTHH:mm:ss"),
            });

            mutate(PARTOGRAPH_ENDPOINTS.PARTOGRAPHS.GET_PARTOGRAPH(partographId));

            message.success("Frecuencia de contracciones actualizada exitosamente.");
            setIsSubmitting(false);
            navigate(`/partograph/${partographId}`);
        } catch (error) {
            message.error("Error al actualizar la frecuencia de contracciones.");
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Spin spinning={isLoading} fullscreen />
            <div style={{ marginLeft: "1rem", display: "flex", gap: "1rem", alignItems: "center" }}>
                <BackButton />
                <Breadcrumb
                    items={[
                        { title: <NavLink to="/">Home</NavLink> },
                        { title: <NavLink to={`/partograph/${partographId}`}>Partograma</NavLink> },
                        { title: "Editar Frecuencia de Contracciones" },
                    ]}
                />
            </div>
            <Layout.Content style={{ margin: "1rem", color: 'lightblue' }}>
                <div style={{ background: "#fff", minHeight: 280, padding: 10, borderRadius: "8px" }}>
                    <div style={{ maxWidth: "700px", padding: 25, margin: "0 auto", marginTop: "20px" }}>
                        <Typography.Title level={3}>Editar Frecuencia de Contracciones</Typography.Title>
                        <Form form={form} layout="vertical" onFinish={handleSubmit}>
                            <Form.Item
                                label="Frecuencia de Contracciones"
                                name="frecuenciaContracciones"
                                rules={[{ required: true, message: "Campo requerido" }]}
                            >
                                <Input placeholder="Frecuencia de Contracciones" type="number" />
                            </Form.Item>

                            <Form.Item
                                label="Hora de medición"
                                name="hour"
                                rules={[{ required: true, message: "Campo requerido" }]}
                            >
                                <DatePicker showTime={{ format: "HH:mm" }} format="YYYY-MM-DD HH:mm" style={{ width: "100%" }} />
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

export default ContractionFrequencyEditPage;
