import React from 'react';
import { Layout, theme, Table, Spin, Alert, Descriptions, Divider } from 'antd';
import { useParams } from "react-router-dom";
import usePartograh from "../../hooks/use-partograph";

const PartographPage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { partographId } = useParams();
  const { data, loading: dataLoading, error: dataError } = usePartograh(partographId);

  if (dataLoading) return <Spin />;
  if (dataError) return <Alert message="Error al cargar los datos" type="error" />;

  // Si el objeto tiene la propiedad "response", se usa esa estructura.
  const partograph = data.response ? data.response : data;

  // Tabla de Dilataciones Cervicales
  const cervicalColumns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Valor', dataIndex: 'value', key: 'value' },
    {
      title: 'Hora',
      dataIndex: 'hour',
      key: 'hour',
      render: (text) => new Date(text).toLocaleString()
    },
    {
      title: 'REM or RAM',
      dataIndex: 'remOrRam',
      key: 'remOrRam',
      render: (val) => val ? 'Sí' : 'No'
    },
  ];

  // Tabla de Vigilancia Médica
  const medicalColumns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Posición Materna', dataIndex: 'maternalPosition', key: 'maternalPosition' },
    { title: 'Presión Arterial', dataIndex: 'arterialPressure', key: 'arterialPressure' },
    { title: 'Pulso Materno', dataIndex: 'maternalPulse', key: 'maternalPulse' },
    { title: 'F.C. Fetal', dataIndex: 'fetalHeartRate', key: 'fetalHeartRate' },
    { title: 'Duración de Contracciones', dataIndex: 'contractionsDuration', key: 'contractionsDuration' },
    { title: 'Frecuencia de Contracciones', dataIndex: 'frequencyContractions', key: 'frequencyContractions' },
    { title: 'Dolor', dataIndex: 'pain', key: 'pain' },
    { title: 'Letra', dataIndex: 'letter', key: 'letter' },
    {
      title: 'Hora',
      dataIndex: 'time',
      key: 'time',
      render: (text) => new Date(text).toLocaleString()
    },
  ];

  // Tabla de Variaciones de Posición de Presentación
  const presentationColumns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Plano de Hodge', dataIndex: 'hodgePlane', key: 'hodgePlane' },
    { title: 'Posición', dataIndex: 'position', key: 'position' },
    {
      title: 'Hora',
      dataIndex: 'time',
      key: 'time',
      render: (text) => new Date(text).toLocaleString()
    },
  ];

  // Tabla de Frecuencia de Contracciones
  const contractionColumns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Valor', dataIndex: 'value', key: 'value' },
    {
      title: 'Hora',
      dataIndex: 'time',
      key: 'time',
      render: (text) => new Date(text).toLocaleString()
    },
  ];

  // Tabla de Frecuencia Cardíaca Fetal
  // Como en este ejemplo el array viene vacío, se definen columnas para futuros datos.
  const fetalColumns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Valor', dataIndex: 'value', key: 'value' },
    {
      title: 'Hora',
      dataIndex: 'time',
      key: 'time',
      render: (text) => text ? new Date(text).toLocaleString() : ''
    },
  ];

  return (
    <Layout.Content style={{ margin: "1rem" }}>
      <div
        style={{
          background: colorBgContainer,
          minHeight: 280,
          padding: 24,
          borderRadius: borderRadiusLG,
        }}
      >
        {/* Área para el gráfico */}
        <div style={{ marginBottom: '24px' }}>
          <div
            style={{
              background: '#fafafa',
              height: '300px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px dashed #d9d9d9',
            }}
          >
            Gráfico Placeholder
          </div>
        </div>

{/* Información General */}
<div style={{ marginBottom: '24px' }}>
          <h3>Información General</h3>
          <Descriptions bordered column={2}>
            <Descriptions.Item label="Nombre">{partograph.name}</Descriptions.Item>
            <Descriptions.Item label="Registro">{partograph.recordName}</Descriptions.Item>
            <Descriptions.Item label="Fecha">{new Date(partograph.date).toLocaleString()}</Descriptions.Item>
            <Descriptions.Item label="Turno">{partograph.workTime}</Descriptions.Item>
            <Descriptions.Item label="Observación">
              {partograph.observation || 'Sin observaciones'}
            </Descriptions.Item>
          </Descriptions>
        </div>

        {/* Tabla de Dilataciones Cervicales */}
        <div style={{ marginBottom: '24px' }}>
          <h3>Dilataciones Cervicales</h3>
          <Table
            columns={cervicalColumns}
            dataSource={partograph.cervicalDilations}
            pagination={false}
            rowKey="id"
            locale={{ emptyText: 'Sin datos' }}
          />
        </div>
        <Divider />        {/* Tabla de Vigilancia Médica */}
        <div style={{ marginBottom: '24px' }}>
          <h3>Vigilancia Médica</h3>
          <Table
            columns={medicalColumns}
            dataSource={partograph.medicalSurveillanceTable}
            pagination={false}
            rowKey="id"
            locale={{ emptyText: 'Sin datos' }}
          />
        </div>
        <Divider />  
        {/* Tabla de Variaciones de Posición de Presentación */}
        <div style={{ marginBottom: '24px' }}>
          <h3>Variaciones de Posición de Presentación</h3>
          <Table
            columns={presentationColumns}
            dataSource={partograph.presentationPositionVarieties}
            pagination={false}
            rowKey="id"
            locale={{ emptyText: 'Sin datos' }}
          />
        </div>
        <Divider />  
        {/* Tabla de Frecuencia de Contracciones */}
        <div style={{ marginBottom: '24px' }}>
          <h3>Frecuencia de Contracciones</h3>
          <Table
            columns={contractionColumns}
            dataSource={partograph.contractionFrequencies}
            pagination={false}
            rowKey="id"
            locale={{ emptyText: 'Sin datos' }}
          />
        </div>
        <Divider />  
        {/* Tabla de Frecuencia Cardíaca Fetal */}
        <div style={{ marginBottom: '24px' }}>
          <h3>Frecuencia Cardíaca Fetal</h3>
          <Table
            columns={fetalColumns}
            dataSource={partograph.fetalHeartRates}
            pagination={false}
            rowKey="id"
            locale={{ emptyText: 'Sin datos' }}
          />
        </div>
      </div>
    </Layout.Content>
  );
};

export default PartographPage;
