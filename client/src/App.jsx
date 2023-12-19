import "./App.css";
import ProductDetail from "./views/ProductDetail/ProductDetail";
import Home from "./views/Home/Home";
import Shopping from "./views/Shopping/Shopping";
import UserProfile from "./views/UserProfile/UserProfile";
import About from "./views/About/About";
import { Routes, Route } from "react-router-dom";
import UserForm from "./Components/UserForm/UserForm";
import UserLogin from "./Components/UserLogin/Userlogin";
import Dashboard from "./views/Dashboard/Dashboard";
import NavBar from "./Components/Navbar/Navbar";

function App() {
  return (
    <div>
      <NavBar />
      <div className="mt-28">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<ProductDetail />} />
          <Route path="/shopping" element={<Shopping />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/userform" element={<UserForm />} />
          <Route path="/userlogin" element={<UserLogin />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
