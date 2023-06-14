import React, { useState, useEffect } from "react";
import * as api from "../../api/index.js";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

function ProductUpdateModal({ show, handleClose, productSlug }) {
  const [product, setProduct] = useState({});
  const [productFormData, setProductFormData] = useState({
    stock: "",
    costPrice: "",
    oldPrice: "",
    sellingPrice: "",
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await api.urunGetir(productSlug);
        setProduct(response.data.product);
        setProductFormData({
          stock: response.data.product.stock || "",
          costPrice: response.data.product.costPrice || "",
          oldPrice: response.data.product.oldPrice || "",
          sellingPrice: response.data.product.sellingPrice || "",
        });
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, [productSlug]);

  const handleProductFormDataChange = (e) => {
    setProductFormData({ ...productFormData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { isValid, errors } = validateForm();
    if (!isValid) {
      setFormErrors(errors);
      return;
    }
    try {
      const formData = new FormData();
      formData.append("stock", productFormData.stock);
      formData.append("costPrice", productFormData.costPrice);
      formData.append("oldPrice", productFormData.oldPrice);
      formData.append("sellingPrice", productFormData.sellingPrice);
      const response = await api.urunGuncelle(productSlug, formData);
      toast.success(response.data.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;
    if (productFormData.stock === "") {
      errors.stock = "Stok alanı boş bırakılamaz";
      isValid = false;
    }
    if (productFormData.costPrice === "") {
      errors.costPrice = "Maliyet fiyatı alanı boş bırakılamaz";
      isValid = false;
    }
    if (productFormData.oldPrice === "") {
      errors.oldPrice = "İndirimsiz fiyat alanı boş bırakılamaz";
      isValid = false;
    }
    if (productFormData.sellingPrice === "") {
      errors.sellingPrice = "Satış fiyatı alanı boş bırakılamaz";
      isValid = false;
    }
    return { isValid, errors };
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Ürün Bilgilerini Güncelle</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {product && (
          <div>
            <h6>ÜRÜN ADI= {product.name}</h6>
            <h6>OEM NO= {product.oemNumber}</h6>
            <h6>STOK KODU= {product.stockCode}</h6>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Stok</Form.Label>
                <Form.Control
                  type="number"
                  name="stock"
                  value={productFormData.stock}
                  onChange={handleProductFormDataChange}
                />
                {formErrors.stock && (
                  <p className="text-danger">{formErrors.stock}</p>
                )}
              </Form.Group>
              <Form.Group>
                <Form.Label>Maliyet Fiyatı</Form.Label>
                <Form.Control
                  type="number"
                  name="costPrice"
                  value={productFormData.costPrice}
                  onChange={handleProductFormDataChange}
                />
                {formErrors.costPrice && (
                  <p className="text-danger">{formErrors.costPrice}</p>
                )}
              </Form.Group>
              <Form.Group>
                <Form.Label>İndirimsiz Fiyat</Form.Label>
                <Form.Control
                  type="number"
                  name="oldPrice"
                  value={productFormData.oldPrice}
                  onChange={handleProductFormDataChange}
                />
                {formErrors.oldPrice && (
                  <p className="text-danger">{formErrors.oldPrice}</p>
                )}
              </Form.Group>
              <Form.Group>
                <Form.Label>Satış Fiyatı</Form.Label>
                <Form.Control
                  type="number"
                  name="sellingPrice"
                  value={productFormData.sellingPrice}
                  onChange={handleProductFormDataChange}
                />
                {formErrors.sellingPrice && (
                  <p className="text-danger">{formErrors.sellingPrice}</p>
                )}
              </Form.Group>
                <div className="d-grid gap-2 mt-2">
                    <Button type="submit" variant="primary" size="lg">
                        Kaydet
                    </Button>
                </div>
            </Form>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default ProductUpdateModal;
