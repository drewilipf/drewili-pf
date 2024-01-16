import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserId, putUser } from "../../reduxToolkit/User/userThunks";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const EditUserProfile = () => {
  const styles =
    "w-full px-8 py-1.5 text-lg text-eerieBlack leading-tight bg-whiteSmoke border rounded focus:outline-none focus:shadow-outline";
  const styles2 = "text-eerieBlack text-lg";

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.users.user);
  const { login } = useSelector((state) => state.login);
  const { usersGoogle } = useSelector((state) => state.users);
  const userSessionFromCookies = Cookies.get("userSession");
  const userGoogleFromCookies = Cookies.get("userGoogle");
  const userSession = userSessionFromCookies
    ? JSON.parse(userSessionFromCookies)
    : null;
  const userGoogleSession = userGoogleFromCookies
    ? JSON.parse(userGoogleFromCookies)
    : null;

  const combinedUserSession =
    userSession && userSession.role
      ? userSession.role
      : login && login.userSession
      ? login.userSession.role
      : usersGoogle && usersGoogle.role
      ? user.role
      : userGoogleSession && userGoogleSession.role
      ? userGoogleSession.role
      : null;

  const [editable, setEditable] = useState({
    username: "",
    name: "",
    lastname: "",
    email: "",
    address: "",
    password: "",
    newPassword: "",
    role: "",
    deleted: "false",
  });
  useEffect(() => {
    dispatch(getUserId(id));
  }, [id, dispatch]);

  // Actualizar el estado editable cuando cambien los datos del usuario
  useEffect(() => {
    if (user) {
      setEditable({
        username: user.username || "",
        name: user.name || "",
        lastname: user.lastname || "",
        email: user.email || "",
        address: user.address || "",
        password: "",
        newPassword: "",
        role: user.role || "",
        deleted: user.deleted || "false",
      });
    }
  }, [user]);
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
        role: editable.role,
        deleted: editable.deleted,
      };

      await dispatch(putUser(id, userData));
      Swal.fire({
        title: "¡Éxito!",
        text: "Datos actualizados correctamente",
        icon: "success",
        confirmButtonColor: "#E62F05",
      });

      if (combinedUserSession !== "admin") {
        navigate(`/userprofile/${id}`);
      } else {
        navigate(`/dashboard/registeredUser`);
      }
      setEditable({
        username: user.username,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        address: user.address,
        password: "",
        newPassword: "",
        role: user.role,
        deleted: user.deleted,
      });
    } catch (error) {
      Swal.fire({
        title: "¡Error!",
        text: "Error al actualizar los datos",
        icon: "error",
        confirmButtonColor: "#E62F05",
      });
    }
  };

  return (
    <div className="mt-2 mb-4">
      <div className="mt-42">
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

          {combinedUserSession !== "admin" && (
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
                disabled={combinedUserSession === "admin"}
              />
            </div>
          )}

          {combinedUserSession !== "admin" && (
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
                disabled={combinedUserSession === "admin"}
              />
            </div>
          )}
          {combinedUserSession === "admin" && (
            <div className="mb-4">
              <label className={styles2}>Rol</label>
              <select
                className={styles}
                id="role"
                name="role"
                value={editable.role}
                onChange={handleFieldChange}
                disabled={combinedUserSession !== "admin"}
              >
                <option value="admin">Administrador</option>
                <option value="cliente">Cliente</option>
              </select>
            </div>
          )}
          {combinedUserSession === "admin" && (
            <div className="mb-4">
              <label className={styles2}>Estado</label>
              <select
                className={styles}
                id="deleted"
                name="deleted"
                value={editable.deleted}
                onChange={handleFieldChange}
                disabled={combinedUserSession !== "admin"}
              >
                <option value="true">Inactivo</option>
                <option value="false">Activo</option>
              </select>
            </div>
          )}

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
    </div>
  );
};

export default EditUserProfile;
