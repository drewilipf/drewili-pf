import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchProduct,filterCategory } from "../../reduxToolkit/Product/productThunks";
import { getCategory } from "../../reduxToolkit/Category/categoryThunks.js";
function Searchbar() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const dispatch = useDispatch();

  const category = useSelector((state) => state.categories)
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getCategory());
    };

    fetchData();
  }, [dispatch]);

  const handleSearchInputChange = (e) => {
    const keyword = e.target.value;
    setSearchKeyword(keyword);

    // Búsqueda en tiempo real al escribir
    dispatch(searchProduct(keyword));
  };

  const handleSearchClick = () => {

    dispatch(searchProduct(searchKeyword));
  };

  const handleFilterCategory = (e) => {
    const category = e.target.value
    dispatch(filterCategory(category))
    console.log(category);
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
      >
        Buscar
      </button>
    </div>
  );
}

export default Searchbar;
