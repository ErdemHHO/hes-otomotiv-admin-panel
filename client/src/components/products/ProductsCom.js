import React, { useState, useEffect } from "react";
import { Button,Form } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import DataTable from "react-data-table-component";
import * as api from "../../api/index.js";
import PhotoModal from "./PhotoModal";
import FormCom from "./FormCom";
import UpFormCom from "./UpFormCom";
import ProductUpdateModal from "./ProductUpdateModal";
import BuldPriceUpdateModal from "./BuldPriceUpdateModal";
import { TiTickOutline } from "react-icons/ti";
import { AiFillSetting, AiFillDelete,AiOutlineArrowUp } from "react-icons/ai";
import {FaTimes} from "react-icons/fa";

function ProductsCom() {
  const [products, setProducts] = useState([]);
  const [searchProducts, setSearchProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [productSlug, setProductSlug] = useState("");
  const [activePage, setActivePage] = useState("urunler");

  const [modalShow, setModalShow] = useState(false);
  const [modalShow2, setModalShow2] = useState(false);
  const [modalShow3, setModalShow3] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const [query, setQuery] = useState("");

  useEffect(() => {

    const getBrands= async()=>{
      try {
        const response = await api.markalariGetir();
        setBrands(response.data.brands);
      } catch (error) {
        console.log(error);
      }
    }

    const getProducts = async () => {
      try {
        const response = await api.urunleriGetir();
        setProducts(response.data.products);
      } catch (error) {
        console.log(error);
      }
    };
    getBrands();
    getProducts();
  }, [activePage,modalShow2,query]);


  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`/api/product/search/search?q=${query}`);
      setSearchProducts(response.data.products);
  
      if (response.data.success === true) {
        toast.success(`${response.data.products.length} Ürün bulundu`, {
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
  


  const handlePageChange = (page) => {
    setActivePage(page);
  };

  const deleteFunction = async (slug) => {
    try {
      const response= await api.urunSil(slug);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.slug !== slug)
      );
      toast.success(response.data.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
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
  const handleModalClose3 = () => {
    setModalShow3(false);
  };


  const handleImageClick = (image) => {
    setSelectedImage(image);
    setModalShow(true);
  };

  const handleModalClose = () => {
    setModalShow(false);
    setSelectedImage("");
  };


  const columns = [
    {
      name: "Fotoğraf",
      selector: (row) => row.image_urls,
      sortable: false,
      center: true,
      width: "82px",
      cell: (row) => (
        <img
          src={row.image_urls && row.image_urls.length > 0 ? row.image_urls[0] : ""}
          alt={row.name}
          style={{ width: "50px", height: "auto", cursor: "pointer" }}
          onClick={() => handleImageClick(row.image_urls && row.image_urls.length > 0 ? row.image_urls[0] : "")}
        />
      ),
    },
    {
      name: "Stok Kodu",
      selector: (row) => row.stockCode,
      width: '105px',
      sortable: true,
    },
    {
      name: "Oem No",
      selector: (row) => row.oemNumber,
      width: '100px',
      sortable: true,
    },
    {
      name: "Ürün Adı",
      selector: (row) => row.name,
      width: '175px',
      sortable: true,
      cell: (row) => (
        <a
          href={`http://www.hes-otomotiv.com/${row.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-decoration-none text-dark"
        >
          {row.name}
        </a>
      ),
    },
    {
      name: "Marka",
      selector: (row) => {
        const brand = brands.find((item) => row.brand_id === item._id);
        return brand ? brand.name : "";
      },
      width: '100px',
      sortable: true,
    },
    {
      name: "Stok",
      selector: (row) => row.stock,
      width: '72px',
      sortable: true,
    },
    {
      name: "Maliyet",
      selector: (row) => row.costPrice,
      width: '88px',
      sortable: true,
    },
    {
      name: "İndirimsiz F.",
      selector: (row) => row.oldPrice,
      width: '115px',
      sortable: true,
    },
    {
      name: "Satış F.",
      selector: (row) => row.sellingPrice,
      width: '88px',
      sortable: true,
    },
    {
      name: "Aktiflik",
      selector: (row) => row.isActive,
      sortable: true,
      center: true,
      width: "86px",
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
      name: "Satış Ş.",
      selector: (row) => row.salesFormat,
      sortable: true,
      center: true,
      width: "90px",
      cell: (row) => (
        <div>
          {row.salesFormat ? (
            'Adet'
          ) : (
            'Takım'
          )}
        </div>
      ),
    },
    {
      name: "İşlemler",
      sortable: false,
      center: true,
      width: "138px",
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
    rowsPerPageText: 'Sayfa başına satır:',
    rangeSeparatorText: 'e',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Tüm satırları seç',
  };
  const customStyles={
    cells:{
      style:{
        borderStyle:"solid",
        borderColor:"#959696",
        borderWidth:"0.1px"
      }
    }
  }

  

  return (
    <div>
      <main className="main col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">Ürünler</h1>
          <div className="btn-toolbar mb-2 mb-md-0">
            <div className="btn-group me-2">
              {activePage === "urunler" ? (
                <div className="d-flex">
                  <div className="mx-1">
                  <Button
                    variant="outline-danger"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => setModalShow3(true)}
                  >
                    Toplu Fiyat Güncelleme
                  </Button>
                  </div>
                  <div className="mx-1">
                    <Button
                      variant="outline-success"
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => handlePageChange("urun-ekle")}
                    >
                      Yeni Ekle
                    </Button>
                  </div>
                </div>

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
            <div className="table-responsive text-center">
            <div className="m-3 px-5">
              <h4>Ürün Arayın</h4>
              <Form onSubmit={handleSearch}>
                <Form.Control type="search" placeholder="Ürün Arayın" className="me-2" aria-label="Search" value={query} onChange={(e) => setQuery(e.target.value)} />
                <div className="d-grid gap-2 m-2">
                  <Button type="submit" variant="dark" size="lg">
                    Ara
                  </Button>
                </div>
              </Form>
            </div>
            <DataTable
            title="Ürünler"
            columns={columns}
            data={searchProducts.length>0 ? searchProducts : products}
            pagination
            paginationComponentOptions={paginationOptions}
            customStyles={customStyles}
            className="table table-striped table-sm p-1"
          />
            </div>
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
      <BuldPriceUpdateModal
        show={modalShow3}
        handleClose={handleModalClose3}
      />
      </main>
    </div>
  );
}

export default ProductsCom;
