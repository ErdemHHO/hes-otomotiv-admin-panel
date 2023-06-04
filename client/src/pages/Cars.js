import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from '../components/dashboard/Navbar'
import Sidebar from '../components/dashboard/Sidebar'
import CarsCom from '../components/cars/CarsCom'

function Cars() {

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
            <CarsCom />
        </div>
    </div>
  )
}

export default Cars