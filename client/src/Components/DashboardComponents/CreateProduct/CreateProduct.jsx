import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getCategory,
  postCategory,
} from "../../../reduxToolkit/Category/categoryThunks";
import { getBrand, postBrand } from "../../../reduxToolkit/Brand/brandThunks";
import { getColor, postColor } from "../../../reduxToolkit/Color/colorThunks";
import { postProducts } from "../../../reduxToolkit/Product/productThunks";
import NavbarAdmin from "../NavbarAdmin/NavbarAdmin";
import Swal from "sweetalert2";

function CreateProduct() {
  const [input, setInput] = useState({
    name: "",
    description: "",
    price: 0.0,
    discount: 0,
    specifications: [],
    stock: 0,
    image: "",
    color_id: 0,
    category_id: 0,
    brand_id: 0,
    deleted: false,
    relevance: 0,
  });
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const [showNewColorInput, setShowNewColorInput] = useState(false);
  const [showNewBrandInput, setShowNewBrandInput] = useState(false);
  const [newCategoryInput, setNewCategoryInput] = useState("");
  const [newColorInput, setNewColorInput] = useState("");
  const [newBrandInput, setNewBrandInput] = useState("");
  const { categories } = useSelector((state) => state.categories);
  const { brands } = useSelector((state) => state.brands);
  const { color } = useSelector((state) => state.color);
  const [imageFile, setImageFile] = useState([]);
 
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    const file = event.target.files;
    setImageFile((prev) => [...prev, ...file]);
  }

  function handleNewCategoryClick() {
    setShowNewCategoryInput((prev) => !prev);
  }

  function handleNewColorClick() {
    setShowNewColorInput(!showNewColorInput);
  }

  function handleNewBrandClick() {
    setShowNewBrandInput((prev) => !prev);
  }

  async function handleSumit(event) {
    event.preventDefault();
  
    
    const inputFields = ["name", "description", "price", "stock", "specifications", "category", "brand", "color"];
    
  
    const invalidFields = inputFields.filter((field) => {
      if (field === "image" && (!imageFile || imageFile.length === 0)) {
        return true;
      }
      return !input[field];
    });
  
    if (invalidFields.length > 0) {
      await Swal.fire({
        title: "Error",
        text: `Por favor, complete todos los campos obligatorios: ${invalidFields.join(", ")}.`,
        icon: "error",
        confirmButtonColor: "#e62f05",
      });
      return;
    }
  
    try {
      let arrayUrls = [];
  
      if (imageFile) {
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

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const productData = {
        name: input.name,
        description: input.description,
        price: parseFloat(input.price),
        discount: parseFloat(input.discount) || 0,
        specifications: input.specifications,
        stock: parseInt(input.stock),
        image: arrayUrls,
        color_id: parseInt(input.color),
        category_id: parseInt(input.category) || 0,
        brand_id: parseInt(input.brand),
        deleted: false,
        relevance: 0,
      };
  
      await dispatch(postProducts(productData));
  
      await Swal.fire({
        title: "Producto creado con éxito",
        text: "¡El producto se ha creado exitosamente!",
        icon: "success",
        confirmButtonColor: "#E62F05",
      });
  
      setInput({
        name: "",
        description: "",
        price: 0.0,
        discount: 0.0,
        specifications: [],
        stock: 0,
        image: "",
        color_id: 0,
        category_id: 0,
        brand_id: 0,
        deleted: false,
        relevance: 0,
      });
  
      navigate("/dashboard");
    } catch (error) {
      console.error("Error during product creation:", error);
  
      await Swal.fire({
        title: "Error",
        text: "Hubo un error al crear el producto",
        icon: "error",
        confirmButtonColor: "#e62f05",
      });
    }
  }

  const addColor = async (e) => {
    e.preventDefault();
    if (newColorInput) {
      const uppercaseColor = newColorInput.toUpperCase();
      await dispatch(postColor({ color: uppercaseColor }));
    }
    setShowNewColorInput(!showNewColorInput);
    setNewColorInput("");
  };

  const addBrand = async (e) => {
    e.preventDefault();
    if (newBrandInput) {
      const uppercaseBrand = newBrandInput.toUpperCase();
      await dispatch(postBrand({ brand: uppercaseBrand }));
    }
    setShowNewBrandInput(!showNewBrandInput);
    setNewBrandInput("");
  };
  const addCategory = async (e) => {
    e.preventDefault();
    if (newCategoryInput) {
      const uppercaseCategory = newCategoryInput.toUpperCase();
      await dispatch(postCategory({ category: uppercaseCategory }));
    }
    setShowNewCategoryInput(!showNewCategoryInput);
    setNewCategoryInput("");
  };

  return (
    <div className="max-w-md mx-auto pb-10 mt-[-3rem]">
      <NavbarAdmin />
      <h1 className="text-2xl font-bold mb-8 flex items-center justify-center">
        Crear Producto
      </h1>
      <form className="border border-chiliRed rounded p- text-arial text-base flex-col flex items-center  justify-center ">
        <div>
          <div>
            <label className="block text-chiliRed mb-2">
              Nombre del producto: <span classname ="text-red">*</span>
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
            <label className="block text-chiliRed mb-2">Descripción:<span classname ="text-red">*</span> </label>
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
            <label className="block text-chiliRed mb-2">Precio: <span classname ="text-red">*</span></label>
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
            <label className="block text-chiliRed mb-2">Descuento: <span classname ="text-red">*</span></label>
            <div className="flex items-center mt-2 mb-2">
              <input
                type="number"
                name="discount"
                placeholder="Ingrese el descuento"
                value={input.discount}
                onChange={handleChange}
                className="border rounded p-3 w-full bg-whiteSmoke focus:outline-none"
                min="0"
                max="100"
              />
              <span className="ml-2">%</span>
            </div>
          </div>
          <div>
            <label className="block text-chiliRed mb-2">
              Especificaciones: <span classname ="text-red">*</span>
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
            <label className="block text-chiliRed mb-2">Stock: <span classname ="text-red">*</span></label>
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
            <label className="block text-chiliRed mb-2">Imagen: <span classname ="text-red">*</span></label>
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
            <label className="block text-chiliRed mb-2">Color: <span classname ="text-red">*</span></label>
            <div className="flex items-center mb-2">
              <select
                name="color"
                placeholder="Selecciona el color"
                onChange={(event) => handleSelect(event)}
                className="border rounded p-3 w-full bg-whiteSmoke focus:outline-none"
              >
                <option value="color">Seleccione color</option>
                {color?.map((element) => (
                  <option value={element.id} key={element.id}>
                    {element.color}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={handleNewColorClick}
                className="bg-chiliRed text-whiteSmoke py-2 px-4 rounded-full ml-2 hover:scale-105 hover:shadow-xl transition duration-100 ease-in-out"
              >
                {showNewColorInput ? "-" : "+"}
              </button>
            </div>
            {showNewColorInput && (
              <div>
                <input
                  type="text"
                  name="newColorInput"
                  placeholder="Ingrese nuevo Color"
                  value={newColorInput}
                  onChange={(e) => setNewColorInput(e.target.value)}
                  className="border rounded p-2 bg-whiteSmoke focus:outline-none"
                />
                <button
                  onClick={addColor}
                  className="bg-chiliRed text-whiteSmoke p-1 m-2 rounded hover:scale-105 hover:shadow-xl transition duration-100 ease-in-out"
                >
                  Agregar
                </button>
              </div>
            )}
          </div>
          <div>
            <label className="block text-chiliRed mb-2">Marca: <span classname ="text-red">*</span></label>
            <div className="flex items-center mb-2">
              <select
                name="brand"
                placeholder="Selecciona la marca"
                onChange={(event) => handleSelect(event)}
                className="border rounded p-3 w-full bg-whiteSmoke focus:outline-none"
              >
                <option value="brand">Seleccione marca</option>
                {brands &&
                  brands.map((element) => (
                    <option value={element.id} key={element.id}>
                      {element.brand}
                    </option>
                  ))}
              </select>
              <button
                type="button"
                onClick={handleNewBrandClick}
                className="bg-chiliRed text-whiteSmoke py-2 px-4 rounded-full ml-2 hover:scale-105 hover:shadow-xl transition duration-100 ease-in-out"
              >
                {showNewBrandInput ? "-" : "+"}
              </button>
            </div>
            {showNewBrandInput && (
              <div>
                <input
                  type="text"
                  name="newBrandInput"
                  placeholder="Ingrese nueva Marca"
                  value={newBrandInput}
                  onChange={(e) => setNewBrandInput(e.target.value)}
                  className="border rounded p-2 bg-whiteSmoke focus:outline-none"
                />
                <button
                  onClick={addBrand}
                  className="bg-chiliRed text-whiteSmoke p-1 m-2 rounded hover:scale-105 hover:shadow-xl transition duration-100 ease-in-out"
                >
                  Agregar
                </button>
              </div>
            )}
          </div>
          <div>
            <label className="block text-chiliRed mb-2">Categoria: <span classname ="text-red">*</span></label>
            <div className="flex items-center mb-2">
              <select
                name="category"
                placeholder="Selecciona la categoria"
                onChange={(event) => handleSelect(event)}
                className="border rounded p-3 w-full bg-whiteSmoke focus:outline-none"
              >
                <option value="category">Seleccione una categoria</option>
                {categories?.map((element) => (
                  <option value={element.id} key={element.id}>
                    {element.category}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={handleNewCategoryClick}
                className="bg-chiliRed text-whiteSmoke py-2 px-4 rounded-full ml-2 hover:scale-105 hover:shadow-xl transition duration-100 ease-in-out"
              >
                {showNewCategoryInput ? "-" : "+"}
              </button>
            </div>
            {showNewCategoryInput && (
              <div>
                <input
                  type="text"
                  name="newCategoryInput"
                  placeholder="Ingrese nueva categoría"
                  value={newCategoryInput}
                  onChange={(e) => setNewCategoryInput(e.target.value)}
                  className="border rounded p-2 bg-whiteSmoke focus:outline-none"
                />
                <button
                  onClick={addCategory}
                  className="bg-chiliRed text-whiteSmoke p-1 m-2 rounded hover:scale-105 hover:shadow-xl transition duration-100 ease-in-out"
                >
                  Agregar
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="mt-4 mb-4">
          <button
            type="submit"
            className="bg-chiliRed text-whiteSmoke py-3 px-6 rounded-full w-full"
            onClick={handleSumit}
          >
            Guardar Producto
          </button>
        </div>
      </form>
    </div>
  );
}
export default CreateProduct;