import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCategory } from "../../../reduxToolkit/Category/categoryThunks";
import { getBrand } from "../../../reduxToolkit/Brand/brandThunks";
import { getColor } from "../../../reduxToolkit/Color/colorThunks";
import { postProducts } from "../../../reduxToolkit/Product/productThunks";
import NavbarAdmin from "../NavbarAdmin/NavbarAdmin";

function CreateProduct() {
  const [input, setInput] = useState({
    name: "",
    description: "",
    price: 0.0,
    specifications: [],
    stock: 0,
    image: "",
    color_id: 0,
    category_id: 0,
    brand_id: 0,
    deleted: false,
  });

  const { categories } = useSelector((state) => state.categories);
  const { brands } = useSelector((state) => state.brands);
  const { color } = useSelector((state) => state.color);
  const [imageFile, setImageFile] = useState(null);

  const dispatch = useDispatch();
  const navegate = useNavigate();
  useEffect(() => {
    dispatch(getCategory());
    dispatch(getBrand());
    dispatch(getColor());
  }, []);
  function handleSelect(event) {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  }
  function handleChange(event) {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  }
  function handleImageChange(event) {
    const file = event.target.files[0];
    setImageFile(file);
  }
  async function handleSumit(event) {
    event.preventDefault();
    try {
      let imageUrl = "";

      // Subir la imagen a Cloudinary si hay un archivo seleccionado
      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append("upload_preset", "wagnbv9p");

        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dpj4n40t6/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();
        imageUrl = data.secure_url;
      }

      const productData = {
        name: input.name,
        description: input.description,
        price: parseFloat(input.price),
        specifications: input.specifications,
        stock: parseInt(input.stock),
        image: imageUrl,
        color_id: parseInt(input.color),
        category_id: parseInt(input.category),
        brand_id: parseInt(input.brand),
      };

      await dispatch(postProducts(productData));

      alert("producto creado con éxito");

      setInput({
        name: "",
        description: "",
        price: 0.0,
        specifications: [],
        stock: 0,
        image: "",
        color_id: 0,
        category_id: 0,
        brand_id: 0,
        deleted: false,
      });

      navegate("/dashboard");
    } catch (error) {
      alert("Error creating product");
    }
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
              onChange={handleImageChange}
              className="border rounded p-3 w-full bg-whiteSmoke focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-chiliRed mb-2">Color:</label>
            <select
              name="color"
              placeholder="Selecciona el color"
              onChange={(event) => handleSelect(event)}
              required
              className="border rounded p-3 w-full bg-whiteSmoke focus:outline-none"
            >
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
              onChange={(event) => handleSelect(event)}
              required
              className="border rounded p-3 w-full bg-whiteSmoke focus:outline-none"
            >
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
              onChange={(event) => handleSelect(event)}
              required
              className="border rounded p-3 w-full bg-whiteSmoke focus:outline-none"
            >
              {categories?.map((element) => {
                return (
                  <option value={element.id} key={element.id}>
                    {element.category}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="bg-chiliRed text-whiteSmoke py-3 px-6 rounded-full w-full"
          >
            Guardar Producto
          </button>
        </div>
      </form>
    </div>
  );
}
export default CreateProduct;
