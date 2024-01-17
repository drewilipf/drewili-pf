import React, { useEffect, useState } from "react";
import { useDispatch,useSelector  } from "react-redux";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { putEmaildata } from "../../reduxToolkit/Notification/notificationSlice";
import { postNotificationUserConfirmBuy } from "../../reduxToolkit/Notification/notificationThunks";
import { postNotificationAdminConfirmBuy } from "../../reduxToolkit/Notification/notificationThunks";
import mixpanel from "mixpanel-browser";

const Payment = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const {emailData} = useSelector((state) => state.notification);

  

  const [usermaildata, setUsermaildata] = useState({
    name: "",
    email: "",
    products: [],
    total: 0,
    adress: "",
    status: "default",
  });

  const [adminmaildata, setAdminmaildata] = useState({
    name: "",
    email: "",
    phone: "",
    products: [],
    total: 0,
    adress: "",
    dropshiping: "",
    payment: "",
    status: "default",
  });

  useEffect(() => {
    
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
        adress: emailData.adress || "",
        status: "default",
        
      });
      setAdminmaildata({
        name: emailData.name || "",
        email: emailData.email || "",
        phone: emailData.phone || "",
        products: emailData.product?.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        adress: emailData.adress || "",

        total: emailData.totalprice || 0,
        dropshipping: emailData.dropshipping || "",
        status: "default",
        
      });
    }
  }, [emailData]);

  useEffect(() => {
    if (usermaildata && usermaildata.name) {
      
      dispatch(postNotificationUserConfirmBuy(usermaildata));
    }
    if (adminmaildata && adminmaildata.name) {
      
      dispatch(postNotificationAdminConfirmBuy(adminmaildata));
    }
  }, [usermaildata, adminmaildata, dispatch]);

  useEffect(() => {
    
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
      total: emailData.totalprice, 
    });
  }, []);

  return (
    <div className="h-90vh bg-whiteSmoke flex justify-center items-center flex-col">
      <article className="h-[50%] w-[50%] rounded-2xl shadow-2xl flex justify-center flex-col items-center">
        <h2 className="p-2 text-lg font-bold">
          ¡Su pago será verificado y en un máximo de 48 horas estará recibiendo la
          confirmación del envío!
        </h2>
        <h3 className="p-2">Gracias por confiar en nosotros.</h3>
      </article>
      <NavLink
        to={`/`}
        className="text-chiliRed hover:text-onyx underline ml-4 mt-9"
      >
        Ir a la página principal
      </NavLink>
    </div>
  );
};

export default Payment;
