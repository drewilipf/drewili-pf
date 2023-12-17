import Productcard from "../../Components/Productcard/Productcard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../reduxToolkit/Product/productThunks";

function Productcards() {
  const dispacth = useDispatch();
  const { products } = useSelector((state) => state.products);
  console.log(products);

  useEffect(() => {
    dispacth(getProducts());
  }, [dispacth]);
  console.log("Products:", products);
  return (
    <div className="flex items-center mb-4">
      {products ? (
        products.map((product) => (
          <Productcard
            key={product.id}
            className="mr-20"
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
