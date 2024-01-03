import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {NavLink} from "react-router-dom"
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import binIcon from "../../icons/bin.png"

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalCartPrice, setTotalCartPrice] = useState(0);

  const userSessionFromCookies = Cookies.get("userSession");
  const userSession = userSessionFromCookies
    ? JSON.parse(userSessionFromCookies)
    : null;

  const { login } = useSelector((state) => state.login);

  const userId = (userSession && userSession.userId) || (login && login.userSession.userId);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/salesCart/user/${userId}`);
        const { products, totalCartPrice } = response.data;
        setCartItems(products);
        setTotalCartPrice(totalCartPrice);
      } catch (error) {
        console.error('Error al obtener productos del carrito:', error);
      }
    };

    fetchCartItems();
  }, [userId]);

  const handleRemoveFromCart = async (salesCartId, price) => {
    try {
      await axios.delete(`http://localhost:3001/salesCart/${salesCartId}`);

      setCartItems((prevCartItems) => prevCartItems.filter((item) => item.salesCartId !== salesCartId));
      setTotalCartPrice((prevTotal) => prevTotal - price);
    } catch (error) {
      console.error('Error al quitar producto del carrito:', error);
    }
  };

  const listItems = cartItems?.map((item) => ({
    idProduct: item.id,
    name: item.name,
    image: item.image,
    price: item.price,
    quantity: item.quantity,
  }));

  const idProduct = cartItems?.map((item)=>item.id)
  console.log(idProduct);
  const handlePayment = async () => {
    try {
      const response = await axios.post('http://localhost:3001/payment/create-checkout-session', { cartItems: listItems, id: userId});
      const { data } = response;

      window.location.href = data.urlPayment;
    }
    catch (error) {
      console.error(error);
    }
  }

  const handleQuantity = async (salesCartId, newQuantity) => {
    try {
      const response = await axios.put(`http://localhost:3001/salescart/update`, { id: salesCartId, quantity: newQuantity });
      console.log('esta es la respuesta de la cantidad', response);
  
      if (response.status === 200) {
        const updatedItem = response.data;
        setCartItems((prevCartItems) =>
          prevCartItems.map((item) =>
            item.salesCartId === updatedItem.id ? { ...item, quantity: updatedItem.quantity } : item
          )
        );
  
        // Recalcular el precio total después de actualizar la cantidad
        setTotalCartPrice((prevTotal) => {
          const updatedTotal = cartItems.reduce((total, item) => {
            if (item.salesCartId === updatedItem.id) {
              return total + (updatedItem.quantity * item.price); // Usar la nueva cantidad
            } else {
              return total + (item.quantity * item.price);
            }
          }, 0);
          return updatedTotal;
        });
      }
    } catch (error) {
      console.error('Error al actualizar la cantidad del producto:', error);
    }
  };

  return (
    <div className="bg-gray-800 text-black p-4 h-90vh">
      <h2 className="text-2xl font-semibold mb-4">Tu Carrito de Compras</h2>
<<<<<<< HEAD
      <div className="flex items-center justify-between py-2">
        <span className="flex-1">Nombre del Producto</span>
        <span className="w-16 text-right mr-4">Precio</span>
        <span className="w-16 text-left ml-2">Cantidad</span>
      </div>
      {cartItems.map((item) => (
        <div key={item.salesCartId} className="flex items-center justify-between py-2 space-y-2">
          <NavLink to={`/detail/${item.productId}`} className="flex items-center flex-1">
            <img src={item.image} alt={item.name} className="mr-2" style={{ maxWidth: '50px', maxHeight: '50px' }} />
            {item.name}
          </NavLink>
          <span className="w-16 text-right">{`$${parseFloat(item.price).toFixed(2)}`}</span>
          <span className="w-16 text-right">{item.quantity}</span>
          <button onClick={() => handleRemoveFromCart(item.salesCartId, item.totalPrice)} className="ml-2">
            <img src={binIcon} alt="quitar" style={{ maxWidth: '20px', maxHeight: '20px' }} />
          </button>
        </div>
      ))}
      <div className="mt-4">
        <div className="flex justify-between">
          <span className="font-semibold">Total:</span>
          <span className="text-2xl">{`$${totalCartPrice.toFixed(2)}`}</span>
        </div>
        <button className="mt-4 bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded">
          Pagar
        </button>
      </div>
=======
      {
        cartItems && cartItems.length !== 0 ?
          <>
            <div className="flex items-center justify-between py-2">
              <span className="flex-1">Nombre del Producto</span>
              <span className="w-16 text-right mr-4">Precio</span>
              <span className="w-16 text-left ml-2">Cantidad</span>
            </div>

            {cartItems?.map((item) => (
              <div key={item.salesCartId} className="flex items-center justify-between py-2 space-y-2">
                <span className="flex items-center flex-1">
                  <img src={item.image} alt={item.name} className="mr-2" style={{ maxWidth: '50px', maxHeight: '50px' }} />
                  {item.name}
                </span>
                <span className="w-16 text-right">{`$${parseFloat(item.price).toFixed(2)}`}</span>
                <span className="w-16 text-right">{item.quantity}</span>
                <button onClick={() => handleQuantity(item.salesCartId, item.quantity + 1)}>+</button>
                <button onClick={() => handleQuantity(item.salesCartId, item.quantity - 1)}>-</button>
                <button onClick={() => handleRemoveFromCart(item.salesCartId, item.totalPrice)} className="ml-2">
                  <img src={binIcon} alt="quitar" style={{ maxWidth: '20px', maxHeight: '20px' }} />
                </button>
              </div>
            ))}
            <div className="mt-4">
              <div className="flex justify-between">
                <span className="font-semibold">Total:</span>
                <span className="text-2xl">{`$${totalCartPrice.toFixed(2)}`}</span>
              </div>
              <button className="mt-4 bg-chiliRed text-white hover:bg-onyx font-bold py-2 px-4 rounded" onClick={handlePayment}>
                Finalizar compra
              </button>
            </div> </>
          : <h2>Vacío</h2>

      }

>>>>>>> 29e3b6b597aebc12b5ab2b316f43c02fd5e60d50
    </div>
  );
};

export default ShoppingCart;
