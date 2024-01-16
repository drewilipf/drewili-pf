import React, { useState, useEffect } from "react";
import validation from "./validation";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postUser } from "../../reduxToolkit/User/userThunks";
import { postNotificationCreation } from "../../reduxToolkit/Notification/notificationThunks";
import LoginButton from "../LoginButton";
import ReCAPTCHA from "react-google-recaptcha";
import Swal from "sweetalert2";

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
  const [isRecaptcha, setIsRecaptcha] = useState(false);

  const [maildata, setMaildata] = useState({
    name: "",
    email: "",
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

    if (name === "name" || name === "email") {
      setMaildata((prevMail) => ({
        ...prevMail,
        [name]: value,
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const validationErrors = validation({ ...input, [name]: value });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validationErrors[name],
    }));
  };
  const handleIsCaptcha = (value) => {
    console.log("captcha verificado: ", value);
    setIsRecaptcha(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar si hay errores en los campos
    const validationErrors = validation(input);
    setErrors(validationErrors);

    // Comprobar si hay algún error antes de enviar la solicitud
    if (
      Object.values(validationErrors).every((error) => error === "") &&
      isRecaptcha
    ) {
      try {
        dispatch(postUser(input));

        dispatch(postNotificationCreation(maildata));

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
        });
        Swal.fire({
          title: "¡Éxito!",
          text: "Usuario creado con éxito",
          icon: "success",
          confirmButtonColor: "#E62F05",
        });
        navigate("/userlogin");
      } catch (error) {
        Swal.fire({
          title: "¡Error!",
          text: "Error al enviar el formulario",
          icon: "error",
          confirmButtonColor: "#E62F05",
        });
      }
    } else {
      setTimeout(() => {
        Swal.fire({
          title: "¡Error!",
          text: "Corrige los errores antes de enviar el formulario",
          icon: "error",
          confirmButtonColor: "#E62F05",
        });
      }, 1000);
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
          <div className="  flex items-center justify-center text-center mt-4 h-12 border rounded-full bg-chiliRed  text-white">
            <LoginButton />
          </div>
          <div className="text-center mt-4">---------- o ---------- </div>
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
            <ul className="list-disc text-onyx pl-6 mt-2 border rounded-md p-4">
              <li className="rounded-md text-sm">
                Debe tener una longitud mínima de 8 caracteres
              </li>
              <li className="rounded-md text-sm">
                Debe contener al menos una minúscula
              </li>
              <li className="rounded-md text-sm">
                Debe contener al menos una mayúscula
              </li>
              <li className="rounded-md text-sm">
                Debe contener al menos un dígito
              </li>
              <li className="rounded-md text-sm">
                Debe contener al menos un símbolo
              </li>
            </ul>

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
          <div>
            <ReCAPTCHA
              sitekey="6Lee-E0pAAAAABEFRPClDMwRwWlf5dJXyhfeVwDr"
              onChange={handleIsCaptcha}
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
        </form>
      </div>
    </>
  );
}

export default UserForm;
