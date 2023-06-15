import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { AiFillSetting, AiFillDelete } from "react-icons/ai";

import * as api from "../../api/index.js";
import FormCom from "./FormCom";
import UpFormModal from "./UpFormModal";

function AdminsCom() {

  const [user] = useState(JSON.parse(localStorage.getItem("adminProfile")));

  const [admins, setAdmins] = useState([]);
  const [adminId, setAdminId] = useState("");
  const [activePage, setActivePage] = useState("adminler");
  const [modalShow2, setModalShow2] = useState(false);

  useEffect(() => {
    const getAdmins = async () => {
      try {
        const response = await api.adminleriGetir();
        setAdmins(response.data.admins);
      } catch (error) {
        console.log(error);
      }
    };
    getAdmins();
  }, [activePage]);

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  const deleteFunction = async (id) => {
    try {
      await api.adminSil(id);
      setAdmins((prevAdmins) =>
        prevAdmins.filter((admin) => admin._id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdminUpdate = (id) => {
    setAdminId(id);
    setModalShow2(true);
  };


  const handleModalClose2 = () => {
    setModalShow2(false);
  };

  return (
    <div>
      <main className="main col-md-9 ms-sm-auto col-lg-10 px-md-4">
        {user?.result?.isSuperAdmin ? (
            <div>
                  <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">Adminler</h1>
                    <div className="btn-toolbar mb-2 mb-md-0">
                      <div className="btn-group me-2">
                        {activePage === "adminler" ? (
                          <Button
                            variant="outline-success"
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => handlePageChange("admin-ekle")}
                          >
                            Yeni Ekle
                          </Button>
                        ) : activePage === "admin-ekle" ? (
                          <Button
                            variant="outline-success"
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => handlePageChange("adminler")}
                          >
                            Geri Dön
                          </Button>
                        ) : (
                          <Button
                            variant="outline-success"
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => handlePageChange("adminler")}
                          >
                            Geri Dön
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                  {activePage === "adminler" ? (
                    <div className="table-responsive text-center">
                      <Table className="bg-white" responsive="sm" hover bordered>
                        <thead>
                          <tr>
                            <th>Admin ID</th>
                            <th>Adı</th>
                            <th>Soyadı</th>
                            <th>E-Posta</th>
                            <th>Yetki</th>
                            <th>İşlemler</th>
                          </tr>
                        </thead>
                        <tbody>
                          {admins.map((admin) => (
                            <tr key={admin._id}>
                              <td>{admin._id}</td>
                              <td>{admin.name}</td>
                              <td>{admin.surname}</td>
                              <td>{admin.email}</td>
                              <td>{admin.isSuperAdmin ? "Super Admin" : "Admin"}</td>
                              <td>
                                <AiFillSetting
                                  size={32}
                                  style={{ color: "#004fd9" }}
                                  onClick={() => handleAdminUpdate(admin._id)}
                                />
                                <AiFillDelete
                                  size={32}
                                  style={{ color: "#a60000" }}
                                  onClick={() => deleteFunction(admin._id)}
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  ) : (
                    <div>
                      <FormCom handlePageChange={handlePageChange} />
                    </div>
                  )}
        
                  <div>
                    <UpFormModal adminId={adminId} show={modalShow2} handleClose={handleModalClose2}/>
                  </div>          
            </div>
          ) : (
            <div className="alert-message pt-5 pb-5 mb-5 ">
              <div className="alert alert-danger text-center" role="alert">
                Bu Sayfayı Görüntüleyebilmek İçin Süper Admin Olmalısınız!
              </div>
            </div>
          )
        }
      </main>
    </div>
  );
}

export default AdminsCom;
