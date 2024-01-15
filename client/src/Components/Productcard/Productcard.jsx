import { NavLink } from "react-router-dom";
import React from "react";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";

//iconos
import addToCartIcon from "../../icons/add-to-cart.png";
import addedToCartIcon from "../../icons/added-to-cart.png";
import emptyHeartIcon from "../../icons/emptyHeart.png";
import filledHeartIcon from "../../icons/filledHeart.png";
import Slider from "react-slick";

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
  images
}) {
  const [addedToCart, setAddedToCart] = useState(false);
  const [loading, setLoading] = useState(false);

  const [loadingFavorites, setLoadingFavorites] = useState(false);
  const [addedToFavorites, setAddedToFavorites] = useState(false);

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

    const handleAddToCart = async () => {
      try {
          if (!userId) {
              // Si userId es null, muestra un mensaje de alerta y redirige si el usuario elige iniciar sesión
              const choice = await Swal.fire({
                  title: 'Error',
                  text: 'Para agregar productos al carrito, por favor inicia sesión o regístrate. ¿Quieres iniciar sesión?',
                  icon: 'error',
                  showCancelButton: true,
                  confirmButtonText: 'Continuar',
                  cancelButtonText: 'Cancelar',
                  confirmButtonColor: '#e62f05', // Color del botón de confirmación
                  cancelButtonColor: '#404145' // Color del botón de cancelar
              });
  
              if (choice.isConfirmed) {
                  window.location.href = "/userlogin";
                  return;
              } else {
                  // Puedes agregar más lógica aquí si es necesario
                  return;
              }
          }
  
          setLoading(true);
  
          console.log("datos enviados al servidor:", {
              productId: id,
              userId,
              quantity: 1,
          });
  
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

        if (!userId) {
            // Si userId es null, muestra un mensaje de alerta y redirige si el usuario elige iniciar sesión
            const choice = await Swal.fire({
                title: 'Error',
                text: 'Para continuar, por favor inicia sesión o regístrate. ¿Quieres iniciar sesión?',
                icon: 'error',
                showCancelButton: true,
                confirmButtonText: 'Continuar',
                cancelButtonText: 'Cancelar',
                confirmButtonColor: '#e62f05', // Color del botón de confirmación
                cancelButtonColor: '#404145'  // Color del botón de cancelar
            });

            if (choice.isConfirmed) {
                // Redirige directamente si el usuario confirma la alerta
                window.location.href = "/userlogin";
                return;
            } else {
                // Puedes agregar más lógica aquí si es necesario
                return;
            }
        }

        const response = await axios.post(
            "https://drewili-pf-back.onrender.com/favorites",
            {
                product_id: id,
                user_id: userId,
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

  const MAX_NAME_LENGTH = 25;

  const TruncateText = ({ text, maxLength }) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  return (
    <div className="m-4 p-4 rounded shadow-lg hover:shadow-xl h-auto w-80 bg-white flex flex-col items-center justify-evenly">
      <NavLink
        to={`/detail/${id}`}
        className="flex flex-col items-center justify-center"
      >
        <div className="tablet:w-48">
           
                <img src={images?.[0]} className="w-full h-52 object-contain object-center rounded-t">
                </img>
          
        </div>
        <div className="mt-4 text-center">
          <h2 className="text-lg font-semibold">{TruncateText({text: name.toUpperCase(), maxLength: MAX_NAME_LENGTH})}</h2>
          <div className="flex justify-between items-center mt-2 flex-col">
            <h3 className="text-gray-600 font-bold">S/ {price}</h3>
            <h3 className="text-gray-600">{color}</h3>
          </div>
        </div>
      </NavLink>

      <div className="flex gap-4 mt-4">
        {stock === 0 ? (
          <button
            className="bg-onyx text-whiteSmoke font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
            disabled
          >
            <img
              src={addedToCart ? addedToCartIcon : addToCartIcon}
              alt={addedToCart ? "Agregado al carrito" : "Agregar al carrito"}
              className="w-6 h-6"
            />
          </button>
        ) : (
          <button
            onClick={handleAddToCart}
            className={`transition duration-300 ${addedToCart ? "bg-whiteSmoke" : "bg-chiliRed"
              } hover:bg-onyx text-whiteSmoke font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline`}
            disabled={loading || addedToCart}
          >
            <img
              src={addedToCart ? addedToCartIcon : addToCartIcon}
              alt={addedToCart ? "Agregado al carrito" : "Agregar al carrito"}
              className="w-6 h-6"
            />
          </button>
        )}

        <button
          onClick={handleAddToFavorites}
          className={`transition duration-300 ${addedToFavorites ? "bg-whiteSmoke" : "bg-chiliRed"
            } hover:bg-onyx text-whiteSmoke font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline`}
          disabled={loadingFavorites || addedToFavorites}
        >
          <img
            src={addedToFavorites ? filledHeartIcon : emptyHeartIcon}
            alt={
              addedToFavorites ? "Agregado a favoritos" : "Agregar a favoritos"
            }
            className="w-6 h-6"
          />
        </button>
      </div>
    </div>
  );
}
export default Productcard;
