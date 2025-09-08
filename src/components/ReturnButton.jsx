import "react";
import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

// Botón reutilizable para regresar a una ruta específica
const ReturnButton = ({ to = '/ruta/vista-padre' }) => {
  const navigate = useNavigate();

  return (
    <Button
      icon={<ArrowLeftOutlined />}
      onClick={() => navigate(to)} // Navega a la ruta definida en "to"
    />
  );
};

export default ReturnButton;
