import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";
import generatePDF from "./createPdfEnvio";
import { SiWhatsapp } from "react-icons/si";
import { BsQrCode } from "react-icons/bs";
import {
  setPedidoOption,
  setComprobanteOption,
  setModalidadPagoSlice,
  setRazonSocialSlice,
  setRucSlice,
} from "../../reduxToolkit/ShippingInfo/shippingInfoSlice";
import { allDelete } from "../../reduxToolkit/SalesCarts/salesCartThunk";
import { putEmaildata } from "../../reduxToolkit/Notification/notificationSlice";

const SelectPayment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pdfBlob, setPdfBlob] = useState(null);
  const [opcionSeleccionadaPedido, setOpcionSeleccionadaPedido] =
    useState("yo");
  const [opcionSeleccionadaComprobante, setOpcionSeleccionadaComprobante] =
    useState("boleta");
  const [razonSocial, setRazonSocial] = useState(" ");
  const [ruc, setRuc] = useState(" ");
  const [modalidadPago, setModalidadPago] = useState("transferenciaBancaria");
  const userSessionFromCookies = Cookies.get("userSession");
  const userGoogleFromCookies = Cookies.get("userGoogle");
  const userSession = userSessionFromCookies
    ? JSON.parse(userSessionFromCookies)
    : null;
  const userGoogleSession = userGoogleFromCookies
    ? JSON.parse(userGoogleFromCookies)
    : null;

  const { login } = useSelector((state) => state.login);
  const { usersGoogle } = useSelector((state) => state.users);
  const { priceTotal } = useSelector((state) => state.salesCart);
  const { shippingInfo } = useSelector((state) => state.shipping);

  const { dropshippingInfo } = useSelector((state) => state.shipping);

  const { opcionQuienRecibe } = useSelector((state) => state.shipping);
  const { opciontipoComprobante } = useSelector((state) => state.shipping);
  const { razonSocialFactura } = useSelector((state) => state.shipping);
  const { rucFactura } = useSelector((state) => state.shipping);
  let  {emailData}= useSelector((state) => state.notification);

  

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
  useEffect(() => {
    Cookies.set("combinedData", JSON.stringify(combinedData));
  }, [combinedData]);

  const userId =
    (userSession && userSession.userId) ||
    (login && login.userSession.userId) ||
    (usersGoogle && usersGoogle.id) ||
    (userGoogleSession && userGoogleSession.id);

  const handlePedidoOptionChange = (opcion) => {
    setOpcionSeleccionadaPedido(opcion);
    dispatch(setPedidoOption(opcion));
  };

  const handleComprobanteOptionChange = (opcion) => {
    setOpcionSeleccionadaComprobante(opcion);
    dispatch(setComprobanteOption(opcion));
    setRazonSocial("");
    setRuc("");
  };
  const handleClik = () => {
    setRazonSocial(razonSocial);
    dispatch(setRazonSocialSlice(razonSocial));
    setRuc(ruc);

    dispatch(setRucSlice(ruc));
  };

  const { salesCart } = useSelector((state) => state.salesCart);

  const handleModalidadPagoChange = (modalidad) => {
    setModalidadPago(modalidad);
    dispatch(setModalidadPagoSlice(modalidad));
  };
  const purchaseHistory = useSelector((state) => state.purchaseHistory.data);

  const listItems = salesCart?.map((item) => ({
    idProduct: item.id,
    name: item.name,
    image: item.image,
    price: item.price,
    quantity: item.quantity,
  }));

  const handlePayment = async () => {
    try {
      const response = await axios.post(
        "https://drewili-pf-back.onrender.com/payment/create-checkout-session",
        { cartItems: listItems, id: userId }
      );
      const { data } = response;

      window.location.href = data.urlPayment;
    } catch (error) {
      console.error(error);
    }
  };

 const NewEmailData = {
    name: dropshippingInfo.name
      ? `${dropshippingInfo.name} `
      : `${shippingInfo.name} ${shippingInfo.lastname}`,
    email: shippingInfo.email,
    adress: dropshippingInfo.adress
      ? `${dropshippingInfo.adress} `
      : shippingInfo.adress,
    product: listItems,
    totalprice: priceTotal,
    phone: dropshippingInfo.phone
      ? `${dropshippingInfo.phone} `
      : shippingInfo.phone,
    dropshipping: dropshippingInfo.name ? "Si" : "No",
    status: purchaseHistory.paymentStatus,
  };

  const handlePdf = async () => {
    
    dispatch(putEmaildata(NewEmailData));
    
    navigate("/payment/payment");

    

    const Historial = await axios.post(
      `https://drewili-pf-back.onrender.com/history/${userId}`,
      {
        cartItems: listItems,
      }
    );

    const purchaseId = Historial.data[0].id;
    
    const generatedBlob = generatePDF(combinedData, purchaseId);
    setPdfBlob(generatedBlob);

    dispatch(allDelete(userId));
  };

  const PriceContraentrega = ((priceTotal * 30) / 100).toFixed(2);

  return (
    <div className="tablet:h-full">
      <div className=" flex justify-center  items-center">
        <label className=" font-bold mr-2">¿Quién recibirá el pedido?</label>
        <div className="">
          <div>
            <input
              type="radio"
              id="yo"
              name="pedido"
              checked={opcionSeleccionadaPedido === "yo"}
              onChange={() => handlePedidoOptionChange("yo")}
            />
            <label className="p-2 hover:cursor-pointer" htmlFor="yo">Yo</label>
          </div>
          <div>
            <input
              type="radio"
              id="OtraPersona"
              name="pedido"
              checked={opcionSeleccionadaPedido === "OtraPersona"}
              onChange={() => handlePedidoOptionChange("OtraPersona")}
            />
            <label className="p-2 hover:cursor-pointer" htmlFor="OtraPersona">Otra persona</label>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center ">
        <label className="font-bold mr-2 p-2">¿Qué tipo de comprobante desea?</label>
        <div className="">
          <div>
            <input
              type="radio"
              id="boleta"
              name="comprobante"
              checked={opcionSeleccionadaComprobante === "boleta"}
              onChange={() => handleComprobanteOptionChange("boleta")}
            />
            <label className="p-2 hover:cursor-pointer" htmlFor="boleta">Boleta</label>
          </div>
          <div>
            <input
              type="radio"
              id="factura"
              name="comprobante"
              checked={opcionSeleccionadaComprobante === "factura"}
              onChange={() => handleComprobanteOptionChange("factura")}
            />
            <label className="p-2 hover:cursor-pointer" htmlFor="factura">Factura</label>
          </div>
        </div>
      </div>
      {opcionSeleccionadaComprobante === "factura" && (
        <div className=" tablet:flex items-center justify-around mt-8 max-w-4xl p-2 mx-auto ">
          <div className="justify-center tablet:items-center tablet:flex">
            <div className=" mb-4">
              <label className="p-2">Razón social:</label>
              <input
                type="text"
                value={razonSocial}
                onChange={(e) => setRazonSocial(e.target.value)}
                className="border p-2 rounded-md shadow-xl"
                placeholder="Razón social"
              />
            </div>
            <div className="mb-4">
              <label className="p-2">RUC:</label>
              <input
                type="text"
                value={ruc}
                onChange={(e) => setRuc(e.target.value)}
                className="border p-2 rounded-md shadow-xl"
                placeholder="RUC"
              />
              <button
                className=" bg-chiliRed text-white hover:bg-onyx font-bold py-2 px-4 rounded m-2 shadow-xl"
                onClick={handleClik}
              >
                Aceptar datos
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="items-center mt-8 bg-white tablet:w-40vw mx-auto rounded border-grey border-[1px]">
        <label className="font-bold justify-center text-2xl items-center flex">
          Modalidad de pago
        </label>
        <div className="text-xl mt-4 tablet:flex flex-col items-center ">
          <div className="w-40vw m-[1px] flex hover:shadow-xl rounded hover:bg-whiteSmoke pl-2">
            <input
              type="radio"
              id="modalidadTransferencia"
              name="modalidadPago"
              checked={modalidadPago === "transferenciaBancaria"}
              onChange={() => handleModalidadPagoChange("transferenciaBancaria")}
            />
            <label className="p-2 hover:cursor-pointer" htmlFor="modalidadTransferencia">Transferencia Bancaria</label>
          </div>
          <div className="w-40vw m-[1px] flex hover:shadow-xl rounded hover:bg-whiteSmoke pl-2">
            <input
              type="radio"
              id="modalidadTarjeta"
              name="modalidadPago"
              checked={modalidadPago === "tarjetaCreditoDebito"}
              onChange={() => handleModalidadPagoChange("tarjetaCreditoDebito")}
            />
            <label className="p-2 hover:cursor-pointer" htmlFor="modalidadTarjeta">Tarjeta de Crédito o Débito</label>
          </div>
          <div className="w-40vw m-[1px] flex hover:shadow-xl rounded hover:bg-whiteSmoke pl-2">
            <input
              type="radio"
              id="modalidadYape"
              name="modalidadPago"
              checked={modalidadPago === "yape"}
              onChange={() => handleModalidadPagoChange("yape")}
            />
            <label className="p-2 hover:cursor-pointer" htmlFor="modalidadYape">Yape o Plin</label>
          </div>
          <div className="w-40vw m-[1px] flex hover:shadow-xl rounded hover:bg-whiteSmoke pl-2">
            <input
              type="radio"
              id="modalidadContraentrega"
              name="modalidadPago"
              checked={modalidadPago === "contraentrega"}
              onChange={() => handleModalidadPagoChange("contraentrega")}
            />
            <label className="p-2 hover:cursor-pointer" htmlFor="modalidadContraentrega">Contraentrega</label>
          </div>
        </div>
      </div>
      {modalidadPago === "transferenciaBancaria" && (
        <div className="tablet:flex tablet:flex-col flex-none">
          <div className="justify-center tablet:flex tablet:flex-wrap mt-4 p-2">
            <span className="shadow-xl rounded flex flex-col items-center justify-center m-2 border-grey border-[1px]">
              <img
                src="https://res.cloudinary.com/dpj4n40t6/image/upload/c_thumb,w_200,g_face/v1704394742/bbva_pyb84a.png"
                alt="BBVA"
                className="w-40 h-20 mx-auto shadow-xl rounded-xl m-2  "
              />
              <div className="p-2">
                <div className="font-bold">Nombre del banco:"BBVA"</div>
                <div>Titular: DREWILI</div>
                <div>Cta. corriente: 555-566-555-555</div>
                <div>CCI: 20.000.000</div>
              </div>
            </span>
            <span className="shadow-xl rounded flex flex-col items-center justify-center m-2 border-grey border-[1px]">
              <img
                src="https://res.cloudinary.com/dpj4n40t6/image/upload/c_thumb,w_200,g_face/v1704394742/diners_Club_zfcjlt.png"
                alt="Diners Club"
                className="w-40 h-20 shadow-xl rounded-xl m-2"
              />
              <div className="p-2">
                <div className="font-bold">Nombre del banco:"Diners Club"</div>
                <div>Titular: DREWILI</div>
                <div>Cta. corriente: 555-566-555-555</div>
                <div>CCI: 20.000.000</div>
              </div>
            </span>
            <span className="shadow-xl rounded flex flex-col items-center justify-center m-2 border-grey border-[1px]">
              <img
                src="https://res.cloudinary.com/dpj4n40t6/image/upload/c_thumb,w_200,g_face/v1704394742/bcp_gm0nfk.png"
                alt="BCP"
                className="w-40 h-20 shadow-xl rounded-xl m-2"
              />
              <div className="p-2">
                <div className="font-bold">Nombre del banco:"BCP" </div>
                <div>Titular: DREWILI</div>
                <div>Cta. corriente: 555-566-555-555</div>
                <div>CCI: 20.000.000</div>
              </div>
            </span>
            <span className="shadow-xl rounded flex flex-col items-center justify-center m-2 border-grey border-[1px]">
              <img
                src="https://res.cloudinary.com/dpj4n40t6/image/upload/c_thumb,w_200,g_face/v1704394742/dividelo_interbank_iq253n.png"
                alt="Dividelo Interbanck"
                className="w-40 h-20  shadow-xl rounded-xl m-2 "
              />
              <div className="p-2">
                <div className="font-bold">Nombre del banco:"Dividelo Interbanck"</div>
                <div>Titular: DREWILI</div>
                <div>cta. corriente: 555-566-555-555</div>
                <div>CCI: 20.000.000</div>
              </div>
            </span>
          </div>
          <div className="max-w-xl tablet:mx-auto shadow-xl rounded border-grey border-[1px] m-2 ">
            <span className="font-bold">
              <h2 className="p-2 text-center">
                RECUERDA ENVIAR EL COMPROBANTE DE PAGO AL SIGUIENTE WHATSAPP
              </h2>
            </span>
            <div className="flex justify-center text-2xl  ">
              <SiWhatsapp className="mt-1 mr-4" />
              <a
                href="https://wa.me/51971985484"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="hover:text-chiliRed p-2">971 985 484</span>
              </a>
            </div>
          </div>

          <button
            className="flex mx-auto mt-8 bg-chiliRed text-white hover:bg-onyx font-bold py-2 px-4 rounded"
            onClick={handlePdf}
          >
            Ir a pagar
          </button>
        </div>
      )}
      {modalidadPago === "tarjetaCreditoDebito" && (
        <div className="flex justify-center items-baseline ">
          <button
            className="mt-24 mb-8 bg-chiliRed text-white hover:bg-onyx font-bold py-2 px-4 rounded"
            onClick={handlePayment}
          >
            Ir a pagar
          </button>
        </div>
      )}
      {modalidadPago === "yape" && (
        <div className="mt-8 p-2 ">
          <span className="flex justify-center ">
            Con esta opción podrás pagar a través de Yape o Plin, registra
            nuestro número de teléfono, usuando el QR, en tus contactos y
            realiza el pago.
          </span>
          <div className="flex justify-center mt-8 ml-9 text-9xl">
            <BsQrCode />
          </div>
          <div className="max-w-xl mx-auto mt-8 shadow-xl rounded-xl ">
            <span className="font-bold tablet:ml-2 p-2">
              RECUERDA ENVIAR EL COMPROBANTE DE PAGO AL SIGUIENTE WHATSAPP
            </span>
            <div className="flex justify-center text-2xl  ">
              <SiWhatsapp className="mt-1 mr-4" />
              <a
                href="https://wa.me/51971985484"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="hover:text-chiliRed p-2">971 985 484</span>
              </a>
            </div>
          </div>
          <div className="flex justify-center items-baseline">
            <button
              className="mt-4 bg-chiliRed text-white hover:bg-onyx font-bold py-2 px-4 rounded"
              onClick={handlePdf}
            >
              Ir a pagar
            </button></div>
        </div>
      )}
      {modalidadPago === "contraentrega" && (
        <div className="tablet:flex tablet:flex-col flex-none ">
          <span className="font-bold flex justify-center p-2">Anticipo del 30% del pago.</span>
          <div className="flex justify-center p-2">
            Se confirmará el pedido por los medios de contacto suministrado.
          </div>
          <span className="flex justify-center p-2">
            En caso el comprador no conteste, DREWILI no procederá con el envío
            del pedido.
          </span>
          <div className="font-bold flex justify-center p-2">
            Realiza la transferencia del siguiente monto S/{PriceContraentrega}{" "}
            y envia el comprobante para proceder con el envío.
          </div>
          <div className="justify-center tablet:flex tablet:flex-wrap mt-4 p-2">
            <span className="shadow rounded flex flex-col items-center justify-center m-2 border-grey border-[1px]">
              <img
                src="https://res.cloudinary.com/dpj4n40t6/image/upload/c_thumb,w_200,g_face/v1704394742/bbva_pyb84a.png"
                alt="BBVA"
                className="w-40 h-20 mx-auto shadow-xl rounded-xl m-2 "
              />
              <div className="p-2 text-center">
                <div className="font-bold">Nombre del banco:"BBVA"</div>
                <div>Titular: DREWILI</div>
                <div>Cta. corriente: 555-566-555-555</div>
                <div>CCI: 20.000.000</div>
              </div>
            </span>
            <span className="shadow-xl rounded flex flex-col items-center justify-center m-2 border-grey border-[1px]">
              <img
                src="https://res.cloudinary.com/dpj4n40t6/image/upload/c_thumb,w_200,g_face/v1704394742/diners_Club_zfcjlt.png"
                alt="Diners Club"
                className="w-40 h-20 mx-auto shadow-xl rounded-xl m-2"
              />
              <div className="p-2 text-center">
                <div className="font-bold">Nombre del banco:"Diners Club"</div>
                <div>Titular: DREWILI</div>
                <div>Cta. corriente: 555-566-555-555</div>
                <div>CCI: 20.000.000</div>
              </div>
            </span>
            <span className="shadow-xl rounded flex flex-col items-center justify-center m-2 border-grey border-[1px]">
              <img
                src="https://res.cloudinary.com/dpj4n40t6/image/upload/c_thumb,w_200,g_face/v1704394742/bcp_gm0nfk.png"
                alt="BCP"
                className="w-40 h-20 mx-auto shadow-xl rounded-xl m-2"
              />
              <div className="p-2 text-center">
                <div className="font-bold">Nombre del banco:"BCP" </div>
                <div>Titular: DREWILI</div>
                <div>Cta. corriente: 555-566-555-555</div>
                <div>CCI: 20.000.000</div>
              </div>
            </span>
            <span className="shadow-xl rounded flex flex-col items-center justify-center m-2 border-grey border-[1px]">
              <img
                src="https://res.cloudinary.com/dpj4n40t6/image/upload/c_thumb,w_200,g_face/v1704394742/dividelo_interbank_iq253n.png"
                alt="Dividelo Interbanck"
                className="w-40 h-20 mx-auto shadow-xl rounded-xl m-2"
              />
              <div className="p-2 text-center">
                <div className="font-bold">Nombre del banco:"Dividelo Interbanck"</div>
                <div>Titular: DREWILI</div>
                <div>cta. corriente: 555-566-555-555</div>
                <div>CCI: 20.000.000</div>
              </div>
            </span>
          </div>
          <div className="max-w-xl mx-auto mt-8 shadow-xl rounded border-grey border-[1px] ">
          <span className="font-bold">
              <h2 className="p-2 text-center">
                RECUERDA ENVIAR EL COMPROBANTE DE PAGO AL SIGUIENTE WHATSAPP
              </h2>
            </span>
            <div className="flex justify-center text-2xl  ">
              <SiWhatsapp className="mt-1 mr-4" />
              <a
                href="https://wa.me/51971985484"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="hover:text-chiliRed p-2">971 985 484</span>
              </a>
            </div>
          </div>

          <div className="flex justify-center items-baseline">
            <button
              className="mt-4 bg-chiliRed text-white hover:bg-onyx font-bold py-2 px-4 rounded"
              onClick={handlePdf}
            >
              Ir a pagar
            </button></div>

        </div>
      )}

      <NavLink
        to={`/validateaddress`}
        className="text-chiliRed  hover:text-onyx underline ml-4 mt-9 flex justify-center"
      >
        Regresar a dirección de entrega
      </NavLink>
    </div>
  );
};

export default SelectPayment;
