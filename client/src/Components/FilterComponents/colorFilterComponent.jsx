import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterColor } from '../../reduxToolkit/Filtros/filterColorThunks';
import { getColor } from '../../reduxToolkit/Color/colorThunks';

const ColorFilterComponent = () => {
  const dispatch = useDispatch();
  const [selectedColor, setSelectedColor] = useState('');
  const colors = useSelector((state) => state.color.color);
  

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
  };

  const handleFilterClick = () => {
    dispatch(filterColor(selectedColor));
  };

  return (
    <div className="mb-4 w-full">
      <div style={{ marginRight: '4px' }}>
        <h2 className="block text-sm font-bold mb-4">Filter by Color</h2>
        <div className="mb-4">
          <label htmlFor="color" className="block text-sm font-medium text-gray-700">
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
        <button
          onClick={handleFilterClick}
          className="transition duration-300 bg-chiliRed hover:bg-onyx text-whiteSmoke font-bold py-2 px-4 rounded"
        >
          Filtrar por color
        </button>
      </div>
    </div>
  );
};

export default ColorFilterComponent;