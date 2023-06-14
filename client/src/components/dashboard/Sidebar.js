import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actionType from '../../constants/actionTypes';
import { FiLogOut } from 'react-icons/fi';
import { SiHomeassistant, SiBrandfolder, SiBmw } from 'react-icons/si';
import { BiCategoryAlt } from 'react-icons/bi';
import {GrUserAdmin} from 'react-icons/gr';
import {BsFillBagCheckFill} from 'react-icons/bs';
import {TbBrandSteam} from 'react-icons/tb';
import {RiMoneyDollarBoxFill} from 'react-icons/ri';


function Sidebar() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('AdminProfile')));

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch({ type: actionType.ADMINLOGOUT });
    navigate('/signin');
    setUser(null);
  };



  return (
    <div>       
    <div className="container-fluid">
      <div className="row">
        <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-white sidebar collapse">
          <div className="position-sticky sidebar-sticky">
            <ul className="nav flex-column mt-3">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  <span data-feather="home" className="align-text-bottom mx-3">
                    <SiHomeassistant size={24} />
                  </span>
                  Anasayfa
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/kategoriler">
                  <span data-feather="file" className="align-text-bottom mx-3">
                    <BiCategoryAlt size={24} />
                  </span>
                  Kategoriler
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/markalar">
                  <span data-feather="shopping-cart" className="align-text-bottom mx-3">
                    <SiBrandfolder size={24} />
                  </span>
                  Markalar
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/seriler">
                  <span data-feather="shopping-cart" className="align-text-bottom mx-3">
                    <TbBrandSteam size={24} />
                  </span>
                  Seriler
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/arabalar">
                  <span data-feather="users" className="align-text-bottom mx-3">
                    <SiBmw size={24} />
                  </span>
                  Arabalar
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/urunler">
                  <span data-feather="bar-chart-2" className="align-text-bottom mx-3">
                    <BsFillBagCheckFill size={24} />
                  </span>
                  Ürünler
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/finans">
                  <span data-feather="bar-chart-2" className="align-text-bottom mx-3">
                    <RiMoneyDollarBoxFill size={24} />
                  </span>
                  Finans
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/adminler">
                  <span data-feather="layers" className="align-text-bottom mx-3">
                      <GrUserAdmin size={24} />
                  </span>
                  Adminler
                </Link>
              </li>
              <li className="nav-item">
                  <span className="nav-link" onClick={logout}>
                    <span data-feather="file" className="align-text-bottom mx-3">
                      <FiLogOut size={24} />
                    </span>
                    Çıkış Yap
                </span>
              </li>
            </ul>              
            <div className='mt-5 d-none d-xl-flex justify-content-center'>
              <img className="mt-5" src="images/HES-OTOMOTIV-LOGO.png" alt="hes-otomotiv-logo" width="170" height="120" />
            </div>
          </div>
        </nav>
      </div>
    </div>
    </div>
  )
}

export default Sidebar