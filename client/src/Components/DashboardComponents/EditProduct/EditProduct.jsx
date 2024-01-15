import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductsById,
  putProduct,
} from "../../../reduxToolkit/Product/productThunks";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NavbarAdmin from "../NavbarAdmin/NavbarAdmin";
import { getCategory } from "../../../reduxToolkit/Category/categoryThunks";
import { getBrand } from "../../../reduxToolkit/Brand/brandThunks";
import { getColor } from "../../../reduxToolkit/Color/colorThunks";
import Spinner from "../../../icons/Spinner";
import Swal from "sweetalert2";

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const styles2 = "text-eerieBlack text-lg";
  const styles =
    "w-full px-8 py-1.5 text-lg text-eerieBlack leading-tight bg-whiteSmoke border rounded focus:outline-none focus:shadow-outline";
  const { categories } = useSelector((state) => state.categories);
  const { brands } = useSelector((state) => state.brands);
  const { color } = useSelector((state) => state.color);

  const [input, setInput] = useState({
    name: "",
    description: "",
    price: 0.0,
    specifications: [],
    stock: 0,
    imageArray: "",
    color_id: 0,
    category_id: 0,
    brand_id: 0,
    deleted: false,
  });

  const [imageFile, setImageFile] = useState([]);
  const productsId = useSelector((state) => state.products.productsId);
  const product = productsId.length > 0 ? productsId[0] : null;

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getProductsById(id));
      await dispatch(getCategory());
      await dispatch(getBrand());
      await dispatch(getColor());
    };

    fetchData();
  }, [id, dispatch]);

  useEffect(() => {
    if (product) {
      setInput({
        name: product.name,
        description: product.description,
        price: parseFloat(product.price),
        specifications: product.specifications,
        stock: parseInt(product.stock),
        imageArray: product.imageArray[0],
        color_id: color.find((c) => c.color === product.color)?.id || 0,
        category_id: categories.find((cat) => cat.category === product.category)?.id || 0,
        brand_id: brands.find((b) => b.brand === product.brand)?.id || 0,
        deleted: product.deleted || false,
      });
    }
  }, [product, color, categories, brands]);

  const handleColorSelect = (event) => {
    setInput({
      ...input,
      color_id: event.target.value,
    });
  };

  const handleBrandSelect = (event) => {
    setInput({
      ...input,
      brand_id: event.target.value,
    });
  };

  const handleCategorySelect = (event) => {
    setInput({
      ...input,
      category_id: event.target.value,
    });
  };

  const handleChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };

  const handleImageChange = (event) => {
    const file = event.target.files;
    setImageFile((prev) => [...prev, ...file]);
  };

  const handleSumit = async (event) => {
    event.preventDefault();
    try {
      let arrayUrls = [];
      if (imageFile.length > 0) {
        await Promise.all(
          imageFile.map(async (img) => {
            const formData = new FormData();
            formData.append("file", img);
            formData.append("upload_preset", "wagnbv9p");

            const response = await fetch(
              "https://api.cloudinary.com/v1_1/dpj4n40t6/image/upload",
              {
                method: "POST",
                body: formData,
              }
            );

            const data = await response.json();
            const imageUrl = data.secure_url;
            arrayUrls.push(imageUrl);
          })
        );
      }

      const productData = {
        name: input.name,
        description: input.description,
        price: parseFloat(input.price),
        specifications: input.specifications,
        stock: parseInt(input.stock),
        imageArray: arrayUrls.length > 0 ? arrayUrls : product.imageArray,
        color_id: parseInt(input.color_id),
        category_id: parseInt(input.category_id),
        brand_id: parseInt(input.brand_id),
        deleted: input.deleted,
      };

      await dispatch(putProduct(id, productData));

       Swal.fire({
        title: '¡Éxito!',
        text: 'Producto actualizado exitosamente.',
        icon: 'success',
        confirmButtonText: 'Continuar',        
        confirmButtonColor: '#e62f05', 
       });
        

      setInput({
        name: product.name,
        description: product.description,
        price: parseFloat(product.price),
        specifications: product.specifications,
        stock: parseInt(product.stock),
        imageArray: product.imageArray,
        color_id: parseInt(input.color_id),
        category_id: parseInt(input.category_id),
        brand_id: parseInt(input.brand_id),
        deleted: input.deleted,
      });

      navigate("/dashboard/productList");
    } catch (error) {
      alert("Error actualizando el producto");
    }
  };

  if (!product || !color || !brands || !categories) {
    return (<div className="mx-auto flex justify-center items-center w-screen h-screen">
      <Spinner />

    </div>
    )
  }


  return (
    <div className="max-w-md mx-auto mt-30 mr-50">
      <NavbarAdmin />
      <h1 className="text-2xl font-bold mb-4 flex items-center justify-center">
        Crear Producto
      </h1>
      <form
        className="border border-chiliRed rounded p- text-arial text-base flex-col flex items-center justify-center "
        onSubmit={handleSumit}
      >
        <div>
          <div>
            <label className="block text-chiliRed mb-2">
              Nombre del producto:
            </label>
            <input
              type="text"
              name="name"
              placeholder="Ingrese su nombre"
              value={input.name}
              onChange={handleChange}
              className="border rounded p-3 w-full bg-whiteSmoke focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-chiliRed mb-2">Descripción:</label>
            <input
              type="text"
              name="description"
              placeholder="Ingrese la descripción"
              value={input.description}
              onChange={handleChange}
              className="border rounded p-3 w-full bg-whiteSmoke focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-chiliRed mb-2">Precio:</label>
            <input
              type="number"
              name="price"
              placeholder="Ingrese el precio"
              value={input.price}
              onChange={handleChange}
              className="border rounded p-3 w-full bg-whiteSmoke focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-chiliRed mb-2">
              Especificaciones:
            </label>
            <input
              type="text"
              name="specifications"
              placeholder="Ingrese cada especificación"
              value={input.specifications}
              onChange={handleChange}
              className="border rounded p-3 w-full bg-whiteSmoke focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-chiliRed mb-2">Stock:</label>
            <input
              type="number"
              name="stock"
              placeholder="Ingrese la cantidad de productos"
              value={input.stock}
              onChange={handleChange}
              className="border rounded p-3 w-full bg-whiteSmoke focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-chiliRed mb-2">Imagen:</label>
            <input
              type="file"
              accept="image/*"
              name="imageFile"
              multiple
              onChange={handleImageChange}
              className="border rounded p-3 w-full bg-whiteSmoke focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-chiliRed mb-2">
              Cantidad de imágenes seleccionadas:
            </label>
            <p>{imageFile?.length}</p>
          </div>
          <div>
            <label className="block text-chiliRed mb-2">Color:</label>
            <select
              name="color"
              placeholder="Selecciona el color"
              onChange={handleColorSelect}
              className="border rounded p-3 w-full bg-whiteSmoke focus:outline-none"
            >
              <option value={input.color_id} key="empty">
                Selecciona un color
              </option>
              {color?.map((element) => {
                return (
                  <option value={element.id} key={element.id}>
                    {element.color}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label className="block text-chiliRed mb-2">Marca:</label>
            <select
              name="brand"
              placeholder="Selecciona la marca"
              onChange={handleBrandSelect}
              className="border rounded p-3 w-full bg-whiteSmoke focus:outline-none"
            >
              <option value={input.brand_id} key="empty">
                Selecciona una marca
              </option>
              {brands?.map((element) => {
                return (
                  <option value={element.id} key={element.id}>
                    {element.brand}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label className="block text-chiliRed mb-2">Categoria:</label>
            <select
              name="category"
              placeholder="Selecciona la categoria"
              onChange={handleCategorySelect}
              className="border rounded p-3 w-full bg-whiteSmoke focus:outline-none"
            >
              <option value={input.category_id} key="empty">
                Selecciona una categoria
              </option>
              {categories?.map((element) => {
                return (
                  <option value={element.id} key={element.id}>
                    {element.category}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="mb-4">
            <label className={styles2}>Estado</label>
            <select
              className={styles}
              id="deleted"
              name="deleted"
              value={input.deleted}
              onChange={handleChange}
            >
              <option value="true">Inactivo</option>
              <option value="false">Activo</option>
            </select>
          </div>
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="bg-chiliRed text-whiteSmoke py-3 px-6 rounded-full w-full"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
