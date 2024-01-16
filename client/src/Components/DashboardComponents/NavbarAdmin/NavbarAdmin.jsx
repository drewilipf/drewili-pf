import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { IoMenu, IoCloseSharp } from "react-icons/io5";
import { IoMdCreate } from "react-icons/io";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { postLogout } from "../../../reduxToolkit/Login/logoutThunks";
import Swal from "sweetalert2";

const NavbarAdmin = () => {
  const [showMenu, setShowMenu] = useState(true);
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

  useEffect(() => {
    const handleResize = () => {
      setShowMenu(window.innerWidth > 768); // Ajusta el valor 768 según sea necesario
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleclick = async () => {
    const shouldLogout = Swal.fire({
      title: "¡Atención!",
      text: "¿Está seguro de querer salir?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#E62F05",
      cancelButtonColor: "#404145",
      confirmButtonText: "Salir",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        if (login && login.userSession) {
          try {
            dispatch(postLogout());
            Cookies.remove("userSession");
            navigate("/");
          } catch (error) {
            console.error("Error al cerrar sesión:", error);
          }
        } else {
          Cookies.remove("userSession");
          navigate("/");
        }

        navigate("/");
      }
    });
  };

  return (
    <div
      className={`fixed left-0 h-screen w-[18 %] bg-eerieBlack lg-static transition-all duration-100 ${
        showMenu ? "top-0 " : "-top-full"
      }`}
    >
      <div className="flex flex-col items-center justify-center p-8 gap-2 h-[30vh]">
        <NavLink to="/dashboard" className="flex items-center">
          <div className="w-20 h-20 rounded mt-2">
            <img src="\logoWhite.png" alt="drewili" />
          </div>
        </NavLink>
        <h1 className="text-2xl text-whiteSmoke font-bold">
          {combinedUserSession}
        </h1>
        <div
          className="text-whiteSmoke py-2 px-2 hover:underline"
          onClick={handleclick}
        >
          Cerrar Sesión
        </div>
      </div>

      <div
        className={`bg-chiliRed p-8 rounded-tr-[100px] h-[70vh] flex-col justify-between gap-8 ${
          showMenu ? "overflow-y-hidden" : ""
        }`}
      >
        <nav className="flex flex-col gap-8">
          <div className="flex items-center">
            <IoMdCreate className="mr-2" />
            <NavLink to="/" className="text-whiteSmoke hover:underline text-xl">
              Vista de Usuario
            </NavLink>
          </div>
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
          <div className="flex items-center">
            <IoMdCreate className="mr-2" />
            <NavLink
              to="/dashboard/shoppingHistory"
              className="text-whiteSmoke hover:underline text-xl"
            >
              Historias de Ventas
            </NavLink>
          </div>
          <div className="flex items-center">
            <IoMdCreate className="mr-2" />
            <NavLink
              to="/dashboard/statistics"
              className="text-whiteSmoke hover:underline text-xl"
            >
              Estadísticas
            </NavLink>
          </div>
        </nav>
      </div>
      <div>
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="lg:hidden fixed left-4 top-4 text-2xl bg-chiliRed p-2.5 rounded-full text-white"
        >
          {showMenu ? <IoCloseSharp /> : <IoMenu />}
        </button>
      </div>
    </div>
  );
};

export default NavbarAdmin;
