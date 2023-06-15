import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { AiFillSetting, AiFillDelete } from "react-icons/ai";

import * as api from "../../api/index.js";
import FormCom from "./FormCom";
import UpFormCom from "./UpFormCom";

function SeriesCom() {

  const [user] = useState(JSON.parse(localStorage.getItem("adminProfile")));

  const [series, setSeries] = useState([]);
  const [seriSlug, setSeriSlug] = useState("");
  const [activePage, setActivePage] = useState("seriler");

  useEffect(() => {
    const getSeries = async () => {
      try {
        const response = await api.serileriGetir();
        setSeries(response.data.series);
      } catch (error) {
        console.log(error);
      }
    };
    getSeries();
  }, [activePage]);

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  const handleSeriUpdate = (slug) => {
    setSeriSlug(slug);
    handlePageChange("seri-guncelle");
  };

  const deleteFunction = async (slug) => {
    try {
      await api.seriSil(slug);
      setSeries((prevSeries) =>
        prevSeries.filter((seri) => seri.slug !== slug)
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
            <h1 className="h2">Seriler</h1>
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
                    <th>Seri ID</th>
                    <th>Seri Fotoğrafı</th>
                    <th>Seri Adı</th>
                    <th>İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {series &&
                    series.map((seri) => (
                      <tr key={seri._id}>
                        <td>{seri._id}</td>
                        <td>
                        <td className="d-flex justify-content-center">
                          <img src={seri.image_urls[0]} alt={seri.name} width="30" height="30" className="table-image"/>
                        </td>
                        </td>
                        <td>{seri.name}</td>
                        <td>
                          <AiFillSetting
                            size={32}
                            style={{ color: "#004fd9" }}
                            onClick={() => handleSeriUpdate(seri.slug)}
                          />
                          <AiFillDelete
                            size={32}
                            style={{ color: "#a60000" }}
                            onClick={() => deleteFunction(seri.slug)}
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>
          ) : activePage === "seri-ekle" ? (
            <div>
              <FormCom handlePageChange={handlePageChange}/>
            </div>
          ) : (
            <div>
              <UpFormCom seriSlug={seriSlug} handlePageChange={handlePageChange} />
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

export default SeriesCom;
