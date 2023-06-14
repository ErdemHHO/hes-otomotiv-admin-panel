import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { AiFillSetting, AiFillDelete } from "react-icons/ai";
import DataTable from "react-data-table-component";
import * as api from "../../api/index.js";


function ProductsDataTable( {handlePageChange, setProductSlug} ) {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await api.urunleriGetir();
        setProducts(response.data.products);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);

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

  const handleProductUpdate = (slug) => {
    setProductSlug(slug);
    handlePageChange("urun-guncelle");
  };

  const columns = [
    // {
    //   name: 'Fotoğraf',
    //   selector: 'selectedFile',
    //   sortable: false,
    //   center: true,
    //   width: '90px',
    //   cell: (row) => (
    //     <img
    //       src={`http://localhost:4000/${row.selectedFile}`}
    //       alt="Resim"
    //       style={{ width: '50px', height: 'auto', cursor: 'pointer' }}
    //       onClick={() =>
    //         handleImageClick(`http://localhost:4000/${row.selectedFile}`)
    //       }
    //     />
    //   ),
    // },
    {
      name: "Stok Kodu",
      selector: "stockCode",
      sortable: true,
    },
    {
      name: "Oem No",
      selector: "oemNumber",
      sortable: true,
    },
    {
      name: "Ürün Adı",
      selector: "name",
      sortable: true,
    },
    {
      name: "Stok",
      selector: "stock",
      sortable: true,
    },
    {
      name: "Maliyet",
      selector: "costPrice",
      sortable: true,
    },
    {
      name: "İndirimsiz Fiyatı",
      selector: "oldPrice",
      sortable: true,
    },
    {
      name: "Satış Fiyatı",
      selector: "sellingPrice",
      sortable: true,
    },
    {
      name: "İşlemler",
      sortable: false,
      center: true,
      width: "150px",
      cell: (row) => (
        <div>
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
        borderWidth:"0.5px"
      }
    }
  }






  return (
    <div>
      <main className="main col-md-9 ms-sm-auto col-lg-10 px-md-4">
        
        
        <div className="table-responsive">
          <DataTable
            title="Ürünler"
            columns={columns}
            data={products}
            pagination
            paginationComponentOptions={paginationOptions}
            customStyles={customStyles}
          />
        </div>



      </main>
    </div>
  );
}

export default ProductsDataTable;
