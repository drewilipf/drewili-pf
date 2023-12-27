import React from "react";
import Productcards from "../../Components/Productcards/Productcards";
import Banners from "../../Components/Banners/Banners";
import FilterPriceComponent from "../../Components/FilterComponents/priceFilterComponent";
import ColorFilterComponent from "../../Components/FilterComponents/colorFilterComponent";
// import CategoryDropdown from "../../Components/FilterComponents/categoryFilterComponent"
import SortByPriceButtons from "../../Components/FilterComponents/sortByPriceComponent";

function Home() {
  return (
    <div className="flex flex-col items-center">
      <Banners />
      <div className="mt-10">
        <ColorFilterComponent/>
        <FilterPriceComponent />
        <SortByPriceButtons/>
        <Productcards />
      </div>
    </div>
  );
}

export default Home;
