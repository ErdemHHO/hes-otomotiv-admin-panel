import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { AiFillSetting, AiFillDelete } from "react-icons/ai";

import * as api from "../../api/index.js";
import FormCom from "./FormCom";
import UpFormCom from "./UpFormCom";

function CategoriesCom() {
  const [categories, setCategories] = useState([]);
  const [categorySlug, setCategorySlug] = useState("");
  const [activePage, setActivePage] = useState("kategoriler");

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await api.kategorileriGetir();
        setCategories(response.data.categories);
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, [activePage]);

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  const handleCategoryUpdate = (slug) => {
    setCategorySlug(slug);
    handlePageChange("kategori-guncelle");
  };

  const deleteFunction = async (slug) => {
    try {
        await api.kategoriSil(slug);
        const response = await api.kategorileriGetir();
        setCategories(response.data.categories);
    } catch (error) {
        console.log(error);
    }
};


  return (
    <div>
      <main className="main col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">Kategoriler</h1>
          <div className="btn-toolbar mb-2 mb-md-0">
            <div className="btn-group me-2">
              {activePage === "kategoriler" ? (
                <Button
                  variant="outline-success"
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => handlePageChange("kategori-ekle")}
                >
                  Yeni Ekle
                </Button>
              ) : activePage === "kategori-ekle" ? (
                <Button
                  variant="outline-success"
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => handlePageChange("kategoriler")}
                >
                  Geri Dön
                </Button>
              ) : (
                <Button
                  variant="outline-success"
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => handlePageChange("kategoriler")}
                >
                  Geri Dön
                </Button>
              )}
            </div>
          </div>
        </div>
        {activePage === "kategoriler" ? (
          <div className="table-responsive text-center">
            <Table className="bg-white" responsive="sm" hover bordered>
              <thead>
                <tr>
                  <th>Kategori ID</th>
                  <th>Kategori Adı</th>
                  <th>İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {categories &&
                  categories.map((category) => (
                    <tr key={category._id}>
                      <td>{category._id}</td>
                      <td>{category.name}</td>
                      <td>
                        <AiFillSetting
                          size={32}
                          style={{ color: "#004fd9" }}
                          onClick={() => handleCategoryUpdate(category.slug)}
                        />
                        <AiFillDelete
                          size={32}
                          style={{ color: "#a60000" }}
                          onClick={() => deleteFunction(category.slug)}
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        ) : activePage === "kategori-ekle" ? (
          <div>
            <FormCom />
          </div>
        ) : (
          <div>
            <UpFormCom categorySlug={categorySlug} handlePageChange={handlePageChange} />
          </div>
        )}
      </main>
    </div>
  );
}

export default CategoriesCom;
