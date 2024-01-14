
import React, { useState, useEffect } from "react";
import { MdOutlineLightMode } from "react-icons/md";
import { MdNightlight } from "react-icons/md";

const DarkModeToggle = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (theme === "dark") {
      document.querySelector("html").classList.add("dark");
    } else {
      document.querySelector("html").classList.remove("dark");
    }
  }, [theme]);

  const handleChangeTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <button className="bg-whiteSmoke mr-8" onClick={handleChangeTheme}>
      {theme === "light" ? <MdNightlight /> : <MdOutlineLightMode />}      
    </button>
  );
};

export default DarkModeToggle;
