import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserId, putUser } from "../../reduxToolkit/User/userThunks";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const ShippingForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);
  const { login } = useSelector((state) => state.login);

  const userSessionFromCookies = Cookies.get("userSession");
  const userSession = userSessionFromCookies
    ? JSON.parse(userSessionFromCookies)
    : null;

  const userId =
    (userSession && userSession.userId) || (login && login.userSession.userId);
  const userName =
    (userSession && userSession.name) || (login && login.userSession.name);
  const userLastname =
    (userSession && userSession.lastname) ||
    (login && login.userSession.lastname);

  const [editable, setEditable] = useState({
    address: "",
  });

  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn(!isOn);
  };

  const styles =
    "w-[50%] px-8 py-1.5 text-lg text-eerieBlack leading-tight bg-whiteSmoke border rounded focus:outline-none focus:shadow-outline";

  useEffect(() => {
    dispatch(getUserId(userId));
  }, [id, dispatch]);

  useEffect(() => {
    if (user) {
      setEditable({
        address: user.address || "",
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

  return (
    <div className="h-90vh pt-5">
      <div className="bg-chiliRed bg-opacity-10 p-8 text-eerieBlack rounded-lg shadow-md w-full h-full max-w-screen-md mx-auto flex flex-col ">
        <h1 className="font-bold text-xl text-center mt-2 mb-6 ">
          Confirmación de Datos de Envío
        </h1>
        <div className="flex mb-4">
          <span className="mr-2 font-bold">Nombre y Apellido: </span>
          <span className="mr-2">{userName}</span>
          <span>{userLastname}</span>
        </div>
        <div>
          <label className="mr-2 font-bold">Dirección de envío</label>
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
        <h2 className="font-bold mt-6">¿Eres dropshipping?</h2>
        <div className="flex mb-2">
          <h2 className="mr-2">No</h2>
          <div
            className={`relative w-12 h-6 rounded-full p-1 cursor-pointer ${
              isOn ? "bg-chiliRed" : "bg-onyx"
            }`}
            onClick={handleToggle}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full transform transition-transform ${
                isOn ? "translate-x-full" : "translate-x-0"
              }`}
            />
          </div>
          <h2 className="ml-2">Sí</h2>
        </div>
        <div>
          <h2 className="font-bold mt-6">Datos del Cliente</h2>
          <div>
            <label className="mr-2 font-bold">Nombre Completo</label>
            <input
              className={styles}
              id="nameClient"
              name="nameClient"
              type="text"
            />
          </div>
          <div>
            <label className="mr-2 font-bold">Celular</label>
            <input className={styles} id="phone" name="phone" type="number" />
          </div>
          <div>
            <label className="mr-2 font-bold">Dirección</label>
            <input className={styles} id="address" name="address" type="text" />
          </div>
          <div>
            <label className="mr-2 font-bold">Nº de Identificación</label>
            <select name="" id=""></select>
            <input className={styles} id="dni" name="dni" type="number" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingForm;

/* <NavLink to={`/shippingform/${userId}`}>
  <button className="mt-4 bg-chiliRed text-white hover:bg-onyx font-bold py-2 px-4 rounded">
    Comprar
  </button>
</NavLink>; */
