import Searchbar from "../Searchbar/Searchbar";
import { NavLink } from "react-router-dom";
import Banners from "../../Components/Banners/Banners";

function Navbar() {
  return (
    <div className="flex flex-col items-start">
      <div className="flex items-center mb-4">
        <div className="w-36 h-36  rounded p-4">
          <img src="\logoOriginal.png" alt="drewili" />
        </div>
        <Searchbar className="mr-4"></Searchbar>
        <div className="flex space-x-4 justify-end mr-4 ">
          <button className=" bg-chiliRed hover:bg-onyx  text-whiteSmoke font-bold py-2 px-4 rounded">
            <NavLink to="/UserForm">Registrate</NavLink>
          </button>
          <button className="bg-chiliRed hover:bg-onyx text-whiteSmoke font-bold py-2 px-4 rounded">
            <NavLink to="/UserLogin">Ingresa</NavLink>
          </button>
        </div>
      </div>
      <Banners />;
    </div>
  );
}

export default Navbar;
