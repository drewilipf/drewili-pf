import React, { useState } from "react";
import { NavLink, Routes, Route, useLocation } from "react-router-dom";
import Searchbar from "../Searchbar/Searchbar";
import { useSelector, useDispatch } from "react-redux";
import { postLogout } from "../../reduxToolkit/Login/logoutThunks";
import { useNavigate } from "react-router-dom";
import { AiOutlineMore } from "react-icons/ai";

function Navbar() {
  const location = useLocation();
  const { login } = useSelector((state) => state.login);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dispatch = useDispatch();

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };
  const navigate = useNavigate();
  const handleLogout = async () => {
    const userClickedOk = window.confirm(
      "¿Seguro de que desea cerrar sección?"
    );
    if (userClickedOk) {
      await dispatch(postLogout());
      navigate("/");
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-10 bg-white shadow-xl">
      <div className="flex items-center justify-between text-white">
        <NavLink to="/" className="flex items-center">
          <div className="w-20 h-20 rounded ml-40 mt-4">
            <img src="\logoOriginal.png" alt="drewili" />
          </div>
        </NavLink>
        {/* Renderiza la Searchbar solo en la ruta "/" */}
        <Routes>
          <Route
            path="/"
            element={
              location.pathname === "/" && <Searchbar className="mx-auto" />
            }
          />
        </Routes>
        <div className="flex space-x-2 mr-7">
          {login && login.userSession ? (
            <div className="flex space-x-3 text-chiliRed items-center">
              {" "}
              {/* Añadido 'items-center' */}
              <div className="relative group">
                <h1 className="transition duration-300 hover:text-onyx cursor-pointer">
                  <p onClick={toggleDropdown} className="flex items-center">
                    {" "}
                    {/* Añadido 'flex items-center' */}
                    Bienvenido, {login.userSession.username}! <AiOutlineMore />
                  </p>
                </h1>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 bg-white border rounded shadow-md text-chiliRed">
                    <ul className="py-1">
                      <li className="cursor-pointer py-2 px-4 hover:bg-gray-200">
                        Ver Perfil
                      </li>
                      <li
                        className="cursor-pointer py-2 px-4 hover:bg-gray-200"
                        onClick={handleLogout}
                      >
                        Cerrar Sesión
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex space-x-1">
              <h1 className="transition duration-300 hover:text-onyx cursor-pointer">
                <NavLink
                  to="/userform"
                  className="text-chiliRed hover:text-onyx"
                >
                  Regístrate
                </NavLink>
              </h1>
              <span className="text-chiliRed">|</span>
              <h1 className="transition duration-300 hover:text-onyx cursor-pointer">
                <NavLink
                  to="/userlogin"
                  className="text-chiliRed hover:text-onyx"
                >
                  Ingresa
                </NavLink>
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
