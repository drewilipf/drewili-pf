import React, { useEffect, useState } from "react";
import { FaLock } from 'react-icons/fa';
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const ForgetPassword = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const userData = location.state;

  const [emailData, setEmaildata] = useState({
    username: "",
    email: "",
    otp: "",
  });
  
const [errors, setErrors] =  useState({ email: ""})

  useEffect(() => {
    console.log(userData);
    if (userData) {
      // Genera el OTP una vez cuando userData está presente
      const OTP = Math.floor(Math.random() * 9000 + 1000);
      setEmaildata({
        username: userData.username,
        otp: OTP,
      });
    }
  }, [userData]);

  const regexemail = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;


  const handleChange = (event) => {
    const { name, value } = event.target;
  
    // Validación de correo electrónico
    if (name === "email" && !regexemail.test(value)) {
      setErrors({ email: "Por favor ingrese un correo válido" });
    } else {
      setErrors({ email: "" });
    }
  
    setEmaildata({
      ...emailData,
      [name]: value,
    });
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (emailData && emailData.email) {
      console.log("Datos email enviados al thunk:", emailData);
      // Completa la lógica de dispatch según tus necesidades
      // dispatch(postNotificationAdminConfirmBuy(emailData));
      navigate('/otpinput', { state: emailData });
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-chiliRed text-4xl mb-6">
        <FaLock />
      </div>
      <h1 className=" text-xl mb-6">Recupera tu cuenta {emailData.username}</h1>
      <div className="w-1/2">
        <label className="block text-chiliRed mb-2">Ingresa tu correo:</label>
        <input
          type="email"
          name="email"
          placeholder="Ingrese su correo electronico"
          value={emailData.email}
          onChange={handleChange}
          className="border rounded p-3 w-full bg-whiteSmoke focus:outline-none"
        />
        <span className="text-chiliRed">{errors?.email}</span>
      </div>
      <button
        type="submit"
        onClick={handleSubmit}
        className={`bg-chiliRed text-whiteSmoke mt-6 py-3 px-6 rounded-full w-1/4 ${
          !emailData.email && "opacity-50 cursor-not-allowed"
        }`}
        disabled={!emailData.email || errors.email}
      >
        Enviar código
      </button>
    </div>
  );
};

export default ForgetPassword;


