import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from '../components/dashboard/Navbar'
import Sidebar from '../components/dashboard/Sidebar'
import HomeCom from '../components/home/HomeCom'


function Home() {

  const [user] = useState(JSON.parse(localStorage.getItem("adminProfile")));

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
  }, []);


  return (
    <div>      
      <Navbar />
      <Sidebar />
      <HomeCom />   
    </div>
  )
}

export default Home