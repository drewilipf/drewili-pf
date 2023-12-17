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
    <div className="max-w-xs overflow-hidden transform transition-transform hover:scale-110">
      <img
        src={image}
        alt={name}
        className="w-full h-auto max-h-32 transform transition-transform hover:scale-125"
      />
      <h2>{name}</h2>
      <h3>S/ {price}</h3>
    </div>
  );
}

export default Productcard;
