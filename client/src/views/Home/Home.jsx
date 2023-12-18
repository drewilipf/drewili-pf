import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Productcards from "../../Components/Productcards/Productcards";

function Home() {
  return (
    <div>
      <Navbar />

      <div className="flex items-center mb-4">
        <h2 className="mr-4"></h2>
        <Productcards />
      </div>
    </div>
  );
}

export default Home;
