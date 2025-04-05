import React, { useEffect, useState } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { Form, Button, Select, DatePicker, message, Breadcrumb, Layout, Typography, Spin } from "antd";
import { useCatalog } from "../../../contexts/catalog-context";
import { getPresentationPositionVariety, updatePresentationPositionVariety } from "../../../services/partograph-service/partograph-service";
import { mutate } from "swr";
import BackButton from "../../../components/ReturnButton";
import { PARTOGRAPH_ENDPOINTS } from "../../../services/partograph-service/endpoints";
import dayjs from "dayjs";
import PATH from "../../../routes/path";

const PresentationPositionVarietyEditPage = () => {
    const { partographId, positionVarietyId } = useParams();
    const navigate = useNavigate();
    const { catalogs, loading: catalogsLoading, error: catalogsError } = useCatalog();
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await getPresentationPositionVariety(positionVarietyId);
                console.log("Datos recibidos:", response);

                form.setFieldsValue({
                    posicion: response.position,
                    planoHodge: response.hodgePlane,
                    tiempo: dayjs(response.time),
                });

                setIsLoading(false);
            } catch (error) {
                message.error("Error al cargar la variedad de posición.");
                setIsLoading(false);
            }
        };
        fetchData();
    }, [positionVarietyId, form]);

    const handleSubmit = async (values) => {
        try {
            setIsSubmitting(true);
            await updatePresentationPositionVariety({
                id: parseInt(positionVarietyId),
                partographId,
                position: values.posicion,
                hodgePlane: values.planoHodge,
                time: dayjs(values.tiempo).format("YYYY-MM-DDTHH:mm:ss"),
            });

            mutate(PARTOGRAPH_ENDPOINTS.PARTOGRAPHS.GET_PARTOGRAPH(partographId));

            message.success("Variedad de posición actualizada exitosamente.");
            setIsSubmitting(false);
            navigate(`/partograph/${partographId}`);
        } catch (error) {
            message.error("Error al actualizar la variedad de posición.");
            setIsSubmitting(false);
        }
    };

    if (catalogsLoading) return <Spin fullscreen />;

    return (
        <>
            <Spin spinning={isLoading} fullscreen />
            <div style={{ marginLeft: "1rem", display: "flex", gap: "1rem", alignItems: "center" }}>
                <BackButton to={PATH.PARTOGRAPH(partographId)} />
                <Breadcrumb
                    items={[
                        { title: <NavLink to="/">Home</NavLink> },
                        { title: <NavLink to={`/partograph/${partographId}`}>Partograma</NavLink> },
                        { title: "Editar Variedad de Posición" },
                    ]}
                />
            </div>
            <Layout.Content style={{ margin: "1rem", color: 'lightblue' }}>
                <div style={{ background: "#fff", minHeight: 280, padding: 10, borderRadius: "8px" }}>
                    <div style={{ maxWidth: "700px", padding: 25, margin: "0 auto", marginTop: "20px" }}>
                        <Typography.Title level={3}>Editar Variedad de Posición</Typography.Title>
                        <Form form={form} layout="vertical" onFinish={handleSubmit}>
                            <Form.Item
                                label="Posición"
                                name="posicion"
                                rules={[{ required: true, message: "Campo requerido" }]}
                            >
                                <Select placeholder="Seleccione">
                                    {catalogs.positionCatalog.map((opt) => (
                                        <Select.Option key={opt.id} value={opt.id}>
                                            {opt.description}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item
                                label="Plano de Hodge"
                                name="planoHodge"
                                rules={[{ required: true, message: "Campo requerido" }]}
                            >
                                <Select placeholder="Seleccione">
                                    {catalogs.hodgePlanesCatalog.map((opt) => (
                                        <Select.Option key={opt.id} value={opt.id}>
                                            {opt.description}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item
                                label="Hora de medición"
                                name="tiempo"
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

export default PresentationPositionVarietyEditPage;
