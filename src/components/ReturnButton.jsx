import "react";
import { Button } from "antd"; // Asegúrate de tener Ant Design instalado
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const ReturnButton = ({ to = '/ruta/vista-padre' }) => {
  const navigate = useNavigate();
  return (
    <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(to)} />
  );
};

export default ReturnButton;
