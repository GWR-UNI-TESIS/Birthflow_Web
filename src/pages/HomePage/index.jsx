import { useEffect, useState } from "react";
import { Button, Divider, Modal } from "antd";
import PartogramTabs from "./components/PartogramTabs";
import { useCatalog } from "../../contexts/catalog-context";
import usePartographs from "../../hooks/use-partographs";
import { PlusOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";
import PATH from "../../routes/path";
import PinPartograms from "./Components/PinPartograms";

const HomePage = () => {
  const [viewMode, setViewMode] = useState("table");
  const [isOpenPasswordModal, setIsOpenPasswordModal] = useState(false);
  const { isTemporalPassword } = useAuth();
  
  const { catalogs, loading: catalogsLoading, error: catalogsError } = useCatalog();

  const navigate = useNavigate();

  useEffect(() => {
    if (catalogsError) message.error("Error al cargar los catálogos.");
  }, [catalogsError]);



  useEffect(() => {
    if (isTemporalPassword == true) {
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
    <div className="home-container" style={{ padding: "1rem" }}>
      <Modal title="Contraseña Temporal" open={isOpenPasswordModal} onOk={handleOk} onCancel={handleCancel}>
        <p>Actualmente su contraseña es temporal de aceptar para cambiarla</p>
        <p>Su contraseña temporal tiene una duracion de 4 dias</p>
      </Modal>
      <Button type="primary" size="large" style={{marginLeft:"1rem"}} icon={<PlusOutlined />}>
        <Link to="/create-partograph">Crear Partogramas</Link>
      </Button>
      <PinPartograms/>
      <Divider/>
      <PartogramTabs viewMode={viewMode} setViewMode={setViewMode} catalogs={catalogs} />
    </div>
  );
};

export default HomePage;
