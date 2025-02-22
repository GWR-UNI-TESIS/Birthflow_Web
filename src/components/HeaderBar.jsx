import React from 'react';
import { Layout, Typography, Space, Button, Dropdown, Menu, Result } from "antd";
import { BellOutlined, UserOutlined, SettingOutlined, LogoutOutlined, UsergroupAddOutlined, FolderOutlined } from "@ant-design/icons";

const { Header } = Layout;
const { Title } = Typography;

const HeaderBar = ({ onNotificationDrawerToggle }) => {
   
    const userMenu = (
        <Menu>
            <Menu.Item key="1" icon={<SettingOutlined />}>Configuracion</Menu.Item>
            <Menu.Item key="1" icon={<UsergroupAddOutlined />}>Grupos</Menu.Item>
            <Menu.Item key="1" icon={<FolderOutlined />}>Archivados</Menu.Item>
            <Menu.Item key="2" icon={<LogoutOutlined />}>Cerrar Sesion</Menu.Item>
        </Menu>
    );

    return (
        <Header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#001529", padding: "0 16px" }}>
            <Title level={3} style={{ color: "white", margin: 0 }}>Birthflow</Title>
            <Space size="large">
                <Button type="text" onClick={onNotificationDrawerToggle} icon={<BellOutlined />} style={{ color: "white" }} />
                <Dropdown overlay={userMenu} placement="bottomRight">
                    <Button type="text" icon={<UserOutlined />} style={{ color: "white" }} />
                </Dropdown>
            </Space>

         
        </Header>
    );
};

export default HeaderBar;