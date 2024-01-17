import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import generatePDF from "../Shoppingcart/createPdfEnvio";
import Cookies from "js-cookie";
import { postNotificationUserConfirmBuy } from "../../reduxToolkit/Notification/notificationThunks";
import { postNotificationAdminConfirmBuy } from "../../reduxToolkit/Notification/notificationThunks";
import mixpanel from "mixpanel-browser";

const PaymentSuccess = () => {
  const location = useLocation();
  const dispatch = useDispatch();

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
  }, [emailData]);

  useEffect(() => {
    const queryString = window.location.search;

    
    const urlParams = new URLSearchParams(queryString);

    
    const purchaseId = urlParams.get("id");

    
    
    

    const combinedDataFromCookie = Cookies.get("combinedData");
    const combinedData = combinedDataFromCookie
      ? JSON.parse(combinedDataFromCookie)
      : null;
    
    generatePDF(combinedData, purchaseId);
  }, []);


  useEffect(() => {
    if (usermaildata && usermaildata.name) {
      
      dispatch(postNotificationUserConfirmBuy(usermaildata));
    }
    if (adminmaildata && adminmaildata.name) {
      
      dispatch(postNotificationAdminConfirmBuy(adminmaildata));
    }
  }, [usermaildata, adminmaildata, dispatch]);
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
