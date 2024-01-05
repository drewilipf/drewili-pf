import React, { useState, useEffect } from "react";
import NavbarAdmin from "../NavbarAdmin/NavbarAdmin";
import { useDispatch, useSelector } from "react-redux";
import { deletedUser, getUser } from "../../../reduxToolkit/User/userThunks";
import { IoMdCreate } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";

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

  return (
    <div>
      <NavbarAdmin />
      <div className="container mx-auto mt-8 ml-[25%] h-90vh">
        <h1 className="ml-[30%] text-2xl font-bold mb-4">
          Usuarios Registrados
        </h1>

        {showSuccessMessage && (
          <div className="bg-green-200 text-green-800 p-2 mb-4">
            Usuario eliminado exitosamente
          </div>
        )}
        <table className="min-w-[75%] bg-whiteSmoke border border-onyx">
          <thead>
            <tr>
              <th className="py-1 px-1 border-b">Nombre</th>
              <th className="py-1 px-1 border-b">Apellido</th>
              <th className="py-1 px-1 border-b">Correo Electrónico</th>
              <th className="py-1 px-1 border-b">Usuario</th>
              <th className="py-1 px-1 border-b">Dirección</th>
              <th className="py-1 px-1 border-b">rol</th>
              <th className="py-1 px-1 border-b">Estado</th>
              <th className="py-1 px-1 border-b">editar</th>
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
                  <td className="py-2 px-4 border-b cursor-pointer">
                    <div onClick={() => onClick(user.id)}>
                      <MdDelete />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        </div>
      </div>
  );
}

export default RegisteredUser;
