import React, { useState, useEffect } from "react";
import {
  Modal,
  Input,
  Select,
  List,
  Button,
  Typography,
  Space,
  message,
} from "antd";
import { SearchOutlined, DeleteOutlined } from "@ant-design/icons";
import UserGroupSearchModal from "../../../components/UserGroupSearchModal";
import { assignUserGroupsToPartograph, getAssignedUserGroups} from "../../../services/share-services/share-services";

const { Text } = Typography;

const SharePartographModal = ({ visible, onClose, partographId, catalogs }) => {
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [sharedList, setSharedList] = useState([]);
  const [selectedPermission, setSelectedPermission] = useState(null);

  useEffect(() => {
    const loadAssignedUsers = async () => {
      if (!visible || !partographId) return;
  
      try {
        const result = await getAssignedUserGroups(partographId);
  
        if (!result) {
          // Cuando response es null → no hay asignaciones previas
          setSharedList([]);
          if (catalogs?.permissionTypeCatalog?.length) {
            setSelectedPermission(catalogs.permissionTypeCatalog[0]); // valor por defecto
          }
          return;
        }
  
        // Si viene data válida
        const { permissionTypeId, searchUserGroupDtos } = result;
  
        if (permissionTypeId && catalogs?.permissionTypeCatalog?.length) {
          const match = catalogs.permissionTypeCatalog.find((p) => p.id === permissionTypeId);
          setSelectedPermission(match ?? catalogs.permissionTypeCatalog[0]);
        } else if (catalogs?.permissionTypeCatalog?.length) {
          setSelectedPermission(catalogs.permissionTypeCatalog[0]);
        }
  
        setSharedList(Array.isArray(searchUserGroupDtos) ? searchUserGroupDtos : []);
      } catch (error) {
        console.error("Error al cargar usuarios compartidos", error);
        message.error("No se pudieron cargar los usuarios compartidos");
        setSharedList([]);
        if (catalogs?.permissionTypeCatalog?.length) {
          setSelectedPermission(catalogs.permissionTypeCatalog[0]);
        }
      }
    };
  
    loadAssignedUsers();
  }, [visible, partographId, catalogs]);
  
  const handleAddUserGroup = (selected) => {
    const alreadyExists = sharedList.some(
      (item) => item.id === selected.id && item.type === selected.type
    );
    if (!alreadyExists) {
      setSharedList((prev) => [...prev, selected]);
    } else {
      message.info("Este usuario o grupo ya está en la lista.");
    }
  };

  const handleDelete = (itemToRemove) => {
    setSharedList((prev) =>
      prev.filter(
        (item) =>
          item.id !== itemToRemove.id || item.type !== itemToRemove.type
      )
    );
  };

  const handleAccept = async () => {
    try {
      await assignUserGroupsToPartograph(
        partographId,
        selectedPermission.id,
        sharedList
      );
      message.success("Partograma compartido correctamente.");
      onClose();
    } catch (error) {
      console.error(error);
      message.error("Error al compartir el partograma.");
    }
  };

  return (
    <>
      <Modal
        title="Compartir Partograma"
        open={visible}
        onCancel={onClose}
        onOk={handleAccept}
        okText="Aceptar"
        cancelText="Cancelar"
        data-testid="modal-compartir"
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Input
            placeholder="Buscar usuarios o grupos"
            prefix={<SearchOutlined />}
            onClick={() => setSearchModalVisible(true)}
            readOnly
          />

          <Select
            style={{ width: "100%" }}
            value={selectedPermission?.id}
            onChange={(value) => {
              const permission = catalogs.permissionTypeCatalog.find(
                (p) => p.id === value
              );
              setSelectedPermission(permission);
            }}
          >
            {catalogs.permissionTypeCatalog.map((perm) => (
              <Select.Option key={perm.id} value={perm.id}>
                {perm.name}
              </Select.Option>
            ))}
          </Select>

          <Text strong>Usuarios o grupos seleccionados</Text>

          {sharedList.length > 0 ? (
            <List
              bordered
              dataSource={sharedList}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <Button
                      danger
                      icon={<DeleteOutlined />}
                      aria-label={`Eliminar ${item.name}`}
                      size="small"
                      onClick={() => handleDelete(item)}
                    />,
                  ]}
                >
                  {item.name}
                </List.Item>
              )}
            />
          ) : (
            <Text type="secondary">
              No hay usuarios o grupos seleccionados
            </Text>
          )}
        </Space>
      </Modal>

      <UserGroupSearchModal
        visible={searchModalVisible}
        onClose={() => setSearchModalVisible(false)}
        onSelect={handleAddUserGroup}
      />
    </>
  );
};

export default SharePartographModal;