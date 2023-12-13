import Searchbar from "../Searchbar/Searchbar";
import { NavLink } from "react-router-dom"

function Navbar() {
  return (
    <div className="flex flex-col items-start">
      <div className="flex items-center mb-4">
        <h1 className="mr-4">Logo</h1>
        <Searchbar className="mr-4"></Searchbar>
      </div>
      <button>
          <NavLink to="/UserForm"> Registrate </NavLink>
      </button>
      <button>
          <NavLink to="/UserLogin"> Ingresa </NavLink>
      </button>
      
    </div>
  );
}

export default Navbar;
