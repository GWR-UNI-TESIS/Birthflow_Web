import { useState } from "react";
import { Button } from "antd";
import PdfPreviewModal from "./PdfPreviewModal";
import { getPartographPdf } from "../../services/report-service/report-service";

// Componente que genera y muestra un PDF del partograma en un modal
const PdfPreviewLoader = ({ partographId }) => {
  const [visible, setVisible] = useState(false); // controla la visibilidad del modal
  const [pdfUrl, setPdfUrl] = useState(null); // almacena la URL del PDF generado
  const [loading, setLoading] = useState(false); // estado de carga

  // Obtiene el PDF desde el servicio y lo muestra en el modal
  const mostrarPDF = async () => {
    try {
      setVisible(true);
      setLoading(true);
      const blob = await getPartographPdf(partographId);
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    } catch (error) {
      console.error("Error mostrando PDF:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button onClick={mostrarPDF}>Generar PDF</Button>
      <PdfPreviewModal
        visible={visible}
        onClose={() => setVisible(false)}
        pdfUrl={pdfUrl}
        loading={loading}
      />
    </>
  );
};

export default PdfPreviewLoader;
