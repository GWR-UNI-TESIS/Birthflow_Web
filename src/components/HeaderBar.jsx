import React from 'react';
import { Layout, Typography, Space, Button, Dropdown, Menu, Result } from "antd";
import { BellOutlined, UserOutlined, SettingOutlined, LogoutOutlined, UsergroupAddOutlined, FolderOutlined, GroupOutlined } from "@ant-design/icons";
import { useAuth } from "../contexts/auth-context";
import { useNavigate } from "react-router-dom";
import PATH from '../routes/path';
const { Header } = Layout;
const { Title } = Typography;

const HeaderBar = ({ onNotificationDrawerToggle }) => {
    const { logout } = useAuth();

    const navigate = useNavigate(); // Hook para redirigir

    const handleGroupsClick = () => {

        navigate(PATH.CREATE_GROUP);
    };

    const handleConfigurationClick = () => {
        navigate(PATH.CONFIG);
    };

    const items = [
        {
            key: '1',
            icon: <SettingOutlined />,
            label: (
                <a onClick={handleConfigurationClick}>
                    Configuracion
                </a>
            ),
        },
        {
            key: '2',
            icon: <UsergroupAddOutlined />,
            label: (
                <a onClick={handleGroupsClick}>
                    Grupos
                </a>
            ),
        },
        {
            key: '3',
            icon: <FolderOutlined />,
            label: (
                <a>
                    Archivados
                </a>
            ),
        },
        {
            key: '4',
            icon: <LogoutOutlined />,
            label: (
                <a onClick={logout}>
                    Cerrar Sesion
                </a>
            ),
        }
    ];

    return (
        <Header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#001529", padding: "0 16px" }}>
            <Title level={3} style={{ color: "white", margin: 0 }}>Birthflow</Title>
            <Space size="large">
                <Button type="text" onClick={onNotificationDrawerToggle} icon={<BellOutlined />} style={{ color: "white" }} />
                <Dropdown menu={{ items }} placement="bottomRight">
                    <Button type="text" icon={<UserOutlined />} style={{ color: "white" }} />
                </Dropdown>
            </Space>


        </Header>
    );
};

export default HeaderBar;