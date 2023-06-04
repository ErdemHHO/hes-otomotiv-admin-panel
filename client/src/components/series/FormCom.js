import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import * as api from '../../api/index.js';
import { toast } from 'react-toastify';
import Dropzone from 'react-dropzone';
import { FiUpload, FiX } from 'react-icons/fi';

function FormCom({ handlePageChange }) {
  const [seri, setSeri] = useState({});
  const [formSeriData, setFormSeriData] = useState({
    name: '',
  });
  const [uploadimage, setUploadimage] = useState([]);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    setFormSeriData({ ...formSeriData, [e.target.name]: e.target.value });
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
      formData.append('name', formSeriData.name);
      uploadimage.forEach((image) => {
        formData.append('images', image.file);
      });
      const response = await api.seriEkle(formData);
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
      isValid = false;
      errors.name = 'Seri adı boş bırakılamaz';
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
        <h3 className='text-center'>Yeni Seri Ekle</h3>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Seri Adı</Form.Label>
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
      </Form>
    </div>
  );
}

export default FormCom;
