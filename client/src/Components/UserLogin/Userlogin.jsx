import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postLogin } from "../../reduxToolkit/Login/loginThunks";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
// import LoginButton from "../LoginButton";

function UserLogin() {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };

  const handleSuccessfulLogin = (userSession) => {
    // Guardar información de sesión en una cookie
    Cookies.set("userSession", JSON.stringify(userSession), { expires: 7 });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const loginData = {
      username: input.username,
      password: input.password,
    };

    try {
      const response = await dispatch(postLogin(loginData));

      const { message, access, userSession } = response.data;
      alert(message);

      if (access && userSession) {
        handleSuccessfulLogin(userSession);

        if (userSession.role === "admin") {
          navigate("/dashboard");
        } else if (userSession.role === "cliente") {
          navigate("/");
        }
      }
    } catch (error) {
      const userClickedOk = window.confirm(
        "Usuario NO registrado o deshabilitado. ¿Quieres ir a la página de registro?"
      );
      if (userClickedOk) {
        navigate("/userform");
      }
    }
  };

  return (
    <div className="w-96  mr-auto ml-auto h-90vh pt-16">
      <h1 className="text-2xl font-bold mb-4 flex items-center justify-center">
        UserLogin
      </h1>
      <form
        className="border border-chiliRed rounded p-6 text-arial text-base"
        onSubmit={handleSubmit}
      >
        <div>
          <div>
            <label className="block text-chiliRed mb-2">Usuario</label>
            <input
              type="text"
              name="username"
              placeholder="Ingrese su usuario"
              value={input.username}
              onChange={handleChange}
              className="border rounded p-3 w-full bg-whiteSmoke focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-chiliRed mb-2">Contraseña</label>
            <input
              type="password"
              name="password"
              placeholder="Ingrese su Contraseña"
              value={input.password}
              onChange={handleChange}
              className="border rounded p-3 w-full bg-whiteSmoke focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="bg-chiliRed text-whiteSmoke mt-6 py-3 px-6 rounded-full w-full"
          >
            Enviar
          </button>
        </div>
      </form>
      {/* <LoginButton></LoginButton> */}
    </div>
  );
}

export default UserLogin;
