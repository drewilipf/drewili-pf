
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductsById } from "../../reduxToolkit/Product/productThunks";

function ProductDetail() {
  const {id} = useParams()
  console.log(id)
  const dispatch = useDispatch()

  const productsId = useSelector((state) => state.productsId); 
  console.log(productsId);
  
  useEffect(() => {
   dispatch(getProductsById(id)); 
  }, [dispatch, id]); 

 
  

  if (!productsId) {
    return <p>Cargando...</p>; 
  }

  return (
    <>
      <h1>{productsId?.name}</h1>
      <img
        src={productsId?.image}
        alt={productsId?.name}
      />
      <div>
        <h2>Descripción:</h2>
        <h3>{productsId?.description}</h3>
      </div>
      <div>
        <h2>Especificaciones:</h2>
        <h3>{productsId?.specifications}</h3>
      </div>
      <div>
        <h2>Marca:</h2>
        <h3>{productsId?.brand}</h3>
      </div>
      <div>
        <h2>Disponibles:</h2>
        <h3>{productsId?.stock}</h3>
      </div>
      <div>
        <h2>Precio:</h2>
        <h3>{productsId?.price}</h3>
      </div>
    </>
  );
}

export default ProductDetail;