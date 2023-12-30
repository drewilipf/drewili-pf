import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBrand } from "../../reduxToolkit/Brand/brandThunks";
import { getCategory } from "../../reduxToolkit/Category/categoryThunks.js";
import { clearFilter } from "../../reduxToolkit/Product/productThunks";
import { filterAll } from "../../reduxToolkit/Filtros/filterAllThunks";
import {
  setCategoryFilterAction,
  clearAllFilters,
} from "../../reduxToolkit/Product/activeFilterthunks.js";

const ProductFilter = ({ setActualPage }) => {
  const dispatch = useDispatch();
  let cat = "";
  const prevCategory = useSelector(
    (state) => state.activeFilters.selectedCategory
  );
  if (prevCategory) {
    cat = prevCategory;
  }

  // Estado local para los filtros
  const [filterState, setFilterState] = useState({
    selectedCategory: cat,
    selectedBrand: "",
    selectedColor: "",
    minPrice: "0",
    maxPrice: "600",
  });
  const category = useSelector((state) => state.categories);
  const brandList = useSelector((state) => state.brands.brands);
  const colors = useSelector((state) => state.color.color);

  useEffect(() => {
    dispatch(getBrand());
    dispatch(getCategory());
  }, [dispatch]);

  const handleFilterCategory = (category) => {
    if (prevCategory) {
      setFilterState({
        selectedCategory: prevCategory || "",
      });
      console.log(filterState.selectedCategory);
    }
    setFilterState((prev) => ({ ...prev, selectedCategory: category }));
  };

  const handleBrandChange = (brand) => {
    setFilterState((prev) => ({ ...prev, selectedBrand: brand }));
  };

  const handleColorChange = (e) => {
    setFilterState((prev) => ({ ...prev, selectedColor: e.target.value }));
  };

  const handleFilterClick = async () => {
    setActualPage(1);

    if (!filterState.selectedCategory) {
      cat = prevCategory;
    } else {
      cat = filterState.selectedCategory;
    }
    await dispatch(
      filterAll(
        cat,
        filterState.selectedBrand,
        filterState.selectedColor,
        filterState.minPrice,
        filterState.maxPrice
      )
    );
    await dispatch(setCategoryFilterAction(cat));
  };

  const handleClearFilter = async () => {
    await dispatch(clearFilter());
    await dispatch(clearAllFilters());
    setFilterState({
      selectedCategory: "",
      selectedBrand: "",
      selectedColor: "",
      minPrice: "0",
      maxPrice: "600",
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
            Selecciona una Marca:
          </label>
          <select
            id="brand"
            value={filterState.selectedBrand || ""}
            onChange={(e) => handleBrandChange(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Todas las marcas</option>
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
            <option value="">Todos los colores</option>
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
