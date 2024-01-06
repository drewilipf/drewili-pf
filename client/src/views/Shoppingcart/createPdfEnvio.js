import jsPDF from "jspdf";

export const generatePDF = (data) => {
  const pdf = new jsPDF();
  pdf.text("Mi Documento PDF", 10, 10);
  pdf.text(JSON.stringify(data), 10, 20);

  // Convertir el PDF a Blob
  const blob = pdf.output("blob");

  // Crear un objeto FormData y agregar el Blob
  const formData = new FormData();
  formData.append("pdf", blob);

  // Enviar el FormData al servidor
  enviarFormDataAlServidor(formData);
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
