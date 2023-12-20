import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductsById } from "../../reduxToolkit/Product/productThunks";
import CommentInput from "./imputComment";

function ProductDetail() {
  const { id } = useParams();
  console.log(id);
  const dispatch = useDispatch();

  const productsId = useSelector((state) => state.products.productsId);
  console.log("Current productsId:", productsId);

  useEffect(() => {
    const fetchData = async () => {
      console.log("Dispatching getProductsById...");
      await dispatch(getProductsById(id));
    };

    fetchData();
  }, [dispatch, id]);

  if (!productsId) {
    console.log("Rendering loading...");
    return <p>Cargando...</p>;
  }

  const product = productsId[0];

  return (
    <>
      <h1>{product?.name}</h1>
      <img src={product?.image} alt={product?.name} />
      <div>
        <h2>Descripción:</h2>
        <h3>{product?.description}</h3>
      </div>
      <div>
        <h2>Especificaciones:</h2>
        <h3>{product?.specifications}</h3>
      </div>
      <div>
        <h2>Marca:</h2>
        <h3>{product?.brand}</h3>
      </div>
      <div>
        <h2>Disponibles:</h2>
        <h3>{product?.stock}</h3>
      </div>
      <div>
        <h2>Precio:</h2>
        <h3>{product?.price}</h3>
      </div>

      <CommentInput />
    </>
  );
}

export default ProductDetail;
