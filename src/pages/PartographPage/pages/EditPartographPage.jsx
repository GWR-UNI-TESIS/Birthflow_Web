import { useEffect, useState } from "react";
import {
    Button,
    Breadcrumb,
    Layout,
    Spin,
    Typography,
    Divider,
    Form,
    DatePicker,
    Input,
    message,
    Flex,
    theme,
} from "antd";
import { NavLink, useParams } from "react-router-dom";
import { useCatalog } from "../../../contexts/catalog-context";
import { getPartograph, updatePartograph } from "../../../services/partograph-service/partograph-service";
import BackButton from '../../../components/ReturnButton';
import WorkTimeTable from "../../../components/WorkTimeTable";
import dayjs from "dayjs";

const { Content } = Layout;

const EditPartographPage = () => {
    const { partographId } = useParams();
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const [form] = Form.useForm();
    const [loading, setLoading] = useState(true);
    const [partograph, setPartograph] = useState(null);
    const [selectedMain, setSelectedMain] = useState(null);
    const [selectedSub, setSelectedSub] = useState(null);
    const [selectedMembrane, setSelectedMembrane] = useState(null);
    const [effectiveColumn, setEffectiveColumn] = useState(null);

    const { catalogs, loading: catalogsLoading, error: catalogsError } = useCatalog();

    useEffect(() => {
        if (catalogsError) message.error("Error al cargar los catálogos.");
    }, [catalogsError]);

    useEffect(() => {
        const fetchPartograph = async () => {
            try {
                setLoading(true);
                const data = await getPartograph(partographId);
                setPartograph(data);
                form.setFieldsValue({
                    Name: data.name,
                    RecordName: data.recordName,
                    date: dayjs(data.date),
                    observation: data.observation,
                });
                setSelectedMain(data.selectedMain);
                setSelectedSub(data.selectedSub);
                setSelectedMembrane(data.selectedMembrane);
                setEffectiveColumn(data.workTime);
                setLoading(false);
            } catch (error) {
                message.error("Error al cargar el partograma");
            } finally {
                setLoading(false);
            }
        };
        fetchPartograph();
    }, [partographId, form]);

    useEffect(() => {
        if (effectiveColumn) {
            let main = null, sub = null, membrane = null;

            if (effectiveColumn === "VTI") {
                main = "Vertical";
                sub = "Todas";
                membrane = "Integras";
            } else if (effectiveColumn === "HMI") {
                main = "Horizontal";
                sub = "Multiparás";
                membrane = "Integras";
            } else if (effectiveColumn === "HMR") {
                main = "Horizontal";
                sub = "Multiparás";
                membrane = "Rotas";
            } else if (effectiveColumn === "HNI") {
                main = "Horizontal";
                sub = "Nuliparás";
                membrane = "Integras";
            } else if (effectiveColumn === "HNR") {
                main = "Horizontal";
                sub = "Nuliparás";
                membrane = "Rotas";
            }

            setSelectedMain(main);
            setSelectedSub(sub);
            setSelectedMembrane(membrane);
        }
    }, [effectiveColumn]);


    const handleSave = async () => {
        try {
            const values = await form.validateFields();
            const payload = {
                partographId,
                name: values.Name,
                recordName: values.RecordName,
                date: dayjs(values.date).format("YYYY-MM-DDTHH:mm:ss"),
                observation: values.observation || "",
                workTime: effectiveColumn,
            };

            await updatePartograph(payload);
            message.success("Partograma actualizado con éxito!");
        } catch (error) {
            message.error("Error al actualizar el partograma");
        }
    };

    if (loading || catalogsLoading) return <Spin />;

    return (
        <>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                <BackButton />
                <Breadcrumb
                    items={[
                        {
                            title: <NavLink to="/">Home</NavLink>,
                        },
                        { title: <NavLink to={`/partograph/${partographId}`}>Partograma</NavLink> },
                        { title: "Edición de Partograma" },
                    ]}
                />
            </div>
            <Content style={{ margin: "1rem" }}>
                <div
                    style={{
                        background: colorBgContainer,
                        minHeight: 280,
                        padding: 24,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Typography.Title level={4}>Editar Partograma</Typography.Title>
                    <Form layout="vertical" form={form} style={{ width: 400 }}>
                        <Form.Item
                            label="Nombre de la paciente"
                            name="Name"
                            rules={[{ required: true, message: "Por favor ingrese un nombre!" }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Expediente"
                            name="RecordName"
                            rules={[{ required: true, message: "Por favor ingrese un expediente!" }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="date"
                            label="Fecha"
                            rules={[{ required: true, message: "Por favor ingrese una fecha!" }]}
                        >
                            <DatePicker />
                        </Form.Item>
                        <Form.Item label="Observación" name="observation">
                            <Input.TextArea rows={3} />
                        </Form.Item>
                    </Form>
                    <Divider />
                    <Typography.Title level={4}>Valores para la creación de curva de alerta</Typography.Title>
                    <WorkTimeTable
                        catalogs={catalogs}
                        selectedMain={selectedMain}
                        setSelectedMain={setSelectedMain}
                        selectedSub={selectedSub}
                        setSelectedSub={setSelectedSub}
                        selectedMembrane={selectedMembrane}
                        setSelectedMembrane={setSelectedMembrane}
                        setEffectiveColumn={setEffectiveColumn}
                    />
                    <Flex gap="small" align="flex-end" style={{ marginTop: "3rem" }} vertical>
                        <Button type="primary" size="large" onClick={handleSave}>
                            Guardar Cambios
                        </Button>
                    </Flex>
                </div>
            </Content>
        </>
    );
};

export default EditPartographPage;
