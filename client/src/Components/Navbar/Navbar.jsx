import Searchbar from "../Searchbar/Searchbar";

function Navbar() {
  return (
    <div className="flex flex-col items-start">
      <div className="flex items-center mb-4">
        <h1 className="mr-4">Logo</h1>
        <Searchbar className="mr-4"></Searchbar>
      </div>
      <h1>Acá se incluirían otros botones de navegación</h1>
    </div>
  );
}

export default Navbar;
