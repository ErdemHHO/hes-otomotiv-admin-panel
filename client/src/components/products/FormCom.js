import React, { useState,useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import * as api from '../../api/index.js';
import { toast } from 'react-toastify';
import Dropzone from 'react-dropzone';
import { FiUpload, FiX } from 'react-icons/fi';

function FormCom({ handlePageChange }) {
  const [product, setProduct] = useState({});
  const [cars, setCars] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [formProductData, setFormProductData] = useState({
    name: '',
    title: '',
    oemNumber: '',
    stockCode: '',
    car_id: '',
    category_id: '',
    status: true,
    brand_id: '',
    stock: '',
    costPrice: '',
    oldPrice: '',
    sellingPrice: '',
    salesFormat: true,
    isActive: true,
  });
  const [uploadimage, setUploadimage] = useState([]);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const getCars = async () => {
      try {
        const response = await api.arabalariGetir();
        setCars(response.data.cars);
      } catch (error) {
        console.log(error);
      }
    };
    const getCategories = async () => {
      try {
        const response = await api.kategorileriGetir();
        setCategories(response.data.categories);
      } catch (error) {
        console.log(error);
      }
    };
    const getBrands = async () => {
      try {
        const response = await api.markalariGetir();
        setBrands(response.data.brands);
      } catch (error) {
        console.log(error);
      }
    };
    getBrands();
    getCategories();
    getCars();

  }, []);

  const handleChangeCars = (event) => {
    const carId = event.target.value;
    const isChecked = event.target.checked;
  
    // Dizinin kopyasını oluşturun
    const updatedCarIds = [...formProductData.car_id];
  
    // Seçili arabayı diziye ekleyin veya çıkarın
    if (isChecked) {
      updatedCarIds.push(carId);
    } else {
      const index = updatedCarIds.indexOf(carId);
      if (index > -1) {
        updatedCarIds.splice(index, 1);
      }
    }
  
    // Güncellenmiş form verilerini ayarlayın
    setFormProductData((prevState) => ({
      ...prevState,
      car_id: updatedCarIds,
    }));
  };
  

  const handleChange = (e) => {
    setFormProductData({ ...formProductData, [e.target.name]: e.target.value });
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
      formData.append('name', formProductData.name);
      formData.append('title', formProductData.title);
      formData.append('oemNumber', formProductData.oemNumber);
      formData.append('stockCode', formProductData.stockCode);
  
      // car_id alanını dizi olarak ekleyin
      formProductData.car_id.forEach((carId) => {
        formData.append('car_id[]', carId);
      });
  
      formData.append('category_id', formProductData.category_id);
      formData.append('status', formProductData.status);
      formData.append('brand_id', formProductData.brand_id);
      formData.append('stock', formProductData.stock);
      formData.append('costPrice', formProductData.costPrice);
      formData.append('oldPrice', formProductData.oldPrice);
      formData.append('sellingPrice', formProductData.sellingPrice);
      formData.append('salesFormat', formProductData.salesFormat);
      formData.append('isActive', formProductData.isActive);
  
      uploadimage.forEach((image) => {
        formData.append('images', image.file);
      });
  
      const response = await api.urunEkle(formData);
      toast.success(response.data.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      handlePageChange('urunler');
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
    if (!formProductData.name) {
      isValid = false;
      errors.name = 'Ürün adı boş bırakılamaz';
    }
    if (!formProductData.title) {
      isValid = false;
      errors.title = 'Ürün başlığı boş bırakılamaz';
    }
    if (!formProductData.oemNumber) {
      isValid = false;
      errors.oemNumber = 'OEM numarası boş bırakılamaz';
    }
    if (!formProductData.stockCode) {
      isValid = false;
      errors.stockCode = 'Stok kodu boş bırakılamaz';
    }
    if (!formProductData.car_id) {
      isValid = false;
      errors.car_id = 'Araba adı boş bırakılamaz';
    }
    if (!formProductData.category_id) {
      isValid = false;
      errors.category_id = 'Kategori adı boş bırakılamaz';
    }
    if (!formProductData.brand_id) {
      isValid = false;
      errors.brand_id = 'Marka adı boş bırakılamaz';
    }
    if (!formProductData.stock) {
      isValid = false;
      errors.stock = 'Stok adedi boş bırakılamaz';
    }
    if (!formProductData.costPrice) {
      isValid = false;
      errors.costPrice = 'Maliyet fiyatı boş bırakılamaz';
    }
    if (!formProductData.oldPrice) {
      isValid = false;
      errors.oldPrice = 'Eski fiyatı boş bırakılamaz';
    }
    if (!formProductData.sellingPrice) {
      isValid = false;
      errors.sellingPrice = 'Satış fiyatı boş bırakılamaz';
    }
    if (!formProductData.salesFormat) {
      isValid = false;
      errors.salesFormat = 'Satış formatı boş bırakılamaz';
    }
    if (!formProductData.isActive) {
      isValid = false;
      errors.isActive = 'Aktiflik durumu boş bırakılamaz';
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
          <h3 className='text-center'>Yeni Ürün Ekle</h3>
          <Row>
            <Col xl={12}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Ürün Adı</Form.Label>
                <Form.Control type="text" name="name" value={formProductData.name} onChange={handleChange} required />
                {formErrors.name && <p className="text-danger">{formErrors.name}</p>}
              </Form.Group>
            </Col>
            <Col xl={12}>
              <Form.Group className="mb-3" controlId="ControlInput0">
                <Form.Label>Ürün Başlığı</Form.Label>
                <Form.Control type="text" name="title" value={formProductData.title} onChange={handleChange} required />
                {formErrors.title && <p className="text-danger">{formErrors.title}</p>}
              </Form.Group>
            </Col>
            <Col xl={3}>
              <Form.Group className="mb-3" controlId="ControlInput2">
                <Form.Label>Stok Kodu</Form.Label>
                <Form.Control type="text" name="stockCode" value={formProductData.stockCode} onChange={handleChange} required />
                {formErrors.stockCode && <p className="text-danger">{formErrors.stockCode}</p>}
              </Form.Group>
            </Col>
            <Col xl={3}>
              <Form.Group className="mb-3" controlId="ControlInput1">
                <Form.Label>OEM Numarası</Form.Label>
                <Form.Control type="number" name="oemNumber" value={formProductData.oemNumber} onChange={handleChange} required />
                {formErrors.oemNumber && <p className="text-danger">{formErrors.oemNumber}</p>}
              </Form.Group>
            </Col>
            <Col xl={3}>
              <Form.Group className="mb-3" controlId="ControlInput4">
                <Form.Label>Kategori Adı</Form.Label>
                <Form.Select name="category_id" value={formProductData.category_id} onChange={handleChange} required>
                  <option value="">Kategori Seçiniz</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </Form.Select>
                {formErrors.category_id && <p className="text-danger">{formErrors.category_id}</p>}
              </Form.Group>
            </Col>
            <Col xl={3}>
              <Form.Group className="mb-3" controlId="ControlInput5">
                <Form.Label>Marka Adı</Form.Label>
                <Form.Select name="brand_id" value={formProductData.brand_id} onChange={handleChange} required>
                  <option value="">Marka Seçiniz</option>
                  {brands.map((brand) => (
                    <option key={brand._id} value={brand._id}>
                      {brand.name}
                    </option>
                  ))}
                </Form.Select>
                {formErrors.brand_id && <p className="text-danger">{formErrors.brand_id}</p>}
              </Form.Group>
            </Col>   
            <Col xl={12}>
            <Form.Group className="mb-3" controlId="ControlInput3">
              <div>
                <h6>Ürün Araba (Ürün Hangi Arabalara Uygun Seçiniz)</h6>
                {cars.length === 0 ? (
                  <label>
                    <input type="checkbox" value='' onChange={handleChangeCars}/>{' '}
                    Yükleniyor...
                  </label>
                ) : (
                  <Container fluid>
                    <Row>
                    {cars.map((item) => (
                      <Col className='text-center'>
                          <label key={item._id}>
                          <input
                              type="checkbox"
                              value={item._id}
                              onChange={handleChangeCars}
                              checked={formProductData.car_id.includes(item._id.toString())}
                            />{' '}
                            {item.name.slice(0, 3)}
                          </label>
                      </Col>
                      ))}
                    </Row>  
                  </Container>
                )}
              </div>
            </Form.Group>
            </Col>
          </Row>
          <Row>
          <Col xl={4}>
              <Form.Group className="mb-3" controlId="ControlInput9">
                <Form.Label>Aktif Mi ?</Form.Label>
                <Form.Select name="isActive" value={formProductData.isActive} onChange={handleChange} required>
                  <option value="">Seçiniz</option>
                  <option value="true">Aktif</option>
                  <option value="false">Pasif</option>
                </Form.Select>
                {formErrors.isActive && <p className="text-danger">{formErrors.isActive}</p>}
              </Form.Group>
            </Col>
            <Col xl={4}>
              <Form.Group className="mb-3" controlId="ControlInput11">
                <Form.Label>Satış Formatı</Form.Label>
                <Form.Select name="salesFormat" value={formProductData.salesFormat} onChange={handleChange} required>
                  <option value="">Seçiniz</option>
                  <option value="true">Adet</option>
                  <option value="false">Takım</option>
                </Form.Select>
                {formErrors.salesFormat && <p className="text-danger">{formErrors.salesFormat}</p>}
              </Form.Group>
            </Col>
            <Col xl={4}>
              <Form.Group className="mb-3" controlId="ControlInput12">
                <Form.Label>Durum</Form.Label>
                <Form.Select name="status" value={formProductData.status} onChange={handleChange} required>
                  <option value="">Seçiniz</option>
                  <option value="true">Sıfır</option>
                  <option value="false">2. El (Çıkma)</option>
                </Form.Select>
                {formErrors.status && <p className="text-danger">{formErrors.status}</p>}
              </Form.Group>
            </Col>
            <Col xl={3}>
              <Form.Group className="mb-3" controlId="ControlInput6">
                <Form.Label>Ürünün Maliyet Fiyatı</Form.Label>
                <Form.Control type="number" name="costPrice" value={formProductData.costPrice} onChange={handleChange} required />
                {formErrors.costPrice && <p className="text-danger">{formErrors.costPrice}</p>}
              </Form.Group>
            </Col>
            <Col xl={3}>
              <Form.Group className="mb-3" controlId="ControlInput7">
                <Form.Label>Ürünün İndirimsiz Fiyatı</Form.Label>
                <Form.Control type="number" name="oldPrice" value={formProductData.oldPrice} onChange={handleChange} required />
                {formErrors.oldPrice && <p className="text-danger">{formErrors.oldPrice}</p>}
              </Form.Group>
            </Col>
            <Col xl={3}>
              <Form.Group className="mb-3" controlId="ControlInput8">
                <Form.Label>Ürünün Satış Fiyatı</Form.Label>
                <Form.Control type="number" name="sellingPrice" value={formProductData.sellingPrice} onChange={handleChange} required />
                {formErrors.sellingPrice && <p className="text-danger">{formErrors.sellingPrice}</p>}
              </Form.Group>
            </Col>
            <Col xl={3}>
              <Form.Group className="mb-3" controlId="ControlInput10">
                <Form.Label>Stok Sayısı</Form.Label>
                <Form.Control type="number" name="stock" value={formProductData.stock} onChange={handleChange} required />
                {formErrors.stock && <p className="text-danger">{formErrors.stock}</p>}
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
