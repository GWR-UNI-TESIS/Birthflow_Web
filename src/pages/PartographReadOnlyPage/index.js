import { useState } from "react";
import {
    Button,
    Layout,
    theme,
    Table,
    Spin,
    Alert,
    Descriptions,
    Divider,
    Breadcrumb,
    Flex,
    Typography,
    List,
    Skeleton,
    Drawer,
    Modal
} from "antd";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import { PlusCircleOutlined, EditOutlined } from "@ant-design/icons";
import { useCatalog } from "../../contexts/catalog-context";
import BackButton from "../../components/ReturnButton";
import usePartograh from "../../hooks/use-partograph";
import usePartographNotifications from "../../hooks/use-partograph-notifications";
import { getPartographPdf } from '../../services/report-service/report-service';
import PartogramChart from "./components/chart";


import { formatDateTime } from "../../utils/datetime-format";
import PATH from "../../routes/path";
const TableSection = ({ title, columns, data, buttonLabel, onButtonClick }) => (
    <div style={{ paddingTop: 16 }}>
        <Typography.Title level={3}>{title}</Typography.Title>
        <Table columns={columns} dataSource={data} pagination={false} rowKey="id"
            locale={{ emptyText: "Sin datos" }} />
        {onButtonClick && (
            <Flex align="flex-end" style={{ marginTop: "1rem", marginRight: "1rem" }} vertical>
                <Button icon={<PlusCircleOutlined />} type="primary" onClick={onButtonClick}>
                    {buttonLabel}
                </Button>
            </Flex>
        )}
    </div>
);

const NotificationList = ({ partographId }) => {
    const { data, error, loading } = usePartographNotifications(partographId);

    if (loading) return <Spin tip="Cargando notificaciones..." />;
    if (error) return <p>Error al cargar notificaciones.</p>;

    if (!data || data.length === 0) return <p>No hay notificaciones disponibles.</p>;

    return (
        <List
            className="demo-loadmore-list"
            loading={loading}
            itemLayout="vertical"
            dataSource={data?.response}
            renderItem={(item) => (
                <List.Item key={item.notificationId}>
                    <Skeleton avatar title={false} loading={item.loading} active>
                        <List.Item.Meta title={<a>{item.title}</a>} description={item.message} />
                        <div>{formatDateTime(item.scheduledFor)}</div>
                    </Skeleton>
                </List.Item>
            )}
        />
    );
};

const PartographPage = () => {

    const [isNotificationDrawerVisible, setNotificationDrawerVisible] = useState(false);
    const [selectedPartographId, setSelectedPartographId] = useState(null);
    const [pdfVisible, setPdfVisible] = useState(false);
    const [pdfUrl, setPdfUrl] = useState(null);
    const [pdfLoading, setPdfLoading] = useState(false);
    const {
        catalogs,
        loading: catalogsLoading,
        error: catalogsError,
    } = useCatalog();

    const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();
    const { partographId } = useParams();
    const navigate = useNavigate();
    const { data, loading, error } = usePartograh(partographId);

    if (loading || catalogsLoading || pdfLoading) return <Spin fullscreen />;
    if (error) return <Alert message="Error al cargar los datos" type="error" />;


    const mostrarPDF = async () => {
        try {
            setPdfLoading(true);
            const blob = await getPartographPdf(partographId);
            const url = URL.createObjectURL(blob);
            setPdfUrl(url);
            setPdfVisible(true);
            setPdfLoading(false);
        } catch (error) {
            console.error("Error mostrando PDF:", error);
            setPdfLoading(false);
        }
    };
    const partograph = data.response || data;

    const cervicalColumns = [
        { title: "Valor", dataIndex: "value", key: "value" },
        { title: "Hora", dataIndex: "hour", key: "hour", render: text => new Date(text).toLocaleString() },
        { title: "REM or RAM", dataIndex: "remOrRam", key: "remOrRam", render: val => (val ? "Sí" : "No") },
    ];

    const medicalColumns = [
        { title: "Posición Materna", dataIndex: "maternalPosition", key: "maternalPosition" },
        { title: "Presión Arterial", dataIndex: "arterialPressure", key: "arterialPressure" },
        { title: "Pulso Materno", dataIndex: "maternalPulse", key: "maternalPulse" },
        { title: "F.C. Fetal", dataIndex: "fetalHeartRate", key: "fetalHeartRate" },
        { title: "Duración de Contracciones", dataIndex: "contractionsDuration", key: "contractionsDuration" },
        { title: "Frecuencia de Contracciones", dataIndex: "frequencyContractions", key: "frequencyContractions" },
        { title: "Dolor", dataIndex: "pain", key: "pain" },
        { title: "Hora", dataIndex: "time", key: "time", render: text => new Date(text).toLocaleString() },
    ];

    const presentationColumns = [
        {
            title: "Plano de Hodge", dataIndex: "hodgePlane", key: "hodgePlane", render: (_, { hodgePlane }) => {
                const item = catalogs.hodgePlanesCatalog.find((item) => item.id === hodgePlane);
                return <span>{item ? item.description : "Desconocido"}</span>;
            },
        },
        {
            title: "Posición", dataIndex: "position", key: "position", render: (_, { position }) => {
                const item = catalogs.positionCatalog.find((item) => item.id === position);
                return <span>{item ? item.description : "Desconocido"}</span>;
            },
        },
        { title: "Hora", dataIndex: "time", key: "time", render: text => new Date(text).toLocaleString() },
    ];

    const contractionColumns = [
        { title: "Valor", dataIndex: "value", key: "value" },
        { title: "Hora", dataIndex: "time", key: "time", render: text => new Date(text).toLocaleString() },
    ];

    const fetalColumns = [
        { title: "Valor", dataIndex: "value", key: "value" },
        { title: "Hora", dataIndex: "time", key: "time", render: text => new Date(text).toLocaleString() },
    ];

    return (
        <>
            <div style={{ marginLeft: "1rem", display: "flex", gap: "1rem", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                    <BackButton to={PATH.HOME} />
                    <Breadcrumb items={[{ title: <NavLink to="/">Home</NavLink> }, { title: "Partograma" }]} />
                </div>
                <div style={{ marginRight: "2rem", display: "flex", gap: "1rem", alignItems: "center" }}>
                    <Button onClick={() => navigate(PATH.PARTOGRAPH_HISTORY(partographId))}>Historial</Button>
                    <Button onClick={mostrarPDF}>Generar PDF</Button>
                    <Button onClick={() => {
                        setSelectedPartographId(partographId);
                        setNotificationDrawerVisible(true);
                    }}>
                        Notificaciones
                    </Button>
                </div>
            </div>
            <Layout.Content style={{ margin: "1rem", color: 'lightblue' }}>
                <div style={{ background: colorBgContainer, minHeight: 280, padding: 24, borderRadius: borderRadiusLG }}>
                    <PartogramChart partograph={partograph} />

                    <div style={{ marginBottom: "24px" }}>
                        <Typography.Title level={3}>Informacion General</Typography.Title>
                        <Descriptions bordered column={1}>
                            <Descriptions.Item label="Nombre">
                                {partograph.name}
                            </Descriptions.Item>
                            <Descriptions.Item label="Expediente">
                                {partograph.recordName}
                            </Descriptions.Item>
                            <Descriptions.Item label="Fecha">
                                {new Date(partograph.date).toLocaleString()}
                            </Descriptions.Item>
                            <Descriptions.Item label="Valores para la creacion de curva de alerta">
                                {partograph.workTime}
                            </Descriptions.Item>
                            <Descriptions.Item label="Observación">
                                {partograph.observation || "Sin observaciones"}
                            </Descriptions.Item>
                        </Descriptions>
                        <Flex align="flex-end" style={{ marginTop: "1rem", marginRight: "1rem" }} vertical>
                            <Button type="primary" onClick={() => navigate(PATH.PARTOGRAPH_EDIT(partographId,))}>Editar</Button>
                        </Flex>
                    </div>
                    <Divider />
                    <TableSection title="Dilataciones Cervicales" columns={cervicalColumns}
                        data={partograph.cervicalDilations}
                        buttonLabel="Agregar Dilatación Cervical"
                    />
                    <Divider />
                    <TableSection title="Vigilancia Médica" columns={medicalColumns}
                        data={partograph.medicalSurveillanceTable}
                        buttonLabel="Agregar elemento a tabla"
                    />
                    <Divider />
                    <TableSection title="Variaciones de Posición de Presentación" columns={presentationColumns}
                        data={partograph.presentationPositionVarieties}
                        buttonLabel="Agregar altura de la presentación"
                    />
                    <Divider />
                    <TableSection title="Frecuencia de Contracciones" columns={contractionColumns}
                        data={partograph.contractionFrequencies}
                        buttonLabel="Agregar Frecuencia de Contracciones" />
                    <Divider />
                    <TableSection title="Frecuencia Cardíaca Fetal" columns={fetalColumns}
                        data={partograph.fetalHeartRates}
                        buttonLabel="Agregar Frecuencia Cardíaca Fetal" />
                    <ChildbirthNoteView childbirthNote={partograph.childbirthNote} partographId={partographId} />
                </div>
                <Drawer
                    title="Notificaciones del Partograma"
                    placement="right"
                    width={400}
                    onClose={() => setNotificationDrawerVisible(false)}
                    open={isNotificationDrawerVisible}
                >
                    {selectedPartographId ? (
                        <NotificationList partographId={selectedPartographId} />
                    ) : (
                        <p>No se ha seleccionado un partograma.</p>
                    )}
                </Drawer>

                <Modal
                    open={pdfVisible}
                    onCancel={() => setPdfVisible(false)}
                    footer={[
                        <Button key="close" onClick={() => setPdfVisible(false)}>
                            Cerrar
                        </Button>,
                    ]}
                    width="80%"
                    style={{ top: 20 }}
                    title="Vista previa del PDF"
                >
                    {pdfUrl ? (
                        <iframe
                            src={pdfUrl}
                            title="PDF Preview"
                            width="100%"
                            height="600px"
                            style={{ border: "none" }}
                        />
                    ) : (
                        <p>Cargando PDF...</p>
                    )}
                </Modal>
            </Layout.Content>
        </>
    );

};


export default PartographPage;
