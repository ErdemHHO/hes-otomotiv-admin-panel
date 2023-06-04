import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import * as api from '../../api/index.js';
import { toast } from 'react-toastify';
import Dropzone from 'react-dropzone';
import { FiUpload, FiX } from 'react-icons/fi';

function UpFormCom({ handlePageChange, seriSlug }) {
  const [seri, setSeri] = useState({});
  const [formSeriData, setFormSeriData] = useState({
    name: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [uploadImage, setUploadImage] = useState([]);
  const [images, setImages] = useState([]);
  console.log(images)

  const handleChange = (e) => {
    setFormSeriData({ ...formSeriData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const getSeri = async () => {
      try {
        const response = await api.seriGetir(seriSlug);
        setSeri(response.data.seri);
        setFormSeriData({
          name: response.data.seri.name || '',
        });
        setImages(response.data.seri.image_urls || []);
      } catch (error) {
        console.log(error);
      }
    };
    getSeri();
  }, [seriSlug]);

  const handleDrop = (acceptedFiles) => {
    const newImages = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setUploadImage((prevImages) => [...prevImages, ...newImages]);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...uploadImage];
    updatedImages.splice(index, 1);
    setUploadImage(updatedImages);
  };
  const handleRemoveImage2 = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };
  


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', formSeriData.name);
      uploadImage.forEach((image) => {
        formData.append('images', image.file);
      });
      if (images.length >= 2) {
        images.forEach((image) => {
          formData.append('old_images', image);
        });
      }else{
        formData.append('old_images', images);
      }

      const response = await api.seriGuncelle(seriSlug, formData);
      toast.success(response.data.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      handlePageChange('seriler');
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
    if (!formSeriData.name) {
      errors.name = 'Seri adı boş bırakılamaz';
      isValid = false;
    }
    if (uploadImage.length === 0) {
      errors.images = 'En az bir resim yüklemelisiniz';
      isValid = false;
    }
    return { isValid, errors };
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <h3 className="text-center">Seri Güncelle</h3>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Seri Adı</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formSeriData.name}
            onChange={handleChange}
            placeholder="Seri Adı"
          />
          {formErrors.name && (
            <p className="text-danger">{formErrors.name}</p>
          )}
        </Form.Group>
        <div>
          {images.length > 0 && (
            <div>
              <p>
                <strong>Fotoğraflar</strong>
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {images.map((image, index) => (
                  <div
                    className="m-3"
                    key={index}
                    style={{ position: 'relative', marginRight: '10px' }}
                  >
                    <div
                      className="absolute top-2 right-2 cursor-pointer"
                      onClick={() => handleRemoveImage2(index)}
                    >
                      <FiX className="image-delete-button" size={16} />
                    </div>
                    <img
                      src={`http://localhost:4000/${image}`}
                      alt="selected"
                      style={{ height: '250px', maxWidth: '200px' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>


        <p>
          <strong>Yeni Fotoğraf Ekleyin</strong>
        </p>
        <Dropzone onDrop={handleDrop} accept="image/*">
          {({ getRootProps, getInputProps }) => (
            <div
              {...getRootProps()}
              className="h-32 border border-black rounded-sm bg-white"
              style={{ display: 'flex' }}
            >
              <input {...getInputProps()} />
              {uploadImage.length > 0 ? (
                uploadImage.map((image, index) => (
                  <div
                    className="m-3"
                    key={index}
                    style={{ position: 'relative', marginRight: '10px' }}
                  >
                    <div
                      className="absolute top-2 right-2 cursor-pointer"
                      onClick={() => handleRemoveImage(index)}
                    >
                      <FiX className="image-delete-button" size={24} />
                    </div>
                    <img
                      src={image.preview}
                      alt="selected"
                      style={{ height: '250px', maxWidth: '200px' }}
                    />
                  </div>
                ))
              ) : (
                <span
                  className="m-5"
                  style={{ display: 'inline-block', width: '100%', height: '100%' }}
                >
                  <FiUpload style={{ width: '100%', height: '100px' }} />
                </span>
              )}
            </div>
          )}
        </Dropzone>
        {formErrors.images && <p className="text-danger">{formErrors.images}</p>}

        <div className="d-grid gap-2 mt-2">
          <Button type="submit" variant="primary" size="lg">
            Kaydet
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default UpFormCom;
