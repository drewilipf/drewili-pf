import Searchbar from "../Searchbar/Searchbar";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div className="flex items-center justify-between p-4 bg-orange-300 py-2 mb-6">
      <div className="flex items-center">
        <h1 className="mr-4 text-white">Logo</h1>
      </div>
      <div className="flex items-center">
        <Searchbar className="mx-auto" />
      </div>
      <div className="flex items-center">
        <button className="mr-2">
          <NavLink to="/UserForm" className="text-white">
            Registrate
          </NavLink>
        </button>
        <button>
          <NavLink to="/UserLogin" className="text-white">
            Ingresa
          </NavLink>
        </button>
      </div>
    </div>
  );
}

export default Navbar;
