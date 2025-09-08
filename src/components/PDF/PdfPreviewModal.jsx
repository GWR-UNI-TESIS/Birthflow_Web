import React from "react";
import { Modal, Button, Spin } from "antd";

// Modal que muestra la vista previa de un PDF generado
const PdfPreviewModal = ({ visible, onClose, pdfUrl, loading }) => {
  return (
    <Modal
      open={visible}        // controla visibilidad del modal
      onCancel={onClose}    // cierra al presionar fuera o en "X"
      footer={[
        <Button key="close" onClick={onClose}>
          Cerrar
        </Button>,
      ]}
      width="80%"           // ancho del modal
      style={{ top: 20 }}   // margen superior
      title="Vista previa del PDF"
    >
      <Spin spinning={loading}>
        {pdfUrl ? (
          // Renderiza el PDF en un iframe
          <iframe
            src={pdfUrl}
            title="PDF Preview"
            width="100%"
            height="600px"
            style={{ border: "none" }}
          />
        ) : (
          <p>Cargando PDF...</p>
        )}
      </Spin>
    </Modal>
  );
};

export default PdfPreviewModal;
