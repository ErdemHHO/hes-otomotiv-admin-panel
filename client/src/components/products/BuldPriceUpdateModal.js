import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import * as api from '../../api/index.js';

function BuldPriceUpdateModal({ show, handleClose }) {

  const [user] = useState(JSON.parse(localStorage.getItem('adminProfile')));

  const [formPercentage, setFormPercentage] = useState({
    percentage: '',
  });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedPercentage = parseFloat(formPercentage.percentage);
      const formData = {percentage : parsedPercentage};
      const response = await api.topluUrunGuncelle(formData);
      toast.success(response.data.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      handleClose();
    } catch (error) {
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    }
  };
  

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Toplu Fiyat Güncelleyin</Modal.Title>
          </Modal.Header>
      {user?.result?.isSuperAdmin ? (
          <div>
            <Modal.Body>
              <p>
                Tüm ürünlerin fiyatını güncellemek üzeresiniz. Bu işlem zaman alabilir lütfen belirlediğiniz zam veya indirim oranını girdikten sonra kaydet tuşuna sadece bir kez basınız.
              </p>
              <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Zam Oranı</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  placeholder="Zam oranı giriniz"
                  value={formPercentage.percentage}
                  onChange={(e) =>
                    setFormPercentage({
                      ...formPercentage,
                      percentage: e.target.value,
                      })
                    }
                />
                  <Form.Text className="text-muted">
                            0 ile 2 arasında bir değer giriniz. Girdiğiniz değere göre tüm ürünlerin fiyatları güncellenecektir.Lütfen dikkatli olunuz.
                  </Form.Text>
                  </Form.Group>
                    <div className="d-grid gap-2 mt-2">
                          <Button type="submit" variant="primary" size="lg">
                            Kaydet
                          </Button>
                    </div>
                  </Form>
            </Modal.Body>
          </div>
          ) : (
            <div className="alert-message pt-5 p-5 mb-5 ">
              <div className="alert alert-danger text-center" role="alert">
                Bu Sayfayı Görüntüleyebilmek İçin Süper Admin Olmalısınız!
              </div>
            </div>
          )
        }
      </Modal>
    </div>
  );
}

export default BuldPriceUpdateModal;
