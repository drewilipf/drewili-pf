import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchProduct } from "../../reduxToolkit/Product/productThunks";
import { getCategory } from "../../reduxToolkit/Category/categoryThunks.js";
import { filterAll } from "../../reduxToolkit/Filtros/filterAllThunks.js";

function Searchbar() {
  const [searchKeyword, setSearchKeyword] = useState("");

  const dispatch = useDispatch();

  const category = useSelector((state) => state.categories);
  useEffect(() => {
    const fetchData = async () => {
      dispatch(getCategory());
    };

    fetchData();
  }, [dispatch]);

  const handleSearchInputChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const handleSearchClick = () => {
    if (searchKeyword.length < 2) {
      alert("Debe ingresar al menos dos caracteres");
      return;
    }
    dispatch(searchProduct(searchKeyword));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && searchKeyword.length < 2) {
      alert("Debe ingresar al menos dos caracteres");
      return;
    }
    dispatch(searchProduct(searchKeyword));
  };

  const handleFilterCategory = (e) => {
    const category = e.target.value;
    dispatch(filterAll(category));
  };

  return (
    <div className="flex items-center">
      <input
        className="border border-chiliRed rounded p-2 mr-2 focus:outline-none focus:border-chiliRed"
        placeholder="Buscar producto..."
        value={searchKeyword}
        onChange={handleSearchInputChange}
        
        
      />
      <select
        className="border border-chiliRed rounded p-2 mr-2 focus:outline-none focus:border-chiliRed"
        onChange={handleFilterCategory}
      >
        <option value="All">Todos</option>
        {category.categories
          ? category.categories.map((categoryItem) => (
              <option key={categoryItem.id} value={categoryItem.category}>
                {String(categoryItem.category)}
              </option>
            ))
          : null}
      </select>

      <button
        className="bg-chiliRed transition duration-300 hover:bg-onyx text-whiteSmoke font-bold py-2 px-4 rounded mr-16"
        onClick={handleSearchClick}
        onKeyPress={handleKeyPress}
      >
        Buscar
      </button>
    </div>
  );
}

export default Searchbar;
