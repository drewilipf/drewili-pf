import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import binIcon from "../../icons/bin.png";
import { NavLink, useParams } from "react-router-dom";

const ShoppingCart = () => {
  const { id } = useParams();
  const [cartItems, setCartItems] = useState([]);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  console.log(cartItems.map((item) => item.id));
  const userSessionFromCookies = Cookies.get("userSession");
  const userSession = userSessionFromCookies
    ? JSON.parse(userSessionFromCookies)
    : null;

  const { login } = useSelector((state) => state.login);

  const userId =
    (userSession && userSession.userId) || (login && login.userSession.userId);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/salesCart/user/${userId}`
        );
        const { products, totalCartPrice } = response.data;
        setCartItems(products);
        setTotalCartPrice(totalCartPrice);
      } catch (error) {
        console.error("Error al obtener productos del carrito:", error);
      }
    };

    fetchCartItems();
  }, [userId]);

  const handleRemoveFromCart = async (salesCartId, price) => {
    try {
      await axios.delete(`http://localhost:3001/salesCart/${salesCartId}`);

      setCartItems((prevCartItems) =>
        prevCartItems.filter((item) => item.salesCartId !== salesCartId)
      );
      setTotalCartPrice((prevTotal) => prevTotal - price);
    } catch (error) {
      console.error("Error al quitar producto del carrito:", error);
    }
  };

  const listItems = cartItems?.map((item) => ({
    idProduct: item.id,
    name: item.name,
    image: item.image,
    price: item.price,
    quantity: 1,
  }));

  const handlePayment = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/payment/create-checkout-session",
        { cartItems: listItems, id: userId, idProduct: cartItems.id }
      );
      const { data } = response;

      window.location.href = data.urlPayment;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-gray-800 text-black p-4 h-90vh">
      <h2 className="text-2xl font-semibold mb-4">Tu Carrito de Compras</h2>
      {cartItems && cartItems.length !== 0 ? (
        <>
          <div className="flex items-center justify-between py-2">
            <span className="flex-1">Nombre del Producto</span>
            <span className="w-16 text-right mr-4">Precio</span>
            <span className="w-16 text-left ml-2">Cantidad</span>
          </div>
          {cartItems.map((item) => (
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
              <span className="w-16 text-right">{`$${parseFloat(
                item.price
              ).toFixed(2)}`}</span>
              <span className="w-16 text-right">{item.quantity}</span>
              <button
                onClick={() =>
                  handleRemoveFromCart(item.salesCartId, item.totalPrice)
                }
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
              <span className="text-2xl">{`$${totalCartPrice.toFixed(
                2
              )}`}</span>
            </div>
            <button
              className="mt-4 bg-chiliRed text-white hover:bg-onyx font-bold py-2 px-4 rounded"
              onClick={handlePayment}
            >
              Finalizar compra
            </button>
          </div>{" "}
        </>
      ) : (
        <h2>Vacío</h2>
      )}
    </div>
  );
};

export default ShoppingCart;
