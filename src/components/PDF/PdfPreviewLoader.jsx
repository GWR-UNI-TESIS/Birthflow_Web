import { useState } from "react";
import { Button } from "antd";
import PdfPreviewModal from "./PdfPreviewModal";
import { getPartographPdf } from "../../services/report-service/report-service";

const PdfPreviewLoader = ({ partographId }) => {
  const [visible, setVisible] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [loading, setLoading] = useState(false);

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
