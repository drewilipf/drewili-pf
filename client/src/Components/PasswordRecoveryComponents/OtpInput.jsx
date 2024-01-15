import React, { useEffect, useState } from "react";
import { FaLock } from 'react-icons/fa';
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postNotificationRecoveryPassword } from "../../reduxToolkit/Notification/notificationThunks"
import Swal from "sweetalert2";

const OtpInput = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const datasent = location.state;

  const [timerCount, setTimer] = useState(300);
  const [OTPinput, setOTPinput] = useState([0, 0, 0, 0]);
  const [disable, setDisable] = useState(true);
  const [recoveryData, setRecoveryData] = useState({
    username: "",
    email: "",
    otp: "",
  });
 
  function resendOTP() {
    if (!disable) {
      const OTP = Math.floor(Math.random() * 9000 + 1000);  
      const newRecoveryData = {
        username: datasent.username,
        email: datasent.email,
        otp: OTP,
      };
  
      dispatch(postNotificationRecoveryPassword(newRecoveryData));
  
      setRecoveryData(newRecoveryData);
      setDisable(true)
      setTimer(300)
      navigate('/otpinput', { state: newRecoveryData });
      Swal.fire({
        title: '¡Éxito!',
        text: "Se ha enviado el nuevo código",
        icon: 'success',
        confirmButtonColor: "#E62F05",
        confirmButtonText: 'Ok'});
      
    }
  }
  
  useEffect(() => {
   // para actualizar el estado local con los datos enviados al correo
    if (datasent) {
      setRecoveryData({
        username: datasent.username,
        email: datasent.email,
        otp: datasent.otp,
        
      });
    }
    //para setear el contador del nuevo envío del código
    let interval = setInterval(() => {
        setTimer((lastTimerCount) => {
          lastTimerCount <= 1 && clearInterval(interval);
          if (lastTimerCount <= 1) setDisable(false);
  
          const minutes = Math.floor(lastTimerCount / 60);
          const seconds = lastTimerCount % 60;
  
          if (lastTimerCount <= 0) return lastTimerCount;
          return lastTimerCount - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
      
    }, [datasent, disable]);


  function verfiyOTP() {
    if (parseInt(OTPinput.join("")) === recoveryData.otp) {
      navigate('/verificationsuccess', { state: recoveryData });
      return;
    }
    Swal.fire({
      title: '¡Error!',
      text: "El código ingresado no es correcto, por favor ingreselo correctamente o solicite uno nuevo",
      icon: 'error',
      confirmButtonColor: "#E62F05",
      confirmButtonText: 'Ok'});
    ;
    return;
  }



  return (
    <div className="flex flex-col items-center justify-center text-center space-y-2">
    <div className="font-semibold text-3xl text-chiliRed">
      <FaLock />
    </div>
    <h1 className="font-semibold text-3xl"> Código de verificación</h1>
    <br></br>
    <div className="flex flex-row text-sm font-medium ">
      <p>{recoveryData.username} te enviamos un código a tu email {recoveryData.email}</p>
    </div>
    <br></br>
    <form className="w-full max-w-xs">
      <div className="flex flex-row items-center justify-between mx-auto">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="w-16 h-16 ">
            <input
              maxLength="1"
              className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-chiliRed text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
              type="text"
              name=""
              id=""
              onChange={(e) => {
                const updatedInput = [...OTPinput];
                updatedInput[index] = e.target.value;
                setOTPinput(updatedInput);
              }}
            ></input>
          </div>
        ))}
      </div>
      <br></br>
      <div>
        <a
          onClick={() => verfiyOTP()}
          className="flex flex-row cursor-pointer items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-chiliRed border-none text-white text-sm shadow-sm"
        >
          Verifica tu cuenta
        </a>
      </div>
      <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
        <p>No recibiste el código?</p>{" "}
        <a
          className={`flex flex-row items-center ${
            disable
              ? "text-gray-500 cursor-not-allowed"
              : "text-chiliRed cursor-pointer underline"
          }`}
          onClick={() => resendOTP()}
        >
          {disable ? `Reenviar código en ${Math.floor(timerCount / 60)}:${timerCount % 60}s` : "Reenviar código"}
        </a>
      </div>
    </form>
  </div>
);
};

export default OtpInput;



