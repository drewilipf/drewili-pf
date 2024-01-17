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

  const MAX_NAME_LENGTH = 20;

  const TruncateText = (text, maxLength) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  return (
    <div className=" mt-2 mb-2 shadow-md  tablet:w-60vw mx-auto  text-black tablet:p-4 sm:p-2 ">
      <h2 className="text-2xl font-semibold mb-4">Tu Carrito de Compras</h2>
      <h2 className="sm:text-right sm:text-xl"><span className="font-bold">Total: </span>S/{priceTotal}</h2>
      {salesCart && salesCart.length !== 0 ? (
        <>
          <table className="w-full ">
            <thead className="bg-whiteSmoke">
              <tr>
                <th className="sm:p-2 tablet:w-28">Imagen</th>
                <th className="sm:p-2 tablet:w-52">Nombre</th>
                <th className="sm:p-2 tablet:w-52">Cantidad</th>
                <th className="sm:p-2 tablet:w-52">Precio</th>
                <th className="sm:p-2 tablet:w-8"></th>
              </tr>
            </thead>
            <tbody>
              {salesCart.map((item, index) => (
                <tr key={index} className="hover:bg-white">
                  <NavLink to={`/detail/${item.id}`}>
                    <td className="sm:p-2 sm:flex items-center justify-center">
                      <img className="w-[60px] h-[60px] object-contain" src={item.images} alt="" />
                    </td>
                  </NavLink>
                  <td className="sm:p-2 text-center">{TruncateText(item.name, MAX_NAME_LENGTH)}</td>
                  <td className="sm:p-2 text-center">
                    <button
                      className="sm:p-2 hover:scale-110"
                      onClick={() =>
                        handleQuantity(item.salesCartId, item.quantity - 1, userId)
                      }
                    >
                      <IoIosRemoveCircleOutline />
                    </button>
                    {item.quantity}
                    {item.stock <= item.quantity ? (
                      <button className="sm:mr-4 text-xl relative group" disabled>
                        <IoIosAddCircleOutline />
                        <h5 className="hidden group-hover:block  absolute top-0 left-0 bg-chiliRed text-white p-2 rounded-md z-10">
                          No hay mas stock
                        </h5>
                      </button>
                    ) : (
                      <button
                        className="sm:p-2 hover:scale-110"
                        onClick={() =>
                          handleQuantity(item.salesCartId, item.quantity + 1, userId)
                        }
                      >
                        <IoIosAddCircleOutline />
                      </button>
                    )}
                  </td>
                  <td className="sm:p-2 text-center">S/ {item.quantity === 1 ? item.price : parseFloat(item.totalPrice).toFixed(2)}</td>
                  <td className="sm:p-2 text-center">
                    <button
                      onClick={() => handleRemoveFromCart(item.salesCartId, userId)}
                      className=""
                    >
                      <img
                        src={binIcon}
                        alt="quitar"
                        style={{ maxWidth: "20px", maxHeight: "20px" }}
                      />
                    </button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <NavLink to={`/shippingform`}>
            <button className="mt-4 bg-chiliRed text-white hover:bg-onyx font-bold py-2 px-4 rounded">
              Continuar compra
            </button>
          </NavLink>
        </>
      ) : (
        <h2>Vacío</h2>
      )}
    </div>
  );
};

export default ShoppingCart;
