import React, { useState } from "react";
import Productcards from "../../Components/Productcards/Productcards";
import Banners from "../../Components/Banners/Banners";
import FilterPriceComponent from "../../Components/FilterComponents/priceFilterComponent";
import ColorFilterComponent from "../../Components/FilterComponents/colorFilterComponent";
import BrandFilterComponent from "../../Components/FilterComponents/brandFilterComponent";
import SortByPriceButtons from "../../Components/FilterComponents/sortByPriceComponent";
import Pagination from "../../Components/Pagination/Pagination";
import { useSelector } from "react-redux";

function Home({ actualPage, handlePageChange, setActualPage }) {
  const { products } = useSelector((state) => state.products);

  if (!products) {
    return <div>Cargando...</div>;
  }
  const cardsXpage = 8;
  const indexOfLastCard = actualPage * cardsXpage;
  const indexOfFirstCard = indexOfLastCard - cardsXpage;
  const currentCards = products.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(products.length / cardsXpage);

  return (
    <div className="flex items-center justify-center">
      <div className="w-4/5 p-4 mt-4 mx-auto">
        <div className="mt-10 flex">
          <div className="lg:w-[20%] mb-4">
            <BrandFilterComponent setActualPage={(num) => setActualPage(num)} />
            <ColorFilterComponent setActualPage={(num) => setActualPage(num)} />
            <FilterPriceComponent setActualPage={(num) => setActualPage(num)} />
            <SortByPriceButtons setActualPage={(num) => setActualPage(num)} />
          </div>
          <div>
            <div className="lg:w-full mr-4 ">
              <Banners />
            </div>
            <div className="lg:w-full mb-4">
              <Productcards products={currentCards} />
              <Pagination
                handlePage={handlePageChange}
                actualPage={actualPage}
                totalPages={totalPages}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
