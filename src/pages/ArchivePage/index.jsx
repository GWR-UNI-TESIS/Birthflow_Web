import useSWR, { mutate } from "swr"; // <- useSWR no se usa; podrías removerlo
import { NavLink, useNavigate } from "react-router";
import React, { useState, useEffect } from 'react';
import { Table, Breadcrumb, Layout, message, Modal, Dropdown, Button, Typography, Spin } from "antd";
import { ShareAltOutlined, StarFilled, StarOutlined, InboxOutlined, MoreOutlined, BellFilled, BellOutlined, PushpinOutlined, DeleteOutlined } from "@ant-design/icons";
import BackButton from '../../components/ReturnButton';
import useArchivePartographs from "../../hooks/use-archive-partographs";
import { updatePartographState } from "../../services/partograph-service/partograph-service";
import { PARTOGRAPH_ENDPOINTS } from "../../services/partograph-service/endpoints";
import { useAuth } from "../../contexts/auth-context";
import PATH from "../../routes/path";
import { useCatalog } from "../../contexts/catalog-context";

const ArchivePartographsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Catálogos (por si necesitas mapear estados/labels)
  const { catalogs, loading: catalogsLoading, error: catalogsError } = useCatalog();

  // Data de partogramas archivados para el usuario actual
  const { data, loading: dataLoading, error: dataError } = useArchivePartographs(user.id);

  // Formateo de fechas para columnas
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  // Feedback de error de catálogos
  useEffect(() => {
    if (catalogsError) message.error("Error al cargar los catálogos.");
  }, [catalogsError]);

  // Definición de columnas de la tabla
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
      render: (date) => (date ? formatDate(date) : ""),
    },
    { title: "Propiedad", dataIndex: "nameCreatedBy", key: "nameCreatedBy" },
    {
      title: "Acciones",
      key: "actions",
      render: (_, record) => {
        const isCreator = record.createdBy === user.id;

        // Base para PATCH de estado
        const patchPayloadBase = {
          partographId: record.partographId,
          isAchived: record.isAchived,
          set: record.set,
          silenced: record.silenced,
          favorite: record.favorite,
        };

        // Manejo de acciones del menú (toggle estados / compartir / eliminar)
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
              // Confirmación de borrado (optimistic update en mutate)
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
            // Actualiza estado en backend
            await updatePartographState(patchPayload);
            message.success("Estado actualizado");

            // Actualiza lista de archivados en cache (optimistic update)
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

            // Revalidar detalle puntual
            mutate(PARTOGRAPH_ENDPOINTS.PARTOGRAPHS.GET_PARTOGRAPH(record.partographId));
          } catch (error) {
            message.error("Error al actualizar el estado");
          }
        };

        // Items del menú contextual de acciones
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
    },
  ];

  return (
    <>
      {/* Migas + botón regresar */}
      <div style={{ marginLeft: "1rem", display: "flex", gap: "1rem", alignItems: "center" }}>
        <BackButton to={PATH.HOME} />
        <Breadcrumb
          items={[
            { title: <NavLink to={PATH.HOME}>Home</NavLink> },
            { title: "Partogramas Archivados" },
          ]}
        />
      </div>

      {/* Contenido principal */}
      <Layout.Content style={{ margin: "1rem", color: 'lightblue' }}>
        <div style={{ background: "#fff", minHeight: 280, padding: 10, borderRadius: "8px" }}>
          <Typography.Title level={4} style={{ textAlign: "left", marginBottom: "15px" }}>
            Partograma Archivados
          </Typography.Title>

          {/* Loading de la tabla */}
          <Spin spinning={dataLoading} tip="Cargando partogramas archivados...">
            <Table
              key="partograph-table"
              dataSource={data?.response || []}
              columns={columns}
              rowKey="partographId"
              pagination={{ pageSize: 15 }}
              scroll={{ x: "max-content" }} // Evita cortes de columnas
              onRow={(record) => ({
                onClick: (event) => {
                  // Evita navegación si el click fue en el menú/acciones
                  const target = event.target;
                  if (
                    target.closest(".ant-dropdown") ||
                    target.closest(".ant-dropdown-menu") ||
                    target.closest(".ant-btn")
                  ) {
                    return;
                  }
                  // Navega al detalle del partograma
                  navigate(`/partograph/${record.partographId}`);
                },
              })}
            />
          </Spin>
        </div>
      </Layout.Content>
    </>
  );
};

export default ArchivePartographsPage;
