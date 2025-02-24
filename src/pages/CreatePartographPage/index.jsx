import React, { useEffect, useState } from 'react';
import { Button, Breadcrumb, Layout, Spin, Typography, Divider, Form, DatePicker, Input, message, Flex, theme } from "antd";
import { ArrowLeftOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { useCatalog } from "../../contexts/catalog-context";
import { createPartograph } from "../../services/partograph-service/partograph-service";
const { Content } = Layout;

const CreatePartographPage = () => {

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const [form] = Form.useForm();

    // Estados para la selección en cada nivel
    const [selectedMain, setSelectedMain] = useState(null);       // "Vertical" o "Horizontal"
    const [selectedSub, setSelectedSub] = useState(null);         // Para Vertical: "Todas"; para Horizontal: "Multiparás" o "Nuliparás"
    const [selectedMembrane, setSelectedMembrane] = useState(null); // "Integras" o "Rotas"

    // Se obtienen los catálogos del contexto
    const { catalogs, loading: catalogsLoading, error: catalogsError } = useCatalog();

    useEffect(() => {
        if (catalogsError) message.error("Error al cargar los catálogos.");
    }, [catalogsError]);

    if (catalogsLoading) return <Spin />;

    const workTimeData = catalogs && catalogs.workTimeCatalog ? catalogs.workTimeCatalog : [];
    if (!workTimeData.length) return <div>No hay datos</div>;

    // Ordenamos cada workTimeItems de mayor a menor por cervicalDilation
    const data = workTimeData.map(item => ({
        ...item,
        workTimeItems: [...item.workTimeItems].sort((a, b) => b.cervicalDilation - a.cervicalDilation)
    }));

    // Definición de columnas para el body
    const columnOrder = ["VTI", "HMI", "HMR", "HNI", "HNR"];

    // Obtenemos las dilataciones únicas ordenadas de mayor a menor
    const allDilations = data.flatMap(item => item.workTimeItems.map(w => w.cervicalDilation));
    const uniqueDilations = Array.from(new Set(allDilations)).sort((a, b) => b - a);


    // Al cambiar el nivel 1 se limpian los niveles inferiores
    const handleMainClick = (val) => {
        setSelectedMain(val === selectedMain ? null : val);
        setSelectedSub(null);
        setSelectedMembrane(null);
    };

    // Para el nivel 2, solo se permite la acción si ya se eligió el nivel 1
    const handleSubClick = (val) => {
        if (!selectedMain) return;
        setSelectedSub(val === selectedSub ? null : val);
        setSelectedMembrane(null);
    };

    // Para el nivel 3, solo se permite si ya se eligieron los niveles anteriores
    const handleMembraneClick = (val) => {
        if (!selectedMain || !selectedSub) return;
        setSelectedMembrane(val === selectedMembrane ? null : val);
    };

    // Calculamos la columna efectiva según la combinación:
    // Vertical: {Main:"Vertical", Sub:"Todas", Membrane:"Integras"} → "VTI"
    // Horizontal Multiparás: {Main:"Horizontal", Sub:"Multiparás", Membrane:"Integras"} → "HMI"
    //                          {Main:"Horizontal", Sub:"Multiparás", Membrane:"Rotas"} → "HMR"
    // Horizontal Nuliparás:   {Main:"Horizontal", Sub:"Nuliparás", Membrane:"Integras"} → "HNI"
    //                          {Main:"Horizontal", Sub:"Nuliparás", Membrane:"Rotas"} → "HNR"
    let effectiveColumn = null;
    if (selectedMain === "Vertical" && selectedSub === "Todas" && selectedMembrane === "Integras") {
        effectiveColumn = "VTI";
    } else if (selectedMain === "Horizontal" && selectedSub === "Multiparás" && selectedMembrane === "Integras") {
        effectiveColumn = "HMI";
    } else if (selectedMain === "Horizontal" && selectedSub === "Multiparás" && selectedMembrane === "Rotas") {
        effectiveColumn = "HMR";
    } else if (selectedMain === "Horizontal" && selectedSub === "Nuliparás" && selectedMembrane === "Integras") {
        effectiveColumn = "HNI";
    } else if (selectedMain === "Horizontal" && selectedSub === "Nuliparás" && selectedMembrane === "Rotas") {
        effectiveColumn = "HNR";
    }

    // Función para definir estilos de celdas clickeables
    const clickableStyle = (active, disabled = false) => ({
        cursor: disabled ? "not-allowed" : "pointer",
        backgroundColor: active ? "#0958d9" : "transparent",
        color: active ? "white" : "inherit",
        border: "1px solid #ccc",
        padding: "8px",
        opacity: disabled ? 0.5 : 1
    });

    // Definimos los datos para la fila de "Membranas"
    // Cada objeto indica: etiqueta, la combinación que la habilita y el id de columna correspondiente.
    const membraneCells = [
        { label: "Integras", main: "Vertical", sub: "Todas", colId: "VTI" },
        { label: "Integras", main: "Horizontal", sub: "Multiparás", colId: "HMI" },
        { label: "Rotas", main: "Horizontal", sub: "Multiparás", colId: "HMR" },
        { label: "Integras", main: "Horizontal", sub: "Nuliparás", colId: "HNI" },
        { label: "Rotas", main: "Horizontal", sub: "Nuliparás", colId: "HNR" },
    ];


    // Método para guardar la información del form y la selección de la tabla
    // Método para guardar la información del formulario y la selección de la tabla
    const handleSave = async () => {
        try {
            const values = await form.validateFields();

            // Validación: aseguramos que se hayan realizado todas las selecciones de la tabla
            if (!selectedMain || !selectedSub || !selectedMembrane || !effectiveColumn) {
                message.error("Por favor, seleccione todas las opciones de la tabla.");
                return;
            }

            const payload = {
                partographId: "3fa85f64-5717-4562-b3fc-2c963f66afa6", // Este valor se puede generar o asignar según convenga
                name: values.Name,
                recordName: values.RecordName,
                date: values.date.toISOString(),
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
            message.error(error.message || "Error en la validación o al guardar el partograma");
        }
    };


    return (
        <>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                <Button icon={<ArrowLeftOutlined />} />
                <Breadcrumb
                    items={[
                        { title: <NavLink to="/" end>Home</NavLink> },
                        { title: "Creacion de Partograma" }
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
                    <Form layout="vertical" form={form} style={{ width: 400, marginBottom: 50, }}>
                        <Form.Item
                            label="Nombre de la paciente"
                            name="Name"
                            rules={[{ required: true, message: "Por favor ingrese un nombre !" }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Expediente"
                            name="RecordName"
                            rules={[{ required: true, message: "Por favor ingrese un expediente !" }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="date" label="Fecha" rules={[{ required: true, message: "Por favor ingrese una fecha !" }]}>
                            <DatePicker />
                        </Form.Item>
                    </Form>

                    <Divider />

                    <Typography.Title level={4}>
                        Valores para la creacion de la curva de alerta
                    </Typography.Title>
                    <table
                        style={{
                            width: "90%",

                            borderCollapse: "collapse",
                            textAlign: "center",
                            borderSpacing: "10px",

                        }}
                    >
                        <thead>
                            {/* Row 1: "Posición" y opciones principales */}
                            <tr>
                                <th style={{ borderBottom: "1px solid #ccc", padding: "8px" }}>
                                    Posición
                                </th>
                                <th
                                    colSpan={1}
                                    onClick={() => handleMainClick("Vertical")}
                                    style={clickableStyle(selectedMain === "Vertical")}
                                >
                                    Vertical
                                </th>
                                <th
                                    colSpan={4}
                                    onClick={() => handleMainClick("Horizontal")}
                                    style={clickableStyle(selectedMain === "Horizontal")}
                                >
                                    Horizontal
                                </th>
                            </tr>
                            {/* Row 2: "Paridad" y subopciones */}
                            <tr>
                                <th style={{ borderBottom: "1px solid #ccc", padding: "8px" }}>
                                    Paridad
                                </th>
                                <th
                                    colSpan={1}
                                    onClick={() => handleSubClick("Todas")}
                                    style={
                                        selectedMain === "Vertical"
                                            ? clickableStyle(selectedSub === "Todas")
                                            : clickableStyle(false, true)
                                    }
                                >
                                    Todas
                                </th>
                                <th
                                    colSpan={2}
                                    onClick={() => handleSubClick("Multiparás")}
                                    style={
                                        selectedMain === "Horizontal"
                                            ? clickableStyle(selectedSub === "Multiparás")
                                            : clickableStyle(false, true)
                                    }
                                >
                                    Multiparás
                                </th>
                                <th
                                    colSpan={2}
                                    onClick={() => handleSubClick("Nuliparás")}
                                    style={
                                        selectedMain === "Horizontal"
                                            ? clickableStyle(selectedSub === "Nuliparás")
                                            : clickableStyle(false, true)
                                    }
                                >
                                    Nuliparás
                                </th>
                            </tr>
                            {/* Row 3: "Membranas" */}
                            <tr>
                                <th style={{ borderBottom: "1px solid #ccc", padding: "8px" }}>
                                    Membranas
                                </th>
                                {membraneCells.map(cell => {
                                    // La celda solo está habilitada si se cumple la combinación de main y sub
                                    const enabled = selectedMain === cell.main && selectedSub === cell.sub;
                                    // Solo se marca como activa si está habilitada y el valor seleccionado coincide con la celda
                                    const isActive = enabled && selectedMembrane === cell.label;
                                    return (
                                        <th
                                            key={cell.colId}
                                            onClick={enabled ? () => handleMembraneClick(cell.label) : undefined}
                                            style={clickableStyle(isActive, !enabled)}
                                        >
                                            {cell.label}
                                        </th>
                                    );
                                })}
                            </tr>
                        </thead>
                        <tbody style={{ borderCollapse: "separate", borderSpacing: "10px" }}>
                            <tr>
                                <td style={{ paddingTop: "5px", width: "10px" }}></td>
                                <td style={{ paddingTop: "5px", width: "10px" }}></td>
                                <td style={{ paddingTop: "5px", width: "10px" }}></td>
                                <td style={{ paddingTop: "5px", width: "10px" }}></td>
                                <td style={{ paddingTop: "5px", width: "10px" }}></td>
                                <td style={{ paddingTop: "5px", width: "10px" }}></td>
                            </tr>
                            {uniqueDilations.map(dilation => (
                                <tr key={dilation}>
                                    <td style={{ padding: "8px" }}></td>
                                    {columnOrder.map(col => {
                                        const catalogItem = data.find(item => item.id === col);
                                        const workItem =
                                            catalogItem &&
                                            catalogItem.workTimeItems.find(w => w.cervicalDilation === dilation);
                                        return (
                                            <td
                                                key={col}
                                                style={{
                                                    border: "1px solid #ccc",
                                                    padding: "8px",
                                                    backgroundColor: effectiveColumn === col ? "#0958d9" : "transparent",
                                                    color: effectiveColumn === col ? "white" : "inherit"
                                                }}
                                            >
                                                {workItem ? workItem.time : "-"}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Flex gap="small" align="flex-end" style={{ marginTop: "3rem", marginRight: "1rem" }} vertical>
                        <Button type="primary" size='large' onClick={handleSave}>
                            Crear
                        </Button>
                    </Flex>
                </div>
            </Content>
        </>
    );
};

export default CreatePartographPage;
