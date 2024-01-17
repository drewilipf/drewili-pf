import jsPDF from "jspdf";
import Cookies from "js-cookie";
import axios from "axios";

import logoOriginal from "../../icons/logoOriginal.png";

const generatePDF = (data, purchaseID) => {
  const pdf = new jsPDF();
  
  

  const imgWidth = 30;
  const imgHeight = 22;
  // pdf.addImage(logoOriginal, "png", 85, 10, imgWidth, imgHeight);
  pdf.setFont("helvetica", "bold");
  pdf.text("Datos de Envio", 82, 40);

  pdf.setFont("helvetica", "normal");
  
  const formattedData = Object.entries(data).map(
    ([key, value]) => `${key}: ${value}`
  );
  

  formattedData.forEach((line, index) => {
    pdf.text(line, 10, 50 + index * 10);
  });
  pdf.text("Gracias por tu Compra", 10, 220);

  const blob = pdf.output("blob");
  

  const formData = new FormData();
  formData.append("paymentPdf", blob, "documento.pdf");
  
  formData.forEach((value, key) => {
    
  });

  
  const formDataObject = {};
  formData.forEach((value, key) => {
    formDataObject[key] = value;
  });
  

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
  Cookies.remove("combinedData");
  
};

export default generatePDF;
