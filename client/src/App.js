
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './stylesheet/dashboard.css'

import Series from './pages/Series';
import Cars from './pages/Cars';
import Categories from './pages/Categories';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kategoriler" element={<Categories />} />
        <Route path="/seriler" element={<Series />} />
        <Route path="/arabalar" element={<Cars />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
