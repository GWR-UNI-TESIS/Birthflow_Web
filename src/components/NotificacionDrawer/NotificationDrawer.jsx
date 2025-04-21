import { useState } from "react";
import { Button, Drawer } from "antd";
import NotificationList from "./NotificationList"; // Asegúrate de tener este componente

const NotificationDrawer = ({ partographId }) => {
  const [open, setOpen] = useState(false);

  const mostrarDrawer = () => setOpen(true);
  const cerrarDrawer = () => setOpen(false);

  return (
    <>
      <Button onClick={mostrarDrawer}>Notificaciones</Button>
      <Drawer
        title="Notificaciones del Partograma"
        placement="right"
        width={400}
        onClose={cerrarDrawer}
        open={open}
      >
        {partographId ? (
          <NotificationList partographId={partographId} />
        ) : (
          <p>No se ha seleccionado un partograma.</p>
        )}
      </Drawer>
    </>
  );
};

export default NotificationDrawer;
