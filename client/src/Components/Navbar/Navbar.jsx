import React, { useState, useRef, useEffect } from "react";
import {
  NavLink,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Searchbar from "../Searchbar/Searchbar";
import { AiOutlineMore } from "react-icons/ai";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import { postLogout } from "../../reduxToolkit/Login/logoutThunks";
import cartIcon from "../../icons/carrito-de-compras.png";
import { useAuth0 } from "@auth0/auth0-react";
import { postGoogle } from "../../reduxToolkit/User/userThunks";
import LogoutButton from "../../Components/LogoutButton";
import { CiMenuBurger } from "react-icons/ci";
import { FaTimes } from "react-icons/fa";
import DarkModeToggle from "../DarkMode/DarkMode";


function Navbar({ setActualPage }) {
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [click, setClick] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { login } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      const userGoogle = {
        userName: user.name,
        email: user.email,
        authId: user.sub,
      };

      dispatch(postGoogle(userGoogle));
      Cookies.set("userGoogle", JSON.stringify(userGoogle));
    }
  }, [dispatch, isAuthenticated, user]);

  const { usersGoogle } = useSelector((state) => state.users);

  if (usersGoogle) {
    const currentData = Cookies.get("userGoogle")
      ? JSON.parse(Cookies.get("userGoogle"))
      : {};
    const newData = {
      ...currentData,
      id: usersGoogle.id,
    };
    Cookies.set("userGoogle", JSON.stringify(newData));
  }
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Obtener la información de sesión desde las cookies
  const userSessionFromCookies = Cookies.get("userSession");
  const userGoogleFromCookies = Cookies.get("userGoogle");

  const userSession = userSessionFromCookies
    ? JSON.parse(userSessionFromCookies)
    : null;
  const userGoogleSession = userGoogleFromCookies
    ? JSON.parse(userGoogleFromCookies)
    : null;

  // Combina la información del estado Redux y las cookies
  const combinedUserSession =
    userSession && userSession.username
      ? userSession.username
      : login && login.userSession
        ? login.userSession.username
        : isAuthenticated && user.name
          ? user.name
          : userGoogleSession
            ? userGoogleSession.userName
            : null;

  const handleclickClosed = () => {
    dispatch(postLogout());
    Cookies.remove("userSession");
    Cookies.remove("userGoogle");
    navigate("/");
  };

  const id =
    (userSession && userSession.userId) ||
    (login && login.userSession.userId) ||
    (usersGoogle && usersGoogle.id) ||
    (userGoogleSession && userGoogleSession.id);
  const role =
    (userSession && userSession.role) ||
    (login && login.userSession.role) ||
    (usersGoogle && usersGoogle.role) ||
    (userGoogleSession && userGoogleSession.role);
  const handleClick = () => {
    setClick(!click);
  };

  const content = (
    <div className="tablet:hidden block absolute top-20 w-full left-0 right-0 h-20 transition z-50 border-t-chiliRed  border-t-2">
      {combinedUserSession ? (
        <div className="flex flex-col items-center shadow-xl">
          <div className="bg-whiteSmoke ">
            <div className="right-0 mt-2 w-screen flex flex-col pl-2">

              <div className="flex items-center space-x-4">
                <h1 className="transition duration-300 text-chiliRed   ursor-pointer">
                  Bienvenido, {combinedUserSession}!
                </h1>
              </div>
              <ul className="py-1">
                <li className="py-2 px-4 hover:bg-gray-200">
                  <NavLink
                    to={`/userprofile/${id}`}
                    className="hover:underline"
                    onClick={handleClick}
                  >
                    Ver Perfil
                  </NavLink>
                </li>
                <li className="py-2 px-4 hover:bg-gray-200">
                  <NavLink to={"/shoppingcart"} onClick={handleClick}>
                    Carrito de compras
                  </NavLink>
                </li>
                <li className="py-2 px-4 hover:bg-gray-200">
                  <NavLink
                    to={`/history/${id}`}
                    className="hover:underline"
                    onClick={handleClick}
                  >
                    Historial de Compras
                  </NavLink>
                </li>
                <li className="py-2 px-4 hover:bg-gray-200">
                  <NavLink
                    to="/favorites"
                    className="hover:underline"
                    onClick={handleClick}
                  >
                    Favoritos
                  </NavLink>
                </li>

                {role === "admin" && (
                  <li className="py-2 px-4 hover:bg-gray-200">
                    <NavLink
                      to="/dashboard"
                      className="hover:underline "
                      onClick={handleClick}
                    >
                      Dashboard
                    </NavLink>
                  </li>
                )}
                {isAuthenticated && (
                  <li>
                    <LogoutButton />
                  </li>
                )}
                {!isAuthenticated && (
                  <li className="py-2 px-4" onClick={handleclickClosed}>
                    Cerrar Sesión
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex space-x-1 bg-whiteSmoke h-60 justify-center items-center shadow-xl flex-wrap">
          <h1 className="transition duration-300 hover:text-onyx cursor-pointer">
            <NavLink
              to="/userform"
              className="text-chiliRed hover:text-onyx"
              onClick={handleClick}
            >
              Regístrate
            </NavLink>
          </h1>
          <span className="text-chiliRed">|</span>
          <h1 className="transition duration-300 hover:text-onyx cursor-pointer">
            <NavLink
              to="/userlogin"
              className="text-chiliRed hover:text-onyx"
              onClick={handleClick}
            >
              Ingresa
            </NavLink>
          </h1>
        </div>
      )}
    </div>
  );


  return (
    <nav className="shadow-xl bg-whiteSmoke mb-2">
      <div className="lg:h-20 sm:h-20 h-20 flex justify-between z-50 lg:py-5 px-4 sm:px-8 items-center">
        <NavLink to="/" className="flex items-center">
          <div className="flex items-center flex-1">
            <img
              src="\logoOriginal.png"
              alt="drewili"
              className="w-20 h-20 object-contain "
            />
          </div>
        </NavLink>

        {location.pathname === "/" && (
          <div className="tablet:flex hidden mx-auto">
            <Searchbar
              className="mx-auto"
              setActualPage={(num) => setActualPage(num)}
            />
          </div>
        )}

      
        {combinedUserSession ? (
          <div className={`tablet:flex space-x-3 text-chiliRed items-center pr-4 ${location.pathname !== "/" ? 'ml-auto' : ''} hidden`}>
            <div className="relative group:flex items-center space-x-4 ml-auto">
              <div className="flex items-center space-x-4">
                <img
                  src={cartIcon}
                  alt="shopping-cart-icon"
                  className="w-6 h-6 cursor-pointer"
                  onClick={() => navigate("/shoppingcart")}
                />
                <h1 className="transition duration-300 hover:text-onyx cursor-pointer ">
                  <p onClick={toggleDropdown} className="flex items-center ">
                    Bienvenido, {combinedUserSession}! <AiOutlineMore />
                  </p>
                </h1>

                {/* Botón de Favoritos */}
                <h1 className="transition duration-300 hover:text-onyx cursor-pointer">
                  <NavLink
                    to="/favorites"
                    className="text-chiliRed hover:underline"
                  >
                    Favoritos
                  </NavLink>
                </h1>
              </div>
              {isDropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="z-50 absolute right-0 mt-2 bg-white border rounded shadow-md text-chiliRed"
                >
                  <ul className="py-1">
                    <li className="cursor-pointer py-2 px-4 hover:bg-gray-200">
                      <NavLink
                        to={`/userprofile/${id}`}
                        className="text-chiliRed hover:underline"
                      >
                        Ver Perfil
                      </NavLink>
                    </li>

                    <li className="cursor-pointer py-2 px-4 hover:bg-gray-200">
                      <NavLink
                        to={`/history/${id}`}
                        className="text-chiliRed hover:underline"
                      >
                        Historial de Compras
                      </NavLink>
                    </li>

                    {role === "admin" && (
                      <li className="cursor-pointer py-2 px-4 hover:bg-gray-200">
                        <NavLink
                          to="/dashboard"
                          className="text-chiliRed hover:underline"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                    )}
                    {isAuthenticated && (
                      <li>
                        <LogoutButton />
                      </li>
                    )}
                    {!isAuthenticated && (
                      <li
                        className="cursor-pointer py-2 px-4 hover:underline"
                        onClick={handleclickClosed}
                      >
                        Cerrar Sesión
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className={`tablet:flex space-x-3 text-chiliRed items-center pr-4 ${location.pathname !== "/" ? 'ml-auto' : ''} hidden`}>
            <h1 className="transition duration-300 hover:text-onyx cursor-pointer">
              <NavLink to="/userform" className="text-chiliRed hover:text-onyx">
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

        <div>{click && content}</div>
        <button
          className="block tablet:hidden transition"
          onClick={handleClick}
        >
          {click ? <FaTimes /> : <CiMenuBurger />}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;

