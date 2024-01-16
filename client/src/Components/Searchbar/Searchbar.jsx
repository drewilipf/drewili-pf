import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchProduct } from "../../reduxToolkit/Product/productThunks";
import { getCategory } from "../../reduxToolkit/Category/categoryThunks.js";
import { filterAll } from "../../reduxToolkit/Filtros/filterAllThunks.js";
import { setCategoryFilterAction } from "../../reduxToolkit/Product/activeFilterthunks.js";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";

function Searchbar({ setActualPage }) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const location = useLocation();
  const dispatch = useDispatch();
  const [filterState, setFilterState] = useState({
    selectedCategory: "",
    selectedBrand: "",
    selectedColor: "",
    minPrice: "0",
    maxPrice: "600",
  });

  const category = useSelector((state) => state.categories);
  const activeFilters = useSelector((state) => state.filters);
  useEffect(() => {
    const fetchData = async () => {
      dispatch(getCategory());
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    
    if (activeFilters && !activeFilters.isFiltering) {
      setFilterState({
        selectedCategory: "",
        selectedBrand: "",
        selectedColor: "",
        minPrice: "0",
        maxPrice: "600",
      });
    }
  }, []);

  const handleSearchInputChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const handleSearchClick = () => {
    if (searchKeyword.length < 2) {
      Swal.fire({
        title: "¡Atención!",
        text: "Debe ingresar al menos dos caracteres",
        icon: "warning",
        confirmButtonColor: "#E62F05"
      })
      
      return;
    }
    
       dispatch(searchProduct(searchKeyword));
      
    
    
    
  };

  const [searchResults, setSearchResults] = useState([]);

  const handleSearchEnter = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick();
         }
  };

  const handleFilterCategory = async (category) => {
    await setFilterState((prev) => ({ ...prev, selectedCategory: category }));

    setActualPage(1);
    await dispatch(filterAll(category));
    await dispatch(setCategoryFilterAction(category));
  };

  return (
    <div className="tablet:flex h-full">
      <input
      type="search"
        className="border border-chiliRed rounded p-2  focus:outline-none focus:border-chiliRed mr-4"
        placeholder="Buscar producto..."
        value={searchKeyword}
        onChange={(e) => {
          handleSearchInputChange(e);
          
        }}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleSearchEnter(e);
          }}}
      />
      {location.pathname !== "/dashboard/productList" && (
        <select
          className="border border-chiliRed rounded p-2 focus:outline-none focus:border-chiliRed"
          onChange={(e) => handleFilterCategory(e.target.value)}
          value={filterState.selectedCategory || ""}
        >
          <option value="">Todas las Categorías</option>
          {category.categories
            ? category.categories.map((categoryItem) => (
                <option key={categoryItem.id} value={categoryItem.category}>
                  {categoryItem.category}
                </option>
              ))
            : null}
        </select>
      )}

      <button
        className="bg-chiliRed transition duration-300 hover:bg-onyx text-whiteSmoke font-bold py-2 px-4 rounded m-1"
        onClick={handleSearchClick}
      >
        Buscar
      </button>
    </div>
  );
}

export default Searchbar;