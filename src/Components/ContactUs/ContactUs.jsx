import React, {useState} from 'react'
import './ContactUs.css'
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import '../../Assets/CSS/Toaststyles.css';

function ContactUs() {
    
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [error, setError] = useState({});

  const validationSchema = Yup.object().shape({
    name: Yup.string().matches(/^[a-zA-Z\s]+$/, 'Invalid name input or Empty'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    message: Yup.string().required('Message is required'),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(formData, { abortEarly: false });

      
      setFormData({
        name: '',
        email: '',
        message: '',
      });

      
      setError({});

      
      toast.success('Form submitted successfully!', {
        position: 'top-right',
        autoClose: 5000,
        className: 'custom-toast',
        bodyClassName: 'custom-toast-body',
        iconClassName: 'custom-toast-icon',
      });
    } catch (err) {
      const yupErrors = {};
      err.inner.forEach((e) => {
        yupErrors[e.path] = e.message;
       
        toast.error(e.message, {
          position: 'top-right',
          autoClose: 5000,
          className: 'custom-toast',
          bodyClassName: 'custom-toast-body',
          iconClassName: 'custom-toast-icon',
        });
      });

      
      setError(yupErrors);
    }
  };


      
  
    return (
    <div className='contact-us-container'>
      <ToastContainer /> 
        <h2>Contact Us</h2><br/>
        <p>We'd love to hear from you, Please share your Name , Email and Message you would like to send us
          and we will get back to you.</p><br/>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder='Enter your name...'
          />
        

        
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder='Enter your Email...'
          />
          
        

        
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder='Enter the Message...'
          />
        </div>

        <button id='submit-btn' type="submit">Submit</button>
      </form>
    </div>
  )
}

export default ContactUs