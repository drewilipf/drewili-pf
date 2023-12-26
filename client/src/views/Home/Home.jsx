import React from "react";
import Productcards from "../../Components/Productcards/Productcards";
import Banners from "../../Components/Banners/Banners";
import FilterPriceComponent from "../../Components/FilterComponents/priceFilterComponent";

function Home() {
  return (
    <div className="flex flex-col items-center">
      <Banners />
      <div className="mt-10">
        <FilterPriceComponent />
        <Productcards />
      </div>
    </div>
  );
}

export default Home;
