import { List, Skeleton, Spin } from "antd";
import usePartographNotifications from "../../hooks/use-partograph-notifications";
import { formatDateInNicaragua } from "../../utils/datetime-format";

// Lista de notificaciones asociadas a un partograma
const NotificationList = ({ partographId }) => {
    // Hook personalizado para obtener notificaciones
    const { data, error, loading } = usePartographNotifications(partographId);

    // Estados básicos de carga y error
    if (loading) return <Spin />;
    if (error) return <p>Error al cargar notificaciones.</p>;

    if (!data || data.length === 0) return <p>No hay notificaciones disponibles.</p>;

    return (
        <List
            className="demo-loadmore-list"
            loading={loading}
            itemLayout="vertical"
            dataSource={data?.response}
            renderItem={(item) => (
                <List.Item key={item.notificationId}>
                    <Skeleton avatar title={false} loading={item.loading} active>
                        <List.Item.Meta
                            title={<a>{item.title}</a>}
                            description={item.message}
                        />
                        {/* Fecha formateada en zona horaria de Nicaragua */}
                        <div>{formatDateInNicaragua(item.scheduledFor)}</div>
                    </Skeleton>
                </List.Item>
            )}
        />
    );
};

export default NotificationList;
