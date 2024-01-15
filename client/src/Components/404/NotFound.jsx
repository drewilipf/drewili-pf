import React from 'react';
import logo from "../../../public/logoOriginal.png";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <img
        src={logo}
        alt="Logo"
        className="mb-4 max-w-1/2 p-4"
      />

      <h2 className="text-4xl font-bold mb-2">404 - Página no encontrada</h2>
    </div>
  );
};

export default NotFound;