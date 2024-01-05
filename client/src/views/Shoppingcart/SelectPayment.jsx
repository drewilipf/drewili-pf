import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";
import { SiWhatsapp } from "react-icons/si";
import { BsQrCode } from "react-icons/bs";
import {
  setPedidoOption,
  setComprobanteOption,
  setModalidadPagoSlice,
  setRazonSocialSlice,
  setRucSlice,
} from "../../reduxToolkit/ShippingInfo/shippingInfoSlice";

const SelectPayment = () => {
  const dispatch = useDispatch();
  const [opcionSeleccionadaPedido, setOpcionSeleccionadaPedido] =
    useState("opcion1");
  const [opcionSeleccionadaComprobante, setOpcionSeleccionadaComprobante] =
    useState("opcion1");
  const [razonSocial, setRazonSocial] = useState(" ");
  const [ruc, setRuc] = useState(" ");
  const [modalidadPago, setModalidadPago] = useState("transferenciaBancaria");
  const userSessionFromCookies = Cookies.get("userSession");
  const userSession = userSessionFromCookies
    ? JSON.parse(userSessionFromCookies)
    : null;

  const { login } = useSelector((state) => state.login);
  const { priceTotal } = useSelector((state) => state.salesCart);
  const userId =
    (userSession && userSession.userId) || (login && login.userSession.userId);

  const handlePedidoOptionChange = (opcion) => {
    setOpcionSeleccionadaPedido(opcion);
    dispatch(setPedidoOption(opcion));
  };

  const handleComprobanteOptionChange = (opcion) => {
    setOpcionSeleccionadaComprobante(opcion);
    dispatch(setComprobanteOption(opcion));
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
  const PriceContraentrega = (priceTotal * 30) / 100;
  return (
    <div className="h-screen ml-5">
      <div className="flex items-center">
        <label className="mr-4 ">¿Quién recibirá el pedido?</label>
        <div>
          <input
            type="radio"
            id="pedidoOpcion1"
            name="pedido"
            checked={opcionSeleccionadaPedido === "opcion1"}
            onChange={() => handlePedidoOptionChange("opcion1")}
          />
          <label className="mr-2 ml-2">Yo</label>

          <input
            type="radio"
            id="pedidoOpcion2"
            name="pedido"
            checked={opcionSeleccionadaPedido === "opcion2"}
            onChange={() => handlePedidoOptionChange("opcion2")}
          />
          <label className="mr-2 ml-2">Otra persona</label>
        </div>
      </div>
      <div className="flex items-center">
        <label className="mr-4">¿Qué tipo de comprobante desea?</label>
        <div>
          <input
            type="radio"
            id="comprobanteOpcion1"
            name="comprobante"
            checked={opcionSeleccionadaComprobante === "opcion1"}
            onChange={() => handleComprobanteOptionChange("opcion1")}
          />
          <label className="mr-2 ml-2">Boleta</label>

          <input
            type="radio"
            id="comprobanteOpcion2"
            name="comprobante"
            checked={opcionSeleccionadaComprobante === "opcion2"}
            onChange={() => handleComprobanteOptionChange("opcion2")}
          />
          <label className="mr-2 ml-2">Factura</label>
        </div>
      </div>
      {opcionSeleccionadaComprobante === "opcion2" && (
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
              <div className="font-bold">nombre del banco:"BBVA"</div>
              <div>titular: DREWILI</div>
              <div>cta. corriente: 555-566-555-555</div>
              <div>CCI: 20.000.000</div>
            </span>
            <span className="mr-4">
              <div className="font-bold">nombre del banco:"Diners Club"</div>
              <div>titular: DREWILI</div>
              <div>cta. corriente: 555-566-555-555</div>
              <div>CCI: 20.000.000</div>
            </span>
            <span className="mr-4">
              <div className="font-bold">nombre del banco:"BCP"</div>
              <div>titular: DREWILI</div>
              <div>cta. corriente: 555-566-555-555</div>
              <div>CCI: 20.000.000</div>
            </span>
            <span className="mr-4">
              <div className="font-bold">
                nombre del banco:"Dividelo Interbanck"
              </div>
              <div>titular: DREWILI</div>
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
            <span className="ml-5"> 555-555-5555</span>
          </div>
          <NavLink to={`/payment/payment`}>
            <button className="mt-4 bg-chiliRed text-white hover:bg-onyx font-bold py-2 px-4 rounded">
              Ir a pagar
            </button>
          </NavLink>
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
            realiza el pago
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
            <span className="ml-5"> 555-555-5555</span>
          </div>
          <NavLink to={`/payment/payment`}>
            <button className="mt-4 bg-chiliRed text-white hover:bg-onyx font-bold py-2 px-4 rounded">
              Ir a pagar
            </button>
          </NavLink>
        </div>
      )}
      {modalidadPago === "contraentrega" && (
        <div className="mt-6">
          <span className="font-bold">Anticipo del 30% del pago</span>
          <div>
            se confirmará el pedido por los medios de conctaco suministrado
          </div>
          <span>
            En caso el comprador no conteste, DREWILI no procederá con el envío
            del pedido.
          </span>
          <div className="font-bold">
            Realiza la transferencia del siguiente monto {PriceContraentrega} y
            envia el comprobante para proceder con el envio
          </div>
          <div className="flex mt-8">
            <span className="mr-4">
              <div className="font-bold">nombre del banco:"BBVA"</div>
              <div>titular: DREWILI</div>
              <div>cta. corriente: 555-566-555-555</div>
              <div>CCI: 20.000.000</div>
            </span>
            <span className="mr-4">
              <div className="font-bold">nombre del banco:"Diners Club"</div>
              <div>titular: DREWILI</div>
              <div>cta. corriente: 555-566-555-555</div>
              <div>CCI: 20.000.000</div>
            </span>
            <span className="mr-4">
              <div className="font-bold">nombre del banco:"BCP"</div>
              <div>titular: DREWILI</div>
              <div>cta. corriente: 555-566-555-555</div>
              <div>CCI: 20.000.000</div>
            </span>
            <span className="mr-4">
              <div className="font-bold">
                nombre del banco:"Dividelo Interbanck"
              </div>
              <div>titular: DREWILI</div>
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
            <span className="ml-5"> 555-555-5555</span>
          </div>
          <NavLink to={`/payment/payment`}>
            <button className="mt-4 bg-chiliRed text-white hover:bg-onyx font-bold py-2 px-4 rounded">
              Ir a pagar
            </button>
          </NavLink>
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
