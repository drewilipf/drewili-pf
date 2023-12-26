import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { IoMdCreate } from "react-icons/io";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { postLogout } from "../../../reduxToolkit/Login/logoutThunks";

const NavbarAdmin = () => {
  const { login } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userSessionFromCookies = Cookies.get("userSession");
  const userSession = userSessionFromCookies
    ? JSON.parse(userSessionFromCookies)
    : null;
  const combinedUserSession =
    userSession && userSession.username
      ? userSession.username
      : login && login.userSession
      ? login.userSession.username
      : null;
  const handleclick = async () => {
    const shouldLogout = window.confirm("¿Estás seguro de cerrar sesión?");

    if (shouldLogout) {
      if (login && login.userSession) {
        try {
          await dispatch(postLogout());
          Cookies.remove("userSession");
          navigate("/");
        } catch (error) {
          console.error("Error al cerrar sesión:", error);
        }
      } else {
        Cookies.remove("userSession");
        navigate("/");
      }
    }
  };
  return (
    <div className="fixed top-0 left-0 h-screen w-[18%] bg-eerieBlack">
      <div className="flex flex-col items-center justify-center p-8 gap-2 h-[30vh]">
        <NavLink to="/dashboard" className="flex items-center">
          <div className="w-20 h-20 rounded  mt-2">
            <img src="\logoWhite.png" alt="drewili" />
          </div>
        </NavLink>
        <h1 className="text-2xl text-whiteSmoke font-bold">
          {combinedUserSession}
        </h1>
        <div
          className="text-whiteSmoke  py-2 px-2 hover:underline"
          onClick={handleclick}
        >
          Cerrar Sesión
        </div>
      </div>

      <div className="bg-chiliRed p-8 rounded-tr-[100px] h-[70vh] overflow-y-auto flex-col justify-between gap-8">
        <nav className="flex flex-col gap-8">
          <div className="flex items-center">
            <IoMdCreate className="mr-2" />
            <NavLink
              to="/dashboard/createProduct"
              className="text-whiteSmoke hover:underline text-xl"
            >
              Crear Producto
            </NavLink>
          </div>

          <div className="flex items-center">
            <IoMdCreate className="mr-2" />
            <NavLink
              to="/dashboard/registeredUser"
              className="text-whiteSmoke hover:underline text-xl"
            >
              Usuarios registrados
            </NavLink>
          </div>
          <div className="flex items-center">
            <IoMdCreate className="mr-2" />
            <NavLink
              to="/dashboard/productList"
              className="text-whiteSmoke hover:underline text-xl"
            >
              Listado de productos
            </NavLink>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default NavbarAdmin;
