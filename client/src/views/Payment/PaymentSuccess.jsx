import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import generatePDF from "../Shoppingcart/createPdfEnvio";
import Cookies from "js-cookie";

const PaymentSuccess = () => {
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
