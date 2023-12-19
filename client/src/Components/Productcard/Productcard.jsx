function Productcard({
  id,
  name,
  description,
  price,
  specifications,
  stock,
  category,
  image,
  brand,
}) {
  return (
    <div className="max-w-xs overflow-hidden transform transition-transform shadow-xl flex flex-col items-center p-4 rounded">
      <img
        src={image}
        alt={name}
        className="w-full h-auto max-h-32 transform transition-transform"
      />
      <h2 className="text-center">{name}</h2>
      <h3 className="text-center">S/ {price}</h3>
      <button className="transition duration-300 bg-chiliRed hover:bg-onyx text-whiteSmoke font-bold py-2 px-4 rounded">
        Agregar al carrito
      </button>
    </div>
  );
}
export default Productcard;
