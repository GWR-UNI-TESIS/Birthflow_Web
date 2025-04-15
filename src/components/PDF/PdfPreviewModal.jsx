import React from "react";
import { Modal, Button, Spin } from "antd";

const PdfPreviewModal = ({ visible, onClose, pdfUrl, loading }) => {
  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Cerrar
        </Button>,
      ]}
      width="80%"
      style={{ top: 20 }}
      title="Vista previa del PDF"
    >
      <Spin spinning={loading}>
        {pdfUrl ? (
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
