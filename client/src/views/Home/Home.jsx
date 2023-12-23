import Productcards from "../../Components/Productcards/Productcards";
import Banners from "../../Components/Banners/Banners";
function Home() {
  return (
    <div className="flex flex-col items-center">
      <Banners />
      <div className="mt-10">
        <Productcards/>
      </div>
    </div>
  );
}

export default Home;
