import useSWR, { mutate } from "swr";
import { useNavigate } from "react-router";
import React, { useState, useEffect } from 'react';
import { Flex, Tabs, Input, Select, Radio, Table, Spin, Layout, message, Modal, Dropdown, Button } from "antd";
import { TableOutlined, AppstoreOutlined, ShareAltOutlined, StarFilled, StarOutlined, InboxOutlined, MoreOutlined, BellFilled, BellOutlined, PushpinOutlined, DeleteOutlined } from "@ant-design/icons";
import PartogramCards from "./PartogramCards";
import { useCatalog } from "../../../contexts/catalog-context";
import usePartographs from "../../../hooks/use-partographs";
import { updatePartographState } from "../../../services/partograph-service/partograph-service";
import { PARTOGRAPH_ENDPOINTS } from "../../../services/partograph-service/endpoints";
import { useAuth } from "../../../contexts/auth-context";

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
    const { user } = useAuth();
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
        {
            title: "Acciones",
            key: "actions",
            render: (_, record) => {
                const isCreator = record.createdBy === user.id;

                const patchPayloadBase = {
                    partographId: record.partographId,
                    isAchived: record.isAchived,
                    set: record.set,
                    silenced: record.silenced,
                    favorite: record.favorite,
                };

                const onClick = async ({ key }) => {
                    const patchPayload = { ...patchPayloadBase };

                    switch (key) {
                        case "share":
                            if (!isCreator) {
                                message.warning("Solo el creador puede compartir el partograma");
                                return;
                            }
                            message.info(`Compartir ${record.partographId}`);
                            return;

                        case "favorite":
                            patchPayload.favorite = !record.favorite;
                            break;

                        case "archive":
                            patchPayload.isAchived = !record.isAchived;
                            break;

                        case "silence":
                            patchPayload.silenced = !record.silenced;
                            break;

                        case "pin":
                            patchPayload.set = !record.set;
                            break;

                        case "delete":
                            if (!isCreator) {
                                message.warning("Solo el creador puede eliminar el partograma");
                                return;
                            }
                            Modal.confirm({
                                title: "Eliminar Partograma",
                                content: "¿Estás seguro de que deseas eliminar este partograma?",
                                okText: "Eliminar",
                                cancelText: "Cancelar",
                                okButtonProps: { danger: true },
                                onOk: async () => {
                                    message.success(`Eliminado ${record.partographId}`);
                                    mutate(
                                        PARTOGRAPH_ENDPOINTS.PARTOGRAPHS.GET_ALL,
                                        (data) => ({
                                            ...data,
                                            response: data.response.filter(
                                                (p) => p.partographId !== record.partographId
                                            ),
                                        }),
                                        false
                                    );
                                },
                            });
                            return;

                        default:
                            return;
                    }

                    try {
                        await updatePartographState(patchPayload);
                        message.success("Estado actualizado");

                        mutate(
                            PARTOGRAPH_ENDPOINTS.PARTOGRAPHS.GET_ALL,
                            (data) => ({
                                ...data,
                                response: data.response.map((item) =>
                                    item.partographId === record.partographId
                                        ? { ...item, ...patchPayload }
                                        : item
                                ),
                            }),
                            false
                        );

                        mutate(PARTOGRAPH_ENDPOINTS.PARTOGRAPHS.GET_PARTOGRAPH(record.partographId));
                    } catch (error) {
                        message.error("Error al actualizar el estado");
                    }
                };

                const items = [
                    { label: "Compartir", key: "share", disabled: !isCreator, icon: <ShareAltOutlined /> },
                    { type: "divider" },
                    {
                        label: record.favorite ? "Desmarcar como favorito" : "Marcar como favorito",
                        key: "favorite",
                        icon: record.favorite ? <StarFilled /> : <StarOutlined />,
                    },
                    {
                        label: record.isAchived ? "Desarchivar" : "Archivar",
                        key: "archive",
                        icon: <InboxOutlined />,
                    },
                    {
                        label: record.silenced ? "Activar notificaciones" : "Silenciar",
                        key: "silence",
                        icon: record.silenced ? <BellOutlined /> : <BellFilled />,
                    },
                    {
                        label: record.set ? "Desanclar" : "Anclar",
                        key: "pin",
                        icon: <PushpinOutlined />,
                    },
                    {
                        label: "Eliminar",
                        key: "delete",
                        danger: true,
                        icon: <DeleteOutlined />,
                        disabled: !isCreator,
                    },
                ];

                return (
                    <Dropdown menu={{ items, onClick }} trigger={["click"]}>
                        <Button icon={<MoreOutlined />} />
                    </Dropdown>
                );
            },
        }
    ]


    return (
        <Layout.Content style={{ margin: "1rem", color: 'lightblue' }}>
            <div style={{ background: "#fff", minHeight: 280, padding: 30, borderRadius: "8px" }}>
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
                            onRow={(record,) => {
                                return {
                                    onClick: (event) => {
                                        // Evita navegación si se hace clic en el botón de acciones
                                        const target = event.target;
                                        if (
                                            target.closest(".ant-dropdown") || // botón o menú
                                            target.closest(".ant-dropdown-menu") ||
                                            target.closest(".ant-btn") // botón antd
                                        ) {
                                            return;
                                        }

                                        navigate(`/partograph/${record.partographId}`);
                                    },
                                };
                            }}
                        />
                    ) : (
                        <PartogramCards data={data?.response || []} />
                    )}
                </Spin>
            </div>
        </Layout.Content>
    );
};

export default PartogramTabs;
