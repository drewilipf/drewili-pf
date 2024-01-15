import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import generatePDF from "../Shoppingcart/createPdfEnvio";
import Cookies from "js-cookie";

const PaymentSuccess = () => {
  const location = useLocation();
  const emailData = location.state;
  useEffect(() => {
    console.log(emailData);
    if (emailData) {
      setUsermaildata({
        name: emailData.name || "",
        email: emailData.email || "",
        products: emailData.product?.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        total: emailData.totalprice || 0,
      });
    }
    mixpanel.track("CompraCompletada", {
      productos: [
        {
          products: emailData.product?.map((item) => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      ],
      total: emailData.totalprice, // Agrega el total de la compra
    });
  }, []);
  useEffect(() => {
    const queryString = window.location.search;

    // Crea un nuevo objeto URLSearchParams y pásale la cadena de consulta
    const urlParams = new URLSearchParams(queryString);

    // Obtén el valor del parámetro "id"
    const purchaseId = urlParams.get("id");

    // Ahora 'purchaseId' contiene el valor del parámetro "id"
    console.log(purchaseId);

    const combinedDataFromCookie = Cookies.get("combinedData");
    const combinedData = combinedDataFromCookie
      ? JSON.parse(combinedDataFromCookie)
      : null;
    console.log(combinedData);
    generatePDF(combinedData, purchaseId);
  }, []);

  return (
    <div className="h-90vh  bg-whiteSmoke flex justify-center items-center flex-col">
      <article className=" h-[50%] w-[50%] rounded-2xl shadow-2xl flex justify-center flex-col items-center">
        <h2 className="p-2 text-lg font-bold">¡Su pago fue aprobado!</h2>
        <h3 className="p-2">Gracias por confiar en nosotros.</h3>
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
