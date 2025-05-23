import { useEffect, useState } from "react";
import { Breadcrumb, Typography, Layout, Divider, Button, List, Spin, message, Modal, Flex } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { NavLink, useParams, useLocation } from "react-router-dom";

import BackButton from "../../../components/ReturnButton";
import PATH from "../../../routes/path";
import { getUsersInGroup, addUserToGroup, removeUserFromGroup } from "../../../services/groups/groups-service";
import SearchUserModal from "../../../components/UserSearchModal"; // Reutilizable
import { useAuth } from "../../../contexts/auth-context";

function UsersInGroup() {
  const { groupId } = useParams();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchModalVisible, setSearchModalVisible] = useState(false);


  const location = useLocation();
  const { createdBy } = location.state || {};
  const { user } = useAuth();
  const isOwner = user?.id === createdBy;

  const loadUsers = async () => {
    setLoading(true);
    try {
      const response = await getUsersInGroup(groupId);
      setUsers(response);
    } catch (err) {
      message.error("Error al cargar usuarios del grupo");
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (user) => {
    try {
      await addUserToGroup({ userId: user.userId, groupId });
      message.success("Usuario agregado");
      loadUsers();
    } catch {
      message.error("No se pudo agregar el usuario");
    }
  };

  const handleRemoveUser = async (userId) => {
    Modal.confirm({
      title: "¿Estás seguro?",
      content: "Eliminarás este usuario del grupo.",
      onOk: async () => {
        try {
          await removeUserFromGroup({ userId: userId, groupId: groupId });
          message.success("Usuario eliminado");
          loadUsers();
        } catch {
          message.error("Error al eliminar usuario");
        }
      }
    });
  };

  useEffect(() => {
    loadUsers();
  }, [groupId]);

  return (
    <>
      <div>
        <div style={{ marginLeft: "1rem", display: "flex", gap: "1rem", alignItems: "center" }}>
          <BackButton to={PATH.HOME} />
          <Breadcrumb
            items={[
              { title: <NavLink to={PATH.HOME}>Inicio</NavLink> },

              { title: <NavLink to={PATH.GROUPS}>Grupos</NavLink> },
              { title: "Usuarios en el grupo" },
            ]}
          />
        </div>
      </div>

      <Layout.Content style={{ margin: "1rem", color: 'lightblue' }}>
        <div style={{ background: "#fff", minHeight: 280, padding: 10, borderRadius: "8px" }}>
          <Flex justify="space-between" style={{ margin: "1rem" }}>
            <Typography.Title level={3}>Usuarios en el grupo</Typography.Title>
            {isOwner && (
              <Button icon={<PlusOutlined />} type="primary" onClick={() => setSearchModalVisible(true)}>
                Agregar usuario
              </Button>
            )}
          </Flex>

          <Divider />

          {loading ? (
            <Spin fullscreen tip="Cargando usuarios..." />
          ) : (
            <List
              style={{ margin: "1rem" }}
              itemLayout="horizontal"
              dataSource={users}
              renderItem={(user) => (
                <List.Item
                  actions={
                    isOwner ? [
                      <Button
                        danger
                        type="link"
                        icon={<DeleteOutlined />}
                        onClick={() => handleRemoveUser(user.id)}
                      />
                    ] : []
                  }
                >
                  <List.Item.Meta
                    title={`Nombre: ${user.name} ${user.secondName ?? ''}`}
                    description={`Usuario: ${user.userName}`}
                  />
                </List.Item>
              )}
            />
          )}
        </div>
      </Layout.Content>

      <SearchUserModal
        visible={searchModalVisible}
        onClose={() => setSearchModalVisible(false)}
        onSelect={handleAddUser}
      />
    </>
  );
}

export default UsersInGroup;
