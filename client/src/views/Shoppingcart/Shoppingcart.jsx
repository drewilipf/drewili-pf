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

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const { salesCart } = useSelector((state) => state.salesCart);
  const { priceTotal } = useSelector((state) => state.salesCart);
  console.log(salesCart, "este el sales cart de shoping cart");
  const userSessionFromCookies = Cookies.get("userSession");
  const userSession = userSessionFromCookies
    ? JSON.parse(userSessionFromCookies)
    : null;

  const { login } = useSelector((state) => state.login);

  const userId =
    (userSession && userSession.userId) || (login && login.userSession.userId);

  useEffect(() => {
    dispatch(getSalesCart(userId));
  }, [userId]);

  const handleRemoveFromCart = async (salesCartId, userId) => {
    dispatch(deleteSalesCart(salesCartId, userId));
  };

  //copiar desde aca

  // const listItems = salesCart?.map((item) => ({
  //   idProduct: item.id,
  //   name: item.name,
  //   image: item.image,
  //   price: item.price,
  //   quantity: item.quantity,
  // }));

  // const handlePayment = async () => {
  //   try {
  //     const response = await axios.post(
  //       "https://drewili-pf-back.onrender.com/payment/create-checkout-session",
  //       { cartItems: listItems, id: userId }
  //     );
  //     const { data } = response;

  //     window.location.href = data.urlPayment;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // // Hasta aca
  const handleQuantity = async (salesCartId, newQuantity, userId) => {
    const updatedQuantity = Math.max(1, newQuantity);
    dispatch(updateSalesCart(salesCartId, updatedQuantity, userId));
  };

  return (
    <div className="bg-gray-800 text-black p-4 h-90vh">
      <h2 className="text-2xl font-semibold mb-4">Tu Carrito de Compras</h2>
      {salesCart && salesCart.length !== 0 ? (
        <>
          <div className="flex items-center justify-between py-2">
            <span className="flex-1">Nombre del Producto</span>
            <span className="w-16 text-right mr-4">Precio</span>
            <span className="w-16 text-left ml-2">Cantidad</span>
          </div>
          {salesCart?.map((item) => (
            <div
              key={item.salesCartId}
              className="flex items-center justify-between py-2 space-y-2"
            >
              <span className="flex items-center flex-1">
                <img
                  src={item.image}
                  alt={item.name}
                  className="mr-2"
                  style={{ maxWidth: "50px", maxHeight: "50px" }}
                />
                {item.name}
              </span>
              <span className="w-16 text-right">{`S/${parseFloat(
                item.price
              ).toFixed(2)}`}</span>
              <span className="w-16 text-right">{item.quantity}</span>
              <button
                onClick={() =>
                  handleQuantity(item.salesCartId, item.quantity + 1, userId)
                }
              >
                +
              </button>
              <button
                onClick={() =>
                  handleQuantity(item.salesCartId, item.quantity - 1, userId)
                }
              >
                -
              </button>
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
              <span className="text-2xl">{`$${priceTotal.toFixed(2)}`}</span>
            </div>
            {/* <button
              className="mt-4 bg-chiliRed text-white hover:bg-onyx font-bold py-2 px-4 rounded"
              onClick={handlePayment}
            >
              Continuar compra
            </button> */}
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
