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
import { NavLink } from "react-router-dom";
import { useCatalog } from "../../contexts/catalog-context";
import { createPartograph } from "../../services/partograph-service/partograph-service";
import BackButton from '../../components/ReturnButton';
import dayjs from "dayjs";

const { Content } = Layout;
const CreatePartographPage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [form] = Form.useForm();

  // Estados para la selección en cada nivel
  const [selectedMain, setSelectedMain] = useState(null); // "Vertical" o "Horizontal"
  const [selectedSub, setSelectedSub] = useState(null); // Para Vertical: "Todas"; para Horizontal: "Multiparás" o "Nuliparás"
  const [selectedMembrane, setSelectedMembrane] = useState(null); // "Integras" o "Rotas"
  const [effectiveColumn, setEffectiveColumn] = useState(null);

  // Se obtienen los catálogos del contexto
  const {
    catalogs,
    loading: catalogsLoading,
    error: catalogsError,
  } = useCatalog();

  useEffect(() => {
    if (catalogsError) message.error("Error al cargar los catálogos.");
  }, [catalogsError]);

  if (catalogsLoading) return <Spin />;



  // Método para guardar la información del form y la selección de la tabla
  // Método para guardar la información del formulario y la selección de la tabla
  const handleSave = async () => {
    try {
      const values = await form.validateFields();

      // Validación: aseguramos que se hayan realizado todas las selecciones de la tabla
      if (
        !selectedMain ||
        !selectedSub ||
        !selectedMembrane ||
        !effectiveColumn
      ) {
        message.error("Por favor, seleccione todas las opciones de la tabla.");
        return;
      }

      const payload = {
        partographId: "3fa85f64-5717-4562-b3fc-2c963f66afa6", // Este valor se puede generar o asignar según convenga
        name: values.Name,
        recordName: values.RecordName,
        date: dayjs(values.hour).format("YYYY-MM-DDTHH:mm:ss"),
        observation: values.observation || "", // Si agregas un campo observation en el formulario
        workTime: effectiveColumn,
      };

      console.log("Guardando datos:", payload);
      const result = await createPartograph(payload);
      console.log("Respuesta de la API:", result);
      message.success("Datos guardados con éxito!");
      // Aquí podrías redirigir o actualizar el estado según la respuesta
    } catch (error) {
      console.error("Validation or API error:", error);
      message.error(
        error.message || "Error en la validación o al guardar el partograma"
      );
    }
  };

  return (
    <>
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <BackButton />

        <Breadcrumb
          items={[
            {
              title: (
                <NavLink to="/" end>
                  Home
                </NavLink>
              ),
            },
            { title: "Creacion de Partograma" },
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
          <Typography.Title level={4}>Datos Generales</Typography.Title>
          <Form
            layout="vertical"
            form={form}
            style={{ width: 400, marginBottom: 50 }}
          >
            <Form.Item
              label="Nombre de la paciente"
              name="Name"
              rules={[
                { required: true, message: "Por favor ingrese un nombre !" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Expediente"
              name="RecordName"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese un expediente !",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="date"
              label="Fecha"
              rules={[
                { required: true, message: "Por favor ingrese una fecha !" },
              ]}
            >
              <DatePicker />
            </Form.Item>
          </Form>

          <Divider />

          <Typography.Title level={4}>
            Valores para la creacion de la curva de alerta
          </Typography.Title>
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
          <Flex
            gap="small"
            align="flex-end"
            style={{ marginTop: "3rem", marginRight: "1rem" }}
            vertical
          >
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
