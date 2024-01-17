import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import binIcon from "../../icons/bin.png";
import { NavLink } from "react-router-dom";

const Favorites = () => {
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  
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
    const fetchFavoriteProducts = async () => {
      try {
        const response = await axios.get(
          `https://drewili-pf-back.onrender.com/favorites/user`,
          { params: { userId } }
        );
        setFavoriteProducts(response.data.favorites);
      } catch (error) {
        console.error("Error al obtener productos favoritos:", error);
      }
    };

    fetchFavoriteProducts();
  }, [userId]);

  const handleRemoveFromFavorites = async (favorited) => {
    try {
      await axios.delete(
        `https://drewili-pf-back.onrender.com/favorites/${favorited}`
      );

      setFavoriteProducts((prevFavoriteProducts) =>
        prevFavoriteProducts.filter((item) => item.favorited !== favorited)
      );
    } catch (error) {
      console.error("Error al quitar producto de favoritos:", error);
    }
  };

  const MAX_NAME_LENGTH = 25;

  const TruncateText = (text, maxLength) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  return (
    <div className="text-black p-2 sm:p-8 rounded-lg shadow-sm md:w-40vw mx-auto shadow-onyx mt-2 mb-2">
      <h2 className="text-3xl font-semibold mb-6">Tus Productos Favoritos</h2>
      {favoriteProducts?.map((item) => (
        <div
          key={item.favorited}
          className="flex items-center justify-between py-3 border-b border-chiliRed"
        >
          <NavLink
            to={`/detail/${item.id}`}
            className="flex items-center space-x-4"
          >
            <img
              src={item.image}
              alt={item.name}
              className="sm:w-36 sm:h-36 w-24 h-24 rounded-md object-contain"
            />
            <span className="text-lg">{TruncateText(item.name, MAX_NAME_LENGTH)}</span>
          </NavLink>

          <button
            onClick={() => handleRemoveFromFavorites(item.favorited)}
            className="hover:text-chiliRed transition duration-300"
          >
            <img src={binIcon} alt="quitar" className="md:w-6 md:h-6 h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Favorites;
