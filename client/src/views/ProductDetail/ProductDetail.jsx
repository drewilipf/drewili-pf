import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { getProductsById } from "../../reduxToolkit/Product/productThunks";
import { getComments } from "../../reduxToolkit/Comment/commentThunks.js";
import CommentCards from "../../Components/DetailComponents/CommentCards.jsx";
import CommentInput from "../../Components/DetailComponents/CommentInput.jsx";
import { AiOutlineLeft } from "react-icons/ai";

import axios from "axios";
import Cookies from "js-cookie";

import "../../../tailwind.config.js";
import { TiStarFullOutline } from "react-icons/ti";
import { TiStarOutline } from "react-icons/ti";
import { TiStarHalfOutline } from "react-icons/ti";
import Productcard from "../../Components/Productcard/Productcard.jsx";

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [loadingFav, setLoadingFav] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
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

  const productsId = useSelector((state) => state.products.productsId);

  const productAll = useSelector((state) => state.products.products);
  const comments = useSelector((state) => state.comments.comments);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getProductsById(id));
      await dispatch(getComments());
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

      setLoadingFav(true);

      // Imprimir los datos antes de hacer la solicitud
      console.log("Datos enviados en la solicitud de favoritos:", {
        product_id: id,
        user_id: userId,
      });

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
      setLoadingFav(false);
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

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };

  const settings2 = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: null,
    nextArrow: null
  };

  const specificationsFormatted = product?.specifications.split(', ')

  console.log(product);



  return (
    <div className="tablet:w-60vw tablet:mx-auto">
      <NavLink to="/" className="inline-block mr-2 text-onyx hover:text-chiliRed">
        <AiOutlineLeft style={{ fontSize: "1.5rem", strokeWidth: 3 }} />
      </NavLink>
      <article className="tablet:flex p-2">
        <div className="bg-white shadow-xl tablet:ml-5 p-4 tablet:w-40vw tablet:h-40vh py-20">
          <Slider {...settings2}>
            {
              product.imageArray?.map((img) => (
                <img src={img} className="w-40vw h-72 object-contain mx-auto" />
              ))
            }
          </Slider>
          {/* <img
            src={product?.image}
            alt={product?.name}
            className="tablet:h-40vh tablet:w-40vw object-contain mx-auto"
          /> */}
        </div>

        <div className="bg-whiteSmoke tablet:ml-8 p-8 flex flex-col">
          <h1 className="text-xl font-bold text-center">{product?.name}</h1>
          <h2>S/ {product?.price}</h2>
          <span>

            <h2 className="text-xl text-chiliRed block">Disponibles:</h2>
            <p>{product?.stock}</p>
          </span>
          <div className="m-8 flex items-center justify-between">
            {product?.stock === 0 ? (
              <button
                className="bg-onyx text-whiteSmoke font-semibold p-2 m-2 rounded-full hover:shadow-xl"
                disabled
              >
                {loading
                  ? "Agregando al carrito..."
                  : addedToCart
                    ? "Agregado con éxito!"
                    : "Agregar al carrito"}
              </button>
            ) : (
              <button
                onClick={handleAddToCart}
                className="bg-chiliRed text-whiteSmoke font-semibold p-2 m-2 rounded-full hover:shadow-xl"
                disabled={loading || addedToCart}
              >
                {loading
                  ? "Agregando al carrito..."
                  : addedToCart
                    ? "Agregado con éxito!"
                    : "Agregar al carrito"}
              </button>
            )}

            <button
              onClick={handleAddToFavorite}
              className="bg-chiliRed text-whiteSmoke font-semibold p-2 m-2 rounded-full hover:shadow-xl"
              disabled={loadingFav || addedToFavorites}
            >
              {loadingFav
                ? "Agregando a favoritos..."
                : addedToFavorites
                  ? "Agregado a favoritos"
                  : "Agregar a favoritos"}
            </button>
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl text-center text-eerieBlack  font-bold mb-2">
              Calificación general del producto
            </h1>
            <span className="flex mx-auto text-chiliRed text-2xl">
              <TiStarFullOutline />
              <TiStarFullOutline />
              <TiStarFullOutline />
              <TiStarHalfOutline />
              <TiStarOutline />
            </span>
          </div>
        </div>
      </article>

      <h2 className="text-xl text-center mb-2 font-bold mt-10">
        Productos relacionados
      </h2>
      <article className=" rounded tablet:w-60vw bg-chiliRed">
        <Slider {...settings}>
          {limitedRecommendedProducts?.map((recommendedProduct, index) =>(
            <div key={index}>
              <NavLink to={`/detail/${recommendedProduct.id}`}>
                <div className="mx-2 my-2 flex flex-col items-center p-2 shadow-md rounded tablet:h-40 tablet:w-72 bg-whiteSmoke hover:shadow-xl">
                  <img src={recommendedProduct.images?.[0]} alt={recommendedProduct.name} className="max-w-24 h-24 object-contain" />
                  <h2>
                    {recommendedProduct.name}
                  </h2>
                </div>
              </NavLink>
            </div>
          ))}
        </Slider>
      </article>
      <article className="tablet:flex my-10">
        <div className="flex flex-col tablet:w-[50%] p-2">
          <h2 className="text-xl text-chiliRed">Descripción:</h2>
          <p>{product?.description}</p>

          <h2 className="text-xl text-chiliRed">Especificaciones:</h2>
          {specificationsFormatted.map((spec, index) => {
            const [key, value] = spec.split(': ');
            return (
              <span key={index} className="flex flex-col">
                <h4>
                  - <strong>{key}:</strong> {value}
                </h4>
              </span>
            );
          })}
        </div>
        <div className="tablet:w-[50%] p-2">
          <h2 className="text-xl text-chiliRed">Marca:</h2>
          <p>{product?.brand}</p>

          <h2 className="text-xl text-chiliRed">Precio:</h2>
          <p>{product?.price}</p>
        </div>
      </article>
      <article className="pb-10 pl-2">
        <h2 className="text-left text-chiliRed text-xl">Comentarios:</h2>
        <CommentCards comments={comments} detailId={id} />
      </article>
    </div>
  );
}

export default ProductDetail;
