import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const UserProfile = () => {
  const { login } = useSelector((state) => state.login);
  const id = login.userSession.id;
  return (
    <div className="mt-16 flex items-center justify-center">
      <div className="bg-chiliRed bg-opacity-10 p-8 text-eerieBlack rounded-lg shadow-md w-full max-w-screen-md mx-auto">
        <NavLink to={`/edituserprofile/${id}`}>Editar</NavLink>
        <h1 className="text-3xl font-semibold mb-4">
          {login.userSession.username}
        </h1>
        <div className="mb-4">
          <span className="font-semibold">Nombre:</span>{" "}
          {login.userSession.name}
        </div>
        <div className="mb-4">
          <span className="font-semibold">Apellido:</span>{" "}
          {login.userSession.lastname}
        </div>
        <div className="mb-4">
          <span className="font-semibold">Correo Electrónico:</span>{" "}
          {login.userSession.email}
        </div>
        <div className="mb-4">
          <span className="font-semibold">Dirección:</span>{" "}
          {login.userSession.address}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
