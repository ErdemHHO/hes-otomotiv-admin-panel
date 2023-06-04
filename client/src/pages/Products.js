import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from '../components/dashboard/Navbar'
import Sidebar from '../components/dashboard/Sidebar'
import ProductsCom from '../components/products/ProductsCom'

function Products() {

    const [user] = useState(JSON.parse(localStorage.getItem("adminProfile")));

    const navigate = useNavigate();

    useEffect(() => {
      if (!user) {
        navigate("/signin");
      }
    }, []);


  return (
    <div>
        <div>      
            <Navbar />
            <Sidebar />
            <ProductsCom />
        </div>
    </div>
  )
}

export default Products