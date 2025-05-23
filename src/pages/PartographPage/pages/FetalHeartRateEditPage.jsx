import React, { useEffect, useState } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { Form, Button, DatePicker, message, Breadcrumb, Layout, Typography, Spin } from "antd";
import { getFetalHeartRate, updateFetalHeartRate } from "../../../services/partograph-service/partograph-service";
import { mutate } from "swr";
import BackButton from "../../../components/ReturnButton";
import { PARTOGRAPH_ENDPOINTS } from "../../../services/partograph-service/endpoints";
import dayjs from "dayjs";
import FormElement from "../../../components/FormElement";
import PATH from "../../../routes/path";

const FetalHeartRateEditPage = () => {
    const { partographId, heartRateId } = useParams();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await getFetalHeartRate(heartRateId);
                console.log("Datos recibidos:", response);

                form.setFieldsValue({
                    frecuenciaCardiacaFetal: response.value, // Valor numérico
                    tiempo: dayjs(response.time), // Convertir a formato de DatePicker
                });

                setIsLoading(false);
            } catch (error) {
                message.error("Error al cargar la frecuencia cardíaca fetal.");
                setIsLoading(false);
            }
        };
        fetchData();
    }, [heartRateId, form]);

    const handleSubmit = async (values) => {
        try {
            setIsSubmitting(true);
            await updateFetalHeartRate({
                id: heartRateId,
                partographId,
                value: values.frecuenciaCardiacaFetal,
                time: dayjs(values.tiempo).format("YYYY-MM-DDTHH:mm:ss"),
            });

            mutate(PARTOGRAPH_ENDPOINTS.PARTOGRAPHS.GET_PARTOGRAPH(partographId));

            message.success("Frecuencia Cardíaca Fetal actualizada exitosamente.");
            setIsSubmitting(false);
            navigate(PATH.PARTOGRAPH(partographId));
        } catch (error) {
            message.error("Error al actualizar la frecuencia cardíaca fetal. Vuelva a probar mas tarde.");
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Spin spinning={isLoading} fullscreen />
            <div style={{ marginLeft: "1rem", display: "flex", gap: "1rem", alignItems: "center" }}>
                <BackButton to={PATH.PARTOGRAPH(partographId)} />
                <Breadcrumb
                    items={[
                        { title: <NavLink to="/">Inicio</NavLink> },
                        { title: <NavLink to={PATH.PARTOGRAPH(partographId)}>Partograma</NavLink> },
                        { title: "Editar Frecuencia Cardíaca Fetal" },
                    ]}
                />
            </div>
            <Layout.Content style={{ margin: "1rem", color: 'lightblue' }}>
                <div style={{ background: "#fff", minHeight: 280, padding: 10, borderRadius: "8px" }}>
                    <div style={{ maxWidth: "700px", padding: 25, margin: "0 auto", marginTop: "20px" }}>
                        <Typography.Title level={3}>Editar Frecuencia Cardíaca Fetal</Typography.Title>
                        <Form form={form} layout="vertical" onFinish={handleSubmit}>
                            <Form.Item
                                label="Hora de medición"
                                name="tiempo"
                                rules={[{ required: true, message: "Campo requerido" }]}
                            >
                                <DatePicker showTime={{ format: "HH:mm" }} format="YYYY-MM-DD HH:mm" style={{ width: "100%" }} />
                            </Form.Item>

                            <Form.Item
                                label="Frecuencia Cardíaca Fetal"
                                name="frecuenciaCardiacaFetal"
                                rules={[{ required: true, message: "Campo requerido" }]}
                            >
                                <FormElement />
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

export default FetalHeartRateEditPage;
