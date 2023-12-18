import { useEffect, useState } from "react";
import Productcard from "../../Components/Productcard/Productcard";
import axios from "axios";

function Productcards() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/product")
      .then((response) => setProducts(response.data))
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="flex items-center mb-4 justify-around">
      {products.map((product) => (
        <Productcard key={product.id} product={product} className="mr-20" />
      ))}
    </div>
  );
}

export default Productcards;
