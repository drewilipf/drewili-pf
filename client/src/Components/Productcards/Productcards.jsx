import Productcard from "../../Components/Productcard/Productcard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../reduxToolkit/Product/productThunks";

function Productcards() {
  const { products } = useSelector((state) => state.products);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center items-center">
      {products ? (
        products.map((product) => (
          <Productcard
            key={product.id}
            id={product.id}
            image={product.image}
            name={product.name}
            description={product.description}
            price={product.price}
            color={product.color}
            specifications={product.specifications}
            stock={product.stock}
            category={product.category}
            brand={product.brand}
          />
        ))
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
}

export default Productcards;
