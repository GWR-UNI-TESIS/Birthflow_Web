import { useState, useMemo } from "react";
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
} from "antd";
import { useParams, NavLink } from "react-router-dom";
import { PlusCircleOutlined } from "@ant-design/icons";

import BackButton from "../../components/ReturnButton";
import usePartograh from "../../hooks/use-partograph";
import PartogramChart from "./components/chart";
import CervicalDilationModal from "./modals/CervicalDilationModal";

const TableSection = ({ title, columns, data, buttonLabel, onButtonClick }) => (
  <>
    <h3>{title}</h3>
    <Table columns={columns} dataSource={data} pagination={false} rowKey="id" locale={{ emptyText: "Sin datos" }} />
    {onButtonClick && (
      <Flex align="flex-end" style={{ marginTop: "1rem", marginRight: "1rem" }} vertical>
        <Button icon={<PlusCircleOutlined />} style={{ backgroundColor: "#7448ab" }} type="primary" size="large" onClick={onButtonClick}>
          {buttonLabel}
        </Button>
      </Flex>
    )}
    <Divider />
  </>
);

const PartographPage = () => {
  const [isCervicalDilationModalVisible, setIsCervicalDilationModalVisible] = useState(false);
  const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();
  const { partographId } = useParams();
  const { data, loading, error } = usePartograh(partographId);

  if (loading) return <Spin />;
  if (error) return <Alert message="Error al cargar los datos" type="error" />;

  const partograph = data.response || data;


  const cervicalColumns = useMemo(() => [
    { title: "Valor", dataIndex: "value", key: "value" },
    { title: "Hora", dataIndex: "hour", key: "hour", render: text => new Date(text).toLocaleString() },
    { title: "REM or RAM", dataIndex: "remOrRam", key: "remOrRam", render: val => (val ? "Sí" : "No") },
  ], []);

  const medicalColumns = useMemo(() => [
    { title: "Posición Materna", dataIndex: "maternalPosition", key: "maternalPosition" },
    { title: "Presión Arterial", dataIndex: "arterialPressure", key: "arterialPressure" },
    { title: "Pulso Materno", dataIndex: "maternalPulse", key: "maternalPulse" },
    { title: "F.C. Fetal", dataIndex: "fetalHeartRate", key: "fetalHeartRate" },
    { title: "Duración de Contracciones", dataIndex: "contractionsDuration", key: "contractionsDuration" },
    { title: "Frecuencia de Contracciones", dataIndex: "frequencyContractions", key: "frequencyContractions" },
    { title: "Dolor", dataIndex: "pain", key: "pain" },
    { title: "Letra", dataIndex: "letter", key: "letter" },
    { title: "Hora", dataIndex: "time", key: "time", render: text => new Date(text).toLocaleString() },
  ], []);

  const presentationColumns = useMemo(() => [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Plano de Hodge", dataIndex: "hodgePlane", key: "hodgePlane" },
    { title: "Posición", dataIndex: "position", key: "position" },
    { title: "Hora", dataIndex: "time", key: "time", render: text => new Date(text).toLocaleString() },
  ], []);

  const contractionColumns = useMemo(() => [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Valor", dataIndex: "value", key: "value" },
    { title: "Hora", dataIndex: "time", key: "time", render: text => new Date(text).toLocaleString() },
  ], []);

  const fetalColumns = useMemo(() => [
    { title: "Valor", dataIndex: "value", key: "value" },
    { title: "Hora", dataIndex: "time", key: "time", render: text => (text ? new Date(text).toLocaleString() : "") },
  ], []);
  
  return (
    <>
      <div style={{ marginLeft: "1rem", display: "flex", gap: "1rem", alignItems: "center" }}>
        <BackButton />
        <Breadcrumb items={[{ title: <NavLink to="/">Home</NavLink> }, { title: "Partograma" }]} />
      </div>
      <Layout.Content style={{ margin: "1rem" }}>
        <div style={{ background: colorBgContainer, minHeight: 280, padding: 24, borderRadius: borderRadiusLG }}>
          <PartogramChart partograph={partograph} />
          <div style={{ marginBottom: "24px" }}>
            <h3>Información General</h3>
            <Descriptions bordered column={2}>
              <Descriptions.Item label="Nombre">{partograph.name}</Descriptions.Item>
              <Descriptions.Item label="Registro">{partograph.recordName}</Descriptions.Item>
              <Descriptions.Item label="Fecha">{new Date(partograph.date).toLocaleString()}</Descriptions.Item>
              <Descriptions.Item label="Turno">{partograph.workTime}</Descriptions.Item>
              <Descriptions.Item label="Observación">{partograph.observation || "Sin observaciones"}</Descriptions.Item>
            </Descriptions>
            <Flex align="flex-end" style={{ marginTop: "1rem", marginRight: "1rem" }} vertical>
              <Button icon={<PlusCircleOutlined />} style={{ backgroundColor: "#7448ab" }} type="primary" size="large">
                Modificar
              </Button>
            </Flex>
          </div>

          <TableSection title="Dilataciones Cervicales" columns={cervicalColumns} data={partograph.cervicalDilations} buttonLabel="Agregar Dilatación Cervical" onButtonClick={() => setIsCervicalDilationModalVisible(true)} />
          <TableSection title="Vigilancia Médica" columns={medicalColumns} data={partograph.medicalSurveillanceTable} buttonLabel="Agregar elemento a tabla" />
          <TableSection title="Variaciones de Posición de Presentación" columns={presentationColumns} data={partograph.presentationPositionVarieties} buttonLabel="Agregar altura de la presentación" />
          <TableSection title="Frecuencia de Contracciones" columns={contractionColumns} data={partograph.contractionFrequencies} buttonLabel="Agregar Frecuencia de Contracciones" />
          <TableSection title="Frecuencia Cardíaca Fetal" columns={fetalColumns} data={partograph.fetalHeartRates} buttonLabel="Agregar Frecuencia Cardíaca Fetal" />
        </div>
      </Layout.Content>
    </>
  );
};

export default PartographPage;
