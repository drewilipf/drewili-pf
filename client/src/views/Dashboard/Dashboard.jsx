import React from "react";

import NavbarAdmin from "../../Components/DashboardComponents/NavbarAdmin/NavbarAdmin";

function Dashboard() {
  return (
    <div className="flex flex-col items-center">
      <NavbarAdmin />
      <h1 className="text-2xl font-bold mb-4 pt-5 text-center">
        PANEL DE ADMINISTRADOR
      </h1>
      <img src="./peru.jpg" alt="Perú" />
    </div>
  );
}

export default Dashboard;
