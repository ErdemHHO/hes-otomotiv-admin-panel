import React, { useState,useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import * as api from '../../api/index.js';
import { toast } from 'react-toastify';
import Dropzone from 'react-dropzone';
import { FiUpload, FiX } from 'react-icons/fi';

function FormCom({ handlePageChange }) {
  const [car, setCar] = useState({});
  const [series, setSeries] = useState([]);
  const [formCarData, setFormCarData] = useState({
    name: '',
    series_id: '',
  });
  const [uploadimage, setUploadimage] = useState([]);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const getSeries = async () => {
      try {
        const response = await api.serileriGetir();
        setSeries(response.data.series);
      } catch (error) {
        console.log(error);
      }
    };
    getSeries();
  }, []);


  const handleChange = (e) => {
    setFormCarData({ ...formCarData, [e.target.name]: e.target.value });
  };

  const handleDrop = (acceptedFiles) => {
    const newImages = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setUploadimage((prevImages) => [...prevImages, ...newImages]);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...uploadimage];
    updatedImages.splice(index, 1);
    setUploadimage(updatedImages);
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
      formData.append('series_id', formCarData.series_id);
      uploadimage.forEach((image) => {
        formData.append('images', image.file);
      });
      const response = await api.arabaEkle(formData);
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
      isValid = false;
      errors.name = 'Araba adı boş bırakılamaz';
    }
    if (!formCarData.series_id) {
      isValid = false;
      errors.series_id = 'Seri adı boş bırakılamaz';
    }
    if (uploadimage.length === 0) {
      errors.image = 'Fotoğraf zorunludur';
      isValid = false;
    }
    return { isValid, errors };
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Container>
          <h3 className='text-center'>Yeni Araba Ekle</h3>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Araba Adı</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  name="name"
                  onChange={handleChange}
                />
                {formErrors.name && (
                  <p className="text-danger">{formErrors.name}</p>
                )}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="ControlInput0">
                <Form.Label>Seri Adı</Form.Label>
                <Form.Control as="select" name="series_id" value={formCarData.series_id} onChange={handleChange} required>
                      <option value="">Seri Seçiniz</option>
                      {series && series.map((seri) => (
                        <option key={seri._id} value={seri._id}>
                          {seri.name}
                        </option>
                      ))}
                </Form.Control>
                {formErrors.series_id && <div className="text-danger">{formErrors.series_id}</div>}
              </Form.Group>
            </Col>
          </Row>

          
          <Dropzone onDrop={handleDrop} accept="image/*">
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()} className="h-32 border border-black rounded-sm bg-white" style={{ display: 'flex' }}>
                <input {...getInputProps()} />
                {uploadimage.length > 0 ? (
                  uploadimage.map((image, index) => (
                    <div 
                    className='m-3'
                    key={index} 
                    style={{ position: 'relative', marginRight: '10px' }}
                    >
                      <div
                        className="absolute top-2 right-2 cursor-pointer"
                        onClick={() => handleRemoveImage(index)}
                      >
                        <FiX className='image-delete-button' size={24}/>
                      </div>
                      <img
                        src={image.preview}
                        alt="selected"
                        style={{ height: '300px', maxWidth: '250px' }}
                      />
                    </div>
                  ))
                ) : (
                  <span className='m-5' style={{ display: "inline-block", width: "100%", height: "100%" }}>
                    <FiUpload style={{ width: "100%", height: "100px" }} />
                  </span>
                )}
              </div>
            )}
          </Dropzone>
          {formErrors.image && (
            <p className="text-danger">{formErrors.image}</p>
          )}
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

export default FormCom;
