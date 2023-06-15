import React,{useState} from 'react'
import { Form, Button,Container,Row,Col } from 'react-bootstrap'
import * as api from "../../api/index.js";
import { toast } from 'react-toastify';

function FormCom( {handlePageChange} ) {

  
  const [formAdminData, setFormAdminData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
    isSuperAdmin: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    setFormAdminData({ ...formAdminData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { isValid, errors } = validateForm();
    if (!isValid) {
      setFormErrors(errors);
      return;
    }
    try {

      const formData=formAdminData;

      const response = await api.adminEkle(formData);
      toast.success(response.data.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      handlePageChange("adminler");
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
    if (!formAdminData.name) {
      isValid = false;
      errors.name = 'Admin adı boş bırakılamaz';
    }
    if (!formAdminData.surname) {
      isValid = false;
      errors.surname = 'Admin soyadı boş bırakılamaz';
    }
    if (!formAdminData.email) {
      isValid = false;
      errors.email = 'Admin email boş bırakılamaz';
    }
    if (!formAdminData.password) {
      isValid = false;
      errors.password = 'Admin şifre boş bırakılamaz';
    }
    if (!formAdminData.confirmPassword) {
      isValid = false;
      errors.confirmPassword = 'Admin şifre tekrarı boş bırakılamaz';
    }
    if (!formAdminData.isSuperAdmin) {
      isValid = false;
      errors.isSuperAdmin = 'Admin yetkisi boş bırakılamaz';
    }
    return { isValid, errors };
  };

  return (
    <div>
      <Form onSubmit={handleSubmit} >
        <Container>
          <Row>
            <Col xl={6} >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Admin Adı</Form.Label>
              <Form.Control type="text" placeholder="Admin adı giriniz" name="name" value={formAdminData.name} onChange={handleChange} />
              {formErrors.name && (
                <Form.Text className="text-danger">{formErrors.name}</Form.Text>
              )}
            </Form.Group>
            </Col>
            <Col xl={6} >
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Admin Soyadı</Form.Label>
                <Form.Control type="text" placeholder="Admin soyadı giriniz" name="surname" value={formAdminData.surname} onChange={handleChange} />
                {formErrors.surname && (
                  <Form.Text className="text-danger">{formErrors.surname}</Form.Text>
                )}
              </Form.Group>
            </Col>
            <Col xl={12} >
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Admin Email</Form.Label>
                <Form.Control type="email" placeholder="Admin email giriniz" name="email" value={formAdminData.email} onChange={handleChange} />
                {formErrors.email && (
                  <Form.Text className="text-danger">{formErrors.email}</Form.Text>
                )}
              </Form.Group>
            </Col>
            <Col xl={4} >
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Admin Şifre</Form.Label>
                <Form.Control type="password" placeholder="Şifre giriniz" name="password" value={formAdminData.password} onChange={handleChange} />
                {formErrors.password && (
                  <Form.Text className="text-danger">{formErrors.password}</Form.Text>
                )}
              </Form.Group>
            </Col>
            <Col xl={4} >
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Admin Şifre Tekrar</Form.Label>
                <Form.Control type="password" placeholder="Şifreyi tekrar giriniz" name="confirmPassword" value={formAdminData.confirmPassword} onChange={handleChange} />
                {formErrors.confirmPassword && (
                  <Form.Text className="text-danger">{formErrors.confirmPassword}</Form.Text>
                )}
              </Form.Group>
            </Col>
            <Col xl={4} >
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Admin Yetkisi</Form.Label>
                <Form.Select name="isSuperAdmin" value={formAdminData.isSuperAdmin} onChange={handleChange} >
                  <option value="">Seçiniz</option>
                  <option value={false}>Admin</option>
                  <option value={true}>Super Admin</option>
                </Form.Select>
                {formErrors.isSuperAdmin && (
                  <Form.Text className="text-danger">{formErrors.isSuperAdmin}</Form.Text>
                )}
              </Form.Group>
            </Col>
          </Row>
        </Container>


        <div className="d-grid gap-2">
          <Button type='submit' variant="primary" size="lg">
            Kaydet
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default FormCom