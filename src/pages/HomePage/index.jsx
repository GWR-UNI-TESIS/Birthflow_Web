import { useEffect, useState } from "react";
import { Button, Divider, Modal, Typography } from "antd";
import PartogramTabs from "./components/PartogramTabs";
import { useCatalog } from "../../contexts/catalog-context";
import usePartographs from "../../hooks/use-partographs";
import { PlusOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";
import PATH from "../../routes/path";
import PinPartograms from "./components/PinPartograms";
import image from '../../assets/change-password.png';
import { motion, AnimatePresence } from "framer-motion";
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
      <Modal title="Contraseña Temporal" open={isOpenPasswordModal}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancelar
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Cambiar mi contraseña
          </Button>]}
      >
        <motion.img
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          src={image}
          alt="Birthflow"
          style={{
            width: "100%",
            height: "100%",
            resizeMode: 'stretch',
            objectFit: "contain",
          }}
        />
        <Typography.Paragraph strong>Actualmente su contraseña es temporal es necesario cambiarla</Typography.Paragraph>
        <Typography.Paragraph>Su contraseña temporal tiene una duracion de 4 dias</Typography.Paragraph>
      </Modal>
      <Button type="primary" size="large" style={{ marginLeft: "1rem" }} icon={<PlusOutlined />}>
        <Link to="/create-partograph">Crear Partogramas</Link>
      </Button>
      <PinPartograms />
      <Divider />
      <PartogramTabs viewMode={viewMode} setViewMode={setViewMode} catalogs={catalogs} />
    </div>
  );
};

export default HomePage;
