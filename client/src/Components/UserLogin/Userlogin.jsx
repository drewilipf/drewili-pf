import React, { useState } from "react";
import axios from "axios"
import { useDispatch, useSelector } from "react-redux";
import { postLogin } from "../../reduxToolkit/Login/loginThunks";
import { getUserByUsername } from "../../reduxToolkit/User/userThunks";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import LoginButton from "../LoginButton";
import { NavLink} from "react-router-dom";
import Swal from 'sweetalert2'

function UserLogin() {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userbyusernameResult = useSelector((state) => state.users.usernameSearchResult);

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
      Swal.fire({
        title: '¡Inicio exitoso!',
        text: message,
        icon: 'success',
        confirmButtonColor: "#E62F05",
        confirmButtonText: 'Ok'});

      if (access && userSession) {
        handleSuccessfulLogin(userSession);

        if (userSession.role === "admin") {
          navigate("/dashboard");
        } else if (userSession.role === "cliente") {
          navigate("/");
        }
      }
    } catch (error) {
      setTimeout(() => {
         const userClickedOk = Swal.fire({
          title: "Error",
          text: "Usuario NO registrado o deshabilitado. ¿Quieres ir a la página de registro?",
          icon: "error",
          showCancelButton: true,
          confirmButtonColor: "#E62F05",
          cancelButtonColor: "#404145",
          confirmButtonText: "Aceptar",
          cancelButtonText: "Cancelar"
        }).then((result) => {
          if (result.isConfirmed) {
            
              navigate("/userform");
            
          }
        });
             
      }, 1000);
    }
  };

  const navigateRecovery = async () => {
    if (input.username) {
      try {
        
        //const actionResult = await dispatch(getUserByUsername(input.username));
        const response = await axios.get(`https://drewili-pf-back.onrender.com/user/username?username=${input.username}`)
        console.log("user by username result", response.status)
       
        response.status && response.status === 200
        // verificar el bug de cuando la gente usa el mismo componente dos veces
          navigate('/forgetpassword', { state: input })
       
      } catch (error) {
        console.error("Error al obtener el usuario por nombre de usuario:", error)
        window.alert(error.response.data.error);;
      }
    } else {
      alert("Por favor, ingrese su nombre de usuario");
    }
  };
  
  return (
    <div className="w-96  mr-auto ml-auto h-90vh pt-16">
      <h1 className="text-2xl font-bold mb-4 flex items-center justify-center">
        Iniciar Sesión
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
          <div className="mt-4 text-center">
            <span>¿No tiene una cuenta?</span>
            <NavLink to="/userform">
              <span className="ml-2  text-chiliRed">Regístrese</span>
            </NavLink>
          </div>
          <div className="mt-4 text-center">
              <span className="ml-2  text-chiliRed" onClick={navigateRecovery}>¿Olvidó su contraseña?</span>
          </div>
          <div className="text-center mt-4">---------- o ---------- </div>
          <div className="flex items-center justify-center text-center mt-4 h-12 border rounded-full bg-chiliRed  text-white">
            <LoginButton />
          </div>
        </div>
      </form>
    </div>
  );
}

export default UserLogin;
