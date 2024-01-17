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
import Swal from "sweetalert2";

function VerificationSuccess() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const datasent = location.state;
  const userputResult = useSelector((state) => state.users.userModificationResult);

  

  const [input, setInput] = useState({
    newpassword: "",
  newpasswordconfirmation: "",
    
  });
  const [errors, setErrors] =  useState({ newpassword: "",
  newpasswordconfirmation: "",})

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
    
  }, [datasent, input]);
const regexpassword= /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}|<>?]).{8,}$/;

  const handleChange = (event) => {
    const { name, value } = event.target;

    let errors = {
      newpassword : ""
    }
   
   if (!input.newpassword) {
    errors.newpassword = "Por favor ingrese una constraseña"
}

const regexPassword1 = /[a-z]/
if (!regexPassword1.test(input.newpassword)) {
    errors.newpassword = "La constraseña debe tener al menos una letra minúscula ";
}
const regexPassword2 = /[A-Z]/
if (!regexPassword2.test(input.newpassword)) {
    errors.newpassword = "La constraseña debe tener al menos una letra mayúscula ";
}
const regexPassword3 = /\d/
if (!regexPassword3.test(input.newpassword)) {
    errors.newpassword = "La constraseña debe tener al menos un dígito ";
}
const regexPassword4 = /[!@#$%^&*()?¿¡\-_+=.,;:'"<>{}[\]\|\/\\`~]+/
if (!regexPassword4.test(input.newpassword)) {
    errors.newpassword = "La constraseña debe tener al menos un carácter especial";
}
const longitud = 8
if (input.newpassword.length<longitud) {
    errors.newpassword = "La constraseña debe tener una logintud mínima de 8";
}

if (errors.newpassword != "") {
  setErrors({ newpassword: errors.newpassword });
} else {
  setErrors({ password: "" });
}
  
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
    
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      if ( !errors.newpassword && input.newpasswordconfirmation && input.newpassword === input.newpasswordconfirmation) {
        const action = putPassRecovery(putdata);
        const actionResult = await dispatch(action);
        
        
        if(userputResult == "200"){
          
          Swal.fire({
            title: '¡Éxito!',
            text: "Actualización de contraseña correcta.",
            icon: 'success',
            confirmButtonColor: "#E62F05",
            confirmButtonText: 'Ok'});
          
          navigate("/userlogin");
        }
      } else {
        throw new Error("Las contraseñas no coinciden");
      }
    } catch (error) {
      console.error("Error al enviar datos:", error.message);
      
      Swal.fire({
        title: '¡Error!',
        text: "Procedimiento incorrecto. Por favor, verifique los datos ingresados.",
        icon: 'error',
        confirmButtonColor: "#E62F05",
        confirmButtonText: 'Ok'});
      
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
            <span className="text-chiliRed">{errors?.newpassword}</span>
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