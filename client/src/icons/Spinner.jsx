import React, { useState, useEffect } from "react";
import styles from "./spinner.module.css";

const Spinner = () => {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowMessage(true);
    }, 8000);

    // Limpia el temporizador al desmontar el componente
    return () => clearTimeout(timeoutId);
  }, []); // El array vacío asegura que este efecto solo se ejecute una vez al montar el componente

  return (
    <div>
      {!showMessage ? (
        <span className={styles.loader}></span>
      ) : (
        <p className="text-chiliRed font-bold">
          ¡Lo sentimos, no hay productos con esas especificaciones!
        </p>
      )}
    </div>
  );
};

export default Spinner;
