import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterPrice } from "../../reduxToolkit/Filtros/filterPriceThunks.js";
import { getBrand } from "../../reduxToolkit/Brand/brandThunks.js";
import { filterBrand } from "../../reduxToolkit/Filtros/filterBrandThunks.js";
import { filterColor } from "../../reduxToolkit/Filtros/filterColorThunks.js";
import { getCategory } from "../../reduxToolkit/Category/categoryThunks.js";

const AllFilter = ({ setActualPage }) => {
  const dispatch = useDispatch();
  const [minPrice, setMinPrice] = useState("0");
  const [maxPrice, setMaxPrice] = useState("600");
  const [priceRanges, setPriceRanges] = useState([
    { label: "Up to $100", value: "0-100" },
    { label: "$100 - $200", value: "100-200" },
    { label: "$200 - $300", value: "200-300" },
    { label: "$300 - $400", value: "300-400" },
    { label: "$400 - $500", value: "400-500" },
    { label: "Over $500", value: "500-600" },
  ]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const brandList = useSelector((state) => state.brands.brands);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const colors = useSelector((state) => state.color.color);
  const category = useSelector((state) => state.categories);
  const products = useSelector((state) => state.products);
  const status = useSelector((state) => state.filterPrice.status);
  const error = useSelector((state) => state.filterPrice.error);

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
  };
  const handleFilterPrice = () => {
    setFilterButtonClicked(true);
  };

  const handleFilterCategory = (e) => {
    setSelectedCategory(e.target.value);

    const handleFilterClick = () => {
      console.log("Clic en el botón de filtrado");
      try {
        if (!selectedBrand) {
          return;
        }

        setActualPage(1);
        dispatch(filterBrand(selectedBrand));
        dispatch(filterColor(selectedColor));
        dispatch(filterCategory(category));
      } catch (error) {
        console.error("Error filtering by brand:", error.message);
      }
    };
    const [filterButtonClicked, setFilterButtonClicked] = useState(false);
    const handleClearFilter = () => {
      setMinPrice("0");
      setMaxPrice("600");
      setFilterButtonClicked(true);
    };
    useEffect(() => {
      if (filterButtonClicked) {
        dispatch(filterPrice({ minPrice, maxPrice }));
        setFilterButtonClicked(false);
      }
      dispatch(getBrand());
      dispatch(getCategory());
    }, [minPrice, maxPrice, dispatch, filterButtonClicked]);

    return (
      <div className="mb-4 w-full">
        <div style={{ marginRight: "4px" }}>
          <h2 className="block text-sm font-bold mb-4">
            Filtro por Categoría:
          </h2>
          <div>
            <div className="mb-4">
              <label
                htmlFor="color"
                className="block text-sm font-medium text-gray-700"
              >
                Selecciona una categoría:
              </label>
              <select
                className="border border-chiliRed rounded p-2 mr-2 focus:outline-none focus:border-chiliRed"
                onChange={handleFilterCategory}
              >
                <option value="All">Todos</option>
                {category.categories
                  ? category.categories.map((categoryItem) => (
                      <option
                        key={categoryItem.id}
                        value={categoryItem.category}
                      >
                        {String(categoryItem.category)}
                      </option>
                    ))
                  : null}
              </select>
            </div>
          </div>
          <h2 className="block text-sm font-bold mb-4">Filtro por precio</h2>
          <div className="flex flex-wrap mb-4">
            {priceRanges.map((range) => (
              <button
                key={range.value}
                onClick={() => {
                  const [newMin, newMax] = range.value.split("-");
                  setMinPrice(newMin);
                  setMaxPrice(newMax);
                }}
                className={`mr-2 mb-2 p-1 border rounded text-xs ${
                  minPrice === range.value.split("-")[0] &&
                  maxPrice === range.value.split("-")[1]
                    ? "bg-chiliRed hover:bg-onyx text-whiteSmoke"
                    : "bg-gray-200 hover:bg-gray-300 text-black"
                } transition duration-300`}
              >
                {range.label}
              </button>
            ))}
          </div>
          <div className="mb-4">
            <label className="mr-2">Rango personalizado:</label>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="Min"
              className="mr-2 mb-2 p-2 border rounded"
            />
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="Max"
              className="mr-2 p-2 border rounded"
            />
          </div>

          {status === "loading" && <p>Loading...</p>}
          {status === "failed" && (
            <p className="text-red-500">Error: {error.message}</p>
          )}
          {status === "succeeded" && (
            <div>
              <h3 className="text-xl font-bold mt-4">Filtered Products:</h3>
              <ul>
                {products.map((product) => (
                  <li key={product.id} className="mb-2">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="mr-2"
                      style={{ width: "50px", height: "50px" }}
                    />
                    {product.name} - ${product.price}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="mb-4 w-full">
          <div style={{ marginRight: "4px" }}>
            <h2 className="block text-sm font-bold mb-4">Flitro por Marca</h2>
            <div className="mb-4">
              <label
                htmlFor="brand"
                className="block text-sm font-medium text-gray-700"
              >
                Seleccionar Marca:
              </label>
              <select
                id="brand"
                value={selectedBrand}
                onChange={(e) => handleBrandChange(e.target.value)}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Seleccionar Marca</option>
                {brandList.map((brand) => (
                  <option key={brand.id} value={brand.brand}>
                    {brand.brand}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div style={{ marginRight: "4px" }}>
          <h2 className="block text-sm font-bold mb-4">Filtro por Color</h2>
          <div className="mb-4">
            <label
              htmlFor="color"
              className="block text-sm font-medium text-gray-700"
            >
              Selecciona un color:
            </label>
            <select
              id="color"
              onChange={handleColorChange}
              value={selectedColor}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Selecciona un color</option>
              {Array.isArray(colors) &&
                colors.map((color) => (
                  <option key={color.id} value={color.color}>
                    {color.color}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <button
          onClick={handleFilterPrice}
          className="transition duration-300 bg-chiliRed hover:bg-onyx text-whiteSmoke font-bold py-2 px-4 rounded mr-2 mb-2"
        >
          Apply Filter
        </button>
        <button
          onClick={handleClearFilter}
          className="transition duration-300 bg-chiliRed hover:bg-onyx text-whiteSmoke font-bold py-2 px-4 rounded mr-2 mb-2"
        >
          Clear Filter
        </button>
        <button
          onClick={handleFilterClick}
          className="transition duration-300 bg-chiliRed hover:bg-onyx text-whiteSmoke font-bold py-2 px-4 rounded"
        >
          {" "}
          Filtrar
        </button>
      </div>
    );
  };
};
export default AllFilter;
