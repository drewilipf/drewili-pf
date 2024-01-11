import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const PaymentSuccess = () => {

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
