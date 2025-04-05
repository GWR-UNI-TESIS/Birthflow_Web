import { useEffect, useState } from "react";
import { Button, Modal } from "antd";

import RecentPartograms from "./components/FavoritesPartograms";
import PartogramTabs from "./components/PartogramTabs";
import { PlusOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";
import PATH from "../../routes/path";

const HomePage = () => {
  const [viewMode, setViewMode] = useState("table");
  const [isOpenPasswordModal, setIsOpenPasswordModal] = useState(false);
  const { isTemporalPassword } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
      if(isTemporalPassword == true){
        setIsOpenPasswordModal(true);
      }
    }, []);

    const handleOk = () => {
      
      setIsOpenPasswordModal(false);
      navigate(PATH.CONFIG);
    };
  
    const handleCancel = () => {
      setIsOpenPasswordModal(false);
    };

  return (
    <div>
     <Modal title="Contraseña Temporal" open={isOpenPasswordModal} onOk={handleOk} onCancel={handleCancel}>
        <p>Actualmente su contraseña es temporal de aceptar para cambiarla</p>
        <p>Su contraseña temporal tiene una duracion de 4 dias</p>
      </Modal>
      <Button type="primary" icon={<PlusOutlined />}>
        <Link to="/create-partograph">Crear Partogramas</Link>
      </Button>
      <PartogramTabs viewMode={viewMode} setViewMode={setViewMode} />
    </div>
  );
};

export default HomePage;
