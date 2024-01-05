import { NavLink } from "react-router-dom";
import React from "react";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";

//iconos
import addToCartIcon from "../../icons/add-to-cart.png"
import addedToCartIcon from "../../icons/added-to-cart.png"
import emptyHeartIcon from "../../icons/emptyHeart.png"
import filledHeartIcon from "../../icons/filledHeart.png"


function Productcard({
  id,
  name,
  description,
  price,
  specifications,
  stock,
  category,
  color,
  image,
  brand,
}) {

  const [addedToCart, setAddedToCart] = useState(false);
  const [loading, setLoading] = useState(false);

  const [loadingFavorites, setLoadingFavorites] = useState(false);
  const [addedToFavorites, setAddedToFavorites] = useState(false);

  const userSessionFromCookies = Cookies.get("userSession");
  const userSession = userSessionFromCookies
    ? JSON.parse(userSessionFromCookies)
    : null;

  const { login } = useSelector((state) => state.login);

  const userId =
    (userSession && userSession.userId) || (login && login.userSession.userId);

  const handleAddToCart = async () => {
    try {
      setLoading(true);

      // Realiza la solicitud para agregar al carrito
      const response = await axios.post(
        "https://drewili-pf-back.onrender.com/salesCart/addToSalesCart",
        {
          productId: id,
          userId,
          quantity: 1,
        }
      );

      console.log("Respuesta del servidor:", response.data);

      setAddedToCart(true);
    } catch (error) {
      console.error("Error en la solicitud:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToFavorites = async () => {
    try {
      setLoadingFavorites(true);

      const response = await axios.post(
        "https://drewili-pf-back.onrender.com/favorites",
        {
          product_id: id,
          user_id: userId
        }
      );

      console.log("Respuesta del servidor (favoritos):", response.data);

      setAddedToFavorites(true);
    } catch (error) {
      console.error("Error en la solicitud de favoritos:", error);
    } finally {
      setLoadingFavorites(false);
    }
  };


  return (
<div className="m-4 p-4 rounded shadow-lg hover:shadow-xl h-auto w-80 bg-white flex flex-col items-center justify-evenly">
  <NavLink to={`/detail/${id}`} className="flex flex-col items-center justify-center">
    <img
      src={image}
      alt={name}
      className="w-full h-52 object-contain object-center rounded-t"
    />
    <div className="mt-4 text-center">
      <h2 className="text-lg font-semibold">{name}</h2>
      <div className="flex justify-between items-center mt-2 flex-col">
        <h3 className="text-gray-600 font-bold">S/ {price}</h3>
        <h3 className="text-gray-600">{color}</h3>
      </div>
    </div>
  </NavLink>
  
  <div className="flex gap-4 mt-4">
    {
      stock === 0 ?   <button className="bg-onyx text-whiteSmoke font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline" disabled>
      <img
        src={addedToCart ? addedToCartIcon : addToCartIcon}
        alt={addedToCart ? "Agregado al carrito" : "Agregar al carrito"}
        className="w-6 h-6"
      />
    </button>
    :

  <button
          onClick={handleAddToCart}
          className={`transition duration-300 ${
            addedToCart ? "bg-whiteSmoke" : "bg-chiliRed"
          } hover:bg-onyx text-whiteSmoke font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline`}
          disabled={loading || addedToCart}
        >
          <img
            src={addedToCart ? addedToCartIcon : addToCartIcon}
            alt={addedToCart ? "Agregado al carrito" : "Agregar al carrito"}
            className="w-6 h-6"
          />
        </button>
    }

        <button
          onClick={handleAddToFavorites}
          className={`transition duration-300 ${
            addedToFavorites ? "bg-whiteSmoke" : "bg-chiliRed"
          } hover:bg-onyx text-whiteSmoke font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline`}
          disabled={loadingFavorites || addedToFavorites}
        >
          <img
            src={addedToFavorites ? filledHeartIcon : emptyHeartIcon}
            alt={addedToFavorites ? "Agregado a favoritos" : "Agregar a favoritos"}
            className="w-6 h-6"
          />
        </button>
  </div>
</div>
  );
}
export default Productcard;
