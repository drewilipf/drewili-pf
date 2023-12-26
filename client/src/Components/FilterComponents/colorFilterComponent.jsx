import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterColor } from '../../reduxToolkit/Filtros/filterColorThunks';
import { getColor } from '../../reduxToolkit/Color/colorThunks';

const ColorFilterComponent = () => {
  const dispatch = useDispatch();
  const [selectedColor, setSelectedColor] = useState('');
  const [colorOptions, setColorOptions] = useState([]); // Assuming the colors are stored in the Redux store

  useEffect(() => {
    const fetchColors = async () => {
      try {
        await dispatch(getColor());
      } catch (error) {
        console.error('Error al obtener la lista de colores:', error.message);
      }
    };

    fetchColors();
  }, [dispatch]);

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
  };

  const handleFilterClick = () => {
    dispatch(filterColor(selectedColor));
  };

  return (
    <div>
      <label htmlFor="color">Selecciona un color:</label>
      <select id="color" onChange={handleColorChange} value={selectedColor}>
        <option value="">Selecciona...</option>
        {colorOptions && colorOptions.map((color) => (
  <option key={color} value={color}>
    {color}
  </option>
))}
       
      </select>
      <button onClick={handleFilterClick}>Filtrar por color</button>
    </div>
  );
};

export default ColorFilterComponent;