import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link,useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actionType from '../../constants/actionTypes';

function Navbar() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('adminProfile')));

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const logout = () => {
    dispatch({ type: actionType.ADMINLOGOUT });

    navigate('/signin');

    setUser(null);
  };

  return (
    <div>
      <header className="navbar sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <Link to='/' className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-5 fw-bold text-center" >
          HES OTOMOTİV
        </Link>
        <button
          className="navbar-toggler position-absolute d-md-none collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#sidebarMenu"
          aria-controls="sidebarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
        
        </button>

        <div className="navbar-nav">
          <div className="nav-item text-nowrap  ">
            <div className="nav-link fontControl px-3 text-white">
              <h4>{user?.result?.adminName} {user?.result?.adminSurname}</h4>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Navbar;
