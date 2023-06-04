import React,{useState} from 'react'
import { Form, Button } from 'react-bootstrap'
import * as api from "../../api/index.js";
import { toast } from 'react-toastify';

function FormCom( {handlePageChange} ) {

  
  const [formData, setFormData] = useState({
    name: '',
  });
  const [formErrors, setFormErrors] = useState({});

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
      const response = await api.kategoriEkle(formData);
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
      isValid = false;
      errors.name = 'Kategori adı boş bırakılamaz';
    }
    return { isValid, errors };
  };

  return (
    <div>
      <Form onSubmit={handleSubmit} >
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Kategori Adı</Form.Label>
          <Form.Control 
          type="text" 
          placeholder="" 
          name="name"
          onChange={handleChange}
          />
          {formErrors.name && (
            <p style={{ color: "red" }}>{formErrors.name}</p>
          )}
        </Form.Group>
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