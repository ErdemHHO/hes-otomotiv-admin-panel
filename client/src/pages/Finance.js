import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from '../components/dashboard/Navbar'
import Sidebar from '../components/dashboard/Sidebar'
import ProductsDataTable from '../components/finance/ProductsDataTable'

function Finance() {

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
            <ProductsDataTable />
        </div>
    </div>
  )
}

export default Finance