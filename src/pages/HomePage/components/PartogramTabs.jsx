import useSWR, { mutate } from "swr";
import { useNavigate } from "react-router";
import React, { useState, useEffect } from 'react';
import { Flex, Tabs, Input, Select, Radio, Table, Spin, Layout, message, Modal, Dropdown, Button } from "antd";
import { TableOutlined, AppstoreOutlined, ShareAltOutlined, StarFilled, StarOutlined, InboxOutlined, MoreOutlined, BellFilled, BellOutlined, PushpinOutlined, DeleteOutlined } from "@ant-design/icons";
import PartogramCards from "./PartogramCards";
import usePartographs from "../../../hooks/use-partographs";
import { updatePartographState, deletePartograph } from "../../../services/partograph-service/partograph-service";
import { PARTOGRAPH_ENDPOINTS } from "../../../services/partograph-service/endpoints";
import { useAuth } from "../../../contexts/auth-context";
import SharePartographModal from "./SharePartographModal";
import PATH from "../../../routes/path";

const { Option } = Select;

const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });
};


const PartogramTabs = ({ viewMode, setViewMode, catalogs }) => {
    let navigate = useNavigate();
    const { user } = useAuth();
    const [filters, setFilters] = useState({
        name: "",
        filterId: 1,
        activityId: 1,
        hourFilterId: 1,
    });

    const { data, loading: partographLoading, error: dataError } = usePartographs(filters);

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedPartographId, setSelectedPartographId] = useState(null);


    useEffect(() => {

        if (dataError) message.error("Error al cargar los partogramas.");
    }, [dataError]);

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
                            setSelectedPartographId(record.partographId);
                            setModalVisible(true);
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
                                    try {
                                        deletePartograph(record.partographId);
                                        message.success(`Eliminado ${record.recordName}`);

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
                                    } catch (ex) {
                                        message.error(`Ha ocurrido un error al eliminar el partograma ${record.recordName}`);
                                    }

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
                    { label: "Compartir", key: "share", icon: <ShareAltOutlined /> },
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
                    <Dropdown menu={{ items, onClick }} trigger={["click"]} placement="bottomRight" >
                        <Button icon={<MoreOutlined />} />
                    </Dropdown>
                );
            },
        }
    ]


    return (
        <Spin spinning={partographLoading} tip="Cargando partogramas...">
            <Layout.Content style={{ margin: "1rem", color: 'lightblue' }}>
                <div style={{ background: "#fff", minHeight: 280, padding: 30, borderRadius: "8px" }}>

                    <Flex
                        justify="space-between"
                        wrap="wrap"
                        style={{ marginBottom: 16, gap: "1rem" }}
                    >
                        <Tabs
                            defaultActiveKey={filters.filterId || "1"}
                            onChange={(key) => handleFilterChange("filterId", key)}
                            style={{ flexShrink: 0 }}
                            items={catalogs?.filterCatalog?.map((item) => {
                                return {
                                    label: item.description,
                                    key: item.id,
                                }
                            })}
                        >
                        </Tabs>

                        <Flex wrap="wrap" align="center" gap="8px" style={{ flexGrow: 1, justifyContent: "flex-end" }}>
                            <Input
                                placeholder="Buscar..."
                                style={{ width: "200px", minWidth: "150px" }}
                                value={filters.name}
                                onChange={(e) => handleFilterChange("name", e.target.value)}
                            />
                            <Select
                                placeholder="Actividad"
                                style={{ width: "150px", minWidth: "120px" }}
                                value={filters.activityId}
                                onChange={(value) => handleFilterChange("activityId", value)}
                            >
                                {catalogs?.activityCatalog?.map((item) => (
                                    <Option key={item.id} value={item.id}>{item.description}</Option>
                                ))}
                            </Select>
                            <Select
                                placeholder="Hora"
                                style={{ width: "150px", minWidth: "120px" }}
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
                            scroll={{ x: "max-content" }} // <-- Esto es lo importante
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
                                        if (record.accessType == null) {
                                            navigate(PATH.PARTOGRAPH(record.partographId));
                                        } else {
                                            if (record.accessType == 2) {
                                                navigate(PATH.PARTOGRAPH(record.partographId));
                                            } else {
                                                navigate(PATH.PARTOGRAPH_READ_ONLY(record.partographId));
                                            }
                                        }

                                    },
                                };
                            }}
                        />
                    ) : (
                        <PartogramCards data={data?.response || []} />
                    )}
                </div>
            </Layout.Content>

            <SharePartographModal
                visible={modalVisible}
                partographId={selectedPartographId}
                catalogs={catalogs}
                onClose={() => {
                    setModalVisible(false);
                    setSelectedPartographId(null);
                }}
            />
        </Spin>
    );
};

export default PartogramTabs;
