import React, { useEffect, useState } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { Form, Input, Select, Button, DatePicker, message, Breadcrumb, Layout, Typography, Spin } from "antd";
import { getMedicalSurveillance, updateMedicalSurveillance } from "../../../services/partograph-service/partograph-service";
import { mutate } from "swr";
import BackButton from "../../../components/ReturnButton";
import { PARTOGRAPH_ENDPOINTS } from "../../../services/partograph-service/endpoints";
import dayjs from "dayjs";
import FormElement from "../../../components/FormElement";
import ArterialPressure from "../../../components/ArterialPressure";
import UnifiedDropdown from "../../../components/UnifiedDropdown";
import PATH from "../../../routes/path";

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
];

const MedicalSurveillanceEditPage = () => {
    const { partographId, medicalId } = useParams();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await getMedicalSurveillance(medicalId);
                form.setFieldsValue({
                    tiempo: dayjs(response.time),
                    posicionMaterna: response.maternalPosition,
                    tensionArterial: response.arterialPressure,
                    pulsoMaterno: response.maternalPulse,
                    frecuenciaCardiacaFetal: response.fetalHeartRate,
                    duracionContracciones: response.contractionsDuration,
                    frecuenciaContracciones: response.frequencyContractions,
                    Dolor: response.pain ? response.pain.toString() : "",
                });
                setIsLoading(false);
            } catch (error) {
                message.error("Error al cargar la vigilancia médica.");
                setIsLoading(false);
            }
        };
        fetchData();
    }, [medicalId, form]);

    const handleSubmit = async (values) => {
        try {
            setIsSubmitting(true);
            await updateMedicalSurveillance({
                id: medicalId,
                partographId,
                maternalPosition: values.posicionMaterna,
                arterialPressure: values.tensionArterial.toString(),
                maternalPulse: values.pulsoMaterno.toString(),
                fetalHeartRate: values.frecuenciaCardiacaFetal.toString(),
                contractionsDuration: values.duracionContracciones.toString(),
                frequencyContractions: values.frecuenciaContracciones.toString(),
                pain: values.Dolor ? values.Dolor.toString() : "",
                time: dayjs(values.tiempo).format("YYYY-MM-DDTHH:mm:ss"),
            });

            mutate(PARTOGRAPH_ENDPOINTS.PARTOGRAPHS.GET_PARTOGRAPH(partographId));

            message.success("Vigilancia médica actualizada exitosamente.");
            setIsSubmitting(false);
            navigate(PATH.PARTOGRAPH(partographId));
        } catch (error) {
            message.error("Error al actualizar la vigilancia médica. Vuelva a probar mas tarde.");
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
                        { title: <NavLink to="/">Home</NavLink> },
                        { title: <NavLink to={PATH.PARTOGRAPH(partographId)}>Partograma</NavLink> },
                        { title: "Editar Vigilancia Médica" },
                    ]}
                />
            </div>
            <Layout.Content style={{ margin: "1rem", color: 'lightblue' }}>
                <div style={{ background: "#fff", minHeight: 280, padding: 10, borderRadius: "8px" }}>
                    <div style={{ maxWidth: "700px", padding: 25, margin: "0 auto", marginTop: "20px" }}>
                        <Typography.Title level={3}>Editar Vigilancia Médica</Typography.Title>
                        <Form form={form} layout="vertical" onFinish={handleSubmit}>
                            <Form.Item label="Hora" name="tiempo" rules={[{ required: true, message: "Campo requerido" }]}>
                                <DatePicker showTime={{ format: "HH:mm" }} format="YYYY-MM-DD HH:mm" style={{ width: "100%" }} />
                            </Form.Item>

                            <Form.Item label="Posición Materna" name="posicionMaterna" rules={[{ required: true, message: "Campo requerido" }]}>
                                <Select placeholder="Seleccione">
                                    {POSICION_MATERNA_OPTIONS.map((opt) => (
                                        <Select.Option key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item label="Tensión Arterial" name="tensionArterial" rules={[{ required: true, message: "Campo requerido" }]}>
                                <ArterialPressure />
                            </Form.Item>

                            <Form.Item label="Pulso Materno" name="pulsoMaterno" rules={[{ required: true, message: "Campo requerido" }]}>
                                <FormElement />
                            </Form.Item>

                            <Form.Item label="Frecuencia Cardíaca Fetal" name="frecuenciaCardiacaFetal" 
                              rules={[{ required: true, message: "Campo requerido" }]}>
                                <FormElement />
                            </Form.Item>

                            <Form.Item label="Duración Contracciones" name="duracionContracciones" rules={[{ required: true, message: "Campo requerido" }]}>
                                <FormElement />
                            </Form.Item>

                            <Form.Item label="Frecuencia de Contracciones" name="frecuenciaContracciones" rules={[{ required: true, message: "Campo requerido" }]}>
                                <Input placeholder="Frecuencia de Contracciones" type="number" />
                            </Form.Item>

                            <Form.Item name="Dolor">
                                <UnifiedDropdown locationOptions={DOLOR_LOCALIZACION_OPTIONS} intensityOptions={DOLOR_INTENSIDAD_OPTIONS} />
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

export default MedicalSurveillanceEditPage;
