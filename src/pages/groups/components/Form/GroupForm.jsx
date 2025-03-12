import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Input, message } from "antd";
import { createGroup, updateGroup } from "../../../../services/groups/groups-service";

const GroupForm = ({ onRefresh, editingGroup, setEditingGroup }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  // 🔹 Cuando `editingGroup` cambia, abre el modal y carga los datos
  useEffect(() => {
    if (editingGroup) {
      form.setFieldsValue(editingGroup); // Llena el formulario
      setIsModalOpen(true); // Abre el modal
    }
  }, [editingGroup, form]);

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setEditingGroup(null); // 🔹 Limpia el estado de edición
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const payload = {
        Id: editingGroup ? editingGroup.id : 0, // Usa el ID si es edición
        name: values.name,
      };

      console.log("Guardando datos:", payload);

      if (editingGroup) {
        await updateGroup(payload); // Actualiza si hay edición
        message.success("Grupo actualizado con éxito!");
      } else {
        await createGroup(payload);
        message.success("Grupo creado con éxito!");
      }

      setIsModalOpen(false);
      form.resetFields();
      setEditingGroup(null); // Limpia la edición
      onRefresh(); // Recarga la tabla
    } catch (error) {
      console.error("Error al guardar:", error);
      message.error("Error en la validación o al guardar");
    }
  };

  return (
    <>
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        Crear grupo
      </Button>
      <Modal
        title={editingGroup ? "Editar Grupo" : "Crear Grupo"}
        open={isModalOpen}
        onOk={handleSave}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Nombre del grupo"
            name="groupName"
            rules={[{ required: true, message: "Por favor ingrese un nombre!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default GroupForm;
