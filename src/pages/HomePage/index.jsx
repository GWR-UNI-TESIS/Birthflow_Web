import React, { useState } from 'react';
import { Button, Divider, Layout, Spin } from "antd";

import RecentPartograms from "./components/RecentPartograms";
import PartogramTabs from "./components/PartogramTabs";
import { PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Content } = Layout;

const HomePage = () => {
    const [viewMode, setViewMode] = useState("table");

    return (
        <div>
            <Button type="primary" icon={<PlusOutlined />}>
                <Link to="/create-partograph">Crear Partograma</Link>
            </Button>
            <Divider />
            <RecentPartograms />
            <Divider />
            <PartogramTabs viewMode={viewMode} setViewMode={setViewMode} />
        </div>
    );
};

export default HomePage;