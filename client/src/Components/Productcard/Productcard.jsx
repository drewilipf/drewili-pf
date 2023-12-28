import { NavLink } from "react-router-dom";
function Productcard({
  id,
  name,
  description,
  price,
  specifications,
  stock,
  category,
  color,
  image,
  brand,
}) {
  return (
    <div
      className="mb-10  overflow-hidden transform transition-transform  flex flex-col items-center p-4 rounded h-80 w-80
    "
    >
      <div>
        <NavLink to={`/detail/${id}`}>
          <img
            src={image}
            alt={name}
            className="w-full h-32 transform transition-transform"
          />
          <h2 className="text-center">{name}</h2>
          <h3 className="text-center">S/ {price}</h3>
          <h3 className="text-center"> {color}</h3>
        </NavLink>
      </div>
      <button className="transition duration-300 bg-chiliRed hover:bg-onyx text-whiteSmoke font-bold py-2 px-4 rounded">
        Agregar al carrito
      </button>
    </div>
  );
}
export default Productcard;
