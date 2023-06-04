import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from '../components/dashboard/Navbar'
import Sidebar from '../components/dashboard/Sidebar'
import CategoriesCom from '../components/categories/CategoriesCom'

function Categories() {

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
            <CategoriesCom />
        </div>
    </div>
  )
}

export default Categories