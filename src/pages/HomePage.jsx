import React, { useEffect, useState } from 'react';
import { Layout, Menu, Dropdown, Button, Space, Typography, Card, Flex, Divider, Table } from "antd";
import { UserOutlined, LogoutOutlined, SettingOutlined, BellOutlined } from "@ant-design/icons";

import axios from 'axios';
import { useAuth } from '../contexts/auth-context';

const { Header, Content } = Layout;
const { Title } = Typography;

const HomePage = () => {
    const [data, setData] = useState(null);
    const { authError } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Realiza la solicitud utilizando Axios
                const response = await axios.get('/api/account/me', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                        'Device-Info': 'ases', // O usa tu función getDeviceInfo si es necesario
                    },
                });
                setData(response);
            } catch (error) {
                console.error('Error al obtener datos:', error);
            }
        };

        fetchData();
    }, []);

    const userMenu = (
        <Menu>
            <Menu.Item key="1" icon={<SettingOutlined />}>
                Settings
            </Menu.Item>
            <Menu.Item key="2" icon={<LogoutOutlined />}>Logout</Menu.Item>
        </Menu>
    );

    const columns = [
        {
            title: 'Full Name',
            width: 100,
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
        },
        {
            title: 'Age',
            width: 100,
            dataIndex: 'age',
            key: 'age',
            fixed: 'left',
        },
        {
            title: 'Column 1',
            dataIndex: 'address',
            key: '1',
            width: 150,
        },
        {
            title: 'Column 2',
            dataIndex: 'address',
            key: '2',
            width: 150,
        },
        {
            title: 'Column 3',
            dataIndex: 'address',
            key: '3',
            width: 150,
        },
        {
            title: 'Column 4',
            dataIndex: 'address',
            key: '4',
            width: 150,
        },
        {
            title: 'Column 5',
            dataIndex: 'address',
            key: '5',
            width: 150,
        },
        {
            title: 'Column 6',
            dataIndex: 'address',
            key: '6',
            width: 150,
        },
        {
            title: 'Column 7',
            dataIndex: 'address',
            key: '7',
            width: 150,
        },


    ];

    const dataSource = Array.from({
        length: 100,
    }).map((_, i) => ({
        key: i,
        name: `Partograpma ${i}`,
        age: 32,
        address: `Expediente ${i}`,
    }));

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
                <div style={{ backgroundColor: "#fff", padding: 24, minHeight: 360 }}>
                    <h1>Partogramas recientes</h1>
                    <Flex justify={'space-between'} align={'center'}>
                        <Card title={"Partograma1"}></Card>
                        <Card title={"Partograma2"}></Card>
                        <Card title={"Partograma3"}></Card>
                        <Card title={"Partograma4"}></Card>
                    </Flex>
                    <Divider />

                    <Table
                        columns={columns}
                        dataSource={dataSource}
                        scroll={{
                            x: 'max-content',
                            y: 55 * 5,
                        }}
                    />
                </div>
            </Content>
        </Layout>
    );

};

export default HomePage;
