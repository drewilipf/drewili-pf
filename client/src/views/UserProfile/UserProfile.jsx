import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../reduxToolkit/Slice";
import axios from "axios";

const UserProfile = () => {
  const styles =
    "font-regular avant-garde-regular w-full px-8 py-1.5 text-lg text-Az4 leading-tight bg-gray-200 border rounded focus:outline-none focus:shadow-outline";
  const styles2 = "font-black avant-garde-regular text-Az1 text-lg";

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [editable, setEditable] = useState({
    name: user.username,
    email: user.email,
    phone: user.phone,
    address: user.address,
    document: user.document,
  });

  useEffect(() => {
    // Realizar la solicitud GET al servidor para obtener la información del usuario
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/user");
        const userData = response.data; // Ajusta esta línea según la estructura de tu respuesta
        dispatch(setUser(userData));
      } catch (error) {
        console.error("Error al obtener la información del usuario:", error);
      }
    };

    fetchUserData();
  }, [dispatch]);

  const handleFieldChange = (edit, value) => {
    setEditable((prev) => ({
      ...prev,
      [edit]: value,
    }));
  };

  const handleSaveChanges = () => {
    try {
      // Realiza alguna validación adicional si es necesario

      // Actualiza el estado del usuario utilizando la acción `setUser` del slice
      dispatch(setUser(editable));

      // Simula una solicitud al servidor
      setTimeout(() => {
        console.log("Guardando cambios en el servidor...", editable);

        console.log("Cambios guardados correctamente.");
      }, 1000);
    } catch (error) {
      console.error("Error al guardar cambios:", error);
      // Puedes manejar el error y proporcionar retroalimentación al usuario
    }
  };

  return (
    <div>
      <div className="bg-gray-100 bg-opacity-60 p-8 text-gray-900 rounded-lg shadow-md w-full h-full max-w-screen-md mx-auto flex flex-col">
        <div className="mb-4">
          <label className={styles2}>Nombre de Usuario</label>
          <input
            className={styles}
            id="username"
            type="text"
            value={editable.username}
            onChange={(e) => handleFieldChange("username", e.target.value)}
            placeholder="Nombre de usuario"
          />
        </div>

        <div className="mb-4">
          <label className={styles2}>Correo</label>
          <input
            className={styles}
            id="email"
            type="text"
            value={editable.email}
            onChange={(e) => handleFieldChange("email", e.target.value)}
            placeholder="Correo electrónico"
            disabled
          />
        </div>

        <div className="mb-4">
          <label className={styles2}>Dirección</label>
          <input
            className={styles}
            id="address"
            type="text"
            defaultValue={editable.address}
            onChange={(e) => handleFieldChange("address", e.target.value)}
            placeholder="Dirección"
          />
        </div>

        <div className="mb-4">
          <label className={styles2}>Teléfono</label>
          <input
            className={styles}
            id="number"
            type="text"
            value={editable.phone}
            onChange={(e) => handleFieldChange("phone", e.target.value)}
            placeholder="Número de teléfono"
          />
        </div>

        <div className="mb-4">
          <label className={styles2}>Documento:</label>
          <input
            className={styles}
            id="number"
            type="text"
            value={editable.document}
            onChange={(e) => handleFieldChange("nit", e.target.value)}
            placeholder="Nit"
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="avant-garde-bold font-bold w-full text-gray px-6 py-2 rounded text-xl  bg-Az3 shadow-xl bg-opacity-70 transition duration-300 hover:bg-opacity-100"
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

export default UserProfile;
