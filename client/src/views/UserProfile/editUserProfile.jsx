import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { putUser } from "../../reduxToolkit/User/userThunks";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const EditUserProfile = () => {
  const styles =
    "w-full px-8 py-1.5 text-lg text-eerieBlack leading-tight bg-whiteSmoke border rounded focus:outline-none focus:shadow-outline";
  const styles2 = "text-eerieBlack text-lg";

  const { login } = useSelector((state) => state.login);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userSessionFromCookies = Cookies.get("userSession");
  const userSession = userSessionFromCookies
    ? JSON.parse(userSessionFromCookies)
    : null;
  const [editable, setEditable] = useState({
    username: userSession.username || (login && login.userSession.username),
    name: userSession.name || (login && login.userSession.name),
    lastname: userSession.lastname || (login && login.userSession.lastname),
    email: userSession.email || (login && login.userSession.email),
    address: userSession.address || (login && login.userSession.address),

    password: "", // Initialize with an empty string
    newPassword: "", // New password field
  });

  const handleFieldChange = (event) => {
    const { name, value } = event.target;

    setEditable((prevEditable) => ({
      ...prevEditable,
      [name]: value,
    }));
  };

  const handleSaveChanges = async (event) => {
    event.preventDefault();
    try {
      // Check if the user is changing the password
      const isChangingPassword = editable.newPassword !== "";

      const userData = {
        username: editable.username,
        name: editable.name,
        lastname: editable.lastname,
        email: editable.email,
        password: isChangingPassword ? editable.password : undefined, // Pass undefined if not changing password
        newPassword: isChangingPassword ? editable.newPassword : undefined, // Pass undefined if not changing password
        address: editable.address,
      };

      await dispatch(putUser(id, userData));
      alert("Datos actualizados correctamente");
      navigate("/userprofile");
    } catch (error) {
      alert("Error al actualizar los datos");
    }
  };

  return (
    <div className="mt-40">
      <div className="bg-chiliRed bg-opacity-10 p-8 text-eerieBlack rounded-lg shadow-md w-full h-full max-w-screen-md mx-auto flex flex-col">
        <div className="mb-4">
          <label className={styles2}>Nombre de Usuario</label>
          <input
            className={styles}
            id="username"
            name="username"
            type="text"
            value={editable.username}
            onChange={handleFieldChange}
            placeholder="Nombre de usuario"
          />
        </div>
        <div className="mb-4">
          <label className={styles2}>Nombre</label>
          <input
            className={styles}
            id="name"
            name="name"
            type="text"
            value={editable.name}
            onChange={handleFieldChange}
            placeholder="Nombre"
          />
        </div>
        <div className="mb-4">
          <label className={styles2}>Apellido</label>
          <input
            className={styles}
            id="lastname"
            name="lastname"
            type="text"
            value={editable.lastname}
            onChange={handleFieldChange}
            placeholder="Apellido"
          />
        </div>

        <div className="mb-4">
          <label className={styles2}>Correo Electrónico</label>
          <input
            className={styles}
            id="email"
            name="email"
            type="text"
            value={editable.email}
            onChange={handleFieldChange}
            placeholder="Correo electrónico"
          />
        </div>

        <div className="mb-4">
          <label className={styles2}>Dirección</label>
          <input
            className={styles}
            id="address"
            name="address"
            type="text"
            value={editable.address}
            onChange={handleFieldChange}
            placeholder="Dirección"
          />
        </div>

        <div className="mb-4">
          <label className={styles2}>Contraseña Actual</label>
          <input
            className={styles}
            id="password"
            name="password"
            type="password"
            value={editable.password}
            onChange={handleFieldChange}
            placeholder="Contraseña actual"
          />
        </div>

        <div className="mb-4">
          <label className={styles2}>Nueva Contraseña</label>
          <input
            className={styles}
            id="newPassword"
            name="newPassword"
            type="password"
            value={editable.newPassword}
            onChange={handleFieldChange}
            placeholder="Nueva contraseña (opcional)"
          />
        </div>

        <div className="flex items-center justify-center">
          <button
            className="w-full text-eerieBlack px-6 py-2 rounded text-xl bg-chiliRed shadow-xl bg-opacity-20 transition duration-300 hover:bg-opacity-60"
            type="submit"
            onClick={handleSaveChanges}
          >
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserProfile;
