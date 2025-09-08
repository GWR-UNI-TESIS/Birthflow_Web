import { useState } from "react";
import { Button, Drawer } from "antd";
import NotificationList from "./NotificationList"; // Lista de notificaciones

// Drawer lateral para mostrar las notificaciones de un partograma
const NotificationDrawer = ({ partographId }) => {
  const [open, setOpen] = useState(false);

  // Abre el drawer
  const mostrarDrawer = () => setOpen(true);

  // Cierra el drawer
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
