import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { IoMdCreate } from "react-icons/io";
import Cookies from "js-cookie";

const UserProfile = () => {
  const { login } = useSelector((state) => state.login);
  const navigate = useNavigate();

  let userSessionFromCookies = Cookies.get("userSession");
  const userSession = userSessionFromCookies
    ? JSON.parse(userSessionFromCookies)
    : null;

  if (!login || !login.userSession || !userSessionFromCookies) {
    navigate("/");
  }

  const username =
    userSession.username || (login && login.userSession.username);
  const name = userSession.name || (login && login.userSession.name);
  const lastname =
    userSession.lastname || (login && login.userSession.lastname);
  const email = userSession.email || (login && login.userSession.email);
  const address = userSession.address || (login && login.userSession.address);
  const id = userSession.userId || (login && login.userSession.userId);

  return (
    <div className="mt-16 flex items-center justify-center">
      <div className="bg-chiliRed bg-opacity-10 p-8 text-eerieBlack rounded-lg shadow-md w-full max-w-screen-md mx-auto relative">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-semibold">{username}</h1>
          <div className="flex items-center gap-2">
            <NavLink
              to={`/edituserprofile/${id}`}
              className="text-chiliRed underline flex items-center"
            >
              <IoMdCreate className="mr-1" />
              Editar
            </NavLink>
          </div>
        </div>
        <div className="mb-4">
          <span className="font-semibold">Nombre:</span> {name}
        </div>
        <div className="mb-4">
          <span className="font-semibold">Apellido:</span> {lastname}
        </div>
        <div className="mb-4">
          <span className="font-semibold">Correo Electrónico:</span> {email}
        </div>
        <div className="mb-4">
          <span className="font-semibold">Dirección:</span> {address}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
