import "./App.css";
import ProductDetail from "./views/ProductDetail/ProductDetail";
import Home from "./views/Home/Home";
import Shoppingcart from "./views/Shoppingcart/Shoppingcart";
import UserProfile from "./views/UserProfile/UserProfile";
import EditUserProfile from "./views/UserProfile/editUserProfile";
import About from "./views/About/About";
import { Routes, Route, useLocation } from "react-router-dom";
import UserForm from "./Components/UserForm/UserForm";
import UserLogin from "./Components/UserLogin/Userlogin";
import Dashboard from "./views/Dashboard/Dashboard";
import NavBar from "./Components/Navbar/Navbar";
import { useEffect } from "react";
import { getProducts } from "./reduxToolkit/Product/productThunks";
import { useDispatch } from "react-redux";
import CreateProduct from "./Components/DashboardComponents/CreateProduct/CreateProduct";

function App() {
  const dispacth = useDispatch();
  useEffect(() => {
    dispacth(getProducts());
  }, [dispacth]);
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith("/dashboard");

  return (
    <div>
      {!isDashboardRoute && <NavBar />}
      <div className="mt-28">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<ProductDetail />} />
          <Route path="/shoppingcart" element={<Shoppingcart />} />
          <Route path="/userprofile/:id" element={<UserProfile />} />
          <Route path="/edituserprofile/:id" element={<EditUserProfile />} />
          <Route path="/userform" element={<UserForm />} />
          <Route path="/userlogin" element={<UserLogin />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/createProduct" element={<CreateProduct />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
