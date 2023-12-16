function Productcard({
  id,
  name,
  description,
  price,
  specifications,
  stock,
  category_id,
  image,
  brand_id,
}) {
  return (
    <div className="max-w-xs">
      <img src={image} alt={name} className="w-full h-auto max-h-32" />
      <h2>{name}</h2>
      <h3>{price}</h3>
    </div>
  );
}

export default Productcard;
