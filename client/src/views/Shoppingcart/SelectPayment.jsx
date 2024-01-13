import React, { useEffect, useState } from "react";
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
import { putStatus } from "../../reduxToolkit/PurchaseHistory/purchaseHistoryThunks";

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

  const emailData = {
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
    console.log("Datos combinados enviados al componente payment:", emailData);
    console.log("Datos combinados purchase:", purchaseHistory);
    console.log("Este es el shipping info:", shippingInfo);
    console.log("Este es el dropshipping info:", dropshippingInfo);
    navigate("/payment/payment", { state: emailData });
    const generatedBlob = generatePDF(combinedData);
    setPdfBlob(generatedBlob);
    await axios.post(`https://drewili-pf-back.onrender.com/history/${userId}`, {
      cartItems: listItems,
    });
    // dispatch(putStatus(purchaseId, pdfBlob));
    dispatch(allDelete(userId));
  };

  // const handleCrearPdf = () => {
  //   const generatedBlob = generatePDF(combinedData);
  //   setPdfBlob(generatedBlob);
  // };
  // const handleDownloadPdf = () => {
  //   if (pdfBlob) {
  //     const url = URL.createObjectURL(pdfBlob);
  //     const a = document.createElement("a");
  //     a.href = url;
  //     a.download = "documento.pdf";
  //     document.body.appendChild(a);
  //     a.click();
  //     document.body.removeChild(a);
  //     URL.revokeObjectURL(url);
  //   }
  // };

  const PriceContraentrega = ((priceTotal * 30) / 100).toFixed(2);

  return (
    <div className="h-screen ml-5">
      <div className="flex items-center">
        <label className="mr-4 ">¿Quién recibirá el pedido?</label>
        <div>
          <input
            type="radio"
            id="yo"
            name="pedido"
            checked={opcionSeleccionadaPedido === "yo"}
            onChange={() => handlePedidoOptionChange("yo")}
          />
          <label className="mr-2 ml-2">Yo</label>

          <input
            type="radio"
            id="OtraPersona"
            name="pedido"
            checked={opcionSeleccionadaPedido === "OtraPersona"}
            onChange={() => handlePedidoOptionChange("OtraPersona")}
          />
          <label className="mr-2 ml-2">Otra persona</label>
        </div>
      </div>
      <div className="flex items-center">
        <label className="mr-4">¿Qué tipo de comprobante desea?</label>
        <div>
          <input
            type="radio"
            id="boleta"
            name="comprobante"
            checked={opcionSeleccionadaComprobante === "boleta"}
            onChange={() => handleComprobanteOptionChange("boleta")}
          />
          <label className="mr-2 ml-2">Boleta</label>

          <input
            type="radio"
            id="factura"
            name="comprobante"
            checked={opcionSeleccionadaComprobante === "factura"}
            onChange={() => handleComprobanteOptionChange("factura")}
          />
          <label className="mr-2 ml-2">Factura</label>
        </div>
      </div>
      {opcionSeleccionadaComprobante === "factura" && (
        <div>
          <label className="block mt-4">Razón social:</label>
          <input
            type="text"
            value={razonSocial}
            onChange={(e) => setRazonSocial(e.target.value)}
            className="border p-2"
            placeholder="Razón social"
          />

          <label className="block mt-4">RUC:</label>
          <input
            type="text"
            value={ruc}
            onChange={(e) => setRuc(e.target.value)}
            className="border p-2"
            placeholder="RUC"
          />
          <button
            className="mt-4 bg-chiliRed text-white hover:bg-onyx font-bold py-2 px-4 rounded ml-4"
            onClick={handleClik}
          >
            Aceptar datos
          </button>
        </div>
      )}
      <div className=" items-center mt-8 ">
        <label className="mr-4 font-bold text-center text-2xl ml-16">
          Modalidad de pago
        </label>
        <div className="text-xl mt-4">
          <input
            type="radio"
            id="modalidadTransferencia"
            name="modalidadPago"
            checked={modalidadPago === "transferenciaBancaria"}
            onChange={() => handleModalidadPagoChange("transferenciaBancaria")}
          />
          <label className="mr-2 ml-2">Transferencia Bancaria</label>

          <input
            type="radio"
            id="modalidadTarjeta"
            name="modalidadPago"
            checked={modalidadPago === "tarjetaCreditoDebito"}
            onChange={() => handleModalidadPagoChange("tarjetaCreditoDebito")}
          />
          <label className="mr-2 ml-2">Tarjeta de Crédito o Débito</label>

          <input
            type="radio"
            id="modalidadYape"
            name="modalidadPago"
            checked={modalidadPago === "yape"}
            onChange={() => handleModalidadPagoChange("yape")}
          />
          <label className="mr-2 ml-2">Yape o Plin</label>

          <input
            type="radio"
            id="modalidadContraentrega"
            name="modalidadPago"
            checked={modalidadPago === "contraentrega"}
            onChange={() => handleModalidadPagoChange("contraentrega")}
          />
          <label className="mr-2 ml-2">Contraentrega</label>
        </div>
      </div>
      {modalidadPago === "transferenciaBancaria" && (
        <div>
          <div className="flex mt-8">
            <img
              src="https://res.cloudinary.com/dpj4n40t6/image/upload/c_thumb,w_200,g_face/v1704394742/bbva_pyb84a.png"
              alt="BBVA"
              className="mr-48 w-20 h-16"
            />
            <img
              src="https://res.cloudinary.com/dpj4n40t6/image/upload/c_thumb,w_200,g_face/v1704394742/diners_Club_zfcjlt.png"
              alt="Diners Club"
              className="mr-48 w-20 h-16"
            />
            <img
              src="https://res.cloudinary.com/dpj4n40t6/image/upload/c_thumb,w_200,g_face/v1704394742/bcp_gm0nfk.png"
              alt="BCP"
              className="mr-48 w-28 h-16"
            />
            <img
              src="https://res.cloudinary.com/dpj4n40t6/image/upload/c_thumb,w_200,g_face/v1704394742/dividelo_interbank_iq253n.png"
              alt="Dividelo Interbanck"
              className="mr-48 w-24 h-16"
            />
          </div>
          <div className="flex mt-8">
            <span className="mr-4">
              <div className="font-bold">Nombre del banco:"BBVA"</div>
              <div>Titular: DREWILI</div>
              <div>Cta. corriente: 555-566-555-555</div>
              <div>CCI: 20.000.000</div>
            </span>
            <span className="mr-4">
              <div className="font-bold">Nombre del banco:"Diners Club"</div>
              <div>Titular: DREWILI</div>
              <div>Cta. corriente: 555-566-555-555</div>
              <div>CCI: 20.000.000</div>
            </span>
            <span className="mr-4">
              <div className="font-bold">Nombre del banco:"BCP"</div>
              <div>Titular: DREWILI</div>
              <div>Cta. corriente: 555-566-555-555</div>
              <div>CCI: 20.000.000</div>
            </span>
            <span className="mr-4">
              <div className="font-bold">
                Nombre del banco:"Dividelo Interbanck"
              </div>
              <div>Titular: DREWILI</div>
              <div>cta. corriente: 555-566-555-555</div>
              <div>CCI: 20.000.000</div>
            </span>
          </div>
          <div className="mt-8">
            <span className="font-bold mt-8">
              RECUERDA ENVIAR EL COMPROBANTE DE PAGO AL SIGUIENTE WHATSAPP
            </span>
            <div className="mt-4 text-5xl ml-5">
              <SiWhatsapp />
            </div>
            <a
              href="https://wa.me/51971985484"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="hover:text-chiliRed ml-5">971 985 484</span>
            </a>
          </div>

          <button
            className="mt-4 bg-chiliRed text-white hover:bg-onyx font-bold py-2 px-4 rounded"
            onClick={handlePdf}
          >
            Ir a pagar
          </button>
        </div>
      )}
      {modalidadPago === "tarjetaCreditoDebito" && (
        <div>
          <button
            className="mt-4 bg-chiliRed text-white hover:bg-onyx font-bold py-2 px-4 rounded"
            onClick={handlePayment}
          >
            Ir a pagar
          </button>
        </div>
      )}
      {modalidadPago === "yape" && (
        <div className="mt-8">
          <span>
            Con esta opción podrás pagar a través de Yape o Plin, registra
            nuestro número de teléfono, usuando el QR, en tus contactos y
            realiza el pago.
          </span>
          <div
            className="
          mt-8 ml-9 text-9xl"
          >
            <BsQrCode />
          </div>
          <div className="mt-8">
            <span className="font-bold mt-8">
              RECUERDA ENVIAR EL COMPROBANTE DE PAGO AL SIGUIENTE WHATSAPP
            </span>
            <div className="mt-4 text-5xl ml-5">
              <SiWhatsapp />
            </div>
            <a
              href="https://wa.me/51971985484"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="hover:text-chiliRed ml-5">971 985 484</span>
            </a>
          </div>

          <button
            className="mt-4 bg-chiliRed text-white hover:bg-onyx font-bold py-2 px-4 rounded"
            onClick={handlePdf}
          >
            Ir a pagar
          </button>
        </div>
      )}
      {modalidadPago === "contraentrega" && (
        <div className="mt-6">
          <span className="font-bold">Anticipo del 30% del pago</span>
          <div>
            Se confirmará el pedido por los medios de contacto suministrado
          </div>
          <span>
            En caso el comprador no conteste, DREWILI no procederá con el envío
            del pedido.
          </span>
          <div className="font-bold">
            Realiza la transferencia del siguiente monto S/{PriceContraentrega}{" "}
            y envia el comprobante para proceder con el envío.
          </div>
          <div className="flex mt-8">
            <span className="mr-4">
              <div className="font-bold">Nombre del banco:"BBVA"</div>
              <div>Titular: DREWILI</div>
              <div>Cta. corriente: 555-566-555-555</div>
              <div>CCI: 20.000.000</div>
            </span>
            <span className="mr-4">
              <div className="font-bold">Nombre del banco:"Diners Club"</div>
              <div>Titular: DREWILI</div>
              <div>Cta. corriente: 555-566-555-555</div>
              <div>CCI: 20.000.000</div>
            </span>
            <span className="mr-4">
              <div className="font-bold">Nombre del banco:"BCP"</div>
              <div>Titular: DREWILI</div>
              <div>Cta. corriente: 555-566-555-555</div>
              <div>CCI: 20.000.000</div>
            </span>
            <span className="mr-4">
              <div className="font-bold">
                Nombre del banco:"Dividelo Interbanck"
              </div>
              <div>Titular: DREWILI</div>
              <div>cta. corriente: 555-566-555-555</div>
              <div>CCI: 20.000.000</div>
            </span>
          </div>
          <div className="mt-8">
            <span className="font-bold mt-8">
              RECUERDA ENVIAR EL COMPROBANTE DE PAGO AL SIGUIENTE WHATSAPP
            </span>
            <div className="mt-4 text-5xl ml-5">
              <SiWhatsapp />
            </div>
            <a
              href="https://wa.me/51971985484"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="hover:text-chiliRed ml-5">971 985 484</span>
            </a>
          </div>

          <button
            className="mt-4 bg-chiliRed text-white hover:bg-onyx font-bold py-2 px-4 rounded"
            onClick={handlePdf}
          >
            Ir a pagar
          </button>
        </div>
      )}

      <NavLink
        to={`/validateaddress`}
        className="text-chiliRed  hover:text-onyx underline ml-4 mt-9"
      >
        Regresar a dirección de entrega
      </NavLink>
    </div>
  );
};

export default SelectPayment;
