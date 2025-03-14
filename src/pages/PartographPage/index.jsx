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
} from "antd";
import { useParams, NavLink } from "react-router-dom";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useCatalog } from "../../contexts/catalog-context";
import BackButton from "../../components/ReturnButton";
import usePartograh from "../../hooks/use-partograph";
import PartogramChart from "./components/Chart";
import CervicalDilationModal from "./modals/CervicalDilationModal";
import MedicalSurveillanceModal from './modals/MedicalSurveillanceModal'
import FetalHeartRateModal from "./modals/FetalHeartRateModal";
import ContractionFrequencyModal from "./modals/ContractionFrequencyModal";
import PresentationPositionVarietyModal from "./modals/PresentationPositionVarietyModal";
const TableSection = ({ title, columns, data, buttonLabel, onButtonClick }) => (
  <>
    <h3>{title}</h3>
    <Table columns={columns} dataSource={data} pagination={false} rowKey="id" locale={{ emptyText: "Sin datos" }} />
    {onButtonClick && (
      <Flex align="flex-end" style={{ marginTop: "1rem", marginRight: "1rem" }} vertical>
        <Button icon={<PlusCircleOutlined />} type="primary" onClick={onButtonClick}>
          {buttonLabel}
        </Button>
      </Flex>
    )}
    <Divider />
  </>
);

const PartographPage = () => {
  const [isCervicalDilationModalVisible, setIsCervicalDilationModalVisible] = useState(false);
  const [isMedicalSurveillanceModalVisible, setIsMedicalSurveillanceModalVisible] = useState(false);
  const [isFetalHeartRateModalVisible, setIsFetalHeartRateModalVisible] = useState(false);
  const [isContractionFrequencyModalVisible, setIsContractionFrequencyModalVisible] = useState(false);
  const [isPresentationPositionVarietyModalVisible, setIsPresentationPositionVarietyModalVisible] = useState(false);

  const {
    catalogs,
    loading: catalogsLoading,
    error: catalogsError,
  } = useCatalog();

  const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();
  const { partographId } = useParams();
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
    { title: "Letra", dataIndex: "letter", key: "letter" },
    { title: "Hora", dataIndex: "time", key: "time", render: text => new Date(text).toLocaleString() },
  ];

  const presentationColumns = [
    { title: "ID", dataIndex: "id", key: "id" },
    {
      title: "Plano de Hodge", dataIndex: "hodgePlane", key: "hodgePlane", render: (_, { hodgePlane }) => {
        const item = catalogs.hodgePlanesCatalog.find((item) => item.id === hodgePlane);
        return <span>{item ? item.description : "Desconocido"}</span>;
      },
    },
    { title: "Posición", dataIndex: "position", key: "position", render: (_, { position }) => {
      const item = catalogs.positionCatalog.find((item) => item.id === position);
      return <span>{item ? item.description : "Desconocido"}</span>;
    },},
    { title: "Hora", dataIndex: "time", key: "time", render: text => new Date(text).toLocaleString() },
  ];

  const contractionColumns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Valor", dataIndex: "value", key: "value" },
    { title: "Hora", dataIndex: "time", key: "time", render: text => new Date(text).toLocaleString() },
  ];

  const fetalColumns = [
    { title: "Valor", dataIndex: "value", key: "value" },
    { title: "Hora", dataIndex: "time", key: "time", render: text => (text ? new Date(text).toLocaleString() : "") },
  ];

  return (
    <>
      <div style={{ marginLeft: "1rem", display: "flex", gap: "1rem", alignItems: "center" }}>
        <BackButton />
        <Breadcrumb items={[{ title: <NavLink to="/">Home</NavLink> }, { title: "Partograma" }]} />
      </div>
      <Layout.Content style={{ margin: "1rem" }}>
        <div style={{ background: colorBgContainer, minHeight: 280, padding: 24, borderRadius: borderRadiusLG }}>
          <PartogramChart partograph={partograph} />
          <TableSection title="Dilataciones Cervicales" columns={cervicalColumns} data={partograph.cervicalDilations} buttonLabel="Agregar Dilatación Cervical" onButtonClick={() => setIsCervicalDilationModalVisible(true)} />
          <TableSection title="Vigilancia Médica" columns={medicalColumns} data={partograph.medicalSurveillanceTable} buttonLabel="Agregar elemento a tabla" onButtonClick={() => setIsMedicalSurveillanceModalVisible(true)} />
          <TableSection title="Variaciones de Posición de Presentación" columns={presentationColumns} data={partograph.presentationPositionVarieties} buttonLabel="Agregar altura de la presentación" onButtonClick={() => setIsPresentationPositionVarietyModalVisible(true)} />
          <TableSection title="Frecuencia de Contracciones" columns={contractionColumns} data={partograph.contractionFrequencies} buttonLabel="Agregar Frecuencia de Contracciones" onButtonClick={() => setIsContractionFrequencyModalVisible(true)} />
          <TableSection title="Frecuencia Cardíaca Fetal" columns={fetalColumns} data={partograph.fetalHeartRates} buttonLabel="Agregar Frecuencia Cardíaca Fetal" onButtonClick={() => setIsFetalHeartRateModalVisible(true)} />
        </div>
        <CervicalDilationModal
          visible={isCervicalDilationModalVisible}
          onClose={() => setIsCervicalDilationModalVisible(false)}
        />
        <MedicalSurveillanceModal
          visible={isMedicalSurveillanceModalVisible}
          onClose={() => setIsMedicalSurveillanceModalVisible(false)} />

        <PresentationPositionVarietyModal
          visible={isPresentationPositionVarietyModalVisible}
          onClose={() => setIsPresentationPositionVarietyModalVisible(false)} />

        <ContractionFrequencyModal
          visible={isContractionFrequencyModalVisible}
          onClose={() => setIsContractionFrequencyModalVisible(false)} />

        <FetalHeartRateModal
          visible={isFetalHeartRateModalVisible}
          onClose={() => setIsFetalHeartRateModalVisible(false)} />
      </Layout.Content>
    </>
  );
};

export default PartographPage;
