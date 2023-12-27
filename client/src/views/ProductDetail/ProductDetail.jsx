import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { getProductsById } from "../../reduxToolkit/Product/productThunks";
import CommentCards from "../../Components/DetailComponents/CommentCards.jsx";
import CommentInput from "../../Components/DetailComponents/CommentInput.jsx";
import { AiOutlineLeft } from "react-icons/ai";
import axios from "axios";
import Cookies from "js-cookie";

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // Leer userId desde la cookie
  const userSessionFromCookie = Cookies.get("userSession");
  const userId = userSessionFromCookie ? JSON.parse(userSessionFromCookie).userId : null;

  const productsId = useSelector((state) => state.products.productsId);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getProductsById(id));
    };

    fetchData();
  }, [dispatch, id]);

  if (!productsId) {
    console.log("Rendering loading...");
    return <p>Cargando...</p>;
  }

  const product = productsId[0];

  const handleAddToCart = async () => {
    try {
      setLoading(true);

      console.log("datos enviados al servidor:", {
        productId: id,
        userId,
        quantity: 1,
      });

      const response = await axios.post("http://localhost:3001/salesCart/addToSalesCart", {
        productId: id,
        userId,
        quantity: 1,
      });

      console.log("Respuesta del servidor:", response.data);
    } catch (error) {
      console.error("Error en la solicitud:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto grid grid-cols-2 gap-3 max-h-[300px]">
      <NavLink to="/" className="inline-block mr-2 text-onyx hover:text-chiliRed">
        <AiOutlineLeft style={{ fontSize: "1.5rem", strokeWidth: 3 }} />
      </NavLink>

      <div />
      <img src={product?.image} alt={product?.name} className="col-span-1 w-150 h-150" />

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
          disabled={loading}
        >
          {loading ? "Agregando al carrito..." : "Agregar al carrito"}
        </button>
      </div>
      <div>
        <CommentCards />
        <CommentInput />
      </div>
      <h1>Calificación general del producto</h1>
    </div>
  );
}

export default ProductDetail;
