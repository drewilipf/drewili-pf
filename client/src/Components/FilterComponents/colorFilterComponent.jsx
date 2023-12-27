import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterColor } from "../../reduxToolkit/Filtros/filterColorThunks";
import { getColor } from "../../reduxToolkit/Color/colorThunks";

const ColorFilterComponent = ({ setActualPage }) => {
  const dispatch = useDispatch();
  const [selectedColor, setSelectedColor] = useState("");
  const colors = useSelector((state) => state.color.color); // Accede a la propiedad "color" del objeto

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
  };

  const handleFilterClick = () => {
    dispatch(filterColor(selectedColor));
    setActualPage(1);
  };

  return (
    <div>
      <label htmlFor="color">Selecciona un color:</label>
      <select id="color" onChange={handleColorChange} value={selectedColor}>
        <option value="">Selecciona un color</option>
        {Array.isArray(colors) &&
          colors.map((color) => (
            <option key={color.id} value={color.color}>
              {color.color}
            </option>
          ))}
      </select>
      <button onClick={handleFilterClick}>Filtrar por color</button>
    </div>
  );
};

export default ColorFilterComponent;
