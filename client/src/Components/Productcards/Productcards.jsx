import Productcard from "../../Components/Productcard/Productcard";

function Productcards({ products }) {
  return (
    <div className="flex flex-wrap justify-around items-center w-full sm:w-full lg:w-60vw xl:w-60vw">
      {products && Array.isArray(products) && products.length > 0 ? (
        products.map((product, index) => (
          <Productcard
            key={index}
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
            deleted={product.deleted}
            images={product.images}
          />
        ))
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
}

export default Productcards;
