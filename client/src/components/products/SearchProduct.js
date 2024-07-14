import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import * as api from "../../api/index.js";
import { toast } from "react-toastify";
import axios from "axios";
import DataTable from "react-data-table-component";
import PhotoModal from "./PhotoModal";
import UpFormCom from "./UpFormCom";
import ProductUpdateModal from "./ProductUpdateModal";
import { TiTickOutline } from "react-icons/ti";
import { AiFillSetting, AiFillDelete, AiOutlineArrowUp } from "react-icons/ai";
import { FaTimes } from "react-icons/fa";

function SearchProduct({ handlePageChange }) {
  const [searchProducts, setSearchProducts] = useState([]);
  const [productSlug, setProductSlug] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [modalShow2, setModalShow2] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [query, setQuery] = useState("");

  const [activePage, setActivePage] = useState("urun-ara");

  const deleteFunction = async (slug) => {
    try {
      await api.urunSil(slug);
      setSearchProducts((prevProducts) =>
        prevProducts.filter((product) => product.slug !== slug)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleProductUpdate = (slug) => {
    setProductSlug(slug);
    handlePageChange("urun-guncelle");
  };

  const handleProductUpdate2 = (slug) => {
    setProductSlug(slug);
    setModalShow2(true);
  };

  const handleModalClose2 = () => {
    setModalShow2(false);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setModalShow(true);
  };

  const handleModalClose = () => {
    setModalShow(false);
    setSelectedImage("");
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://server-hesotomotiv.com/api/product/search/search?q=${query}`
      );
      setSearchProducts(response.data.products);
      if (response.data.success === true) {
        toast.success(`${response.data.products.length} Adet Ürün bulundu`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      } else {
        toast.error("Arama Sonucu Bulunamadı", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Arama Sonucu Bulunamadı", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    }
    setQuery("");
  };

  const columns = [
    {
      name: "Fotoğraf",
      selector: (row) => row.image_urls,
      sortable: false,
      center: true,
      width: "90px",
      cell: (row) => (
        <img
          src={
            row.image_urls && row.image_urls.length > 0 ? row.image_urls[0] : ""
          }
          alt={row.name}
          style={{ width: "50px", height: "auto", cursor: "pointer" }}
          onClick={() =>
            handleImageClick(
              row.image_urls && row.image_urls.length > 0
                ? row.image_urls[0]
                : ""
            )
          }
        />
      ),
    },
    {
      name: "Stok Kodu",
      selector: (row) => row.stockCode,
      width: "125px",
      sortable: true,
    },
    {
      name: "Oem No",
      selector: (row) => row.oemNumber,
      width: "100px",
      sortable: true,
    },
    {
      name: "Ürün Adı",
      selector: (row) => row.name,
      width: "200px",
      sortable: true,
    },
    {
      name: "Stok",
      selector: (row) => row.stock,
      width: "75px",
      sortable: true,
    },
    {
      name: "Maliyet",
      selector: (row) => row.costPrice,
      width: "90px",
      sortable: true,
    },
    {
      name: "İndirimsiz F.",
      selector: (row) => row.oldPrice,
      width: "115px",
      sortable: true,
    },
    {
      name: "Satış F.",
      selector: (row) => row.sellingPrice,
      width: "100px",
      sortable: true,
    },
    {
      name: "Aktiflik",
      selector: (row) => row.isActive,
      sortable: true,
      center: true,
      width: "90px",
      cell: (row) => (
        <div>
          {row.isActive ? (
            <TiTickOutline size={20} className="isActiveYes" />
          ) : (
            <FaTimes size={20} className="isActiveNo" />
          )}
        </div>
      ),
    },
    {
      name: "İşlemler",
      sortable: false,
      center: true,
      width: "150px",
      cell: (row) => (
        <div>
          <Button
            variant="outline-warning"
            size="sm"
            onClick={() => handleProductUpdate2(row.slug)}
          >
            <AiOutlineArrowUp />
          </Button>{" "}
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => handleProductUpdate(row.slug)}
          >
            <AiFillSetting />
          </Button>{" "}
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => deleteFunction(row.slug)}
          >
            <AiFillDelete />
          </Button>
        </div>
      ),
    },
  ];

  const paginationOptions = {
    rowsPerPageText: "Sayfa başına satır:",
    rangeSeparatorText: "e",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Tüm satırları seç",
  };

  const customStyles = {
    cells: {
      style: {
        borderStyle: "solid",
        borderColor: "#959696",
        borderWidth: "0.1px",
      },
    },
  };

  return (
    <div>
      <div className="m-3 px-5">
        <h4>Ürün Arayın</h4>
        <Form onSubmit={handleSearch}>
          <Form.Control
            type="search"
            placeholder="Ürün Arayın"
            className="me-2"
            aria-label="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="d-grid gap-2 m-2">
            <Button type="submit" variant="warning" size="lg">
              Ara
            </Button>
          </div>
        </Form>
      </div>

      {activePage === "urun-ara" ? (
        <div className="table-responsive text-center">
          <div className="table-responsive text-center">
            <DataTable
              title="Ürünler"
              columns={columns}
              data={searchProducts}
              pagination
              paginationComponentOptions={paginationOptions}
              customStyles={customStyles}
              className="table table-striped table-sm p-1"
            />
          </div>
        </div>
      ) : (
        <div>
          <UpFormCom
            productSlug={productSlug}
            handlePageChange={handlePageChange}
          />
        </div>
      )}

      <PhotoModal
        show={modalShow}
        handleClose={handleModalClose}
        imageUrl={selectedImage}
      />
      <ProductUpdateModal
        show={modalShow2}
        handleClose={handleModalClose2}
        productSlug={productSlug}
      />
    </div>
  );
}

export default SearchProduct;
