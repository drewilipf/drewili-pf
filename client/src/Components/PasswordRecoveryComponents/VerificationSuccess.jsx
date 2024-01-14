import React, { useState, useEffect} from "react";
import { useDispatch , useSelector} from "react-redux";
import { postLogin } from "../../reduxToolkit/Login/loginThunks";
import Cookies from "js-cookie";
import LoginButton from "../LoginButton";
import { NavLink} from "react-router-dom";
import { FaLock } from 'react-icons/fa';
import { useLocation, useNavigate } from "react-router-dom";
import { postNotificationRecoveryPassword } from "../../reduxToolkit/Notification/notificationThunks"
import { putPassRecovery } from "../../reduxToolkit/User/userThunks";

function VerificationSuccess() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const datasent = location.state;
  const userputResult = useSelector((state) => state.users.userModificationResult);

  console.log("estos son los datos que recibe del componente anterior", datasent);

  const [input, setInput] = useState({
    newpassword: "",
    newpasswordconfirmation: "",
  });

  const [putdata, setPutdata] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (datasent) {
      setPutdata({
        username: datasent.username,
        password: input.newpassword,
      });
    }
    console.log("data para el put actual", putdata);
  }, [datasent, input]);

  const handleChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
    console.log(input);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      if (input.newpassword && input.newpasswordconfirmation && input.newpassword === input.newpasswordconfirmation) {
        const action = putPassRecovery(putdata);
        const actionResult = await dispatch(action);
        console.log("Datos del componente enviados al thunk", putdata);
        console.log("user put result", userputResult)
        if(userputResult == "200"){
          console.log("cambio correcto")
          alert("Actualización de contraseña correcta");
          navigate("/userlogin");
        }
        
        
      } else {
        throw new Error("Las contraseñas no coinciden");
      }
    } catch (error) {
      console.error("Error al enviar datos:", error.message);
      // Mostrar mensaje de error al usuario
      alert("Procedimiento incorrecto. Por favor, verifique los datos ingresados.");
    }
  };
  
  return (
    <div className="w-96  mr-auto ml-auto h-90vh pt-16">
      <h1 className="text-2xl font-bold mb-4 flex items-center justify-center">
        Identidad verificada
      </h1>
      <h3 className="text-l mb-4 flex items-center justify-center"> Por favor digite su nueva contraseña</h3>
      <br></br>
      <form
        className="border border-chiliRed rounded p-6 text-arial text-base"
        onSubmit={handleSubmit}
      >
        <div>
          <div>
            <label className="block text-chiliRed mb-2">Contraseña</label>
            <input
              type="password"
              name="newpassword"
              placeholder="Ingrese su nueva contraseña"
              value={input.newpassword}
              onChange={handleChange}
              className="border rounded p-3 w-full bg-whiteSmoke focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-chiliRed mb-2"> repetir Contraseña</label>
            <input
              type="password"
              name="newpasswordconfirmation"
              placeholder="Repita su contraseña"
              value={input.newpasswordconfirmation}
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

export default VerificationSuccess;