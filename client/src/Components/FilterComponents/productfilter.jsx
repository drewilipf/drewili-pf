import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBrand } from "../../reduxToolkit/Brand/brandThunks";
import { filterBrand } from "../../reduxToolkit/Filtros/filterBrandThunks";
import { filterColor } from "../../reduxToolkit/Filtros/filterColorThunks";
import { filterPrice } from "../../reduxToolkit/Filtros/filterPriceThunks";
import { clearFilter } from "../../reduxToolkit/Product/productThunks";

const ProductFilter = ({ setActualPage }) => {
  const dispatch = useDispatch();

  const [selectedBrand, setSelectedBrand] = useState("");
  const brandList = useSelector((state) => state.brands.brands);

  const [selectedColor, setSelectedColor] = useState("");
  const colors = useSelector((state) => state.color.color);

  const [minPrice, setMinPrice] = useState("0");
  const [maxPrice, setMaxPrice] = useState("6000");

  const handleBrandChange = (brand) => {
    setSelectedBrand(brand);
  };

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
  };

  const handleFilterClick = () => {
    setActualPage(1);
    dispatch(filterBrand(selectedBrand));
    dispatch(filterColor(selectedColor));
    dispatch(filterPrice({ minPrice, maxPrice }));
  };

  const handleClearFilter = async () => {
    await dispatch(clearFilter());
    setMinPrice("0");
    setMaxPrice("6000");
    setSelectedColor(" ");
    setSelectedBrand(" ");
    setActualPage(1);
  };

  useEffect(() => {
    dispatch(getBrand());
  }, [dispatch]);

  return (
    <div className="mb-4 w-full">
      <div style={{ marginRight: "4px" }}>
        <h2 className="block text-sm font-bold mb-4">Filter Options</h2>

        <div className="mb-4">
          <label
            htmlFor="brand"
            className="block text-sm font-medium text-gray-700"
          >
            Select Brand:
          </label>
          <select
            id="brand"
            value={selectedBrand}
            onChange={(e) => handleBrandChange(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Selecciona un Marca:</option>
            {brandList.map((brand) => (
              <option key={brand.id} value={brand.brand}>
                {brand.brand}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="color"
            className="block text-sm font-medium text-gray-700"
          >
            Select Color:
          </label>
          <select
            id="color"
            onChange={handleColorChange}
            value={selectedColor}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Selecciona un color:</option>
            {Array.isArray(colors) &&
              colors.map((color) => (
                <option key={color.id} value={color.color}>
                  {color.color}
                </option>
              ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="mr-2">Selecciona un rango de precios:</label>
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

        <button
          onClick={handleFilterClick}
          className="transition duration-300 bg-chiliRed hover:bg-onyx text-whiteSmoke font-bold py-2 px-4 rounded mr-2 mb-2"
        >
          Apply Filters
        </button>

        <button
          onClick={handleClearFilter}
          className="transition duration-300 bg-chiliRed hover:bg-onyx text-whiteSmoke font-bold py-2 px-4 rounded mr-2 mb-2"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default ProductFilter;
