import React from "react";
import { useDispatch } from "react-redux";
import { filterPrice } from "../../reduxToolkit/Filtros/sortByPricethunk";

const SortByPriceDropdown = () => {
  const dispatch = useDispatch();

  const handleSortChange = (order) => {
    dispatch(filterPrice({ order }));
  };

  return (
    <div className="mb-4 w-full">
      <div style={{ marginLeft: '4px' }}>
        <label htmlFor="sortByPrice" className="block text-sm font-bold mb-2">
          Ordenar por Precio:
        </label>
        <select
          id="sortByPrice"
          onChange={(e) => handleSortChange(e.target.value)}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
      </div>
    </div>
  );
  }

export default SortByPriceDropdown;