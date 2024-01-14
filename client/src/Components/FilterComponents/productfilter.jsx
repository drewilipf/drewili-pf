import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBrand } from "../../reduxToolkit/Brand/brandThunks";
import { getCategory } from "../../reduxToolkit/Category/categoryThunks.js";
import { clearFilter } from "../../reduxToolkit/Product/productThunks";
import { filterAll } from "../../reduxToolkit/Filtros/filterAllThunks";
import { IoFilterCircle } from "react-icons/io5";
import { IoFilterCircleOutline } from "react-icons/io5";

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

  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  // Estado local para los filtros y control del menú desplegable
  const [filterState, setFilterState] = useState({
    selectedCategory: cat,
    selectedBrand: "",
    selectedColor: "",
    minPrice: "0",
    maxPrice: "600",
  });

  const brandList = useSelector((state) => state.brands.brands);
  const colors = useSelector((state) => state.color.color);

  useEffect(() => {
    dispatch(getBrand());
    dispatch(getCategory());
  }, [dispatch]);



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
      maxPrice: "23999",
    });
    setActualPage(1);
  };

  const handleOpenFilter = () =>{
    setFilterMenuOpen(!filterMenuOpen)
  }

  return (
    <div className="mb-4 w-full">
      <div className="p-2">
        {/* Mostrar filtros en pantallas grandes */}
        <div className="hidden tablet:block">
          <h2 className="block text-m font-bold mb-4">Opciones de filtrado:</h2>
          {/* Resto del contenido del filtro visible en pantallas grandes */}
          <label
            htmlFor="brand"
            className="block text-sm font-medium text-grey"
          >
            {/* Selecciona una Marca: */}
          </label>
          <select
            id="brand"
            value={filterState.selectedBrand || ""}
            onChange={(e) => handleBrandChange(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border bg-white rounded-md shadow-sm focus:outline-none focus:ring-chiliRed focus:border-chiliRed tablet:text-sm border-chiliRed"
          >
            <option value="" className="text-eerieBlack" disabled defaultValue>Filtrar por marca</option>
            <option value="" className="text-eerieBlack" >Todas las marcas</option>
            {brandList.map((brand) => (
              <option key={brand.id} value={brand.brand} className="text-eerieBlack">
                {brand.brand}
              </option>
            ))}
          </select>

          <label
            htmlFor="color"
            className="block text-sm font-medium text-grey mt-4"
          >
            {/* Selecciona un Color: */}
          </label>
          <select
            id="color"
            onChange={handleColorChange}
            value={filterState.selectedColor || ""}
            className="mt-1 block w-full py-2 px-3 border border-grey-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-chiliRed focus:border-chiliRed sm:text-sm border-chiliRed"
          >
            <option value="" disabled defaultValue>Filtrar por color</option>
            <option value="">Todos los colores</option>
            {Array.isArray(colors) &&
              colors.map((color) => (
                <option key={color.id} value={color.color}>
                  {color.color}
                </option>
              ))}
          </select>

          <div className="">
          <label className="mr-2 mt-2 block text-sm font-medium text-eerieBlack">
              Filtrar por precio:
            </label>
            <input
              type="number"
              value={filterState.minPrice}
              onChange={(e) =>
                setFilterState((prev) => ({ ...prev, minPrice: e.target.value >= 0 ? e.target.value : prev.minPrice }))
              }
              placeholder="Min"
              className="mr-2 mb-2 p-2 border-chiliRed  mt-1 block w-full py-2 px-3 border border-grey-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-chiliRed focus:border-chiliRed sm:text-sm "
            />
            <input
              type="number"
              value={filterState.maxPrice}
              onChange={(e) =>
                setFilterState((prev) => ({ ...prev, maxPrice:  e.target.value >= 0 ? e.target.value : prev.maxPrice }))
              }
              placeholder="Max"
              className="mr-2 mb-2 p-2 border-chiliRed  mt-1 block w-full py-2 px-3 border border-grey-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-chiliRed focus:border-chiliRed sm:text-sm "
              />
          </div>
              <div className="mt-2 flex p-2">

          <button
            onClick={handleFilterClick}
            className="transition duration-300 bg-chiliRed hover:bg-onyx text-whiteSmoke font-bold py-2 px-4 rounded mr-2 mb-2"
          >
            Aplicar Filtros
          </button>

          <button
            onClick={handleClearFilter}
            className="transition duration-300 bg-chiliRed hover:bg-onyx text-whiteSmoke font-bold py-2 px-4 rounded mb-2"
          >
            Limpiar Filtros
          </button>
              </div>
        </div>

        {/* Mostrar botón para abrir filtros en pantallas pequeñas */}
        <div className="flex tablet:hidden items-center justify-center">

          <button
            onClick={handleOpenFilter}
            className="bg-chiliRed text-whiteSmoke font-bold px-4 py-2 rounded block tablet:hidden mr-1"
          >
            {filterMenuOpen ? <IoFilterCircle/> : <IoFilterCircleOutline/>}
          </button>
        </div>
        {filterMenuOpen && (
          <div className="mb-4 w-full tablet:hidden mt-4">
            {/* Etiquetas y selectores para Marca, Color, y Rango de Precios */}
            <label
              htmlFor="brand"
              className="block text-sm font-medium text-gray-700 "
            >
              Selecciona una Marca:
            </label>
            <select
              id="brand"
              value={filterState.selectedBrand || ""}
              onChange={(e) => handleBrandChange(e.target.value)}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 tablet:text-sm border-chiliRed"
            >
              <option value="">Selecciona una Marca:</option>
              {brandList.map((brand) => (
                <option key={brand.id} value={brand.brand}>
                  {brand.brand}
                </option>
              ))}
            </select>

            <label
              htmlFor="color"
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              Selecciona un Color:
            </label>
            <select
              id="color"
              onChange={handleColorChange}
              value={filterState.selectedColor || ""}
              className="mt-1 block w-full py-2 px-3 border  bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 tablet:text-sm border-chiliRed"
            >
              <option value="">Selecciona un Color:</option>
              {Array.isArray(colors) &&
                colors.map((color) => (
                  <option key={color.id} value={color.color}>
                    {color.color}
                  </option>
                ))}
            </select>

            <div className="mt-4">
              <label className="mr-2 block text-sm font-medium text-gray-700 ">
                Selecciona un Rango de Precios:
              </label>
              <input
                type="number"
                value={filterState.minPrice}
                onChange={(e) =>
                  setFilterState((prev) => ({ ...prev, minPrice:  e.target.value >= 0 ? e.target.value : prev.minPrice }))
                }
                placeholder="Min"
                className="mb-2 p-2 mt-1 block w-full py-2 px-3 border border-chiliRed bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 tablet:text-sm "
              />
              <input
                type="number"
                value={filterState.maxPrice}
                onChange={(e) =>
                  setFilterState((prev) => ({ ...prev, maxPrice: e.target.value >= 0 ? e.target.value : prev.maxPrice }))
                }
                placeholder="Max"
                className="mb-2 p-2 mt-1 block w-full py-2 px-3 border border-chiliRed bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 tablet:text-sm "
              />
            </div>

            {/* Botones de Aplicar Filtros y Limpiar Filtros */}
            <button
              onClick={handleFilterClick}
              className="transition duration-300 bg-chiliRed hover:bg-onyx text-whiteSmoke font-bold py-2 px-4 rounded mt-2 flex mx-auto"
            >
              Aplicar Filtros
            </button>

            <button
              onClick={handleClearFilter}
              className="transition duration-300 bg-chiliRed hover:bg-onyx text-whiteSmoke font-bold py-2 px-4 rounded mt-2 flex mx-auto"
            >
              Limpiar Filtros
            </button>

            {/* Botón para cerrar el menú desplegable */}
          </div>
        )}
    </div>
    </div>
  );
};

export default ProductFilter;

