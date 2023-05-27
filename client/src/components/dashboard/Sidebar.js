import React from 'react'
import { Link } from 'react-router-dom'

function sidebar() {
  return (
    <div>
        
    <div class="container-fluid">
      <div class="row">
        <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-body-tertiary sidebar collapse">
          <div class="position-sticky pt-3 sidebar-sticky">
            <ul class="nav flex-column">
              <li class="nav-item">
                <Link class="nav-link active" aria-current="page" to="/">
                  <span data-feather="home" class="align-text-bottom"></span>
                  Anasayfa
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/kategoriler">
                  <span data-feather="file" class="align-text-bottom"></span>
                  Kategoriler
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/seriler">
                  <span data-feather="shopping-cart" class="align-text-bottom"></span>
                  Seriler
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/arabalar">
                  <span data-feather="users" class="align-text-bottom"></span>
                  Arabalar
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/urunler">
                  <span data-feather="bar-chart-2" class="align-text-bottom"></span>
                  Ürünler
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="adminler">
                  <span data-feather="layers" class="align-text-bottom"></span>
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