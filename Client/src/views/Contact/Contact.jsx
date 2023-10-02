import { useState } from 'react';
import './Contact.css'
import { fetcherUserPost } from '../../utils/fetcherPost'
import Swal from 'sweetalert2';

const Contact = () => {
  const [ticket, setTicket] = useState({
    name: '',
    email: '',
    description: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setTicket((prevTicket) => ({
      ...prevTicket,
      [event.target.name]: event.target.value
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (ticket.name.length < 3) {
      errors.name = 'El nombre debe tener al menos 3 caracteres.';
    } else if (!/^[a-zA-Z\s]+$/.test(ticket.name)) {
      errors.name = 'El nombre solo debe contener letras.';
    }
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(ticket.email)) {
      errors.email = 'El correo electrónico no es válido.';
    }
    if (ticket.description.trim() === '') {
      errors.description = 'La descripción no puede estar vacía.';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      try {
        const response = await fetcherUserPost('/users/contact', ticket);

        if (response) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Correo electrónico enviado exitosamente.',
            showConfirmButton: false,
            timer: 1500
          });

          setTimeout(() => {
            window.location.reload();
          }, 1500);
        }
      } catch (error) {
        console.error('Error:', error);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Error al enviar el correo electrónico.',
          showConfirmButton: false,
          timer: 1500
        });
      }
    }
  };

  return (
    <div className='allContact'>
      <form className='form' onSubmit={handleSubmit}>
        <div className='formBox'>
          <div className='form-1'>
            <label>Nombre completo</label>
            <input
              required
              autoComplete='off'
              className="input"
              type='text'
              maxLength={20}
              onChange={handleChange}
              value={ticket.name}
              name='name'
              placeholder="Ingrese su nombre..."
            />
            {errors.name ? <p className="error-message">{errors.name}</p> : <p className="error-message"> </p>}
          </div>
          <div className='form-2'>
            <label>Email</label>
            <input
              required
              className="input"
              type='email'
              value={ticket.email}
              name='email'
              onChange={handleChange}
              placeholder="Ingrese su email..."
            />
            {errors.email ? <p className="error-message">{errors.email}</p> : <p className="error-message"> </p>}
          </div>
          <div className='form-2'>
            <label>Hace tu consulta</label>
            <textarea
              required
              className="input1"
              autoComplete='off'
              maxLength={255}
              type='text'
              value={ticket.description}
              name='description'
              onChange={handleChange}
              placeholder="Ingrese su consulta..."
            />
            {errors.description ? <p className="error-message">{errors.description}</p> : <p className="error-message"> </p>}
          </div>
          <div>
            <button className='send'>ENVIAR</button>
          </div>
        </div>
      </form>
      <div className='footer'>
        <div className='desc'>
          <div className='smallBox'>
            <h6 className='h6Contact'>Visitanos</h6>
            <p className='pContact'>Podes contactarnos por Instagram o Facebook, visitar nuestra tienda online y realizar tu pedido.</p>
          </div>
          <div className='smallBox'>
            <h6 className='h6Contact'>Abierto</h6>
            <p className='pContact'>Lun - Vie [14 a 19 hs] </p>
          </div>
          <div className='smallBox'>
            <h6 className='h6Contact'>Contacto</h6>
            <p className='pContact'>indianandco09@gmail.com</p>
            <p className='pContact'>ventas@indianandco.com.ar</p>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Contact;