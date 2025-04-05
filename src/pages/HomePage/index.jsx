import { useState } from "react";
import { Button, Divider } from "antd";

import RecentPartograms from "./components/PinPartograms";
import PartogramTabs from "./components/PartogramTabs";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [viewMode, setViewMode] = useState("table");

  return (
    <div>
      <Button type="primary" icon={<PlusOutlined />}>
        <Link to="/create-partograph">Crear Partogramas</Link>
      </Button>
      <PartogramTabs viewMode={viewMode} setViewMode={setViewMode} />
    </div>
  );
};

export default HomePage;
