import jsPDF from "jspdf";

import logoOriginal from "../../icons/logoOriginal.png";

const generatePDF = (data) => {
  const pdf = new jsPDF();

  const imgWidth = 30;
  const imgHeight = 22;
  pdf.addImage(logoOriginal, "PNG", 85, 10, imgWidth, imgHeight);
  pdf.setFont("helvetica", "bold");
  pdf.text("Datos de Envio", 82, 40);

  pdf.setFont("helvetica", "normal");
  // Extraer y formatear los datos
  const formattedData = Object.entries(data).map(
    ([key, value]) => `${key}: ${value}`
  );

  // Agregar los datos formateados al PDF
  formattedData.forEach((line, index) => {
    pdf.text(line, 10, 50 + index * 10);
  });
  pdf.text("Gracias por tu Compra", 10, 220);

  // Convertir el PDF a Blob
  const blob = pdf.output("blob");
  return blob;
};

export default generatePDF;
