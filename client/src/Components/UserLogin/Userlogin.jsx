import { useEffect, useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

function UserLogin({}) {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const handleChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/login", input, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        alert("inicio de sesión exitoso");
        setInput({
          username: "",
          password: "",
        });

        navigate("/");
      } else {
        console.error("Error en inicio de sesión:", response.data.error);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-40">
      <h1 className="text-2xl font-bold mb-4 flex items-center justify-center">
        UserLogin
      </h1>
      <form
        className="border border-chiliRed rounded p- text-arial text-base flex-col flex items-center justify-center "
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
    </div>
  );
}

export default UserLogin;
