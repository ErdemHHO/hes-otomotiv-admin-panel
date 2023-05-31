import React from 'react'
import { Link } from 'react-router-dom'

function sidebar() {
  return (
    <div>
        
    <div className="container-fluid">
      <div className="row">
        <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-white sidebar collapse">
          <div className="position-sticky pt-3 sidebar-sticky">
            <ul className="nav flex-column">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  <span data-feather="home" className="align-text-bottom"></span>
                  Anasayfa
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/kategoriler">
                  <span data-feather="file" className="align-text-bottom"></span>
                  Kategoriler
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/seriler">
                  <span data-feather="shopping-cart" className="align-text-bottom"></span>
                  Seriler
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/arabalar">
                  <span data-feather="users" className="align-text-bottom"></span>
                  Arabalar
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/urunler">
                  <span data-feather="bar-chart-2" className="align-text-bottom"></span>
                  Ürünler
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="adminler">
                  <span data-feather="layers" className="align-text-bottom"></span>
                  Adminler
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
    </div>
  )
}

export default sidebar