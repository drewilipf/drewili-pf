import React, { useState, useEffect } from "react";
import NavbarAdmin from "../NavbarAdmin/NavbarAdmin";
import { useDispatch, useSelector } from "react-redux";
import {
  deletedProduct,
  getAllProducts,
} from "../../../reduxToolkit/Product/productThunks";
import { IoMdCreate } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import Searchbar from "../../Searchbar/Searchbar";

function ProductList() {
  const { products } = useSelector((state) => state.products);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllProducts());
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
    <div className="ml-[20%]">
      <NavbarAdmin />
      <div className="container mx-auto mt-0 ml-[10%]">
        <Searchbar />
      </div>
      <div className="container mx-auto mt-6">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Productos Registrados
        </h1>

        {showSuccessMessage && (
          <div className="bg-onyx text-white p-2 mb-4 text-center">
            Producto eliminado exitosamente
          </div>
        )}
        <div className=" w-90vw overflow-x-auto ml-[8%]">
          <table className="min-w-full bg-whiteSmoke border border-onyx">
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
                    <td className="py-2 px-4 border-b">
                      {product.description}
                    </td>
                    <td className="py-2 px-4 border-b">{product.price}</td>
                    <td className="py-2 px-4 border-b">
                      {product.specifications}
                    </td>
                    <td className="py-2 px-4 border-b">{product.stock}</td>
                    <td className="py-2 px-4 border-b">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="max-w-[50px] max-h-[50px] mx-auto"
                      />
                    </td>
                    <td className="py-2 px-4 border-b">{product.color}</td>
                    <td className="py-2 px-4 border-b">{product.brand}</td>
                    <td className="py-2 px-4 border-b">{product.category}</td>
                    <td className="py-2 px-4 border-b">
                      {product.deleted ? "Inactivo" : "Activo"}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      <NavLink to={`/dashboard/editProduct/${product.id}`}>
                        <IoMdCreate />
                      </NavLink>
                    </td>
                    <td className="py-2 px-4 border-b text-center cursor-pointer">
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
    </div>
  );
}

export default ProductList;
