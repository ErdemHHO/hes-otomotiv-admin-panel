import React from 'react'

import { useState,useEffect } from 'react';
import {useNavigate} from 'react-router-dom' 

import Login from '../components/auth/Login'
import '../stylesheet/sign-in.css'

function SigninPage() {
  const [user] = useState(JSON.parse(localStorage.getItem('adminProfile')));

  const navigate=useNavigate();

    useEffect(() => {
      if (user) {
      navigate("/");
      }
  }, []);

  return (
    <div className='orta'>
      <Login />
    </div>
  )
}

export default SigninPage