import React, { useState } from "react";
import { Button,Table } from 'react-bootstrap'
import {AiFillSetting,AiFillDelete} from 'react-icons/ai'

import FormCom from './FormCom'
import UpFormCom from './UpFormCom'

function CategoriesCom() {
    const [activePage, setActivePage] = useState("seriler");


    const handlePageChange = (page) => {
        setActivePage(page);
      };

  return (
    <div>
        <main className="main col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Arabalar</h1>
                <div className="btn-toolbar mb-2 mb-md-0">
                <div className="btn-group me-2">
                {activePage === "seriler" ? (
                    <Button
                        variant="outline-success"
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => handlePageChange("seri-ekle")}
                    >
                        Yeni Ekle
                    </Button>
                    ) : activePage === "seri-ekle" ? (
                    <Button
                        variant="outline-success"
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => handlePageChange("seriler")}
                    >
                        Geri Dön
                    </Button>
                    ) : (
                    <Button
                        variant="outline-success"
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => handlePageChange("seriler")}
                    >
                        Geri Dön
                    </Button>
                    )}
                </div>
                </div>
            </div>
            {activePage === "seriler" ? (
                <div className="table-responsive text-center">
                    <Table className="bg-white" responsive="sm" hover bordered>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Kategori Adı</th>
                                <th>İşlemler</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Table cell</td>
                                <td>
                                    <AiFillSetting 
                                    size={32} 
                                    style={{ color: '#004fd9' }} 
                                    onClick={() => handlePageChange("seri-guncelle")}
                                    />
                                    <AiFillDelete size={32} style={{ color: '#a60000' }}/>
                                </td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Table cell</td>
                                <td>
                                    <AiFillSetting 
                                    size={32} 
                                    style={{ color: '#004fd9' }} 
                                    onClick={() => handlePageChange("seri-guncelle")}
                                    />
                                    <AiFillDelete size={32} style={{ color: '#a60000' }}/>
                                </td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Table cell</td>
                                <td>
                                    <AiFillSetting 
                                    size={32} 
                                    style={{ color: '#004fd9' }} 
                                    onClick={() => handlePageChange("seri-guncelle")}
                                    />
                                    <AiFillDelete size={32} style={{ color: '#a60000' }}/>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                ) : activePage === "seri-ekle" ? (
                <div>
                    <FormCom/>
                </div>
                ) : (
                <div>
                    <UpFormCom/>
                </div>
                )}
            

        </main>          
    </div>
  )
}

export default CategoriesCom