import './App.css';
import ProductDetail from './views/ProductDetail/ProductDetail';
import Home from './views/Home/Home';
import Shopping from './views/Shopping/Shopping';
import UserProfile from './views/UserProfile/UserProfile';
import About from './views/About/About';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/detail/:id" element={<ProductDetail />} />
        <Route path="/shopping" element={<Shopping />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/about" element={<About />} />
      </Routes>
      </div>
  );
}

export default App;
