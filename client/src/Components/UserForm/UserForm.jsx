import React, { useState, useEffect } from "react";
import validation from "./validation";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postUser } from "../../reduxToolkit/User/userThunks";
import LoginButton from "../LoginButton";

function UserForm() {
  const [input, setInput] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    address: "",
    role: "cliente",
    username: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({
    name: "",
    lastname: "",
    email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const validationErrors = validation({ ...input, [name]: value });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validationErrors[name],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar si hay errores en los campos
    const validationErrors = validation(input);
    setErrors(validationErrors);

    // Comprobar si hay algún error antes de enviar la solicitud
    if (Object.values(validationErrors).every((error) => error === "")) {
      try {
        dispatch(postUser(input));

        setInput({
          name: "",
          lastname: "",
          email: "",
          password: "",
          address: "",
          role: "cliente",
          username: "",
        });

        setErrors({
          name: "",
          lastname: "",
          email: "",
          // Agrega aquí otros campos si es necesario
        });

        alert("Usuario creado con éxito");
        navigate("/userlogin");
      } catch (error) {
        console.error("Error al enviar el formulario:", error);
      }
    } else {
      // Mostrar mensajes de error si es necesario
      console.log("Corrige los errores antes de enviar el formulario");
    }
  };
  return (
    <>
      <div className="w-96 mr-auto ml-auto ">
        <h1 className="text-2xl font-bold mb-4 flex items-center justify-center">
          Regístrate
        </h1>
        <form
          className="border border-chiliRed rounded p-6 text-arial text-base shadow-lg "
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label className="block text-chiliRed mb-2">
              Nombre de Usuario:
            </label>
            <input
              type="text"
              name="username"
              placeholder="Ingrese su Nombre de Usuario"
              value={input.username}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className="border rounded p-3 bg-whiteSmoke focus:outline-none w-full"
            />
            <div className="h-4">
              <span className="text-chiliRed text-opacity-60 items-center flex text-sm">
                {errors?.username}
              </span>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-chiliRed mb-2">Nombre:</label>
            <input
              type="text"
              name="name"
              placeholder="Ingrese su nombre"
              value={input.name}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className="border rounded p-3 w-full bg-whiteSmoke focus:outline-none"
            />
            <div className="h-4">
              <span className="text-chiliRed text-opacity-60 items-center flex text-sm">
                {errors?.name}
              </span>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-chiliRed mb-2">Apellido:</label>
            <input
              type="text"
              name="lastname"
              placeholder="Ingrese su apellido"
              value={input.lastname}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className="border rounded p-3 w-full bg-whiteSmoke focus:outline-none"
            />
            <div className="h-4">
              <span className="text-chiliRed text-opacity-60 items-center flex text-sm">
                {errors?.lastname}
              </span>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-chiliRed mb-2">
              Correo Electrónico:
            </label>
            <input
              type="text"
              name="email"
              placeholder="Ingrese su correo electrónico"
              value={input.email}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className="border rounded p-3 w-full bg-whiteSmoke focus:outline-none"
            />
            <div className="h-4">
              <span className="text-chiliRed text-opacity-60 items-center flex text-sm">
                {errors?.email}
              </span>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-chiliRed mb-2">Contraseña:</label>
            <input
              type="password"
              name="password"
              placeholder="Ingrese su contraseña"
              value={input.password}
              onChange={handleInputChange}
              className="border rounded p-3 w-full bg-whiteSmoke focus:outline-none"
            />
            <div className="h-4">
              <span className="text-chiliRed text-opacity-60 items-center flex text-sm">
                {errors?.password}
              </span>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-chiliRed mb-2">Dirección:</label>
            <input
              type="text"
              name="address"
              placeholder="Ingrese su dirección"
              value={input.address}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className="border rounded p-3 bg-whiteSmoke focus:outline-none w-full"
            />
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="bg-chiliRed text-whiteSmoke py-3 px-6 rounded-full w-full"
            >
              Regístrate
            </button>
          </div>
          <div className="text-center mt-4">---------- o ---------- </div>
          <div className="  flex items-center justify-center text-center mt-4 h-12 border rounded-full bg-chiliRed  text-white">
            <LoginButton />
          </div>
        </form>
      </div>
    </>
  );
}

export default UserForm;
