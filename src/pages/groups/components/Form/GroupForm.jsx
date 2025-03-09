import React, { useState } from 'react';
import { Button,Modal, Breadcrumb, Layout, Spin, Typography, Divider, Form, DatePicker, Input, message, Flex, theme } from "antd";
import { Content } from 'antd/es/layout/layout';
import { createGroup } from '../../../../services/groups/groups-service';
const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [form] = Form.useForm();

  const handleSave = async () => {
          try {
              const values = await form.validateFields();
  
              // Validación: aseguramos que se hayan realizado todas las selecciones de la tabla
              if (!selectedMain || !selectedSub || !selectedMembrane || !effectiveColumn) {
                  message.error("Por favor, seleccione todas las opciones de la tabla.");
                  return;
              }
  
              const payload = {
                  Id: 0, 
                  name: values.name,
              };
  
              console.log("Guardando datos:", payload);
              const result = await createGroup(payload);
              console.log("Respuesta de la API:", result);
              message.success("Datos guardados con éxito!");
              // Aquí podrías redirigir o actualizar el estado según la respuesta
          } catch (error) {
              console.error("Validation or API error:", error);
              message.error(error.message || "Error en la validación o al guardar el partograma");
          }
      };
  return (
    <>
      <Button type="primary" onClick={handleSave}>
        Crear grupo
      </Button>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form.Item
                                  label="Nombre del grupo"
                                  name="Name"
                                  rules={[{ required: true, message: "Por favor ingrese un nombre !" }]}>
                                  <Input />
                              </Form.Item>
      </Modal>
    </>
  );
};
export default App;