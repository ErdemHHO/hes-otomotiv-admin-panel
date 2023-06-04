import React,{useState} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom' 
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {adminSignin} from '../../actions/adminAuth'


function Login() {

  const [formData, setFormData] = useState({ email: '', password: '' });

  const dispatch=useDispatch();
  const navigate=useNavigate();

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(adminSignin(formData, navigate));
      if (response && response.success) {
        toast.success(response.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      } else {
        toast.error(response.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    }
  };
  

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };


  return (
    <div>
      <main className="form-signin w-100 m-auto">
      <Form onSubmit={handleSubmit}>
        <img className="mb-4" src="images/HES-OTOMOTIV-LOGO1.png" alt="hes-otomotiv-logo" width="320" height="150" />
        <h1 className="h3 mb-3 fw-normal">Admin Giriş</h1>

        <Form.Group className="form-floating" controlId="formBasicEmail">
          <Form.Control 
            type="email"
            name="email" 
            placeholder="name@example.com"
            value={formData.email}
            onChange={handleChange} 
          />
          <Form.Label>E-Posta</Form.Label>
        </Form.Group>

        <Form.Group className="form-floating" controlId="formBasicPassword">
          <Form.Control 
          type="password"
          name="password" 
          placeholder="Password"
          value={formData.password}
          onChange={handleChange} 
          />
          <Form.Label>Şifre</Form.Label>
        </Form.Group>

        <Button 
          className="w-100 btn btn-lg btn-primary" 
          variant="primary" 
          type="submit" 
          disabled={!formData.email || !formData.password} 
          onClick={handleSubmit}
        >
          Giriş Yap
        </Button>
      </Form>
      </main>
    </div>
  )
}

export default Login