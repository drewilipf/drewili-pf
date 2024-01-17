import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { regularValidation, dropshippingValidation } from './validation';
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
  const [errors, setErrors] = useState({
    name: "",
    lastname:"",
    email: "",
    dni: "",
  })
  const [errorsDrop, setErrorsDrop] = useState({
    name: "",
    phone: "",
    dni: "",
  })

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
    "flex flex-auto w-[50%] px-8 py-1.5 text-lg text-eerieBlack leading-tight bg-whiteSmoke border rounded focus:outline-none focus:shadow-outline mt-5 ml-2";

  const handleFieldChange = (event) => {
    const { name, value } = event.target;

    setEditable((prevEditable) => ({
      ...prevEditable,
      [name]: value,
    }));
    const fieldErrors = regularValidation({ [name]: value });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: fieldErrors[name] || "",
    }));
  };
  function handleChange(event) {
    setdropshipping({
      ...dropshipping,
      [event.target.name]: event.target.value,
    });
    if(isOn){
    const fieldErrorsDrop = dropshippingValidation({ [event.target.name]: event.target.value });
    setErrorsDrop((prevErrorsDrop) => ({
      ...prevErrorsDrop,
      [event.target.name]: fieldErrorsDrop[event.target.name] || "",
    }));
  }
  
  }
  const handleShippingSubmit = () => {
    const validationErrors = regularValidation(editable);
    setErrors(validationErrors);
    const validationErrorsDrop = dropshippingValidation(dropshipping);
    setErrorsDrop(validationErrorsDrop);

    
    if (Object.values(validationErrors).every((error) => error === "") && isOn== false) {
      
      dispatch(setShippingInfo(editable));
      dispatch(setDropshippingInfo(dropshipping));
      navigate("/validateaddress");
    } 
    if (Object.values(validationErrorsDrop).every((error) => error === "") && isOn== true) {
      
      dispatch(setShippingInfo(editable));
      dispatch(setDropshippingInfo(dropshipping));
      navigate("/validateaddress");
    }else {
      
    }
  };
  
  
  return (
    <div className="tablet:flex flex-auto">
      <div className=" bg-opacity-10 p-6 text-eerieBlack rounded-lg shadow-md w-full  max-w-screen-md mx-auto flex flex-col tablet:mr-[-1rem] mb-2 bt-2 ">
        <h1 className="font-bold text-2xl text-center mt-2 mb-6 ">
          Confirmación de Datos de Envío
        </h1>
        <div className=" mb-4">
          <label className="mr-2 font-bold">Nombre:</label>
          <input
            className={styles}
            id="name"
            name="name"
            type="text"
            value={editable.name}
            onChange={handleFieldChange}
            placeholder="Nombre"
          />
          <div className="h-4">
            <span className="text-chiliRed text-opacity-60 items-center flex text-sm">
              {errors?.name}
            </span>
          </div>
        </div>
        <div className=" mb-4">
          <label className="mr-2 font-bold">Apellido:</label>
          <input
            className={styles}
            id="lastname"
            name="lastname"
            type="text"
            value={editable.lastname}
            onChange={handleFieldChange}
            placeholder="Apellido"
          />
          <div className="h-4">
            <span className="text-chiliRed text-opacity-60 items-center flex text-sm">
              {errors?.lastname}
            </span>
          </div>
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
            <div className="mt-4">
              <label className="mr-2 font-bold">Correo Electrónico</label>
              <input
                className={styles}
                id="email"
                name="email"
                type="email"
                onChange={handleFieldChange}
                value={editable.email}
                placeholder="Email"
              />
              <div className="h-4">
            <span className="text-chiliRed text-opacity-60 items-center flex text-sm">
              {errors?.email}
            </span>
          </div>
            </div>
            <div className="mt-4">
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
              <div className="h-4">
            <span className="text-chiliRed text-opacity-60 items-center flex text-sm">
              {errors?.phone}
            </span>
          </div>
            </div>
            <div className="mt-4">
              <label className="mr-2 font-bold">Nº de Identificación</label>
              <select
                name="DNI"
                id="DNI"
                className="mt-4 text-eerieBlack  rounded-lg shadow-md border  focus:outline-none  "
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
                placeholder="Nº de identificación"
              />
            </div>
            <div className="h-4">
            <span className="text-chiliRed text-opacity-60 items-center flex text-sm">
              {errors?.dni}
            </span>
          </div>
          </div>
        ) : null}
        <h2 className="font-bold mt-6">¿Eres dropshipping?</h2>
        <div className="flex flex-row mb-2">
          <h2 className="mr-2">No</h2>
          <div
            className={`relative w-11 h-6.5 rounded-full p-0.5 cursor-pointer ${isOn ? "bg-chiliRed" : "bg-onyx"
              }`}
            onClick={handleToggle}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full transform transition-transform ${isOn ? "translate-x-full" : "translate-x-0"
                }`}
            />
          </div>
          <h2 className="ml-2">Sí</h2>
        </div>
        {isOn ? (
          <div>
            <h2 className="font-bold mt-6 text-xl">Datos del Cliente</h2>
            <div className="mt-4">
              <label className="mr-2 font-bold">Nombre Completo</label>
              <input
                className={styles}
                id="name"
                name="name"
                type="text"
                value={dropshipping.name}
                onChange={handleChange}
              />
              <div className="h-4">
            <span className="text-chiliRed text-opacity-60 items-center flex text-sm">
              {errorsDrop?.name}
            </span>
          </div>
            </div>
            <div className="mt-4">
              <label className="mr-2 font-bold">Celular</label>
              <input
                className={styles}
                id="phone"
                name="phone"
                type="tel"
                value={dropshipping.phone}
                onChange={handleChange}
              />
              <div className="h-4">
            <span className="text-chiliRed text-opacity-60 items-center flex text-sm">
              {errorsDrop?.phone}
            </span>
          </div>
            </div>
            <div className="mt-4">
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
            <div className="mt-4">
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
              <div className="h-4">
            <span className="text-chiliRed text-opacity-60 items-center flex text-sm">
              {errorsDrop?.dni}
            </span>
          </div>
            </div>
          </div>
        ) : null}
      </div>
      <div
        className="bg-opacity-10 text-eerieBlack rounded-lg shadow-md tablet:w-[30%] max-w-screen-md 
               h-full  mx-auto flex flex-col tablet:ml-[1.5rem] p-4">
        <h2 className="font-bold text-xl text-center mt-4 mb-6 ">
          Resumen de compra
        </h2>
        {salesCart?.map((item) => (
          <div
            key={item.salesCartId}
            className="flex items-center justify-between py-2 space-y-2"
          >
            <span className="flex items-center flex-1 text-xs">
              <img
                src={item.images}
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
            <span className="text-xl">{priceTotal}</span>
          </div>
        </div>
      <div className="">
        <button
          className="mt-4 bg-chiliRed text-white hover:bg-onyx font-bold py-2 px-4  w-60 rounded"
          onClick={handleShippingSubmit}>
          Ir a datos de entrega
        </button>

        <NavLink
          to={`/shoppingcart`}
          className="text-chiliRed  hover:text-onyx underline ml-4 ">
          Regresar al Carrito
        </NavLink>
      </div>
      </div>
    </div>
  );
};

export default ShippingForm;

