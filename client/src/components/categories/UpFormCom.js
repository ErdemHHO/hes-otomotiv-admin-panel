import React, { useState, useEffect } from 'react';
import * as api from '../../api/index.js';
import { Form, Button, Container } from 'react-bootstrap';
import { toast } from 'react-toastify';

function UpFormCom({ categorySlug, handlePageChange }) {
  const [category, setCategory] = useState({});
  const [formData, setFormData] = useState({
    name: '',
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const getCategory = async () => {
      try {
        const response = await api.kategoriGetir(categorySlug);
        setCategory(response.data.category);
        setFormData({
          name: response.data.category.name || '',
        });
      } catch (error) {
        console.log(error);
      }
    };
    getCategory();
  }, [categorySlug]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { isValid, errors } = validateForm();
    if (!isValid) {
      setFormErrors(errors);
      return;
    }
    try {
      const response = await api.kategoriGuncelle(categorySlug, formData);
      toast.success(response.data.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      handlePageChange("kategoriler");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;
    if (!formData.name) {
      errors.name = 'Kategori adı giriniz';
      isValid = false;
    }
    setFormErrors(errors);
    return { isValid, errors };
  };

  return (
    <div>
      <h5 className='mb-3 text-center'>Kategori GÜNCELLE</h5>
      <Container>
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-3' controlId='formBasicCategoryName'>
            <Form.Label>Kategori Adı</Form.Label>
            <Form.Control
              type='text'
              name='name'
              value={formData.name}
              onChange={handleChange}
              placeholder='Kategori Adı'
            />
            {formErrors.name && (
              <div className='text-danger'>{formErrors.name}</div>
            )}
          </Form.Group>

          <div className='d-grid gap-2'>
            <Button variant='primary' size='lg' type='submit'>
              Kaydet
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
}

export default UpFormCom;
