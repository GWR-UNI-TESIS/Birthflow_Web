import { useState, useEffect } from "react";
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
    Drawer,
    Typography,
} from "antd";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import { useCatalog } from "../../contexts/catalog-context";
import BackButton from "../../components/ReturnButton";
import { getPartographHistory } from "../../services/partograph-history/partograph-history-service";
import PartogramChart from "./components/chart";
import ChildbirthNoteView from "./components/ChildbirthNoteView";
import PATH from "../../routes/path";

const TableSection = ({ title, columns, data }) => (
    <div style={{ paddingTop: 16 }}>
        <Typography.Title level={3}>{title}</Typography.Title>
        <Table columns={columns} dataSource={data} pagination={false} rowKey="id"
            locale={{ emptyText: "Sin datos" }} />
    </div>
);

const PartographHistoryPage = () => {

    const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();

    const {
        catalogs,
        loading: catalogsLoading,
        error: catalogsError,
    } = useCatalog();

    const { partographId } = useParams();
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [historyVisible, setHistoryVisible] = useState(false);
    const [selectedVersion, setSelectedVersion] = useState(null);
    const [historyData, setHistoryData] = useState([]); // Estado inicial vacío
    const [selectedRowKey, setSelectedRowKey] = useState(null); // Nuevo estado para rastrear la fila seleccionada

    // Seleccionar la última versión automáticamente
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getPartographHistory(partographId);
                setData(response);
                setHistoryData(response.map(item => ({
                    ...item,
                    key: item.id // Asegurar que cada elemento tenga un key único
                })));

                if (response?.length > 0) {
                    const latestVersion = response.reduce((latest, current) =>
                        new Date(current.changedAt) > new Date(latest.changedAt) ? current : latest, response[0]);
                    setSelectedVersion(latestVersion);
                    setSelectedRowKey(latestVersion.id);
                }
            } catch (err) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [partographId]);


    useEffect(() => {
        console.log("Datos en historyData:", historyData); // Verificar en consola si los datos están llegando correctamente
    }, [historyData]);


    const partograph = selectedVersion ? JSON.parse(selectedVersion.partographDataJson) : {};

    const showHistory = () => setHistoryVisible(true);
    const hideHistory = () => setHistoryVisible(false);
    const applyVersion = (version) => {
        setSelectedVersion(version);
        setSelectedRowKey(version.id);
        hideHistory();
    };

    if (isLoading || catalogsLoading) return <Spin fullscreen />;
    if (error) return <Alert message="Error al cargar los datos" type="error" />;

    const historyColumns = [
        { title: "Fecha de Cambio", dataIndex: "changedAt", key: "changedAt", render: text => new Date(text).toLocaleString() },
        { title: "Modificado Por", dataIndex: "changedByName", key: "changedByName" },
        { title: "Acción", key: "action", render: (_, record) => <Button onClick={() => applyVersion(record)}>Ver</Button> }
    ];

    const cervicalColumns = [
        { title: "Valor", dataIndex: "Value", key: "Value" },
        { title: "Hora", dataIndex: "Hour", key: "Hour", render: text => new Date(text).toLocaleString() },
        { title: "REM or RAM", dataIndex: "RemOrRam", key: "RemOrRam", render: val => (val ? "Sí" : "No") },
    ];

    const medicalColumns = [
        { title: "Posición Materna", dataIndex: "MaternalPosition", key: "MaternalPosition" },
        { title: "Presión Arterial", dataIndex: "ArterialPressure", key: "ArterialPressure" },
        { title: "Pulso Materno", dataIndex: "MaternalPulse", key: "MaternalPulse" },
        { title: "F.C. Fetal", dataIndex: "FetalHeartRate", key: "FetalHeartRate" },
        { title: "Duración de Contracciones", dataIndex: "ContractionsDuration", key: "ContractionsDuration" },
        { title: "Frecuencia de Contracciones", dataIndex: "FrequencyContractions", key: "FrequencyContractions" },
        { title: "Dolor", dataIndex: "Pain", key: "Pain" },
        { title: "Hora", dataIndex: "Time", key: "Time", render: text => new Date(text).toLocaleString() },
    ];

    const presentationColumns = [
        {
            title: "Plano de Hodge", dataIndex: "HodgePlane", key: "HodgePlane", render: (_, { HodgePlane }) => {
                const item = catalogs.hodgePlanesCatalog.find((item) => item.id === HodgePlane);
                return <span>{item ? item.description : "Desconocido"}</span>;
            },
        },
        {
            title: "Posición", dataIndex: "Position", key: "Position", render: (_, { Position }) => {
                const item = catalogs.positionCatalog.find((item) => item.id === Position);
                return <span>{item ? item.description : "Desconocido"}</span>;
            },
        },
        { title: "Hora", dataIndex: "Time", key: "Time", render: text => new Date(text).toLocaleString() },
    ];

    const contractionColumns = [
        { title: "Valor", dataIndex: "Value", key: "Value" },
        { title: "Hora", dataIndex: "Time", key: "Time", render: text => new Date(text).toLocaleString() },
    ];

    const fetalColumns = [
        { title: "Valor", dataIndex: "Value", key: "Value" },
        { title: "Hora", dataIndex: "Time", key: "Time", render: text => new Date(text).toLocaleString() },
    ];

    return (
        <>
            <div style={{ marginLeft: "1rem", display: "flex", gap: "1rem", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                    <BackButton to={PATH.PARTOGRAPH(partographId)} />
                    <Breadcrumb items={[{ title: <NavLink to="/">Inicio</NavLink> },
                    { title: <NavLink to={PATH.PARTOGRAPH(partographId)}>Partograma</NavLink> },
                    { title: "Historial" }]} />
                </div>
                <div style={{ marginRight: "2rem", display: "flex", gap: "1rem", alignItems: "center" }}>
                    <Button onClick={showHistory}>Historial</Button>
                </div>
            </div>
            <Layout.Content style={{ margin: "1rem", color: 'lightblue' }}>
                <div style={{ background: colorBgContainer, minHeight: 280, padding: 24, borderRadius: borderRadiusLG }}>

                    <PartogramChart partograph={partograph} />

                    <div style={{ marginBottom: "24px" }}>
                        <Typography.Title level={3}>Informacion General</Typography.Title>
                        <Descriptions bordered column={1}>
                            <Descriptions.Item label="Nombre">
                                {partograph.partographLog.Name}
                            </Descriptions.Item>
                            <Descriptions.Item label="Expediente">
                                {partograph.partographLog.RecordName}
                            </Descriptions.Item>
                            <Descriptions.Item label="Fecha">
                                {new Date(partograph.partographLog.Date).toLocaleString()}
                            </Descriptions.Item>
                            <Descriptions.Item label="Valores para la creacion de curva de alerta">
                                {partograph.partographLog.WorkTime}
                            </Descriptions.Item>
                            <Descriptions.Item label="Observación">
                                {partograph.partographLog.Observation || "Sin observaciones"}
                            </Descriptions.Item>
                        </Descriptions>

                    </div>
                    <Divider />
                    <TableSection title="Dilataciones Cervicales" columns={cervicalColumns}
                        data={partograph.cervicalDilationLog}
                    />
                    <Divider />
                    <TableSection title="Vigilancia Médica" columns={medicalColumns}
                        data={partograph.medicalSurveillanceTableLog}
                    />
                    <Divider />
                    <TableSection title="Variaciones de Posición de Presentación" columns={presentationColumns}
                        data={partograph.presentationPositionVarietyLog}
                    />
                    <Divider />
                    <TableSection title="Frecuencia de Contracciones" columns={contractionColumns}
                        data={partograph.contractionFrequencyLog} />
                    <Divider />
                    <TableSection title="Frecuencia Cardíaca Fetal" columns={fetalColumns}
                        data={partograph.fetalHeartRateLog} />
                    <ChildbirthNoteView childbirthNote={partograph.childbirthNoteLog} />
                </div>

            </Layout.Content>
            <Drawer title="Historial de Cambios" placement="right" onClose={hideHistory} open={historyVisible}>
                <Table columns={historyColumns} dataSource={historyData} rowKey="id" pagination={false}
                    rowClassName={(record) => (record.id === selectedRowKey ? "selected-row" : "")}
                />
            </Drawer>
        </>
    );
};

export default PartographHistoryPage;
