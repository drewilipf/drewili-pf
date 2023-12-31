import React from 'react';

const Pagination = ({ totalPages, actualPage, handlePage }) => {
    const pagesToShow = 5;
    const totalPagesArray = [];

    for (let i = 1; i <= totalPages; i++) {
        totalPagesArray.push(i);
    }

    const startPage = Math.max(actualPage - Math.floor(pagesToShow / 2), 1);
    const endPage = Math.min(startPage + pagesToShow - 1, totalPages);

    return (
        <div className="flex flex-wrap items-center justify-center space-x-2 mt-4 mb-2" id="container">
        {actualPage > 1 && (
          <button
            onClick={() => handlePage(actualPage - 1)}
            className="hover:text-chiliRed py-2 px-4"
          >
            Anterior
          </button>
        )}
      
        {actualPage > 3 && (
          <>
            <button
              onClick={() => handlePage(1)}
              className="bg-gray-300 hover:bg-gray-400 text-black py-1 px-2 rounded"
            >
              1
            </button>
            {startPage > 2 && (
              <span className="mx-1">...</span>
            )}
          </>
        )}
      
        {totalPagesArray.slice(startPage - 1, endPage).map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePage(pageNumber)}
            className={`${
              actualPage === pageNumber
                ? "bg-chiliRed text-whiteSmoke font-bold"
                : "text-black"
            } py-2 px-4 rounded border border-solid hover:border-chiliRed mb-2 md:mb-0 md:mr-2`}
          >
            {pageNumber}
          </button>
        ))}
      
        {actualPage < totalPages - 2 && (
          <>
            {endPage < totalPages - 1 && (
              <span className="mx-1 font-bold hidden md:inline-block">. . .</span>
            )}
            <button
              onClick={() => handlePage(totalPages)}
              className="text-black py-2 px-4 rounded border border-solid hover:border-chiliRed mb-2 md:mb-0 md:mr-2"
            >
              {totalPages}
            </button>
          </>
        )}
      
        {actualPage < totalPages && (
          <button
            onClick={() => handlePage(actualPage + 1)}
            className="hover:text-chiliRed py-2 px-4 rounded"
          >
            Siguiente
          </button>
        )}
      </div>
    );
};

export default Pagination;