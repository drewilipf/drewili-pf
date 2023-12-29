import { useDispatch } from "react-redux";
import { clearFilter } from "../../reduxToolkit/Product/productThunks";
import { filterPrice } from "../../reduxToolkit/Filtros/filterPriceThunks";
import { filterColor } from "../../reduxToolkit/Filtros/filterColorThunks";

function filter() {
  const dispatch = useDispatch();
  const handleClearFilter = async () => {
    await dispatch(clearFilter());
    setMinPrice("0");
    setMaxPrice("600");
    setFilterButtonClicked(true);
  };
  const handleFilterPrice = () => {
    setFilterButtonClicked(true);
  };
  useEffect(() => {
    if (filterButtonClicked) {
      dispatch(filterPrice({ minPrice, maxPrice }));
      setFilterButtonClicked(false);
    }
  }, [minPrice, maxPrice, dispatch, filterButtonClicked]);
  return (
    <div>
      <button
        onClick={handleFilterPrice}
        className="transition duration-300 bg-chiliRed hover:bg-onyx text-whiteSmoke font-bold py-2 px-4 rounded mr-2 mb-2"
      >
        Apply Filter
      </button>
      <button
        onClick={handleClearFilter}
        className="transition duration-300 bg-chiliRed hover:bg-onyx text-whiteSmoke font-bold py-2 px-4 rounded mr-2 mb-2"
      >
        Clear Filter
      </button>
    </div>
  );
}
export default filter;
