import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import generatePDF from "../Shoppingcart/createPdfEnvio";

const PaymentSuccess = () => {
  // useEffect(() => {
  const queryString = window.location.search;

  // Crea un nuevo objeto URLSearchParams y pásale la cadena de consulta
  const urlParams = new URLSearchParams(queryString);

  // Obtén el valor del parámetro "id"
  const purchaseId = urlParams.get("id");

  // Ahora 'purchaseId' contiene el valor del parámetro "id"
  console.log(purchaseId);
  const { shippingInfo } = useSelector((state) => state.shipping);

  const { dropshippingInfo } = useSelector((state) => state.shipping);

  const { opcionQuienRecibe } = useSelector((state) => state.shipping);
  const { opciontipoComprobante } = useSelector((state) => state.shipping);
  const { razonSocialFactura } = useSelector((state) => state.shipping);
  const { rucFactura } = useSelector((state) => state.shipping);
  const { modalidadPago } = useSelector((state = state.shipping));

  const opcionR = opcionQuienRecibe;
  const opcionC = opciontipoComprobante;
  const combinedData = {
    Nombre: shippingInfo.name,
    Apellido: shippingInfo.lastname,
    Dirección: shippingInfo.address,
    "Correo electrónico": shippingInfo.email,
    Celular: shippingInfo.phone,
    "Nº de Documento": shippingInfo.dni,
    Dropshipping: "Datos del Cliente",
    "Nombre completo ": dropshippingInfo.name,
    "Dirección de envío": dropshippingInfo.address,
    Teléfono: dropshippingInfo.phone,
    "Número de Documento": dropshippingInfo.dni,
    "¿Quién recibirá el pedido?": opcionR,
    "¿Qué tipo de comprobante desea?": opcionC,
    "Razón Social": razonSocialFactura,
    RUC: rucFactura,
    "modalidad de pago": modalidadPago,
  };
  console.log(combinedData);
  generatePDF(combinedData, purchaseId);
  // }, []);
  return (
    <div className="h-90vh  bg-whiteSmoke flex justify-center items-center flex-col">
      <article className=" h-[50%] w-[50%] rounded-2xl shadow-2xl flex justify-center flex-col items-center">
        <h2 className="p-2 text-lg font-bold">Su pago fue aprobado!</h2>
        <h3 className="p-2">Gracias por confiar en nosotros</h3>
      </article>
      <NavLink
        to={`/`}
        className="text-chiliRed  hover:text-onyx underline ml-4 mt-9"
      >
        Ir a la pagina principal
      </NavLink>
    </div>
  );
};

export default PaymentSuccess;
