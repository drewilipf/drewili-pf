import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCategory } from "../../../reduxToolkit/Category/categoryThunks";
import { getBrand } from "../../../reduxToolkit/Brand/brandThunks";

function CreateProduct() {
  const [input, setInput] = useState({
    name: "",
    image: "",
    price: 0.0,
    specifications: [],
    stock: 0,
    category: "",
    brand: "",
  });

  const { categories } = useSelector((state) => state.categories);
  const { brands } = useSelector((state) => state.brands);

  const dispatch = useDispatch();
  const navegate = useNavigate();
  useEffect(() => {
    dispatch(getCategory());
    dispatch(getBrand());
  }, []);
  function handleSelect(event) {
    setInput({
      ...input,
      category: event.target.value,
      brand: event.target.value,
    });
  }
  function handleChange(event) {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  }
  async function handleSumit(event) {
    event.preventDefault();
    try {
      const res = await dispatch(postProduct(productData));
      console.log(res);

      navegate("/dashboard");
    } catch (error) {
      alert("Error creating product. Check if the product is already created");
    }
  }

  return (
    <div className="max-w-md mx-auto mt-40">
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
            <label className="block text-chiliRed mb-2">imagen:</label>
            <input
              type="text"
              name="image"
              placeholder="Ingresa la url de la imagen"
              value={input.image}
              onChange={handleChange}
              className="border rounded p-3 w-full bg-whiteSmoke focus:outline-none"
            />
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
                    {element.brands}
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
                    {element.categories}
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
