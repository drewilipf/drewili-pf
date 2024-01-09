import React, { useState, useEffect } from "react";
import NavbarAdmin from "../NavbarAdmin/NavbarAdmin";

const ShoppingHistory = () => {
  return (
    <div className="ml-[20%]">
      <NavbarAdmin />
      <h1 className="text-2xl font-bold mb-4 text-center">
        Historial de Ventas
      </h1>
    </div>
  );
};
export default ShoppingHistory;
