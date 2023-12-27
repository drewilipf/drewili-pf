// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { filterPrice } from "../../reduxToolkit/Filtros/filterPriceThunks";

// const FilterPriceComponent = () => {
//   const dispatch = useDispatch();
//   const [minPrice, setMinPrice] = useState("0");
//   const [maxPrice, setMaxPrice] = useState("10000");
//   const [filterButtonClicked, setFilterButtonClicked] = useState(false);

//   // Obtener los productos filtrados cuando cambian los valores del filtro o al montar el componente
//   useEffect(() => {
//     if (filterButtonClicked) {
//       dispatch(filterPrice({ minPrice, maxPrice }));
//       setFilterButtonClicked(false); // Reset the state after filtering
//     }
//   }, [minPrice, maxPrice, dispatch, filterButtonClicked]);

//   const products = useSelector((state) => state.filterPrice.products);
//   const status = useSelector((state) => state.filterPrice.status);
//   const error = useSelector((state) => state.filterPrice.error);

//   const handleFilterPrice = () => {
//     setFilterButtonClicked(true);
//   };

//   const handleClearFilter = () => {
//     // Reset filter values and trigger a new search
//     setMinPrice("0");
//     setMaxPrice("10000");
//     setFilterButtonClicked(true);
//   };

//   return (
//     <div>
//       <h2>Filter by Price</h2>
//       <div>
//         <label>Min Price:</label>
//         <input type="text" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
//       </div>
//       <div>
//         <label>Max Price:</label>
//         <input type="text" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
//       </div>
//       <button onClick={handleFilterPrice}>Filter</button>
//       <button onClick={handleClearFilter}>Clear Filter</button>

//       {status === "loading" && <p>Loading...</p>}
//       {status === "failed" && <p>Error: {error.message}</p>}
//       {status === "succeeded" && (
//         <div>
//           <h3>Filtered Products:</h3>
//           <ul>
//             {products.map((product) => (
//               <li key={product.id}>
//                 <img
//                   src={product.image}
//                   alt={product.name}
//                   style={{ width: '50px', height: '50px' }}
//                 />
//                 {product.name} - ${product.price}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FilterPriceComponent;
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { filterPrice } from "../../reduxToolkit/Filtros/filterPriceThunks";

// const FilterPriceComponent = () => {
//   const dispatch = useDispatch();
//   const [minPrice, setMinPrice] = useState(0);
//   const [maxPrice, setMaxPrice] = useState(600);
//   const [filterButtonClicked, setFilterButtonClicked] = useState(false);

//   useEffect(() => {
//     if (filterButtonClicked) {
//       dispatch(filterPrice({ minPrice, maxPrice }));
//       setFilterButtonClicked(false);
//     }
//   }, [minPrice, maxPrice, dispatch, filterButtonClicked]);

//   const products = useSelector((state) => state.filterPrice.products);
//   const status = useSelector((state) => state.filterPrice.status);
//   const error = useSelector((state) => state.filterPrice.error);

//   const handleFilterPrice = () => {
//     setFilterButtonClicked(true);
//   };

//   const handleClearFilter = () => {
//     setMinPrice(0);
//     setMaxPrice(600);
//     setFilterButtonClicked(true);
//   };

//   return (
//     <div className="max-w-md mx-auto my-8 p-6 bg-gray-200 rounded-md">
//       <h2 className="text-2xl font-semibold mb-4">Filter by Price</h2>
//       <div className="flex items-center space-x-4">
//         <div className="flex-1">
//           <label className="block text-sm font-medium text-gray-600">Min Price:</label>
//           <input
//             type="range"
//             min={0}
//             max={maxPrice}
//             step={1}
//             value={minPrice}
//             onChange={(e) => setMinPrice(Number(e.target.value))}
//             className="w-full"
//           />
//         </div>
//         <div className="flex-1">
//           <label className="block text-sm font-medium text-gray-600">Max Price:</label>
//           <input
//             type="range"
//             min={minPrice}
//             max={600}
//             step={1}
//             value={maxPrice}
//             onChange={(e) => setMaxPrice(Number(e.target.value))}
//             className="w-full"
//           />
//         </div>
//       </div>
//       <div className="flex justify-between">
//         <span>${minPrice}</span>
//         <span>${maxPrice}</span>
//       </div>
//       <div className="flex space-x-4 mt-4">
//         <button
//           onClick={handleFilterPrice}
//           className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
//         >
//           Apply Filter
//         </button>
//         <button
//           onClick={handleClearFilter}
//           className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700"
//         >
//           Clear Filter
//         </button>
//       </div>

//       {status === "loading" && <p>Loading...</p>}
//       {status === "failed" && <p className="text-red-500">Error: {error.message}</p>}
//       {status === "succeeded" && (
//         <div>
//           <h3 className="text-xl font-semibold mt-4">Filtered Products:</h3>
//           <ul>
//             {products.map((product) => (
//               <li key={product.id} className="flex items-center space-x-2">
//                 <img
//                   src={product.image}
//                   alt={product.name}
//                   className="w-8 h-8 rounded-md"
//                 />
//                 <span>{product.name} - ${product.price}</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FilterPriceComponent;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterPrice } from "../../reduxToolkit/Filtros/filterPriceThunks";

const FilterPriceComponent = ({ setActualPage }) => {
  const dispatch = useDispatch();
  const [minPrice, setMinPrice] = useState("0");
  const [maxPrice, setMaxPrice] = useState("600");
  const [priceRanges, setPriceRanges] = useState([
    { label: "Up to $100", value: "0-100" },
    { label: "$100 - $200", value: "100-200" },
    { label: "$200 - $300", value: "200-300" },
    { label: "$300 - $400", value: "300-400" },
    { label: "$400 - $500", value: "400-500" },
    { label: "Over $500", value: "500-600" },
  ]);

  const [filterButtonClicked, setFilterButtonClicked] = useState(false);

  const handleFilterPrice = () => {
    setFilterButtonClicked(true);
    setActualPage(1);
  };

  const handleClearFilter = () => {
    setMinPrice("0");
    setMaxPrice("600");
    setFilterButtonClicked(true);
    setActualPage(1);
  };

  useEffect(() => {
    if (filterButtonClicked) {
      dispatch(filterPrice({ minPrice, maxPrice }));
      setFilterButtonClicked(false);
    }
  }, [minPrice, maxPrice, dispatch, filterButtonClicked]);

  const products = useSelector((state) => state.products);
  const status = useSelector((state) => state.filterPrice.status);
  const error = useSelector((state) => state.filterPrice.error);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Filter by Price</h2>
      <div className="flex flex-wrap mb-4">
        {priceRanges.map((range) => (
          <button
            key={range.value}
            onClick={() => {
              const [newMin, newMax] = range.value.split("-");
              setMinPrice(newMin);
              setMaxPrice(newMax);
            }}
            className={`mr-2 mb-2 p-2 border rounded ${
              minPrice === range.value.split("-")[0] &&
              maxPrice === range.value.split("-")[1]
                ? "bg-blue-500 text-white"
                : ""
            }`}
          >
            {range.label}
          </button>
        ))}
      </div>
      <div className="mb-4">
        <label className="mr-2">Custom Range:</label>
        <input
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          placeholder="Min"
          className="mr-2 p-2 border rounded"
        />
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          placeholder="Max"
          className="mr-2 p-2 border rounded"
        />
      </div>
      <button
        onClick={handleFilterPrice}
        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
      >
        Apply Filter
      </button>
      <button
        onClick={handleClearFilter}
        className="bg-gray-300 px-4 py-2 rounded"
      >
        Clear Filter
      </button>

      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && (
        <p className="text-red-500">Error: {error.message}</p>
      )}
      {status === "succeeded" && (
        <div>
          <h3 className="text-xl font-bold mt-4">Filtered Products:</h3>
          <ul>
            {products.map((product) => (
              <li key={product.id} className="mb-2">
                <img
                  src={product.image}
                  alt={product.name}
                  className="mr-2"
                  style={{ width: "50px", height: "50px" }}
                />
                {product.name} - ${product.price}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FilterPriceComponent;
