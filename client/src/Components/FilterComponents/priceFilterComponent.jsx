import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterPrice } from "../../reduxToolkit/Filtros/filterPriceThunks";

const FilterPriceComponent = () => {
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
  };

  const handleClearFilter = () => {
    setMinPrice("0");
    setMaxPrice("600");
    setFilterButtonClicked(true);
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
    <div className="mb-4 w-full">
      <div style={{ marginRight: "4px" }}>
        <h2 className="block text-sm font-bold mb-4">Filter by Price</h2>
        <div className="flex flex-wrap mb-4">
          {priceRanges.map((range) => (
            <button
              key={range.value}
              onClick={() => {
                const [newMin, newMax] = range.value.split("-");
                setMinPrice(newMin);
                setMaxPrice(newMax);
              }}
              className={`mr-2 mb-2 p-1 border rounded text-xs ${
                minPrice === range.value.split("-")[0] &&
                maxPrice === range.value.split("-")[1]
                  ? "bg-chiliRed hover:bg-onyx text-whiteSmoke"
                  : "bg-gray-200 hover:bg-gray-300 text-black"
              } transition duration-300`}
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
            className="mr-2 mb-2 p-2 border rounded"
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
          className="transition duration-300 bg-chiliRed hover:bg-onyx text-whiteSmoke font-bold py-2 px-4 rounded mr-2 mb-2"
        >
          Apply Filter
        </button>
        <button
          onClick={handleClearFilter}
          className="transition duration-300 bg-chiliRed hover:bg-onyx text-whiteSmoke font-bold py-2 px-4 rounded mr-2 mb-2"
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
    </div>
  );
};

export default FilterPriceComponent;
