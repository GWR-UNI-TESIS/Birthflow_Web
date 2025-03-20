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
} from "antd";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import { PlusCircleOutlined, EditOutlined } from "@ant-design/icons";
import { useCatalog } from "../../contexts/catalog-context";
import BackButton from "../../components/ReturnButton";
import usePartograh from "../../hooks/use-partograph";
import PartogramChart from "./components/chart";
import CervicalDilationModal from "./modals/CervicalDilationModal";
import MedicalSurveillanceModal from './modals/MedicalSurveillanceModal'
import FetalHeartRateModal from "./modals/FetalHeartRateModal";
import ContractionFrequencyModal from "./modals/ContractionFrequencyModal";
import PresentationPositionVarietyModal from "./modals/PresentationPositionVarietyModal";
import ChildbirthNoteView from "./components/ChildbirthNoteView";

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
  const navigate = useNavigate();
  const { data, loading, error } = usePartograh(partographId);

  if (loading || catalogsLoading) return <Spin fullscreen />;
  if (error) return <Alert message="Error al cargar los datos" type="error" />;

  const partograph = data.response || data;

  const cervicalColumns = [
    { title: "Valor", dataIndex: "value", key: "value" },
    { title: "Hora", dataIndex: "hour", key: "hour", render: text => new Date(text).toLocaleString() },
    { title: "REM or RAM", dataIndex: "remOrRam", key: "remOrRam", render: val => (val ? "Sí" : "No") },
    {
      title: "Acciones",
      key: "actions",
      render: (_, record) => (
        <Button icon={<EditOutlined />} type="link" size="large"
          onClick={() => navigate(`/partograph/${partographId}/cervical-dilation/${record.id}/edit`)} />
      ),
    },
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
    {
      title: "Acciones",
      key: "actions",
      render: (_, record) => (
        <Button icon={<EditOutlined />} type="link" size="large"
          onClick={() => navigate(`/partograph/${partographId}/medical-surveillance/${record.id}/edit`)} />
      ),
    },
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
    {
      title: "Acciones",
      key: "actions",
      render: (_, record) => (
        <Button icon={<EditOutlined />} type="link" size="large"
          onClick={() => navigate(`/partograph/${partographId}/presentation-position-variety/${record.id}/edit`)} />
      ),
    },
  ];

  const contractionColumns = [
    { title: "Valor", dataIndex: "value", key: "value" },
    { title: "Hora", dataIndex: "time", key: "time", render: text => new Date(text).toLocaleString() },
    {
      title: "Acciones",
      key: "actions",
      render: (_, record) => (
        <Button icon={<EditOutlined />} type="link" size="large"
          onClick={() => navigate(`/partograph/${partographId}/contraction-frequency/${record.id}/edit`)} />
      ),
    },
  ];

  const fetalColumns = [
    { title: "Valor", dataIndex: "value", key: "value" },
    { title: "Hora", dataIndex: "time", key: "time", render: text => new Date(text).toLocaleString() },
    {
      title: "Acciones",
      key: "actions",
      render: (_, record) => (
        <Button icon={<EditOutlined />} type="link" size="large"
          onClick={() => navigate(`/partograph/${partographId}/fetal-heart-rate/${record.id}/edit`)} />
      ),
    },
  ];

  return (
    <>
      <div style={{ marginLeft: "1rem", display: "flex", gap: "1rem", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <BackButton />
          <Breadcrumb items={[{ title: <NavLink to="/">Home</NavLink> }, { title: "Partograma" }]} />
        </div>
        <div style={{ marginRight: "2rem", display: "flex", gap: "1rem", alignItems: "center" }}>
        <Button onClick={ () => navigate(`/partograph/${partographId}/history`)}>Historial</Button>
          <Button>Generar PDF</Button>
          <Button>Notificaciones</Button>
          <Button>Estado del partograma</Button>
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
              <Button type="primary" onClick={() => navigate(`/partograph/${partographId}/edit`)}>Editar</Button>
            </Flex>
          </div>
          <Divider />
          <TableSection title="Dilataciones Cervicales" columns={cervicalColumns}
            data={partograph.cervicalDilations}
            buttonLabel="Agregar Dilatación Cervical"
            onButtonClick={() => setIsCervicalDilationModalVisible(true)}
          />
          <Divider />
          <TableSection title="Vigilancia Médica" columns={medicalColumns}
            data={partograph.medicalSurveillanceTable}
            buttonLabel="Agregar elemento a tabla"
            onButtonClick={() => setIsMedicalSurveillanceModalVisible(true)}
          />
          <Divider />
          <TableSection title="Variaciones de Posición de Presentación" columns={presentationColumns}
            data={partograph.presentationPositionVarieties}
            buttonLabel="Agregar altura de la presentación"
            onButtonClick={() => setIsPresentationPositionVarietyModalVisible(true)}
          />
          <Divider />
          <TableSection title="Frecuencia de Contracciones" columns={contractionColumns}
            data={partograph.contractionFrequencies}
            buttonLabel="Agregar Frecuencia de Contracciones"
            onButtonClick={() => setIsContractionFrequencyModalVisible(true)} />
          <Divider />
          <TableSection title="Frecuencia Cardíaca Fetal" columns={fetalColumns}
            data={partograph.fetalHeartRates}
            buttonLabel="Agregar Frecuencia Cardíaca Fetal"
            onButtonClick={() => setIsFetalHeartRateModalVisible(true)} />
          <ChildbirthNoteView childbirthNote={partograph.childbirthNote} partographId={partographId} />
        </div>
        <CervicalDilationModal
          visible={isCervicalDilationModalVisible}
          onClose={() => setIsCervicalDilationModalVisible(false)}
          partographId={partographId}
        />
        <MedicalSurveillanceModal
          visible={isMedicalSurveillanceModalVisible}
          onClose={() => setIsMedicalSurveillanceModalVisible(false)}
          partographId={partographId}
        />

        <PresentationPositionVarietyModal
          visible={isPresentationPositionVarietyModalVisible}
          onClose={() => setIsPresentationPositionVarietyModalVisible(false)}
          partographId={partographId}
        />

        <ContractionFrequencyModal
          visible={isContractionFrequencyModalVisible}
          onClose={() => setIsContractionFrequencyModalVisible(false)}
          partographId={partographId}
        />

        <FetalHeartRateModal
          visible={isFetalHeartRateModalVisible}
          onClose={() => setIsFetalHeartRateModalVisible(false)}
          partographId={partographId}
        />
      </Layout.Content>
    </>
  );
};

export default PartographPage;
