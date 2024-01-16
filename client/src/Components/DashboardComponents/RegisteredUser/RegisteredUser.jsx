import React, { useState, useEffect } from "react";
import NavbarAdmin from "../NavbarAdmin/NavbarAdmin";
import { useDispatch, useSelector } from "react-redux";
import { deletedUser, getUser, putUser } from "../../../reduxToolkit/User/userThunks";
import { IoMdCreate } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";
import { ImBlocked } from "react-icons/im";

function RegisteredUser() {
  const { users } = useSelector((state) => state.users);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch, showSuccessMessage]);

  const onClick = async (id) => {
    const deleted = window.confirm("¿Estás seguro de desactivar el usuario?");

    if (deleted) {
      try {
        await dispatch(deletedUser(id));
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000); // Ocultar el mensaje después de 3 segundos
      } catch (error) {
        console.error("Error al eliminar el usuario", error);
      }
    }
  };
  const onClick2 = (id) => {
    const userData = { deleted: false }
    const deleted = window.confirm("¿Estás seguro de activar el usuario?");

    if (deleted) {
      try {
        dispatch(putUser(id, userData));
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000); // Ocultar el mensaje después de 3 segundos
      } catch (error) {
        console.error("Error al activar el usuario", error);
      }
    }
  }

  return (
    <div>
      <NavbarAdmin />
      <div className="container mx-auto  ">
        <h1 className=" text-2xl font-bold mb-4 pt-5 text-center">
          Usuarios Registrados
        </h1>

        {showSuccessMessage && (
          <div className=" p-2 mb-4">Usuario eliminado exitosamente</div>
        )}
        <div className=" w-screen overflow-auto  hidden md:block  ml-[18%]">
          <table className="min-w-[75%]  bg-whiteSmoke border border-onyx ">
            <thead>
              <tr>
                <th className="py-1 px-1 border-b">Nombre</th>
                <th className="py-1 px-1 border-b">Apellido</th>
                <th className="py-1 px-1 border-b">Correo Electrónico</th>
                <th className="py-1 px-1 border-b">Usuario</th>
                <th className="py-1 px-1 border-b">Dirección</th>
                <th className="py-1 px-1 border-b">Rol</th>
                <th className="py-1 px-1 border-b">Estado</th>
                <th className="py-1 px-1 border-b">Editar</th>
                <th className="py-1 px-1 border-b">Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((user) => (
                  <tr key={user.id}>
                    <td className="py-2 px-4 border-b">{user.name}</td>
                    <td className="py-2 px-4 border-b">{user.lastname}</td>
                    <td className="py-2 px-4 border-b">{user.email}</td>
                    <td className="py-2 px-4 border-b">{user.username}</td>
                    <td className="py-2 px-4 border-b">{user.address}</td>
                    <td className="py-2 px-4 border-b">{user.role}</td>
                    <td className="py-2 px-4 border-b">
                      {user.deleted ? "Inactivo" : "Activo"}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <NavLink to={`/editUserProfile/${user.id}`}>
                        <IoMdCreate />
                      </NavLink>
                    </td>
                    <td className="py-2 px-4 border-b">
                      {
                        user.deleted === false ?
                          <button onClick={() => onClick(user.id)}>
                            <FaRegCheckCircle />
                          </button> :
                          <button onClick={() => onClick2(user.id)}>
                            <ImBlocked />
                          </button>
                      }
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="grid grid-cols-1 pt-8 gap-4 md:hidden ">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-sm space-x-2">
              <div>
                {users &&
                  users.map((user) => (
                    <div key={user.id}>
                      <div className="py-2 px-4 font-bold ">
                        {user.username}
                      </div>
                      <div className="py-2 px-4 ">
                        Nombre y Apellido: {user.name} {user.lastname}
                      </div>
                      <div className="py-2 px-4 ">
                        Correo Electrónico :{user.email}
                      </div>
                      <div className="py-2 px-4 ">
                        Dirección: {user.address}
                      </div>
                      <div className="py-2 px-4 ">Rol: {user.role}</div>
                      <div className="py-2 px-4 ">
                        Estado: {user.deleted ? "Inactivo" : "Activo"}
                      </div>
                      <div className=" flex border-b space-x-4  p-4 text-xl">
                        <div className="cursor-pointer">
                          <NavLink to={`/editUserProfile/${user.id}`}>
                            <IoMdCreate />
                          </NavLink>
                        </div>
                        <div className=" cursor-pointer">
                          {
                            user.deleted === false ?
                              <button onClick={() => onClick(user.id)}>
                                <FaRegCheckCircle />
                              </button> :
                              <button onClick={() => onClick2(user.id)}>
                                <ImBlocked />
                              </button>
                          }
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisteredUser;
