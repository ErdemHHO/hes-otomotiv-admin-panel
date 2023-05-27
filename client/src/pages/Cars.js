import React,{useState} from 'react'
import { Button } from 'react-bootstrap'

import Navbar from '../components/dashboard/Navbar'
import Sidebar from '../components/dashboard/Sidebar'
import TableCom from '../components/cars/TableCom'
import FormCom from '../components/cars/FormCom'


function Categories() {
    const [activePage, setActivePage] = useState("kategoriler");
    const [content, setContent] = useState(<TableCom />);


    const handlePageChange = (page) => {
        setActivePage(page);
    
        if (page === "kategoriler") {
          setContent(<TableCom />);
        } else if (page === "kategori-ekle") {
          setContent(<FormCom />);
        }else {
          setContent(null);
        }
      };

  return (
    <div>
        <div>      
            <Navbar />
            <Sidebar />


            <main class="main col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 class="h2">Arabalar</h1>
                    <div class="btn-toolbar mb-2 mb-md-0">
                    <div class="btn-group me-2">
                        {activePage === "kategoriler" ? (
                            <Button variant="outline-success" class="btn btn-sm btn-outline-secondary"  onClick={() => handlePageChange("kategori-ekle")}>  Yeni Ekle  </Button>
                        ) : (
                            <Button variant="outline-success" class="btn btn-sm btn-outline-secondary"  onClick={() => handlePageChange("kategoriler")}>  Geri Dön  </Button>
                        )}
                    </div>
                    </div>
                </div>

                <div>{content}</div>

            </main>

        </div>
    </div>
  )
}

export default Categories