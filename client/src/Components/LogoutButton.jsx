import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Cookies from "js-cookie";

const LogoutButton = () => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    Cookies.remove("userGoogle");
    logout({ returnTo: window.location.origin });
  };

  return <button className="ml-4 mb-2 mt-2"onClick={handleLogout}>Cerrar Sesión</button>;
};

export default LogoutButton;
