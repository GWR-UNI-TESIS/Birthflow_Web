import React, { useEffect, useState } from 'react';
import {
    Layout,
    Menu,
    Flex,
    Dropdown,
    Button,
    Space,
    Typography,
    Card,
    Divider,
    Tabs,
    Input,
    Select,
    Table,
    Radio
} from "antd";
import {
    UserOutlined,
    LogoutOutlined,
    SettingOutlined,
    BellOutlined,
    AppstoreOutlined,
    TableOutlined
} from "@ant-design/icons";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/auth-context';

const { Header, Content } = Layout;
const { Title } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

const HomePage = () => {
    const navigate = useNavigate();
    const { isAuthenticated, accessToken, validateAccessToken, refreshAccessToken, logout, loading } = useAuth();
    const [data, setData] = useState([]);
    const [viewMode, setViewMode] = useState("table");
    const [loadingData, setLoadingData] = useState(true);
    useEffect(() => {
        const initialize = async () => {
            if (!accessToken) {
                navigate("/login");
                return;
            }

            try {
                const isValid = await validateAccessToken();
                if (!isValid) {
                    await refreshAccessToken(); // Intenta renovar el token si no es válido
                }

                await fetchData(); // Carga los datos después de validar el token
            } catch (error) {
                console.error("Error durante la inicialización:", error.message);
                logout();
                navigate("/login");
            } finally {
                setLoadingData(false);
            }
        };

        initialize();
    }, [accessToken]);

    const fetchData = async () => {
        try {
            const response = await axios.get("/api/account/me", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            setData(response.data);
        } catch (error) {
            console.error("Error al obtener datos:", error.response?.data || error.message);
        }
    };

    const userMenu = (
        <Menu>
            <Menu.Item key="1" icon={<SettingOutlined />}>
                Settings
            </Menu.Item>
            <Menu.Item key="2" icon={<LogoutOutlined />}>Logout</Menu.Item>
        </Menu>
    );

    const handleViewChange = (e) => {
        setViewMode(e.target.value);
    };

    const dataSource = [
        {
            key: "1",
            name: "Partograma 1",
            expediente: "EXP001",
            modified: "2025-01-01",
            owner: "Usuario 1",
            activity: "Revisión",
        },
        {
            key: "2",
            name: "Partograma 2",
            expediente: "EXP002",
            modified: "2025-01-02",
            owner: "Usuario 2",
            activity: "Edición",
        },
    ];

    const columns = [
        {
            title: "Nombre",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Expediente",
            dataIndex: "expediente",
            key: "expediente",
        },
        {
            title: "Modificado",
            dataIndex: "modified",
            key: "modified",
        },
        {
            title: "Propiedad",
            dataIndex: "owner",
            key: "owner",
        },
        {
            title: "Actividad",
            dataIndex: "activity",
            key: "activity",
        },
    ];


    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Header
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "#001529",
                    padding: "0 16px",
                }}
            >
                {/* Left Side: App Name */}
                <Title level={3} style={{ color: "white", margin: 0 }}>
                    Birthflow
                </Title>

                {/* Right Side: Icons */}
                <Space size="large">
                    <Button type="text" icon={<BellOutlined />} style={{ color: "white" }} />

                    <Dropdown overlay={userMenu} placement="bottomRight">
                        <Button
                            type="text"
                            icon={<UserOutlined />}
                            style={{ color: "white" }}
                        />
                    </Dropdown>
                </Space>
            </Header>

            {/* Main Content Area */}
            <Content style={{ padding: "16px" }}>
                <Card title="Partogramas Recientes" style={{ marginBottom: 16 }}>
                    {/* Add recent partograms content here */}
                    <p>Aquí se muestran los partogramas recientes...</p>
                </Card>

                <Divider />

                <Card style={{ marginBottom: 16 }}>
                    <Flex justify="space-between">
                        <Tabs defaultActiveKey="1" style={{ marginBottom: 16 }}>
                            <TabPane tab="Todos" key="1">
                                {/* Content for Todos */}
                            </TabPane>
                            <TabPane tab="Abiertos" key="2">
                                {/* Content for Abiertos */}
                            </TabPane>
                            <TabPane tab="Compartidos" key="3">
                                {/* Content for Compartidos */}
                            </TabPane>
                            <TabPane tab="Favoritos" key="4">
                                {/* Content for Favoritos */}
                            </TabPane>
                        </Tabs>

                        <Space style={{ marginBottom: 16 }}>
                            <Input placeholder="Buscar..." style={{ width: 200 }} />
                            <Select placeholder="Filtrar" style={{ width: 150 }}>
                                <Option value="opcion1">Opción 1</Option>
                                <Option value="opcion2">Opción 2</Option>
                            </Select>
                            <Radio.Group
                                optionType="button"
                                buttonStyle="solid"
                                value={viewMode}
                                onChange={handleViewChange}
                            >
                                <Radio.Button value="table">
                                    <TableOutlined />
                                </Radio.Button>
                                <Radio.Button value="cards">
                                    <AppstoreOutlined />
                                </Radio.Button>
                            </Radio.Group>
                        </Space>
                    </Flex >
                    {viewMode === "table" ? (
                        <Table dataSource={dataSource} columns={columns} />
                    ) : (
                        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                            {dataSource.map((item) => (
                                <Card key={item.key} title={item.name} style={{ width: 300 }}>
                                    <p>Expediente: {item.expediente}</p>
                                    <p>Modificado: {item.modified}</p>
                                    <p>Propiedad: {item.owner}</p>
                                    <p>Actividad: {item.activity}</p>
                                </Card>
                            ))}
                        </div>
                    )}
                </Card>


            </Content>
        </Layout>
    );

};

export default HomePage;
