import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { AiFillSetting, AiFillDelete } from "react-icons/ai";

import * as api from "../../api/index.js";
import FormCom from "./FormCom";
import UpFormCom from "./UpFormCom";

function ProductsCom() {
  const [products, setProducts] = useState([]);
  const [productSlug, setProductSlug] = useState("");
  const [activePage, setActivePage] = useState("urunler");

  const [series, setSeries] = useState([]);
  console.log(products)

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await api.urunleriGetir();
        setProducts(response.data.products);
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
    getProducts();
  }, [activePage]);

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  const handleProductUpdate = (slug) => {
    setProductSlug(slug);
    handlePageChange("urun-guncelle");
  };

  const deleteFunction = async (slug) => {
    try {
      await api.urunSil(slug);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.slug !== slug)
      );
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div>
      <main className="main col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">Ürünler</h1>
          <div className="btn-toolbar mb-2 mb-md-0">
            <div className="btn-group me-2">
              {activePage === "urunler" ? (
                <Button
                  variant="outline-success"
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => handlePageChange("urun-ekle")}
                >
                  Yeni Ekle
                </Button>
              ) : activePage === "urun-ekle" ? (
                <Button
                  variant="outline-success"
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => handlePageChange("urunler")}
                >
                  Geri Dön
                </Button>
              ) : (
                <Button
                  variant="outline-success"
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => handlePageChange("urunler")}
                >
                  Geri Dön
                </Button>
              )}
            </div>
          </div>
        </div>
        {activePage === "urunler" ? (
          <div className="table-responsive text-center">
            <Table className="bg-white" responsive="sm" hover bordered>
              <thead>
                <tr>
                  <th>Ürün ID</th>
                  <th>Ürün Fotoğrafı</th>
                  <th>Ürün Adı</th>
                  <th>Ürün Serisi</th>
                  <th>İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {products &&
                  products.map((product) => (
                    <tr key={product._id}>
                      <td>{product._id}</td>
                      <td>
                      <td className="d-flex justify-content-center">
                        <img src={product.image_urls[0]} alt={product.name} width="50" height="50"/>
                      </td>
                      </td>
                      <td>{product.name}</td>
                      {series &&
                      series.map((seri) => {
                        if (seri._id === product.series_id) {
                          return <td key={seri._id}>{seri.name}</td>;
                        }
                      })}
                      <td>
                        <AiFillSetting
                          size={32}
                          style={{ color: "#004fd9" }}
                          onClick={() => handleProductUpdate(product.slug)}
                        />
                        <AiFillDelete
                          size={32}
                          style={{ color: "#a60000" }}
                          onClick={() => deleteFunction(product.slug)}
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        ) : activePage === "urun-ekle" ? (
          <div>
            <FormCom handlePageChange={handlePageChange}/>
          </div>
        ) : (
          <div>
            <UpFormCom productSlug={productSlug} handlePageChange={handlePageChange} />
          </div>
        )}
      </main>
    </div>
  );
}

export default ProductsCom;
