import Productcard from "../../Components/Productcard/Productcard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../reduxToolkit/Product/productThunks";

function Productcards() {
  const dispacth = useDispatch();
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    dispacth(getProducts());
  }, [dispacth]);

  return (
    <div className="flex items-center mb-4 space-x-8 ">
      {products ? (
        products.map((product) => (
          <Productcard
            key={product.id}
            id={product.id}
            image={product.image}
            name={product.name}
            description={product.description}
            price={product.price}
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
