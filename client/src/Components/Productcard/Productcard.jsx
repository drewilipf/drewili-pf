function Productcard({ product }) {
  return (
    <div className="bg-orange-100 p-8 rounded">
      <img src={product.image} alt={product.name} className="h-40 w-40" />
      <h1 className="text-orange-400">{product.name}</h1>
      <p className="text-orange-300">Stock: {product.stock}</p>
    </div>
  );
}

export default Productcard;
