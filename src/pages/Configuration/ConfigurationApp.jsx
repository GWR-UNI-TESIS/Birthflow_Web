import React, { useDebugValue, useEffect, useState } from "react";
import { Layout, Typography, Switch, Button, Divider, Card, Modal, Breadcrumb  } from "antd";
import { UserOutlined, LockOutlined, InfoCircleOutlined, EditOutlined } from "@ant-design/icons";
import UserForm from "../Configuration/components/Form/UserInfoUpdateForm";
import PasswordForm from "../Configuration/components/Form/UpdatePasswordForm";
import { useAuth } from "../../contexts/auth-context";
import BackButton  from '../../components/ReturnButton';
import PATH from "../../routes/path";
import { NavLink } from "react-router-dom";
function Settings() {
  const { user } = useAuth(); // Obtener usuario desde el contexto
  const [isModalVisible, setIsModalVisible] = useState(false); // Para el form de actualizar el usuario
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false); // Para el form de actualizar la password

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  const showChangePasswordModal = () => setIsPasswordModalVisible(true);
  const handlePasswordCancel = () => setIsPasswordModalVisible(false);


  useEffect(() => {
    if (user) {
      
    }
  }, [user])

  return (
    <>
      <div>

        <div style={{ marginLeft: "1rem", display: "flex", gap: "1rem", alignItems: "center" }}>
          <BackButton to={PATH.HOME} />
          <Breadcrumb
            items={[
              { title: <NavLink to={PATH.HOME}>Home</NavLink> },
              { title: "Configuracion" },
            ]}
          />
        </div>
      </div>
      <Layout style={{ padding: 20, background: "#fff", maxWidth: 600, margin: "auto" }}>
        <Typography.Title level={3} style={{ textAlign: "center" }}>Configuración</Typography.Title>

        {/* Información del Usuario */}
        <Card>
          <Typography.Title level={5}>Información del Usuario</Typography.Title>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <UserOutlined style={{ fontSize: 20 }} />
            <div>
              <Typography.Text strong>{user?.name || "Nombre de usuario"}</Typography.Text>
              <br />
              <Typography.Text type="secondary">{user?.email || "Correo electrónico"}</Typography.Text>
            </div>
            <EditOutlined style={{ marginLeft: "auto", cursor: "pointer" }} onClick={showModal} />
          </div>

          <Divider />

          {/* Notificaciones */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography.Text>Habilitar Notificaciones</Typography.Text>
            <Switch />
          </div>

          <Divider />

          {/* Cambio de Contraseña */}
          <Button type="primary" icon={<LockOutlined />} block onClick={showChangePasswordModal}>
            Cambiar Contraseña
          </Button>
        </Card>

        {/* Modal para el formulario */}
        <Modal title="Actualizar Información del Usuario" open={isModalVisible} onCancel={handleCancel} footer={null}>
          <UserForm />
        </Modal>

        <Modal title="Actualizar Contraseña" open={isPasswordModalVisible} onCancel={handlePasswordCancel} footer={null}>
          <PasswordForm />
        </Modal>

        {/* Información de la Aplicación */}
        <Card>
          <Typography.Title level={5}>Información de la Aplicación</Typography.Title>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <InfoCircleOutlined style={{ fontSize: 18 }} />
            <Typography.Text>Versión de la Aplicación 1.0.0</Typography.Text>
          </div>
        </Card>
      </Layout>
    </>
  );
}

export default Settings;
