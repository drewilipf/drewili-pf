import React, { useEffect } from "react";
import Productcards from "../../Components/Productcards/Productcards";
import Banners from "../../Components/Banners/Banners";
import SortByPriceButtons from "../../Components/FilterComponents/sortByPriceComponent";
import Pagination from "../../Components/Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../reduxToolkit/Product/productThunks";
import ProductFilter from "../../Components/FilterComponents/productfilter";
import { useLocation } from "react-router-dom";
import Searchbar from "../../Components/Searchbar/Searchbar";


function Home({ actualPage, handlePageChange, setActualPage }) {
  const { products } = useSelector((state) => state.products);
  const location = useLocation()
  console.log(products);
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
    <>
      <div className="flex flex-col tablet:flex-row tablet:items-start justify-center w-full pt-2 sm:items-center">

        {/* searchbar oculta para pantallas grandes */}
        <div className="p-8 tablet:hidden shadow-md">
          {
            location.pathname === "/" && (
              <>
                <Searchbar
                  className="mx-auto"
                  setActualPage={(num) => setActualPage(num)}
                />
              </>
            )
          }
        </div>
        {/* ---------------------------------------- */}

        <div className="mb-2 tablet:mr-2 tablet:w-56 flex flex-col rounded items-center justify-center shadow-md tablet:sticky tablet:top-4 tablet:z-50">
          <ProductFilter setActualPage={(num) => setActualPage(num)} />
        </div>
        <div className="w-full md:w-auto bg-white p-2 mb-2 rounded shadow-lg">
          <div className="lg:w-full md:pl-[7%]">
            <Banners />
          </div>
          <div className="tablet:ml-[70%]">
            <SortByPriceButtons setActualPage={(num) => setActualPage(num)} />
          </div>
          <Productcards products={currentCards} />
          <Pagination
            handlePage={handlePageChange}
            actualPage={actualPage}
            totalPages={totalPages}
          />
        </div>
      </div>
    </>
  );
}

export default Home;
