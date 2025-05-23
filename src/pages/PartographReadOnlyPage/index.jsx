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
import PartogramChart from "./../../components/Charts/chart";
import ChildbirthNoteView from "./components/ChildbirthNoteView";
import { formatDateTime } from "../../utils/datetime-format";
import PATH from "../../routes/path";
import PdfPreviewLoader from "../../components/PDF/PdfPreviewLoader";
import NotificationDrawer from "../../components/NotificacionDrawer/NotificationDrawer";
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

const PartographReadOnlyPage = () => {

    const {
        catalogs,
        loading: catalogsLoading,
        error: catalogsError,
    } = useCatalog();

    const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();
    const { partographId } = useParams();
    const navigate = useNavigate();
    const { data, loading, error } = usePartograh(partographId);

    if (loading || catalogsLoading) return <Spin fullscreen />;
    if (error) return <Alert message="Error al cargar los datos" type="error" />;

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
                    <Breadcrumb items={[{ title: <NavLink to="/">Inicio</NavLink> }, { title: "Partograma" }]} />
                </div>
                <div style={{ marginRight: "2rem", display: "flex", gap: "1rem", alignItems: "center" }}>
                    <Button onClick={() => navigate(PATH.PARTOGRAPH_HISTORY(partographId))}>Historial</Button>
                    <PdfPreviewLoader partographId={partographId} />
                    <NotificationDrawer partographId={partographId} />

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

            </Layout.Content>
        </>
    );

};


export default PartographReadOnlyPage;
