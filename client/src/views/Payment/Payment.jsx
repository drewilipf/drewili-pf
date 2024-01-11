
import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { NavLink, useLocation, useParams } from "react-router-dom";
import { postNotificationUserConfirmBuy } from "../../reduxToolkit/Notification/notificationThunks";


const Payment = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const emailData = location.state;
  console.log("datos recibidos en el nuevo componente", emailData);

  const [usermaildata, setUsermaildata] = useState({
    name: "",
    email: "",
    adress: "",
    product: [],
    total: 0,
    status: ""
  });

  const [adminmaildata, setAdminmaildata] = useState({
    name: "",
    email: "",
    adress: "",
    product: [],
    total: 0,
    status: ""
  });

  useEffect(() => {
    if (emailData) {
      setUsermaildata({
        name: emailData.name || "",
        email: emailData.email || "",
        adress: emailData.adress || "",
        product: emailData.product?.map((item) => ({ name: item.name, quantity: item.quantity, price: item.price })),
        total: emailData.totalprice || 0,
        //status: emailData.status
      });
      setAdminmaildata({
        name: emailData.name || "",
        email: emailData.email || "",
        adress: emailData.adress || "",
        product: emailData.product?.map((item) => ({ name: item.name, quantity: item.quantity, price: item.price })),
        total: emailData.totalprice || 0,
        //status: emailData.status
      });
    }
  }, [emailData]);

  useEffect(() => {
    // Verificar si emailData está definido y usermaildata tiene datos
    if (emailData && usermaildata.name) {
      console.log("Datos email usuario:", usermaildata);
      dispatch(postNotificationUserConfirmBuy(usermaildata));
    }
  }, [usermaildata, emailData, dispatch]);

  return (
    <div className="h-90vh bg-whiteSmoke flex justify-center items-center flex-col">
      <article className="h-[50%] w-[50%] rounded-2xl shadow-2xl flex justify-center flex-col items-center">
        <h2 className="p-2 text-lg font-bold">
          ¡Su pago será verificado y en máximo 48 horas estará recibiendo la confirmación del envío!
        </h2>
        <h3 className="p-2">Gracias por confiar en nosotros</h3>
      </article>
      <NavLink to={`/`} className="text-chiliRed hover:text-onyx underline ml-4 mt-9">
        Ir a la página principal
      </NavLink>
    </div>
  );
};

export default Payment;
