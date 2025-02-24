import { useNavigate } from "react-router";
import React, { useState, useEffect } from 'react';
import { Card, Flex, Tabs, Input, Select, Radio, Table, Spin, Layout } from "antd";
import { TableOutlined, AppstoreOutlined } from "@ant-design/icons";
import PartogramCards from "./PartogramCards";
import { useCatalog } from "../../../contexts/catalog-context";
import usePartographs from "../../../hooks/use-partographs";
const { TabPane } = Tabs;
const { Option } = Select;

const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });
};

const PartogramTabs = ({ viewMode, setViewMode }) => {
    const { catalogs, loading: catalogsLoading, error: catalogsError } = useCatalog();
    let navigate = useNavigate();

    const [filters, setFilters] = useState({
        name: "",
        filterId: 1,
        activityId: 1,
        hourFilterId: 1,
    });

    const { data, loading: dataLoading, error: dataError } = usePartographs(filters);


    useEffect(() => {
        if (catalogsError) message.error("Error al cargar los catálogos.");
        if (dataError) message.error("Error al cargar los partogramas.");
    }, [catalogsError, dataError]);

    const handleFilterChange = (field, value) => {
        setFilters((prev) => ({ ...prev, [field]: value }));
    };

    const columns = [
        { title: "Nombre", dataIndex: "name", key: "name" },
        { title: "Expediente", dataIndex: "recordName", key: "recordName" },
        {
            title: "Fecha",
            dataIndex: "date",
            key: "date",
            render: (date) => formatDate(date),
        },
        {
            title: "Modificado",
            dataIndex: "updateAt",
            key: "updateAt",
            render: (date) => date ? formatDate(date) : "",
        },
        { title: "Propiedad", dataIndex: "nameCreatedBy", key: "nameCreatedBy" },
    ];

    return (
        <Layout.Content>
            <Spin spinning={catalogsLoading || dataLoading} tip="Cargando datos...">
                <Flex justify="space-between" style={{ marginBottom: 16 }}>
                    <Tabs
                        defaultActiveKey={filters.filterId || "1"}
                        onChange={(key) => handleFilterChange("filterId", key)}
                    >
                        {catalogs?.filterCatalog?.map((item) => (
                            <TabPane tab={item.description} key={item.id} />
                        ))}
                    </Tabs>
                    <Flex align="center" gap="8px">
                        <Input
                            placeholder="Buscar..."
                            style={{ width: 200 }}
                            value={filters.name}
                            onChange={(e) => handleFilterChange("name", e.target.value)}
                        />
                        <Select
                            placeholder="Actividad"
                            style={{ width: 150 }}
                            value={filters.activityId}
                            onChange={(value) => handleFilterChange("activityId", value)}
                        >
                            {catalogs?.activityCatalog?.map((item) => (
                                <Option key={item.id} value={item.id}>{item.description}</Option>
                            ))}
                        </Select>
                        <Select
                            placeholder="Hora"
                            style={{ width: 150 }}
                            value={filters.hourFilterId}
                            onChange={(value) => handleFilterChange("hourFilterId", value)}
                        >
                            {catalogs?.hourFilterCatalog?.map((item) => (
                                <Option key={item.id} value={item.id}>{item.description}</Option>
                            ))}
                        </Select>
                        <Radio.Group value={viewMode} onChange={(e) => setViewMode(e.target.value)}>
                            <Radio.Button value="table"><TableOutlined /></Radio.Button>
                            <Radio.Button value="cards"><AppstoreOutlined /></Radio.Button>
                        </Radio.Group>
                    </Flex>
                </Flex>

                {viewMode === "table" ? (
                    <Table
                        key="partograph-table"
                        dataSource={data?.response || []}
                        columns={columns}
                        rowKey="partographId"
                        pagination={{ pageSize: 15 }}
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: (event) => {

                                 navigate(`/partograph/${record.partographId}`);

                                },
                                onContextMenu: (event) => {
                                    console.log(record);
                                }, // right button click row // click row
                            };
                        }}
                    />
                ) : (
                    <PartogramCards data={data?.response || []} />
                )}
            </Spin>
        </Layout.Content>
    );
};

export default PartogramTabs;
