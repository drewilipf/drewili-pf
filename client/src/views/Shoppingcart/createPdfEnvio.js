import jsPDF from "jspdf";

import axios from "axios";

import logoOriginal from "../../icons/logoOriginal.png";

const generatePDF = (data, purchaseID) => {
  const pdf = new jsPDF();
  console.log(data);
  console.log(purchaseID);

  const imgWidth = 30;
  const imgHeight = 22;
  // pdf.addImage(logoOriginal, "png", 85, 10, imgWidth, imgHeight);
  pdf.setFont("helvetica", "bold");
  pdf.text("Datos de Envio", 82, 40);

  pdf.setFont("helvetica", "normal");
  // Extraer y formatear los datos
  const formattedData = Object.entries(data).map(
    ([key, value]) => `${key}: ${value}`
  );
  console.log("Formatted Data:", formattedData);

  formattedData.forEach((line, index) => {
    pdf.text(line, 10, 50 + index * 10);
  });
  pdf.text("Gracias por tu Compra", 10, 220);

  const blob = pdf.output("blob");
  console.log("Blob:", blob);

  const formData = new FormData();
  formData.append("paymentPdf", blob, "documento.pdf");
  console.log("FormData:", formData);
  formData.forEach((value, key) => {
    console.log(`${key}: ${value}`);
  });

  // O, si prefieres ver un objeto simple
  const formDataObject = {};
  formData.forEach((value, key) => {
    formDataObject[key] = value;
  });
  console.log("FormData Object:", formDataObject);

  if (pdf && blob) {
    enviarFormDataAlServidor(formData, purchaseID);
  }
};

const enviarFormDataAlServidor = async (formData, purchaseID) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const response = await axios.put(
    `https://drewili-pf-back.onrender.com/history/update/${purchaseID}`,
    formData,
    config
  );

  console.log(response);
};

export default generatePDF;
