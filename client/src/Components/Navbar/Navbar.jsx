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
         <button className="bg-chiliRed hover:bg-onyx text-whiteSmoke font-bold py-2 px-4 rounded">
           <NavLink to="/userform">Regístrate</NavLink>
         </button>
         <button className="bg-chiliRed hover:bg-onyx text-whiteSmoke font-bold py-2 px-4 rounded">
           <NavLink to="/userlogin">Ingresa</NavLink>
         </button>
       </div>
     </div>
   </div>
 );
}



export default Navbar;
