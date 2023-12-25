import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { IoMdCreate } from "react-icons/io";

const NavbarAdmin = () => {
  const { login } = useSelector((state) => state.login);

  return (
    <div className="fixed top-0 left-0 h-screen w-[15%] bg-eerieBlack">
      <div className="flex flex-col items-center justify-center p-8 gap-2 h-[30vh]">
        <NavLink to="/dashboard" className="flex items-center">
          <div className="w-20 h-20 rounded  mt-2">
            <img src="\logoWhite.png" alt="drewili" />
          </div>
        </NavLink>
        <h1 className="text-2xl text-whiteSmoke font-bold">
          {login.userSession.username}
        </h1>
      </div>
      <div className="bg-chiliRed p-8 rounded-tr-[100px] h-[70vh] overflow-y-auto flex-col justify-between gap-8">
        <nav className="flex flex-col gap-8">
          <div>
            <IoMdCreate />
            <NavLink
              to="/dashboard/createProduct"
              className="text-whiteSmoke hover:underline text-xl"
            >
              Create Product
            </NavLink>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default NavbarAdmin;
