// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getCategory } from "../../reduxToolkit/Category/categoryThunks";
// import { filterCategory } from "../../reduxToolkit/Filtros/filterCategoryThunks";

// const CategoryDropdown = () => {
//   const dispatch = useDispatch();
//   const category = useSelector((state) => state.category.category);

//   const [selectedCategory, setSelectedCategory] = useState("");

//   useEffect(() => {
//     dispatch(getCategory());
//   }, [dispatch]);

//   const handleCategoryChange = (e) => {
//     setSelectedCategory(e.target.value);
//   };

//   const handleFilterByCategory = () => {
//     if (selectedCategory) {
//       dispatch(filterCategory(selectedCategory));
//     }
//   };

//   return (
//     <div>
//       <label>Select Category: </label>
//       <select value={selectedCategory} onChange={handleCategoryChange}>
//         <option value="">All Categories</option>
//         {category.map((category) => (
//           <option key={category.id} value={category.name}>
//             {category.name}
//           </option>
//         ))}
//       </select>
//       <button onClick={handleFilterByCategory}>Filter</button>
//     </div>
//   );
// };

// export default CategoryDropdown;