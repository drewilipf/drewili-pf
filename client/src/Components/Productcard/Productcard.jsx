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
    <div className="m-4 p-4 rounded shadow-lg hover:shadow-xl h-auto w-80 bg-white flex flex-col items-center justify-evenly">
      <NavLink
        to={`/detail/${id}`}
        className="flex flex-col items-center justify-center"
      >
        <img
          src={image}
          alt={name}
          className="w-full h-52 object-contain object-center rounded-t"
        />
        <div className="mt-4 text-center">
          <h2 className="text-lg font-semibold">{name}</h2>
          <div className="flex justify-between items-center mt-2 flex-col">
            <h3 className="text-gray-600 font-bold">S/ {price}</h3>
            <h3 className="text-gray-600">{color}</h3>
          </div>
        </div>
      </NavLink>
      <button className="mt-4 transition duration-300 bg-chiliRed hover:bg-onyx text-whiteSmoke font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">
        Agregar al carrito
      </button>
    </div>
  );
}
export default Productcard;
