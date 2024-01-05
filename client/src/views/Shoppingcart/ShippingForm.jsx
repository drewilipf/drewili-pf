import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { NavLink } from "react-router-dom";
import {
  setShippingInfo,
  setDropshippingInfo,
} from "../../reduxToolkit/ShippingInfo/shippingInfoSlice";

const ShippingForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { login } = useSelector((state) => state.login);
  const { salesCart } = useSelector((state) => state.salesCart);

  const { priceTotal } = useSelector((state) => state.salesCart);

  const userSessionFromCookies = Cookies.get("userSession");
  const userSession = userSessionFromCookies
    ? JSON.parse(userSessionFromCookies)
    : null;

  const nameUser =
    (userSession && userSession.name) || (login && login.userSession.name);
  const userLastname =
    (userSession && userSession.lastname) ||
    (login && login.userSession.lastname);
  const email =
    (userSession && userSession.email) || (login && login.userSession.email);
  const address =
    (userSession && userSession.address) || (login && login.userSession.adress);

  const [editable, setEditable] = useState({
    name: nameUser || "",
    lastname: userLastname || "",
    email: email || "",
    address: address || "",
    phone: "",
    dni: "",
  });
  const [dropshipping, setdropshipping] = useState({
    name: "",
    address: "",
    phone: "",
    dni: "",
  });
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn(!isOn);
  };

  const styles =
    "w-[50%] px-8 py-1.5 text-lg text-eerieBlack leading-tight bg-whiteSmoke border rounded focus:outline-none focus:shadow-outline mt-5 ml-2";

  const handleFieldChange = (event) => {
    const { name, value } = event.target;

    setEditable((prevEditable) => ({
      ...prevEditable,
      [name]: value,
    }));
  };
  function handleChange(event) {
    setdropshipping({
      ...dropshipping,
      [event.target.name]: event.target.value,
    });
  }
  const handleShippingSubmit = () => {
    console.log(editable);
    const shi = dispatch(setShippingInfo(editable));
    console.log(shi);
    dispatch(setDropshippingInfo(dropshipping));
    navigate("/validateaddress");
  };
  return (
    <div className=" pt-5 flex flex-auto overflow-y-hidden">
      <div className=" bg-opacity-10 p-6 text-eerieBlack rounded-lg shadow-md w-full  max-w-screen-md mx-auto flex flex-col mr-[-1rem] h-screen ">
        <h1 className="font-bold text-2xl text-center mt-2 mb-6 ">
          Confirmación de Datos de Envío
        </h1>
        <div className="flex mb-4">
          <span className="mr-2 font-bold">Nombre Completo: </span>
          <span className="mr-2">{nameUser}</span>
          <span>{userLastname}</span>
        </div>
        {!isOn ? (
          <div>
            <div>
              <label className="mr-2 font-bold">Dirección de envío</label>
              <input
                className={styles}
                id="address"
                name="address"
                type="text"
                value={editable.address}
                onChange={handleFieldChange}
                placeholder="Dirección"
              />
            </div>
            <div>
              <label className="mr-2 font-bold">Correo Electrónico</label>
              <input
                className={styles}
                id="email"
                name="email"
                type="email"
                onChange={handleFieldChange}
                value={editable.email}
              />
            </div>
            <div>
              <label className="mr-2 font-bold">Celular</label>
              <input
                className={styles}
                id="phone"
                name="phone"
                value={editable.phone}
                onChange={handleFieldChange}
                type="tel"
                placeholder="Ingresa un número de teléfono"
              />
            </div>
            <div>
              <label className="mr-2 font-bold">Nº de Identificación</label>
              <select
                name="DNI"
                id="DNI"
                className="text-eerieBlack  rounded-lg shadow-md border  focus:outline-none  "
              >
                <option value="DNI">DNI</option>
                <option value="Carnet de extranjería">
                  Carnet de extranjería
                </option>
              </select>
              <input
                className={styles}
                id="dni"
                name="dni"
                type="text"
                value={editable.dni}
                onChange={handleFieldChange}
              />
            </div>
          </div>
        ) : null}
        <h2 className="font-bold mt-6">¿Eres dropshipping?</h2>
        <div className="flex mb-2">
          <h2 className="mr-2">No</h2>
          <div
            className={`relative w-12 h-6 rounded-full p-1 cursor-pointer ${
              isOn ? "bg-chiliRed" : "bg-onyx"
            }`}
            onClick={handleToggle}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full transform transition-transform ${
                isOn ? "translate-x-full" : "translate-x-0"
              }`}
            />
          </div>
          <h2 className="ml-2">Sí</h2>
        </div>
        {isOn ? (
          <div>
            <h2 className="font-bold mt-6 text-xl">Datos del Cliente</h2>
            <div>
              <label className="mr-2 font-bold">Nombre Completo</label>
              <input
                className={styles}
                id="name"
                name="name"
                type="text"
                value={dropshipping.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="mr-2 font-bold">Celular</label>
              <input
                className={styles}
                id="phone"
                name="phone"
                type="tel"
                value={dropshipping.phone}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="mr-2 font-bold">Dirección</label>
              <input
                className={styles}
                id="address"
                name="address"
                type="text"
                value={dropshipping.address}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="mr-2 font-bold">Nº de Identificación</label>
              <select
                name="DNI"
                id="DNI"
                className="text-eerieBlack leading-tight  rounded-lg shadow-md border  focus:outline-none  "
              >
                <option value="DNI">DNI</option>
                <option value="Carnet de extranjería">
                  Carnet de extranjería
                </option>
              </select>
              <input
                className={styles}
                id="dni"
                name="dni"
                type="text"
                value={dropshipping.dni}
                onChange={handleChange}
              />
            </div>
          </div>
        ) : null}

        <button
          className="mt-4 bg-chiliRed text-white hover:bg-onyx font-bold py-2 px-4  w-60 rounded"
          onClick={handleShippingSubmit}
        >
          Ir a datos de entrega
        </button>

        <NavLink
          to={`/shoppingcart`}
          className="text-chiliRed  hover:text-onyx underline ml-4 "
        >
          Regresar al Carrito
        </NavLink>
      </div>
      <div
        className="bg-opacity-10 text-eerieBlack rounded-lg shadow-md w-[30%] max-w-screen-md 
    h-full  mx-auto flex flex-col ml-[1.5rem] p-4"
      >
        <h2 className="font-bold text-xl text-center mt-2 mb-6 ">
          Resumen de compra
        </h2>
        {salesCart?.map((item) => (
          <div
            key={item.salesCartId}
            className="flex items-center justify-between py-2 space-y-2"
          >
            <span className="flex items-center flex-1 text-xs">
              <img
                src={item.image}
                alt={item.name}
                className="mr-2"
                style={{ maxWidth: "50px", maxHeight: "50px" }}
              />
              {item.name}
            </span>
            <span className="w-16 text-right text-xs">{`S/${parseFloat(
              item.price
            ).toFixed(2)}`}</span>
            <span className="w-16 text-right text-xs">
              cant. {item.quantity}
            </span>
          </div>
        ))}
        <div className="mt-4">
          <div className="flex justify-between">
            <span className="font-semibold">Total:</span>
            <span className="text-xl">{`S/${priceTotal.toFixed(2)}`}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingForm;

{
  /* /* <NavLink to={`/shippingform/${userId}`}>
  <button className="mt-4 bg-chiliRed text-white hover:bg-onyx font-bold py-2 px-4 rounded">
    Comprar
  </button>
</NavLink>  */
}
