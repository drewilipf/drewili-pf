import NavbarAdmin from "../NavbarAdmin/NavbarAdmin";

const handleClick = () => {
  window.location.href =
    "https://mixpanel.com/project/3195533/view/3706589/app/boards/#id=6359945";
};

function Statistics() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <NavbarAdmin />
      <h1 className="text-2xl font-bold mb-8 flex items-center justify-center  pt-8">
        Estadísticas de la página
      </h1>
      <button
        onClick={handleClick}
        className="flex items-center justify-center left-4 top-4 text-2xl bg-chiliRed p-2.5 rounded-full text-white"
      >
        Ver Estadísticas
      </button>
    </div>
  );
}
export default Statistics;
