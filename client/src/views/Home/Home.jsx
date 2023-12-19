import React from "react";

import Productcards from "../../Components/Productcards/Productcards";
import Banners from "../../Components/Banners/Banners";
function Home() {
  return (
    <div className="flex flex-col items-center">
      <Banners />
      <div className="flex flex-col items-center mt-8">

        <Productcards />
      </div>
    </div>
  );
}

export default Home;
