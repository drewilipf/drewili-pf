function Searchbar() {
  return (
    <div className="flex items-center">
      <input
        className="border border-chiliRed rounded p-2 mr-2 focus:outline-none focus:border-chiliRed"
        placeholder="Search..."
      />
      <select className="border border-chiliRed rounded p-2 mr-2 focus:outline-none focus:border-chiliRed">
        <option value="opcion1">Opción 1</option>
        <option value="opcion2">Opción 2</option>
        <option value="opcion3">Opción 3</option>
      </select>
      <button className=" bg-chiliRed hover:bg-onyx  text-whiteSmoke font-bold py-2 px-4 rounded mr-16">
        Search
      </button>
    </div>
  );
}

export default Searchbar;
