// BrandFilterComponent.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBrand } from '../../reduxToolkit/Brand/brandThunks';
import { filterBrand } from '../../reduxToolkit/Filtros/filterBrandThunks';

const API_URL = 'http://localhost:3001/brand'; 

const BrandFilterComponent = ({setActualPage}) => {
  const dispatch = useDispatch();
  const [selectedBrand, setSelectedBrand] = useState('');
  const brandList = useSelector((state) => state.brand.brands);

  useEffect(() => {
    dispatch(getBrand());
  }, [dispatch]);

  const handleBrandChange = (brand) => {
    console.log('Seleccionando marca:', brand);
    setSelectedBrand(brand);
    console.log('Estado después del cambio:', selectedBrand);
  };

  const handleFilterClick = () => {
    console.log('Clic en el botón de filtrado');
    try {
      if (!selectedBrand) {
        return;
      }
      setActualPage(1)
      console.log('Filtrando por marca:', selectedBrand);
      dispatch(filterBrand(selectedBrand));
      console.log('Estado después del filtrado:', selectedBrand);
      
    } catch (error) {
      console.error('Error filtering by brand:', error.message);
    }
  };

  return (
    <div>
      <h2>Filtro de Marca</h2>
      <select
        value={selectedBrand}
        onChange={(e) => handleBrandChange(e.target.value)}
      >
        <option value="">Seleccionar Marca</option>
        {brandList.map((brand) => (
          <option key={brand.id} value={brand.brand}>
            {brand.brand}
          </option>
        ))}
      </select>

      <button onClick={handleFilterClick}>Filtrar</button>
    </div>
  );
};

export default BrandFilterComponent;
