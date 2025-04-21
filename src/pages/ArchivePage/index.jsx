import useSWR, { mutate } from "swr";
import { NavLink, useNavigate } from "react-router";
import React, { useState, useEffect } from 'react';
import { Table, Breadcrumb, Layout, message, Modal, Dropdown, Button, Typography, Spin, Divider } from "antd";
import { ShareAltOutlined, StarFilled, StarOutlined, InboxOutlined, MoreOutlined, BellFilled, BellOutlined, PushpinOutlined, DeleteOutlined } from "@ant-design/icons";
import BackButton from '../../components/ReturnButton';
import useArchivePartographs from "../../hooks/use-archive-partographs";
import { updatePartographState } from "../../services/partograph-service/partograph-service";
import { PARTOGRAPH_ENDPOINTS } from "../../services/partograph-service/endpoints";
import { useAuth } from "../../contexts/auth-context";
import PATH from "../../routes/path";
import { useCatalog } from "../../contexts/catalog-context";

const ArchivePartographsPage = () => {
  let navigate = useNavigate();
  const { user } = useAuth();

  const { catalogs, loading: catalogsLoading, error: catalogsError } = useCatalog();
  const { data, loading: dataLoading, error: dataError } = useArchivePartographs(user.id);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };


  useEffect(() => {
    if (catalogsError) message.error("Error al cargar los catálogos.");
  }, [catalogsError]);




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
              PARTOGRAPH_ENDPOINTS.PARTOGRAPHS.GET_PARTOGRAPHS_ARCHIVED(user.id),
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
    <>
      <div>

      <div style={{ marginLeft: "1rem", display: "flex", gap: "1rem", alignItems: "center" }}>
          <BackButton to={PATH.HOME} />
          <Breadcrumb
            items={[
              { title: <NavLink to={PATH.HOME}>Home</NavLink> },
              { title: "Partogramas Archivados" },
            ]}
          />
        </div>
      </div>
      <Layout.Content style={{ margin: "1rem", color: 'lightblue' }}>
        <div style={{ background: "#fff", minHeight: 280, padding: 10, borderRadius: "8px" }}>

          <Typography.Title level={4} style={{ textAlign: "left",  marginBottom:"15px"}}>Partograma Archivados</Typography.Title>
          
          <Spin spinning={dataLoading} tip="Cargando partogramas archivados...">
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

                    navigate(`/partograph/${record.partographId}`);
                  },
                };
              }}
            />
          </Spin>
        </div>
      </Layout.Content>
    </>
  );
};

export default ArchivePartographsPage;
