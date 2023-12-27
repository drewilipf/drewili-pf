import React from "react";
import { useDispatch } from "react-redux";
import { filterPrice } from "../../reduxToolkit/Filtros/sortByPricethunk";

const SortByPriceDropdown = () => {
  const dispatch = useDispatch();

  const handleSortChange = (order) => {
    dispatch(filterPrice({ order }));
  };

  return (
    <div>
      <label htmlFor="sortByPrice">Ordenar por Precio:</label>
      <select id="sortByPrice" onChange={(e) => handleSortChange(e.target.value)}>
        <option value="asc">Ascendente</option>
        <option value="desc">Descendente</option>
      </select>
    </div>
  );
};

export default SortByPriceDropdown;