import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Productcards from "../../Components/Productcards/Productcards";

function Home() {
  return (
    <>
      <Navbar />

      <h1 className="mb-4 flex justify-center">Drewili Home</h1>
      <div className="mb-4">
        <h2 className="mb-20 flex justify-center">Productos más populares:</h2>
        <Productcards />
      </div>
    </>
  );
}

export default Home;
