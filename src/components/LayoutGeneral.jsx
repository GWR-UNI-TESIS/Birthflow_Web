import { useLocation } from "react-router-dom";
import useNotifications from "../hooks/use-notifications";

import React, { useState } from "react";
import { Layout, Drawer, List, Skeleton } from "antd";
import HeaderBar from "./HeaderBar";
import { formatDateInNicaragua } from "../utils/datetime-format";

const { Content } = Layout;

const LayoutGeneral = ({ children }) => {
  const location = useLocation();
  const [notificationDrawerVisible, setNotificationDrawerVisible] = useState(false);
  const { data, loading: dataLoading } = useNotifications();

  const showDrawer = () => setNotificationDrawerVisible(true);
  const onClose = () => setNotificationDrawerVisible(false);

  // Evitar renderizar el LayoutGeneral en la página de login
  if (location.pathname === "/login") {
    return <>{children}</>;
  }

  return (
    <Layout>
      <HeaderBar onNotificationDrawerToggle={showDrawer} />
      <Drawer title="Notificaciones" open={notificationDrawerVisible} onClose={onClose} width={500}>
        <List
          className="demo-loadmore-list"
          loading={dataLoading}
          itemLayout="vertical"
          dataSource={data?.response}
          renderItem={(item) => (
            <List.Item key={item.notificationId}>
              <Skeleton avatar title={false} loading={item.loading} active>
                <List.Item.Meta title={<a>{item.title}</a>} description={item.message} />
                <div>{formatDateInNicaragua(item.scheduledFor)}</div>
              </Skeleton>
            </List.Item>
          )}
        />
      </Drawer>
      <div style={{ padding: "25px 20px" }}>{children}</div>
    </Layout>
  );
};

export default LayoutGeneral;
    