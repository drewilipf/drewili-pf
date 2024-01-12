import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { filterRating } from '../../reduxToolkit/Filtros/sortByRatingThunk';

const SortDropdown = () => {
    const dispatch = useDispatch();
    const [selectedOption, setSelectedOption] = useState('');
  
    const handleSortChange = (event) => {
      const selectedValue = event.target.value;
 
      setSelectedOption(selectedValue);
      if (selectedValue === 'rating') {
        dispatch(filterRating());
      }
    };
    
  
    return (
        <div className="mb-4 w-full flex items-center mt-[0%]">
        <label
          htmlFor="sortDropdown"
          className="block text-sm font-bold mb-2 mr-2"
        >
          {" "}
          Ordenar por:
        </label>
        <select
          id="sortDropdown"
          value={selectedOption}
          onChange={handleSortChange}
          className="mt-1 block py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Seleccionar</option>
          <option value="rating">Rating</option>
        </select>
      </div>
    );
  };
  
  export default SortDropdown;