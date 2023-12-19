import { NavLink } from "react-router-dom";
import Searchbar from "../Searchbar/Searchbar";
function Navbar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-10 bg-white shadow-xl">
      <div className="flex items-center justify-between text-white">
        <NavLink to="/" className="flex items-center">
          <div className="w-20 h-20 rounded ml-40 mt-4">
            <img src="\logoOriginal.png" alt="drewili" />
          </div>
        </NavLink>
        <Searchbar className="mx-auto" />

        <div className="flex space-x-4 mr-40">
          <h1 className="transition duration-300 hover:text-onyx cursor-pointer">
            <NavLink to="/userform" className="text-chiliRed hover:text-onyx">
              Regístrate
            </NavLink>
          </h1>
          <span className="text-chiliRed">|</span>
          <h1 className="transition duration-300 hover:text-onyx  cursor-pointer">
            <NavLink to="/userlogin" className="text-chiliRed hover:text-onyx">
              Ingresa
            </NavLink>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
