import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { AiFillSetting, AiFillDelete } from "react-icons/ai";

import * as api from "../../api/index.js";
import FormCom from "./FormCom";
import UpFormCom from "./UpFormCom";

function BrandsCom() {

  const [user] = useState(JSON.parse(localStorage.getItem("adminProfile")));

  const [brands, setBrands] = useState([]);
  const [brandSlug, setBrandSlug] = useState("");
  const [activePage, setActivePage] = useState("markalar");

  useEffect(() => {
    const getBrands = async () => {
      try {
        const response = await api.markalariGetir();
        setBrands(response.data.brands);
      } catch (error) {
        console.log(error);
      }
    };
    getBrands();
  }, [activePage]);

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  const handleBrandUpdate = (slug) => {
    setBrandSlug(slug);
    handlePageChange("marka-guncelle");
  };

  const deleteFunction = async (slug) => {
    try {
      await api.markaSil(slug);
      setBrands((prevBrands) =>
        prevBrands.filter((brand) => brand.slug !== slug)
      );
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div>
      <main className="main col-md-9 ms-sm-auto col-lg-10 px-md-4">

      {user?.result.isSuperAdmin ? (
          <div>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2">Markalar</h1>
              <div className="btn-toolbar mb-2 mb-md-0">
                <div className="btn-group me-2">
                  {activePage === "markalar" ? (
                    <Button
                      variant="outline-success"
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => handlePageChange("marka-ekle")}
                    >
                      Yeni Ekle
                    </Button>
                  ) : activePage === "marka-ekle" ? (
                    <Button
                      variant="outline-success"
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => handlePageChange("markalar")}
                    >
                      Geri Dön
                    </Button>
                  ) : (
                    <Button
                      variant="outline-success"
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => handlePageChange("markalar")}
                    >
                      Geri Dön
                    </Button>
                  )}
                </div>
              </div>
            </div>
            {activePage === "markalar" ? (
              <div className="table-responsive text-center">
                <Table className="bg-white" responsive="sm" hover bordered>
                  <thead>
                    <tr>
                      <th>Marka ID</th>
                      <th>Marka Adı</th>
                      <th>İşlemler</th>
                    </tr>
                  </thead>
                  <tbody>
                    {brands &&
                      brands.map((brand) => (
                        <tr key={brand._id}>
                          <td>{brand._id}</td>
                          <td>{brand.name}</td>
                          <td>
                            <AiFillSetting
                              size={32}
                              style={{ color: "#004fd9" }}
                              onClick={() => handleBrandUpdate(brand.slug)}
                            />
                            <AiFillDelete
                              size={32}
                              style={{ color: "#a60000" }}
                              onClick={() => deleteFunction(brand.slug)}
                            />
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </div>
            ) : activePage === "marka-ekle" ? (
              <div>
                <FormCom handlePageChange={handlePageChange}/>
              </div>
            ) : (
              <div>
                <UpFormCom brandSlug={brandSlug} handlePageChange={handlePageChange} />
              </div>
          )}
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

export default BrandsCom;
