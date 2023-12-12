import Productcard from "../../Components/Productcard/Productcard";

function Productcards() {
  return (
    <div className="flex items-center mb-4">
      <Productcard className="mr-20" />
      <Productcard className="mr-20" />
      <Productcard className="mr-20" />
      <Productcard className="mr-20"/>
    </div>
  );
}

export default Productcards;
