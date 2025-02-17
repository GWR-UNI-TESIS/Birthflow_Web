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
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/auth-context';
import { PARTOGRAPH_ENDPOINTS } from "../../services/partograph-service";

const { Header, Content } = Layout;
const { Title } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

const HomePage = () => {
    const navigate = useNavigate();

    const [viewMode, setViewMode] = useState("table");

    const { user } = useAuth();
    const { data, error } = useSWR(user ? PARTOGRAPH_ENDPOINTS.PARTOGRAPHS.GET_PARTOGRAPHS(user.id) : null, (url) => fetcher(url, 'GET'));



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
    
    ];

    const columns = [
        {
            title: "Nombre",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Expediente",
            dataIndex: "recordName",
            key: "recordName",
        },
        {
            title: "Fecha",
            dataIndex: "date",
            key: "date",
        },
        {
            title: "Modificado",
            dataIndex: "updateAt",
            key: "updateAt",
        },
        {
            title: "Propiedad",
            dataIndex: "createdBy",
            key: "createdBy",
        },
    ];

    if (error) {
        return <div>Error al cargar los datos.</div>;
    }

    if (!data) {
        return <div>Cargando...</div>; // O mostrar un spinner mientras se carga
    }

    if (!data.response) {
        return <div>No se encontraron datos.</div>; // En caso de que `response` sea null
    }

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
                        <Table key="partograph-table" dataSource={data.response} columns={columns} rowKey="partographId"  />
                    ) : (
                        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                            {data.response.map((item) => (
                                <Card key={item.key} title={item.name} style={{ width: 300 }}>
                                    <p>Expediente: {item.recordName}</p>
                                    <p>Propiedad: {item.c}</p>
                                    <p>Modificado: {item.modified}</p>
                                   
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
