import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBrand } from "../../reduxToolkit/Brand/brandThunks";
import { filterBrand } from "../../reduxToolkit/Filtros/filterBrandThunks";
import { filterColor } from "../../reduxToolkit/Filtros/filterColorThunks";
import { filterPrice } from "../../reduxToolkit/Filtros/filterPriceThunks";
import { clearFilter } from "../../reduxToolkit/Product/productThunks";

const ProductFilter = ({ setActualPage }) => {
  const dispatch = useDispatch();

  // Estado local para los filtros
  const [filterState, setFilterState] = useState({
    selectedBrand: "",
    selectedColor: "",
    minPrice: "0",
    maxPrice: "6000",
  });

  const brandList = useSelector((state) => state.brands.brands);
  const colors = useSelector((state) => state.color.color);

  const activeFilters = useSelector((state) => state.filters);

  useEffect(() => {
    dispatch(getBrand());
  }, [dispatch]);

  useEffect(() => {
    // Inicializar el estado local solo si no hay filtros activos
    if (activeFilters && !activeFilters.isFiltering) {
      setFilterState({
        selectedBrand: "",
        selectedColor: "",
        minPrice: "0",
        maxPrice: "6000",
      });
    }
  }, []);

  const handleBrandChange = (brand) => {
    setFilterState((prev) => ({ ...prev, selectedBrand: brand }));
  };

  const handleColorChange = (e) => {
    setFilterState((prev) => ({ ...prev, selectedColor: e.target.value }));
  };

  const handleFilterClick = () => {
    setActualPage(1);
    console.log(filterState.selectedBrand);
    console.log(filterState.selectedColor);
    dispatch(filterBrand(filterState.selectedBrand));
    dispatch(filterColor(filterState.selectedColor));
    dispatch(
      filterPrice({
        minPrice: filterState.minPrice,
        maxPrice: filterState.maxPrice,
      })
    );
  };

  const handleClearFilter = async () => {
    await dispatch(clearFilter());
    setFilterState({
      selectedBrand: "",
      selectedColor: "",
      minPrice: "0",
      maxPrice: "6000",
    });
    setActualPage(1);
  };

  return (
    <div className="mb-4 w-full">
      <div style={{ marginRight: "4px" }}>
        <h2 className="block text-sm font-bold mb-4">Opciones de filtrados:</h2>

        <div className="mb-4">
          <label
            htmlFor="brand"
            className="block text-sm font-medium text-gray-700"
          >
            Selecciones:
          </label>
          <select
            id="brand"
            value={filterState.selectedBrand || ""}
            onChange={(e) => handleBrandChange(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Selecciona una Marca:</option>
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
            Selecciona un Color:
          </label>
          <select
            id="color"
            onChange={handleColorChange}
            value={filterState.selectedColor || ""}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Selecciona un Color:</option>
            {Array.isArray(colors) &&
              colors.map((color) => (
                <option key={color.id} value={color.color}>
                  {color.color}
                </option>
              ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="mr-2">Selecciona un Rango de Precios:</label>
          <input
            type="number"
            value={filterState.minPrice}
            onChange={(e) =>
              setFilterState((prev) => ({ ...prev, minPrice: e.target.value }))
            }
            placeholder="Min"
            className="mr-2 mb-2 p-2 border rounded"
          />
          <input
            type="number"
            value={filterState.maxPrice}
            onChange={(e) =>
              setFilterState((prev) => ({ ...prev, maxPrice: e.target.value }))
            }
            placeholder="Max"
            className="mr-2 p-2 border rounded"
          />
        </div>

        <button
          onClick={handleFilterClick}
          className="transition duration-300 bg-chiliRed hover:bg-onyx text-whiteSmoke font-bold py-2 px-4 rounded mr-2 mb-2"
        >
          Aplicar Filtros
        </button>

        <button
          onClick={handleClearFilter}
          className="transition duration-300 bg-chiliRed hover:bg-onyx text-whiteSmoke font-bold py-2 px-4 rounded mr-2 mb-2"
        >
          Limpiar Filtros
        </button>
      </div>
    </div>
  );
};

export default ProductFilter;
