import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { NavLink } from "react-router-dom";
import binIcon from "../../icons/bin.png";
import {
  deleteSalesCart,
  getSalesCart,
  updateSalesCart,
} from "../../reduxToolkit/SalesCarts/salesCartThunk";
import {
  IoIosAddCircleOutline,
  IoIosRemoveCircleOutline,
} from "react-icons/io";

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const { salesCart } = useSelector((state) => state.salesCart);
  const { priceTotal } = useSelector((state) => state.salesCart);
  console.log(salesCart, "este el sales cart de shoping cart");
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

  const userId =
    (userSession && userSession.userId) ||
    (login && login.userSession.userId) ||
    (usersGoogle && usersGoogle.id) ||
    (userGoogleSession && userGoogleSession.id);
  useEffect(() => {
    dispatch(getSalesCart(userId));
  }, [userId]);

  const handleRemoveFromCart = async (salesCartId, userId) => {
    dispatch(deleteSalesCart(salesCartId, userId));
  };

  const handleQuantity = async (salesCartId, newQuantity, userId) => {
    const updatedQuantity = Math.max(1, newQuantity);
    dispatch(updateSalesCart(salesCartId, updatedQuantity, userId));
  };

  return (
    <div className=" mt-2 mb-2 shadow-md  w-60vw mx-auto  text-black p-4 ">
      <h2 className="text-2xl font-semibold mb-4">Tu Carrito de Compras</h2>
      {salesCart && salesCart.length !== 0 ? (
        <>
          <div className="flex items-center justify-between py-2">
            <span className="flex-1">Nombre del Producto</span>
            <span className="w-16 text-right mr-10">Precio</span>
            <span className="w-16 text-left mr-16">Cantidad</span>
          </div>
          {salesCart?.map((item) => (
            <div
              key={item.salesCartId}
              className="flex items-center justify-between py-2 space-y-2"
            >
              <span className="flex items-center flex-1">
                <img
                  src={item.images}
                  alt={item.name}
                  className="mr-2"
                  style={{ maxWidth: "50px", maxHeight: "50px" }}
                />
                {item.name}
              </span>
              <span className="w-16 text-right">{`S/${parseFloat(
                item.price
              ).toFixed(2)}`}</span>
              <button
                className="ml-4 text-xl"
                onClick={() =>
                  handleQuantity(item.salesCartId, item.quantity - 1, userId)
                }
              >
                <IoIosRemoveCircleOutline />
              </button>
              <span className="w-16 text-center">{item.quantity}</span>
              {
                item.stock <= item.quantity ?
                  <button
                    className="mr-4 text-xl relative group"
                    disabled
                  >
                    <IoIosAddCircleOutline />
                    <h5 className="hidden group-hover:block  absolute top-0 left-0 bg-chiliRed text-white p-2 rounded-md z-10">
                      No hay mas stock
                    </h5>
                  </button>
                  :
                  <button
                    className="mr-4 text-xl"
                    onClick={() =>
                      handleQuantity(item.salesCartId, item.quantity + 1, userId)
                    }
                  >
                    <IoIosAddCircleOutline />
                  </button>
              }
              <button
                onClick={() => handleRemoveFromCart(item.salesCartId, userId)}
                className="ml-2"
              >
                <img
                  src={binIcon}
                  alt="quitar"
                  style={{ maxWidth: "20px", maxHeight: "20px" }}
                />
              </button>
            </div>
          ))}
          <div className="mt-4">
            <div className="flex justify-between">
              <span className="font-semibold">Total:</span>
              <span className="text-2xl">S/ {priceTotal}</span>
            </div>

            <NavLink to={`/shippingform`}>
              <button className="mt-4 bg-chiliRed text-white hover:bg-onyx font-bold py-2 px-4 rounded">
                Continuar compra
              </button>
            </NavLink>
          </div>
        </>
      ) : (
        <h2>Vacío</h2>
      )}
    </div>
  );
};

export default ShoppingCart;
