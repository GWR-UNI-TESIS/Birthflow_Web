import React, { useEffect } from 'react';
import { Button, Breadcrumb, Layout, Spin, Flex, Card } from "antd";
import HeaderBar from "../../components/HeaderBar";
import { useCatalog } from "../../contexts/catalog-context";
import { ArrowLeftOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
const { Content } = Layout;


const CreatePartographPage = () => {
    // Se obtienen los catálogos desde el contexto
    const { loading, error } = useCatalog();
    const { catalogs, loading: catalogsLoading, error: catalogsError } = useCatalog();

    useEffect(() => {
        if (catalogsError) message.error("Error al cargar los catálogos.");
    }, [catalogsError]);

    // Mientras se cargan los catálogos se muestra un Spin
    if(catalogsLoading) return <Spin />;

    // Se asume que catalogs.workTimeCatalog es el arreglo con los objetos JSON
    // Si no hay datos, se muestra un mensaje
    const workTimeData = catalogs && catalogs.workTimeCatalog ? catalogs.workTimeCatalog : [];
    if(!workTimeData.length) return <div>No hay datos</div>;

    // Creamos una copia de los datos y ordenamos cada workTimeItems de mayor a menor por cervicalDilation
    const data = workTimeData.map(item => ({
      ...item,
      workTimeItems: [...item.workTimeItems].sort((a, b) => b.cervicalDilation - a.cervicalDilation)
    }));

    // Definimos el orden de columnas: queremos que la columna de VTI (Vertical) sea la quinta
    // Esto implica que el orden de los objetos será: HMI, HMR, HNI, HNR, VTI
    const columnOrder = [ 'VTI',   'HMI', 'HMR', 'HNI', 'HNR',  ];

    // Obtenemos los valores únicos de cervicalDilation (suponiendo que todos los objetos tienen el mismo rango)
    const allDilations = data.flatMap(item => item.workTimeItems.map(w => w.cervicalDilation));
    const uniqueDilations = Array.from(new Set(allDilations)).sort((a, b) => b - a);

    return (
        <>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Button icon={<ArrowLeftOutlined />} />
                <Breadcrumb
                    items={[
                        { title: <NavLink to="/" end>Home</NavLink> },
                        { title: 'Creacion de Partograma' },
                    ]}
                />
            </div>
            <Content style={{ marginTop: '1rem' }}>
                {/* Definición de la tabla con encabezados personalizados */}
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center',  borderSpacing:'10px' }}>
                    <thead>
                        <tr>
                            <th style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>Posicion</th>
                            {/* Se agrupan las columnas horizontales y verticales de acuerdo al orden deseado */}
                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Vertical</th>
                            <th colSpan={4} style={{ border: '1px solid #ccc', padding: '8px' }}>Horizontal</th>
                            
                        </tr>
                        <tr>
                            <th style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>Paridad</th>
                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Todas</th>
                            <th colSpan={2} style={{ border: '1px solid #ccc', padding: '8px' }}>Multiparas</th>
                            <th colSpan={2} style={{ border: '1px solid #ccc', padding: '8px' }}>Nuliparas</th>
                            
                        </tr>
                        <tr>
                            <th style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>Membranas</th>
                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Integras</th>
                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Integras</th>
                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Rotas</th>
                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Integras</th>
                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Rotas</th>
                        </tr>
                    </thead>
                    <tbody style={{borderCollapse: 'separate',  borderSpacing:'10px' }}>
                        {uniqueDilations.map(dilation => (
                            
                            <tr key={dilation} style={{margin:'1px'} }>
                                <td style={{ padding: '8px' }}>{ }</td>
                                {columnOrder.map(col => {
                                    const catalogItem = data.find(item => item.id === col);
                                    const workItem = catalogItem && catalogItem.workTimeItems.find(w => w.cervicalDilation === dilation);
                                    return (
                                        <td key={col} style={{ border: '1px solid #ccc', padding: '8px' }}>
                                            {workItem ? workItem.time : '-'}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Button type="primary" style={{ marginTop: '1rem' }}>Crear</Button>
            </Content>
        </>
    );
};

export default CreatePartographPage;