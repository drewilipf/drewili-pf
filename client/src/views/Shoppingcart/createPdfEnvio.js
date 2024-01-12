import jsPDF from "jspdf";

import logoOriginal from "../../../public/logoOriginal.png";

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
  // Convertir el PDF a Blob
  const blob = pdf.output("blob");
  return blob;

  // Crear un objeto FormData y agregar el Blob
  const formData = new FormData();
  formData.append("pdf", blob);

  // Enviar el FormData al servidor
  //enviarFormDataAlServidor(formData);
};

export const enviarFormDataAlServidor = (formData) => {
  fetch("http://localhost:3001/guardar-pdf", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      console.log("FormData enviado correctamente al servidor");
      // Manejar la respuesta del servidor si es necesario
    })
    .catch((error) => {
      console.error("Error al enviar el FormData al servidor", error);
    });
};

export default generatePDF;
