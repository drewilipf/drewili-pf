import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { getProductsById } from "../../reduxToolkit/Product/productThunks";
import CommentCards from "../../Components/DetailComponents/CommentCards.jsx";
import CommentInput from "../../Components/DetailComponents/CommentInput.jsx";
import { AiOutlineLeft } from "react-icons/ai";

import axios from "axios";
import Cookies from "js-cookie";

import "../../../tailwind.config.js";
import { TiStarFullOutline } from "react-icons/ti";
import { TiStarOutline } from "react-icons/ti";
import { TiStarHalfOutline } from "react-icons/ti";

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [addedToFavorites, setAddedToFavorites] = useState(false);

  const userSessionFromCookies = Cookies.get("userSession");
  const userSession = userSessionFromCookies
    ? JSON.parse(userSessionFromCookies)
    : null;

  const { login } = useSelector((state) => state.login);

  const userId =
    (userSession && userSession.userId) || (login && login.userSession.userId);

  const productsId = useSelector((state) => state.products.productsId);

  const productAll = useSelector((state) => state.products.products);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getProductsById(id));
    };

    fetchData();
  }, [dispatch, id]);

  if (!productsId) {
    return <p>Cargando...</p>;
  }

  const product = productsId[0];

  // Este useEffect resetea setAddedToCart para que el boton vuelva a ser utilizable al navegar por la barra de productos recomendados:
  useEffect(() => {
    return () => {
      setAddedToCart(false);
    };
  }, [id]);

  const handleAddToCart = async () => {
    try {
      if (!userId) {
        // Si userId es null, muestra un mensaje de alerta
        const choice = window.confirm(
          "Para agregar productos al carrito, por favor inicia sesión o regístrate. ¿Quieres iniciar sesión?"
        );

        if (choice) {
          window.location.href = "/userlogin";
          return;
        } else {
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
        "http://localhost:3001/salesCart/addToSalesCart",
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

  const handleAddToFavorite = async () => {
    try {
      if (!userId) {
        const choice = window.confirm(
          "Para agregar productos a favoritos, por favor inicia sesión o regístrate. ¿Quieres iniciar sesión?"
        );
  
        if (choice) {
          window.location.href = "/userlogin";
          return;
        } else {
          return;
        }
      }
  
      setLoading(true);
  
      // Imprimir los datos antes de hacer la solicitud
      console.log("Datos enviados en la solicitud de favoritos:", {
        product_id: id,
        user_id: userId,
      });
  
      const response = await axios.post(
        "http://localhost:3001/favorites",
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
      setLoading(false);
    }
  };
  
  
  if (!product) {
    return <p>Cargando...</p>;
  }
  const productCategory = product.category;

  const recommendedProducts = productAll.filter(
    (p) => p.category === productCategory && p.id !== product.id
  );
  const limitedRecommendedProducts = recommendedProducts.slice(0, 5);
  if (!product || !productCategory) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="container mx-auto grid grid-cols-2 gap-3 max-h-[300px]">
      <NavLink
        to="/"
        className="inline-block mr-2 text-onyx hover:text-chiliRed"
      >
        <AiOutlineLeft style={{ fontSize: "1.5rem", strokeWidth: 3 }} />
      </NavLink>
      <div />

      <img
        src={product?.image}
        alt={product?.name}
        className="col-span-1 w-100 h-100"
      />
      <div className="col-span-1 grid grid-cols-2 gap-4 font-arial">
        <h1 className="text-3xl font-bold ">{product?.name}</h1>
        <div />
        <div className="col-span-1 ">
          <h2 className="text-xl text-chiliRed">Descripción:</h2>
          <p>{product?.description}</p>
        </div>
        <div>
          <h2 className="text-xl text-chiliRed">Especificaciones:</h2>
          <p>{product?.specifications}</p>
        </div>
        <div>
          <h2 className="text-xl text-chiliRed">Marca:</h2>
          <p>{product?.brand}</p>
        </div>
        <div>
          <h2 className="text-xl text-chiliRed">Disponibles:</h2>
          <p>{product?.stock}</p>
        </div>
        <div>
          <h2 className="text-xl text-chiliRed">Precio:</h2>
          <p>{product?.price}</p>
        </div>

        <button
          onClick={handleAddToCart}
          className="bg-chiliRed text-whiteSmoke font-semibold rounded-full py-2 px-2 w-3/4 h-3/4 hover:shadow-xl"
          disabled={loading || addedToCart}
        >
          {loading ? "Agregando al carrito..." : "Agregar al carrito"}
          {loading
            ? "Agregando al carrito..."
            : addedToCart
            ? "Agregado con éxito!"
            : "Agregar al carrito"}
        </button>
        
        <button
        onClick={handleAddToFavorite}
        className="bg-chiliRed text-whiteSmoke font-semibold rounded-full py-2 px-2 w-3/4 h-3/4 hover:shadow-xl"
        disabled={loading || addedToFavorites}
      >
        {loading ? "Agregando a favoritos..." : addedToFavorites ? "Agregado a favoritos" : "Agregar a favoritos"}
      </button>


        <div className="col-span-2 mt-4 mx-auto">
          <h1 className="text-xl text-center text-eerieBlack  font-bold mb-2">
            Calificación general del producto
          </h1>
          <div className="text-chiliRed flex text-2xl">
            <TiStarFullOutline />
            <TiStarFullOutline />
            <TiStarFullOutline />
            <TiStarHalfOutline />
            <TiStarOutline />
          </div>
        </div>
      </div>
      <div className="col-span-2 mt-4 mx-auto">
        <h2 className="text-xl text-center text-chiliRed mb-2 font-bold">
          Productos Recomendados
        </h2>
        <div className="flex  gap-4 ">
          {limitedRecommendedProducts.map((recommendedProduct) => (
            <div key={recommendedProduct.id} className="ml-10">
              <NavLink
                to={`/detail/${recommendedProduct.id}`}
                className="text-onyx hover:text-chiliRed block"
              >
                <img
                  src={recommendedProduct.image}
                  alt={recommendedProduct.name}
                  className="w-32 h-32 mb-2"
                />
                {recommendedProduct.name}
              </NavLink>
            </div>
          ))}
        </div>
      </div>
      <div>
        <CommentCards />
        <CommentInput />
      </div>
    </div>
  );
}

export default ProductDetail;
