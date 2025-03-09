import "react";
import { Button } from "antd"; // Asegúrate de tener Ant Design instalado
import { ArrowLeftOutlined } from "@ant-design/icons";

const Btr = () => {
  return (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        justifyContent: "space-between",
        padding: "30px",
      }}
    >
      <Button icon={<ArrowLeftOutlined />} />
    </div>
  );
};

export default Btr;
