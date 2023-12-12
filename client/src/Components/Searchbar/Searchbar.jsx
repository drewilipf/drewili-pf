function Searchbar() {
    return (
      <div className="flex items-center">
        <input
          className="border border-orange-500 rounded p-2 mr-2 focus:outline-none focus:border-orange-700"
          placeholder="Search..."
        />
        <select className="border border-orange-500 rounded p-2 mr-2 focus:outline-none focus:border-orange-700">
          <option value="opcion1">Opción 1</option>
          <option value="opcion2">Opción 2</option>
          <option value="opcion3">Opción 3</option>
        </select>
        <button className="bg-orange-500 text-white border rounded p-2">
          Search
        </button>
      </div>
    );
  }
  
  
  export default Searchbar