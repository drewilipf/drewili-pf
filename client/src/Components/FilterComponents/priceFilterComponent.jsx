import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterPrice } from "../../reduxToolkit/Filtros/filterPriceThunks";

const FilterPriceComponent = () => {
  const dispatch = useDispatch();
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const products = useSelector((state) => state.filterPrice.products);
  const status = useSelector((state) => state.filterPrice.status);
  const error = useSelector((state) => state.filterPrice.error);

  const handleFilterPrice = () => {
    if (minPrice !== "" || maxPrice !== "") {
      dispatch(filterPrice({ minPrice, maxPrice }));
    }
  };

  return (
    <div>
      <h2>Filter by Price</h2>
      <div>
        <label>Min Price:</label>
        <input type="text" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
      </div>
      <div>
        <label>Max Price:</label>
        <input type="text" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
      </div>
      <button onClick={handleFilterPrice}>Filter</button>

      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error: {error.message}</p>}
      {status === "succeeded" && (
  <div>
    <h3>Filtered Products:</h3>
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <img src={product.image} alt={product.name} style={{ width: '50px', height: '50px' }} />
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












