import React, { useState } from "react";
import { Modal, Input, List, Typography, Spin, message } from "antd";
import { searchUserGroups } from "../services/share-services/share-services"; // Servicio de búsqueda

const { Text } = Typography;

const UserGroupSearchModal = ({ visible, onClose, onSelect }) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    try {
      const data = await searchUserGroups(query);
      setResults(data || []);
    } catch (error) {
      console.error(error);
      message.error("Error al buscar usuarios o grupos.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (item) => {
    onSelect(item);
    onClose();
  };

  return (
    <Modal
      title="Buscar Usuario o Grupo"
      open={visible}
      onCancel={onClose}
      onOk={onClose}
      okText="Cerrar"
      cancelButtonProps={{ style: { display: "none" } }}
    >
      <Input.Search
        placeholder="Ingrese nombre o palabra clave"
        enterButton="Buscar"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onSearch={handleSearch}
      />

      <div style={{ marginTop: 16 }}>
        {loading ? (
          <Spin />
        ) : results.length > 0 ? (
          <List
            bordered
            dataSource={results}
            renderItem={(item) => (
              <List.Item onClick={() => handleSelect(item)} style={{ cursor: "pointer" }}>
                {item.name}
              </List.Item>
            )}
          />
        ) : (
          <Text type="secondary">No hay resultados</Text>
        )}
      </div>
    </Modal>
  );
};

export default UserGroupSearchModal;
