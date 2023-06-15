import React, { useState, useEffect } from "react";
import * as api from "../../api/index.js";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

function UpFormModal({ show, handleClose, adminId }) {
  const [admin, setAdmin] = useState({});
  const [adminFormData, setAdminFormData] = useState({
    old_password: "",
    new_password: "",
    newConfirmPassword: "",
    isSuperAdmin: "",
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const getAdmin = async () => {
      try {
        const response = await api.adminGetir(adminId);
        setAdmin(response.data.admin);
        setAdminFormData({
          isSuperAdmin: response.data.admin.isSuperAdmin || false,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getAdmin();
  }, [adminId]);

  const handleChange = (e) => {
    setAdminFormData({ ...adminFormData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { isValid, errors } = validateForm();
    if (!isValid) {
      setFormErrors(errors);
      return;
    }
    try {
      const formData = adminFormData;
      const response = await api.adminGuncelle(adminId, formData);
      toast.success(response.data.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      setAdminFormData({
        old_password: "",
        new_password: "",
        newConfirmPassword: "",
        isSuperAdmin: "",
      });
      setFormErrors({});
      handleClose();
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
    if (!adminFormData.old_password) {
      isValid = false;
      errors.old_password = "Eski şifre boş bırakılamaz";
    }
    if (!adminFormData.new_password) {
      isValid = false;
      errors.new_password = "Yeni şifre boş bırakılamaz";
    }
    if (!adminFormData.newConfirmPassword) {
      isValid = false;
      errors.newConfirmPassword = "Yeni şifre tekrarı boş bırakılamaz";
    }

    return { isValid, errors };
  };



  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Admin Güncelle</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {admin && (
          <div>
            <h6>Admin Adı: {admin.name}</h6>
            <h6>Admin Soyadı: {admin.surname}</h6>
            <h6>Admin Email: {admin.email}</h6>
          </div>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Eski Şifre</Form.Label>
            <Form.Control
              type="password"
              placeholder="Eski Şifre"
              name="old_password"
              value={adminFormData.old_password}
              onChange={handleChange}
            />
            {formErrors.old_password && (
              <Form.Text className="text-danger">
                {formErrors.old_password}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Yeni Şifre</Form.Label>
            <Form.Control
              type="password"
              placeholder="Yeni Şifre"
              name="new_password"
              value={adminFormData.new_password}
              onChange={handleChange}
            />
            {formErrors.new_password && (
              <Form.Text className="text-danger">
                {formErrors.new_password}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Yeni Şifre Tekrarı</Form.Label>
            <Form.Control
              type="password"
              placeholder="Yeni Şifre Tekrarı"
              name="newConfirmPassword"
              value={adminFormData.newConfirmPassword}
              onChange={handleChange}
            />
            {formErrors.newConfirmPassword && (
              <Form.Text className="text-danger">
                {formErrors.newConfirmPassword}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Admin Yetkisi</Form.Label>
            <Form.Select
              name="isSuperAdmin"
              value={adminFormData.isSuperAdmin}
              onChange={handleChange}
            >
              <option value="">Seçiniz</option>
              <option value={false}>Admin</option>
              <option value={true}>Super Admin</option>
            </Form.Select>
            {formErrors.isSuperAdmin && (
              <Form.Text className="text-danger">
                {formErrors.isSuperAdmin}
              </Form.Text>
            )}
          </Form.Group>

          <Button variant="primary" type="submit">
            Güncelle
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default UpFormModal;
