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
import { useEffect, useState } from "react";
import { getProducts } from "./reduxToolkit/Product/productThunks";
import { useDispatch } from "react-redux";
import CreateProduct from "./Components/DashboardComponents/CreateProduct/CreateProduct";
import RegisteredUser from "./Components/DashboardComponents/RegisteredUser/RegisteredUser";
import { getColor } from "./reduxToolkit/Color/colorThunks";
import ProductList from "./Components/DashboardComponents/ProductList/ProductList";
import EditProduct from "./Components/DashboardComponents/EditProduct/EditProduct";
import Favorites from "./views/Favorites/favorites";
import PaymentSuccess from "./views/Payment/PaymentSuccess";
import Payment from "./views/Payment/Payment";
import ShippingForm from "./views/Shoppingcart/ShippingForm";
import ValidateAddress from "./views/Shoppingcart/validateAddress";
import SelectPayment from "./views/Shoppingcart/SelectPayment";
import Footer from "./Components/Footer/Footer";

function App() {
  const dispacth = useDispatch();

  useEffect(() => {
    dispacth(getProducts());
    dispacth(getColor());
  }, [dispacth]);
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith("/dashboard");

  const [actualPage, setActualPage] = useState(1);

  const handlePageChange = (newPage) => {
    setActualPage(newPage);
  };

  return (
    <div>
      {!isDashboardRoute && (
        <NavBar
          handlePageChange={handlePageChange}
          actualPage={actualPage}
          setActualPage={(num) => setActualPage(num)}
        />
      )}
      <div className="pt-24 bg-whiteSmoke">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                handlePageChange={handlePageChange}
                actualPage={actualPage}
                setActualPage={(num) => setActualPage(num)}
              />
            }
          />
          <Route path="/detail/:id" element={<ProductDetail />} />
          <Route path="/shoppingcart" element={<Shoppingcart />} />
          <Route path="/shippingform" element={<ShippingForm />} />
          <Route path="/validateaddress" element={<ValidateAddress />} />
          <Route path="/selectpayment" element={<SelectPayment />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/userprofile/:id" element={<UserProfile />} />
          <Route path="/edituserprofile/:id" element={<EditUserProfile />} />
          <Route path="/userform" element={<UserForm />} />
          <Route path="/userlogin" element={<UserLogin />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/createProduct" element={<CreateProduct />} />
          <Route path="/dashboard/productList" element={<ProductList />} />
          <Route path="/dashboard/editProduct/:id" element={<EditProduct />} />
          <Route
            path="/dashboard/registeredUser"
            element={<RegisteredUser />}
          />
          <Route path="/dashboard/productList" element={<ProductList />} />
          <Route path="/payment/success" element={<PaymentSuccess />} />
          <Route path="/payment/payment" element={<Payment />} />
        </Routes>
      </div>
      {!isDashboardRoute && (
      <Footer/>
      )}
    </div>
  );
}

export default App;
