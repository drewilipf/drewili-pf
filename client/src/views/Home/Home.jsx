import React from "react";
import Productcards from "../../Components/Productcards/Productcards";
import Banners from "../../Components/Banners/Banners";
import FilterPriceComponent from "../../Components/FilterComponents/priceFilterComponent";
import ColorFilterComponent from "../../Components/FilterComponents/colorFilterComponent";
import BrandFilterComponent  from "../../Components/FilterComponents/brandFilterComponent";
// import CategoryDropdown from "../../Components/FilterComponents/categoryFilterComponent"

function Home() {
  return (
    <div className="flex flex-col items-center">
      <Banners />
      <div className="mt-10">
        <BrandFilterComponent/>
        <ColorFilterComponent/>
        <FilterPriceComponent />
        <Productcards />
      </div>
    </div>
  );
}

export default Home;
