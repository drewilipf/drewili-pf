import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBrand } from "../../reduxToolkit/Brand/brandThunks";
import { filterBrand } from "../../reduxToolkit/Filtros/filterBrandThunks";

const API_URL = "http://localhost:3001/brand";

const BrandFilterComponent = ({ setActualPage }) => {
  const dispatch = useDispatch();
  const [selectedBrand, setSelectedBrand] = useState("");
  const brandList = useSelector((state) => state.brands.brands);

  useEffect(() => {
    dispatch(getBrand());
  }, [dispatch]);

  const handleBrandChange = (brand) => {
    setSelectedBrand(brand);
  };

  const handleFilterClick = () => {
    console.log("Clic en el botón de filtrado");
    try {
      if (!selectedBrand) {
        return;
      }

      console.log("Filtrando por marca:", selectedBrand);
      setActualPage(1);
      console.log("Filtrando por marca:", selectedBrand);
      dispatch(filterBrand(selectedBrand));
      console.log("Estado después del filtrado:", selectedBrand);
    } catch (error) {
      console.error("Error filtering by brand:", error.message);
    }
  };

  return (
    <div className="mb-4 w-full">
    <div style={{ marginRight: '4px' }}>
      <h2 className="block text-sm font-bold mb-4">Brand Filter</h2>
      <div className="mb-4">
        <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
          Seleccionar Marca:
        </label>
        <select
          id="brand"
          value={selectedBrand}
          onChange={(e) => handleBrandChange(e.target.value)}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Seleccionar Marca</option>
          {brandList.map((brand) => (
            <option key={brand.id} value={brand.brand}>
              {brand.brand}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={handleFilterClick}
        className="transition duration-300 bg-chiliRed hover:bg-onyx text-whiteSmoke font-bold py-2 px-4 rounded"
      >
        Filtrar
      </button>
    </div>
  </div>
);
};


export default BrandFilterComponent;