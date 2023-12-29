import React from "react";
import { useDispatch } from "react-redux";
import { filterColor } from "../../reduxToolkit/Filtros/filterColorThunks";
import { filterPrice } from "../../reduxToolkit/Filtros/filterPriceThunks";
import { filterBrand } from "../../reduxToolkit/Filtros/filterBrandThunks";
import { clearFilter } from "../../reduxToolkit/Product/productThunks";

const FilterButton = ({ setActualPage }) => {
  const dispatch = useDispatch();

  const handleFilterClick = () => {
    // Puedes realizar operaciones adicionales aquí si es necesario

    // Ejecutar las acciones de filtrado para cada componente
    dispatch(filterColor());
    dispatch(filterBrand());
    dispatch(filterPrice());

    // Establecer la página actual después del filtrado
    setActualPage(1);
  };
  const handleClearFilter = async () => {
    await dispatch(clearFilter());
    setActualPage(1);
  };

  return (
    <div>
      <button
        onClick={handleFilterClick}
        className="transition duration-300 bg-chiliRed hover:bg-onyx text-whiteSmoke font-bold py-2 px-4 rounded"
      >
        Aplicar Filtros
      </button>
      <button
        onClick={handleClearFilter}
        className="transition duration-300 bg-chiliRed hover:bg-onyx text-whiteSmoke font-bold py-2 px-4 rounded mr-2 mb-2"
      >
        Clear Filter
      </button>
    </div>
  );
};

export default FilterButton;
