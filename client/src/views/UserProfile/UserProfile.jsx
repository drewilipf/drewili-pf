import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../reduxToolkit/User/userThunks";

const UserProfile = () => {
  const styles = " w-full px-8 py-1.5 text-lg text-eerieBlack leading-tight bg-whiteSmoke border rounded focus:outline-none focus:shadow-outline";
  const styles2 = " text-eerieBlack text-lg";

  const user = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const [editable, setEditable] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address,
    document: user.document,
  });

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const handleFieldChange = (edit, value) => {
    setEditable((prev) => ({
      ...prev,
      [edit]: value,
    }));
  };

  const handleSaveChanges = () => {
    // Simula una solicitud al servidor
    setTimeout(() => {
      console.log("Guardando cambios en el servidor...", editable);
      console.log("Cambios guardados correctamente.");
    }, 1000);
  };

  return (
    <div className="mt-40">
      <div className="bg-chiliRed bg-opacity-10 p-8 text-eerieBlack rounded-lg shadow-md w-full h-full max-w-screen-md mx-auto flex flex-col">
        <div className="mb-4">
          <label className={styles2}>Nombre de Usuario</label>
          <input
            className={styles}
            id="username"
            type="text"
            value={editable.name}
            onChange={(e) => handleFieldChange("name", e.target.value)}
            placeholder="Nombre de usuario"
          />
        </div>

        <div className="mb-4">
          <label className={styles2}>Correo Electrónico</label>
          <input
            className={styles}
            id="email"
            type="text"
            value={editable.email}
            onChange={(e) => handleFieldChange("email", e.target.value)}
            placeholder="Correo electrónico"
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
            onChange={(e) => handleFieldChange("document", e.target.value)}
            placeholder="DNI"
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

export default UserProfile;
