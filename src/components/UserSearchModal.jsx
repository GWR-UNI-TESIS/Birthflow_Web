import React, { useState } from "react";
import { Modal, Input, List, Typography, Spin, message } from "antd";
import { searchUsers } from "../services/share-services/share-services"; // Endpoint exclusivo para usuarios

const { Text } = Typography;

// Modal para buscar y seleccionar solo usuarios
const UserSearchModal = ({ visible, onClose, onSelect }) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  // Ejecuta la búsqueda de usuarios
  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    try {
      const data = await searchUsers(query); // 🔁 Solo usuarios
      setResults(data || []);
    } catch (error) {
      console.error(error);
      message.error("Error al buscar usuarios.");
    } finally {
      setLoading(false);
    }
  };

  // Selecciona un usuario y cierra el modal
  const handleSelect = (item) => {
    onSelect(item);
    onClose();
  };

  return (
    <Modal
      title="Buscar Usuario"
      open={visible}
      onCancel={onClose}
      onOk={onClose}
      okText="Cerrar"
      cancelButtonProps={{ style: { display: "none" }}}
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
              <List.Item
                onClick={() => handleSelect(item)}
                style={{ cursor: "pointer" }}
              >
                <div>
                  <strong>{item.name}</strong>
                  <div style={{ fontSize: 12, color: "#999" }}>
                    {item.userName}
                  </div>
                </div>
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

export default UserSearchModal;
