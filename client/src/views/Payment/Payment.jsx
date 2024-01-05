import React from "react";
import { NavLink } from "react-router-dom";

const Payment = () => {
  return (
    <div className="h-90vh  bg-whiteSmoke flex justify-center items-center flex-col">
      <article className=" h-[50%] w-[50%] rounded-2xl shadow-2xl flex justify-center flex-col items-center">
        <h2 className="p-2 text-lg font-bold">
          ¡Su pago será verificado y en maximo 48 horas esta recibiendo la
          confirmación del envio!
        </h2>
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

export default Payment;
