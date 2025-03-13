import "react";
import { Button } from "antd"; // Asegúrate de tener Ant Design instalado
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const ReturnButton = () => {
  const navigate = useNavigate();
  return (
  
      <Button icon={<ArrowLeftOutlined />}  onClick={() => navigate(-1)}/>

  );
};

export default ReturnButton;
