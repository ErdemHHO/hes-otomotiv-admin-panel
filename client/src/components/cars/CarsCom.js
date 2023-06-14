import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { AiFillSetting, AiFillDelete } from "react-icons/ai";

import * as api from "../../api/index.js";
import FormCom from "./FormCom";
import UpFormCom from "./UpFormCom";

function CarsCom() {
  const [cars, setCars] = useState([]);
  const [carSlug, setCarSlug] = useState("");
  const [activePage, setActivePage] = useState("arabalar");

  const [series, setSeries] = useState([]);
  console.log(cars)

  useEffect(() => {
    const getCars = async () => {
      try {
        const response = await api.arabalariGetir();
        setCars(response.data.cars);
      } catch (error) {
        console.log(error);
      }
    };
    const getSeries = async () => {
        try {
            const response = await api.serileriGetir();
            setSeries(response.data.series);
        } catch (error) {
            console.log(error);
        }
    };
    getSeries();
    getCars();
  }, [activePage]);

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  const handleCarUpdate = (slug) => {
    setCarSlug(slug);
    handlePageChange("araba-guncelle");
  };

  const deleteFunction = async (slug) => {
    try {
      await api.arabaSil(slug);
      setCars((prevCars) =>
        prevCars.filter((car) => car.slug !== slug)
      );
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div>
      <main className="main col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">Arabalar</h1>
          <div className="btn-toolbar mb-2 mb-md-0">
            <div className="btn-group me-2">
              {activePage === "arabalar" ? (
                <Button
                  variant="outline-success"
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => handlePageChange("araba-ekle")}
                >
                  Yeni Ekle
                </Button>
              ) : activePage === "araba-ekle" ? (
                <Button
                  variant="outline-success"
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => handlePageChange("arabalar")}
                >
                  Geri Dön
                </Button>
              ) : (
                <Button
                  variant="outline-success"
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => handlePageChange("arabalar")}
                >
                  Geri Dön
                </Button>
              )}
            </div>
          </div>
        </div>
        {activePage === "arabalar" ? (
          <div className="table-responsive text-center">
            <Table className="bg-white" responsive="sm" hover bordered>
              <thead>
                <tr>
                  <th>Araba ID</th>
                  <th>Araba Fotoğrafı</th>
                  <th>Araba Adı</th>
                  <th>Araba Serisi</th>
                  <th>İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {cars &&
                  cars.map((car) => (
                    <tr key={car._id}>
                      <td>{car._id}</td>
                      <td>
                      <td className="d-flex justify-content-center">
                        <img src={car.image_urls[0]} alt={car.name} width="30" height="30"/>
                      </td>
                      </td>
                      <td>{car.name}</td>
                      {series &&
                      series.map((seri) => {
                        if (seri._id === car.series_id) {
                          return <td key={seri._id}>{seri.name}</td>;
                        }
                      })}
                      <td>
                        <AiFillSetting
                          size={32}
                          style={{ color: "#004fd9" }}
                          onClick={() => handleCarUpdate(car.slug)}
                        />
                        <AiFillDelete
                          size={32}
                          style={{ color: "#a60000" }}
                          onClick={() => deleteFunction(car.slug)}
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        ) : activePage === "araba-ekle" ? (
          <div>
            <FormCom handlePageChange={handlePageChange}/>
          </div>
        ) : (
          <div>
            <UpFormCom carSlug={carSlug} handlePageChange={handlePageChange} />
          </div>
        )}
      </main>
    </div>
  );
}

export default CarsCom;
