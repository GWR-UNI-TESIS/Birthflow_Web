import React, { useEffect, useState } from "react";
import { Form, Button, Input, Spin } from "antd";
import { useAuth } from "../../../../contexts/auth-context"; // Ajusta la ruta según la ubicación de tu contexto

const UserForm = () => {
    const [form] = Form.useForm();
    const { user, updateUser } = useAuth(); // Verifica el nombre correcto de la función
    const [loading, setLoading] = useState(true); // Estado para manejar la carga

    useEffect(() => {
        if (user) {
            console.log("Actulizando datos", user);
            form.setFieldsValue({
                email: user.email || "",
                userName: user.userName || "",
                name: user.name || "",
                secondName: user.secondName || "",
                phoneNumber: user.phoneNumber || "",
            });
            setLoading(false); // Cuando los datos están listos, quitamos el loading
        }
    }, [user, form]);

    const handleSubmit = async (values) => {
        try {
            setLoading(true); // Mostrar loading mientras se actualiza
            await updateUser({ ...values, id: user.id }); 
            setLoading(false);
            alert("Datos actualizados correctamente");
        } catch (error) {
            setLoading(false);
            console.error("Error al actualizar los datos:", error);
        }
    };

    if (loading) {
        return <Spin tip="Cargando datos del usuario..." />;
    }

    return (
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item
                label="Nuevo Correo"
                name="email"
                rules={[{ required: true, message: "Por favor ingrese el correo" }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Nuevo Nombre de Usuario"
                name="userName"
                rules={[{ required: true, message: "Por favor ingrese el nombre de usuario" }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Nuevo Primer Nombre"
                name="name"
                rules={[{ required: true, message: "Por favor ingrese el primer nombre" }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Nuevo Segundo Nombre"
                name="secondName"
                rules={[{ required: true, message: "Por favor ingrese el segundo nombre" }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Nuevo Número de Teléfono"
                name="phoneNumber"
                rules={[{ required: true, message: "Por favor ingrese el teléfono" }]}
            >
                <Input />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" block loading={loading}>
                    Actualizar Datos
                </Button>
            </Form.Item>
        </Form>
    );
};

export default UserForm;
