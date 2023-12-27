import React, { useState, useEffect } from "react";
import NavbarAdmin from "../NavbarAdmin/NavbarAdmin";
import { useDispatch, useSelector } from "react-redux";
import {
  deletedProduct,
  getProducts,
} from "../../../reduxToolkit/Product/productThunks";
import { IoMdCreate } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";

function ProductList() {
  const { products } = useSelector((state) => state.products);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch, showSuccessMessage]);

  const onClick = async (id) => {
    const deleted = window.confirm("¿Estás seguro de desactivar el producto?");

    if (deleted) {
      try {
        await dispatch(deletedProduct(id));
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000); // Ocultar el mensaje después de 3 segundos
      } catch (error) {
        console.error("Error al eliminar el producto", error);
      }
    }
  };

  return (
    <div>
      <NavbarAdmin />
      <div className="container mx-auto mt-2 ml-[20%]">
        <h1 className="ml-[30%] text-2xl font-bold mb-4">
          Productos Registrados
        </h1>

        {showSuccessMessage && (
          <div className="bg-green-200 text-green-800 p-2 mb-4">
            Producto eliminado exitosamente
          </div>
        )}

        <table className="min-w-[75%] bg-whiteSmoke border border-onyx">
          <thead>
            <tr>
              <th className="py-1 px-1 border-b">Nombre</th>
              <th className="py-1 px-1 border-b">Descripción</th>
              <th className="py-1 px-1 border-b">Precio</th>
              <th className="py-1 px-1 border-b">Especificaciones</th>
              <th className="py-1 px-1 border-b">Stock</th>
              <th className="py-1 px-1 border-b">Imagen</th>
              <th className="py-1 px-1 border-b">Color</th>
              <th className="py-1 px-1 border-b">Marca</th>
              <th className="py-1 px-1 border-b">Categoria</th>
              <th className="py-1 px-1 border-b">Estado</th>
              <th className="py-1 px-1 border-b">Editar</th>
              <th className="py-1 px-1 border-b">Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((product) => (
                <tr key={product.id}>
                  <td className="py-2 px-4 border-b">{product.name}</td>
                  <td className="py-2 px-4 border-b">{product.description}</td>
                  <td className="py-2 px-4 border-b">{product.price}</td>
                  <td className="py-2 px-4 border-b">
                    {product.specification}
                  </td>
                  <td className="py-2 px-4 border-b">{product.stock}</td>
                  <td className="py-2 px-4 border-b">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-w-[50px] max-h-[50px]"
                    />
                  </td>
                  <td className="py-2 px-4 border-b">{product.color}</td>
                  <td className="py-2 px-4 border-b">{product.brand}</td>
                  <td className="py-2 px-4 border-b">{product.category}</td>
                  <td className="py-2 px-4 border-b">
                    {product.deleted ? "Desactivo" : "Activo"}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <NavLink to={`/dashboard/editProduct/${product.id}`}>
                      <IoMdCreate />
                    </NavLink>
                  </td>
                  <td className="py-2 px-4 border-b cursor-pointer">
                    <div onClick={() => onClick(product.id)}>
                      <MdDelete />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductList;
