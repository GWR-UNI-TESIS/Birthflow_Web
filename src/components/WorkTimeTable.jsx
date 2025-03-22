import { useState, useEffect } from "react";

const WorkTimeTable = ({
    catalogs,
    selectedMain,
    setSelectedMain,
    selectedSub,
    setSelectedSub,
    selectedMembrane,
    setSelectedMembrane,
    setEffectiveColumn
}) => {

    useEffect(() => {
        setEffectiveColumn(effectiveColumn);
    }, [selectedMain, selectedSub, selectedMembrane]);


    const workTimeData =
        catalogs && catalogs.workTimeCatalog ? catalogs.workTimeCatalog : [];
    if (!workTimeData.length) return <div>No hay datos</div>;

    // Ordenamos cada workTimeItems de mayor a menor por cervicalDilation
    const data = workTimeData.map((item) => ({
        ...item,
        workTimeItems: [...item.workTimeItems].sort(
            (a, b) => b.cervicalDilation - a.cervicalDilation
        ),
    }));

    // Definición de columnas para el body
    const columnOrder = ["VTI", "HMI", "HMR", "HNI", "HNR"];

    // Obtenemos las dilataciones únicas ordenadas de mayor a menor
    const allDilations = data.flatMap((item) =>
        item.workTimeItems.map((w) => w.cervicalDilation)
    );
    const uniqueDilations = Array.from(new Set(allDilations)).sort(
        (a, b) => b - a
    );

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
    if (
        selectedMain === "Vertical" &&
        selectedSub === "Todas" &&
        selectedMembrane === "Integras"
    ) {
        effectiveColumn = "VTI";
    } else if (
        selectedMain === "Horizontal" &&
        selectedSub === "Multiparás" &&
        selectedMembrane === "Integras"
    ) {
        effectiveColumn = "HMI";
    } else if (
        selectedMain === "Horizontal" &&
        selectedSub === "Multiparás" &&
        selectedMembrane === "Rotas"
    ) {
        effectiveColumn = "HMR";
    } else if (
        selectedMain === "Horizontal" &&
        selectedSub === "Nuliparás" &&
        selectedMembrane === "Integras"
    ) {
        effectiveColumn = "HNI";
    } else if (
        selectedMain === "Horizontal" &&
        selectedSub === "Nuliparás" &&
        selectedMembrane === "Rotas"
    ) {
        effectiveColumn = "HNR";
    }

    // Función para definir estilos de celdas clickeables
    const clickableStyle = (active, disabled = false) => ({
        cursor: disabled ? "not-allowed" : "pointer",
        backgroundColor: active ? "#0958d9" : "transparent",
        color: active ? "white" : "inherit",
        border: "1px solid #ccc",
        padding: "8px",
        opacity: disabled ? 0.5 : 1,
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

    return (

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
                    {membraneCells.map((cell) => {
                        // La celda solo está habilitada si se cumple la combinación de main y sub
                        const enabled =
                            selectedMain === cell.main && selectedSub === cell.sub;
                        // Solo se marca como activa si está habilitada y el valor seleccionado coincide con la celda
                        const isActive = enabled && selectedMembrane === cell.label;
                        return (
                            <th
                                key={cell.colId}
                                onClick={
                                    enabled
                                        ? () => handleMembraneClick(cell.label)
                                        : undefined
                                }
                                style={clickableStyle(isActive, !enabled)}
                            >
                                {cell.label}
                            </th>
                        );
                    })}
                </tr>
            </thead>
            <tbody
                style={{ borderCollapse: "separate", borderSpacing: "10px" }}
            >
                <tr>
                    <td style={{ paddingTop: "5px", width: "10px" }}></td>
                    <td style={{ paddingTop: "5px", width: "10px" }}></td>
                    <td style={{ paddingTop: "5px", width: "10px" }}></td>
                    <td style={{ paddingTop: "5px", width: "10px" }}></td>
                    <td style={{ paddingTop: "5px", width: "10px" }}></td>
                    <td style={{ paddingTop: "5px", width: "10px" }}></td>
                </tr>
                {uniqueDilations.map((dilation) => (
                    <tr key={dilation}>
                        <td style={{ padding: "8px" }}></td>
                        {columnOrder.map((col) => {
                            const catalogItem = data.find((item) => item.id === col);
                            const workItem =
                                catalogItem &&
                                catalogItem.workTimeItems.find(
                                    (w) => w.cervicalDilation === dilation
                                );
                            return (
                                <td
                                    key={col}
                                    style={{
                                        border: "1px solid #ccc",
                                        padding: "8px",
                                        backgroundColor:
                                            effectiveColumn === col ? "#0958d9" : "transparent",
                                        color: effectiveColumn === col ? "white" : "inherit",
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

    );
};

export default WorkTimeTable;
