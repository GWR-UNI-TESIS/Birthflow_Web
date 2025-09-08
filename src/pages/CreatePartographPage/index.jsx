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
import WorkTimeTable from "../../components/WorkTimeTable";
import { NavLink, useNavigate } from "react-router-dom";
import { useCatalog } from "../../contexts/catalog-context";
import { createPartograph } from "../../services/partograph-service/partograph-service";

import BackButton from '../../components/ReturnButton';
import dayjs from "dayjs";
import PATH from "../../routes/path";

const { Content } = Layout;

const CreatePartographPage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();
  const [form] = Form.useForm();

  // Estados para selección en tabla de trabajo de parto
  const [selectedMain, setSelectedMain] = useState(null);
  const [selectedSub, setSelectedSub] = useState(null);
  const [selectedMembrane, setSelectedMembrane] = useState(null);
  const [effectiveColumn, setEffectiveColumn] = useState(null);

  // Catálogos del contexto
  const { catalogs, loading: catalogsLoading, error: catalogsError } = useCatalog();

  useEffect(() => {
    if (catalogsError) message.error("Error al cargar los catálogos.");
  }, [catalogsError]);

  if (catalogsLoading) return <Spin />;

  // Guardar formulario y configuraciones de tabla
  const handleSave = async () => {
    try {
      const values = await form.validateFields();

      // Validación: asegurarse que todas las opciones estén seleccionadas
      if (!selectedMain || !selectedSub || !selectedMembrane || !effectiveColumn) {
        message.error("Por favor, seleccione todas las opciones de la tabla.");
        return;
      }

      // Payload que se envía al servicio
      const payload = {
        partographId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        name: values.Name,
        recordName: values.RecordName,
        date: dayjs(values.date).format("YYYY-MM-DDTHH:mm:ss"),
        observation: values.observation || "",
        workTime: effectiveColumn,
      };

      const result = await createPartograph(payload);
      message.success("Partograma creado con éxito!");
      navigate(PATH.PARTOGRAPH(result.partographId));

    } catch (error) {
      message.error(error.message || "Error en la validación o al guardar el partograma");
    }
  };

  return (
    <>
      {/* Breadcrumb y botón de regreso */}
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <BackButton to={PATH.HOME} />
        <Breadcrumb
          items={[
            { title: <NavLink to="/" end>Home</NavLink> },
            { title: "Creación de Partograma" },
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
          {/* Formulario de datos generales */}
          <Typography.Title level={4}>Datos Generales</Typography.Title>
          <Form layout="vertical" form={form} style={{ width: 400, marginBottom: 50 }}>
            <Form.Item label="Nombre de la paciente" name="Name"
              rules={[{ required: true, message: "Por favor ingrese un nombre !" }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Expediente" name="RecordName"
              rules={[{ required: true, message: "Por favor ingrese un expediente !" }]}>
              <Input />
            </Form.Item>
            <Form.Item name="date" label="Fecha"
              rules={[{ required: true, message: "Por favor ingrese una fecha !" }]}>
              <DatePicker />
            </Form.Item>
          </Form>

          <Divider />

          {/* Tabla para selección de valores de la curva */}
          <Typography.Title level={4}>Valores para la creación de la curva de alerta</Typography.Title>
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

          {/* Botón para guardar */}
          <Flex gap="small" align="flex-end" style={{ marginTop: "3rem", marginRight: "1rem" }} vertical>
            <Button type="primary" size="large" onClick={handleSave}>
              Crear
            </Button>
          </Flex>
        </div>
      </Content>
    </>
  );
};

export default CreatePartographPage;
