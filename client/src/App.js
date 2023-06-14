
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './stylesheet/dashboard.css'

import Finance from './pages/Finance';
import Series from './pages/Series';
import Brands from './pages/Brands';
import Cars from './pages/Cars';
import Products from './pages/Products';
import Categories from './pages/Categories';
import SigninPage from './pages/SigninPage';
import Home from './pages/Home';
import Admins from './pages/Admins';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/kategoriler" element={<Categories />} />
        <Route path="/seriler" element={<Series />} />
        <Route path="/arabalar" element={<Cars />} />
        <Route path="/markalar" element={<Brands />} />
        <Route path="/urunler" element={<Products />} />
        <Route path="/finans" element={<Finance />} />
        <Route path="/adminler" element={<Admins />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
