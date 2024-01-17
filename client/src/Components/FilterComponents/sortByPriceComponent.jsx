import React from "react";
import { useDispatch } from "react-redux";
import { filterPrice } from "../../reduxToolkit/Filtros/sortByPricethunk";
import { filterRating } from "../../reduxToolkit/Filtros/sortByRatingThunk";

const SortByPriceDropdown = () => {
  const dispatch = useDispatch();

  const handleSortChange = (order) => {
    // if (order === 'rating') {
    //   dispatch(filterRating());
    // }
    dispatch(filterPrice({ order }));
  };

  return (
    <div className="mb-4 w-full flex items-center mt-[0%]">
      <label
        htmlFor="sortByPrice"
        className="block text-sm font-bold mb-2 mr-2"
      >
        {" "}
        Ordenar :
      </label>
      <select
        id="sortByPrice"
        onChange={(e) => handleSortChange(e.target.value)}
        className="mt-1  block py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        <option value="asc">Precio Asc</option>
        <option value="desc">Precio Desc</option>
        {/* <option value='rating'>Mejor puntuado</option> */}
      </select>
    </div>
  );
};

export default SortByPriceDropdown;
