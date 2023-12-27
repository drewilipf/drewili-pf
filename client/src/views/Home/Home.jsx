import React, { useState } from "react";
import Productcards from "../../Components/Productcards/Productcards";
import Banners from "../../Components/Banners/Banners";
import FilterPriceComponent from "../../Components/FilterComponents/priceFilterComponent";
import ColorFilterComponent from "../../Components/FilterComponents/colorFilterComponent";
import BrandFilterComponent from "../../Components/FilterComponents/brandFilterComponent";
import SortByPriceButtons from "../../Components/FilterComponents/sortByPriceComponent";
import Pagination from "../../Components/Pagination/Pagination";
import { useSelector } from "react-redux";

function Home() {
  const { products } = useSelector((state) => state.products);

  const [actualPage, setActualPage] = useState(1);

  const handlePageChange = (newPage) => {
    setActualPage(newPage);
  };
  if (!products) {
    return <div>Cargando...</div>;
  }
  const cardsXpage = 8;
  const indexOfLastCard = actualPage * cardsXpage;
  const indexOfFirstCard = indexOfLastCard - cardsXpage;
  const currentCards = products.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(products.length / cardsXpage);

  return (
    <div className="flex flex-col items-center">
      <Banners />
      <div className="mt-10">
        <BrandFilterComponent setActualPage={(num) => setActualPage(num)} />
        <ColorFilterComponent setActualPage={(num) => setActualPage(num)} />
        <FilterPriceComponent setActualPage={(num) => setActualPage(num)} />
        <SortByPriceButtons setActualPage={(num) => setActualPage(num)} />
        <Productcards products={currentCards} />
        <Pagination
          handlePage={handlePageChange}
          actualPage={actualPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}

export default Home;
