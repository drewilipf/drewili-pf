import React from "react";
import CreateProduct from "../../Components/DashboardComponents/CreateProduct/CreateProduct";
import NavbarAdmin from "../../Components/DashboardComponents/NavbarAdmin/NavbarAdmin";

function Dashboard() {
  return (
    <div>
      <NavbarAdmin />
      <h1 className="text-center">PANEL DE ADMINISTRADOR</h1>
    </div>
  );
}

export default Dashboard;
