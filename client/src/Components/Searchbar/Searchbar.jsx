import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchProduct } from "../../reduxToolkit/Product/productThunks";

function Searchbar() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const dispatch = useDispatch();

  const handleSearchInputChange = (e) => {
    const keyword = e.target.value;
    setSearchKeyword(keyword);

    // Búsqueda en tiempo real al escribir
    dispatch(searchProduct(keyword));
  };

  const handleSearchClick = () => {
    
    dispatch(searchProduct(searchKeyword));
  };



  return (
    <div className="flex items-center">
      <input
        className="border border-chiliRed rounded p-2 mr-2 focus:outline-none focus:border-chiliRed"
        placeholder="Buscar producto..."
        value={searchKeyword}
        onChange={handleSearchInputChange}
      />
      <select className="border border-chiliRed rounded p-2 mr-2 focus:outline-none focus:border-chiliRed">
        <option value="opcion1">Opción 1</option>
        <option value="opcion2">Opción 2</option>
        <option value="opcion3">Opción 3</option>
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
