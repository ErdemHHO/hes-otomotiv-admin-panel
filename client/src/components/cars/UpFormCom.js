import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import * as api from '../../api/index.js';
import { toast } from 'react-toastify';
import Dropzone from 'react-dropzone';
import { FiUpload, FiX } from 'react-icons/fi';

function UpFormCom({ handlePageChange, carSlug }) {
  const [car, setCar] = useState({});
  const [series, setSeries] = useState([]);
  const [formCarData, setFormCarData] = useState({
    name: '',
    series_id: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [uploadImage, setUploadImage] = useState([]);
  const [images, setImages] = useState([]);
  console.log(images)

  const handleChange = (e) => {
    setFormCarData({ ...formCarData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const getSeries = async () => {
      try {
        const response = await api.serileriGetir();
        setSeries(response.data.series);
      } catch (error) {
        console.log(error);
      }
    };
    const getCar = async () => {
      try {
        const response = await api.arabaGetir(carSlug);
        setCar(response.data.car);
        setFormCarData({
          name: response.data.car.name || '',
          series_id: response.data.car.series_id || '',
        });
        setImages(response.data.car.image_urls || []);
      } catch (error) {
        console.log(error);
      }
    };
    getSeries();
    getCar();
  }, [carSlug]);

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
    const { isValid, errors } = validateForm();
    if (!isValid) {
      setFormErrors(errors);
      return;
    }
    try {
      const formData = new FormData();
      formData.append('name', formCarData.name);
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

      const response = await api.arabaGuncelle(carSlug, formData);
      toast.success(response.data.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      handlePageChange('arabalar');
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
    if (!formCarData.name) {
      errors.name = 'Araba adı boş bırakılamaz';
      isValid = false;
    }
    if (!formCarData.series_id) {
      errors.series_id = 'Seri seçmelisiniz';
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
        <Container>
          <h3 className="text-center">Araba Güncelle</h3>

          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Araba Adı</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formCarData.name}
                  onChange={handleChange}
                  placeholder="Araba Adı"
                />
                {formErrors.name && (
                  <p className="text-danger">{formErrors.name}</p>
                )}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
                <Form.Label>Seri</Form.Label>
                <Form.Select
                  name="series_id"
                  value={formCarData.series_id}
                  onChange={handleChange}
                  aria-label="Default select example"
                >
                  <option value="">Seri Seçiniz</option>
                  {series.map((serie) => (
                    <option key={serie._id} value={serie._id}>
                      {serie.name}
                    </option>
                  ))}
                </Form.Select>
                {formErrors.series_id && (
                  <p className="text-danger">{formErrors.series_id}</p>
                )}
              </Form.Group>
            </Col>
          </Row>

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
                        src={image}
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
        </Container>

      </Form>
    </div>
  );
}

export default UpFormCom;
