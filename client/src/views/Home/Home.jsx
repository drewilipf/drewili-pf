import React, { useEffect } from "react";
import Productcards from "../../Components/Productcards/Productcards";
import Banners from "../../Components/Banners/Banners";
import FilterPriceComponent from "../../Components/FilterComponents/priceFilterComponent";
import ColorFilterComponent from "../../Components/FilterComponents/colorFilterComponent";
import BrandFilterComponent from "../../Components/FilterComponents/brandFilterComponent";
import SortByPriceButtons from "../../Components/FilterComponents/sortByPriceComponent";
import Pagination from "../../Components/Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../reduxToolkit/Product/productThunks";
import ProductFilter from "../../Components/FilterComponents/productfilter";

function Home({ actualPage, handlePageChange, setActualPage }) {
  const { products } = useSelector((state) => state.products);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  if (!products) {
    return <div>Cargando...</div>;
  }
  if (!Array.isArray(products)) {
    console.error("El estado de los productos no es un array:", products);
    return <div>Error al cargar los productos</div>;
  }
  const cardsXpage = 9;
  const indexOfLastCard = actualPage * cardsXpage;
  const indexOfFirstCard = indexOfLastCard - cardsXpage;
  const currentCards = products.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(products.length / cardsXpage);

  return (
    <div className="flex flex-col md:flex-row md:items-start justify-center w-full pt-8 sm:items-center">
      <div className="mb-2 md:mr-2 md:w-56 bg-whiteSmoke border border-chiliRed flex flex-col items-center justify-center p-2">
        <SortByPriceButtons setActualPage={(num) => setActualPage(num)} />
        <ProductFilter setActualPage={(num) => setActualPage(num)} />
      </div>

      {/* <div className="lg:w-full mr-4 ">
        <Banners />
      </div> */}
      <div className="w-full md:w-auto border border-chiliRed bg-whiteSmoke p-2 mb-2">
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
