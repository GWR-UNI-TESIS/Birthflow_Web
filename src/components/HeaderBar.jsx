import React from 'react';
import { Layout, Typography, Space, Button, Dropdown } from "antd";
import {
    BellOutlined,
    UserOutlined,
    SettingOutlined,
    LogoutOutlined,
    UsergroupAddOutlined,
    FolderOutlined
} from "@ant-design/icons";
import { useAuth } from "../contexts/auth-context";
import { useNavigate } from "react-router-dom";
import PATH from '../routes/path';

const { Header } = Layout;
const { Title } = Typography;

// Barra superior con título, notificaciones y menú de usuario
const HeaderBar = ({ onNotificationDrawerToggle }) => {
    const { logout } = useAuth(); // logout desde el contexto de autenticación
    const navigate = useNavigate(); // hook de navegación

    // Navegaciones del menú
    const handleGroupsClick = () => navigate(PATH.GROUPS);
    const handleConfigurationClick = () => navigate(PATH.CONFIG);
    const handleArchivedClick = () => navigate(PATH.ARCHIVED);

    // Opciones del menú de usuario
    const items = [
        {
            key: '1',
            icon: <SettingOutlined />,
            label: <a onClick={handleConfigurationClick}>Configuración</a>,
        },
        {
            key: '2',
            icon: <UsergroupAddOutlined />,
            label: <a onClick={handleGroupsClick}>Grupos</a>,
        },
        {
            key: '3',
            icon: <FolderOutlined />,
            label: <a onClick={handleArchivedClick}>Archivados</a>,
        },
        {
            key: '4',
            icon: <LogoutOutlined />,
            label: <a onClick={logout}>Cerrar Sesión</a>,
        }
    ];

    return (
        <Header
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#001529",
                padding: "0 16px"
            }}
        >
            <Title level={3} style={{ color: "white", margin: 0 }}>
                Partogramas
            </Title>

            <Space size="large">
                {/* Botón para abrir notificaciones */}
                <Button
                    type="text"
                    onClick={onNotificationDrawerToggle}
                    icon={<BellOutlined />}
                    style={{ color: "white" }}
                />

                {/* Menú desplegable de usuario */}
                <Dropdown menu={{ items }} placement="bottomRight">
                    <Button type="text" icon={<UserOutlined />} style={{ color: "white" }} />
                </Dropdown>
            </Space>
        </Header>
    );
};

export default HeaderBar;
