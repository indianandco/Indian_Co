import { useState } from 'react';
import '../Contact/Contact.css'
import { fetcherUserPost } from '../../utils/fetcherPost'
import Swal from 'sweetalert2';
import { Divider } from '@mui/material';

const Wholesaler = () => {
  const [ticket, setTicket] = useState({
    name: '',
    email: '',
    company: '',
    category: '',
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
        const response = await fetcherUserPost('/users/wholesaler', ticket);

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
          <div className='form-1'>
            <label>Nombre del negocio</label>
            <input
              required
              autoComplete='off'
              className="input"
              type='text'
              maxLength={20}
              onChange={handleChange}
              value={ticket.company}
              name='company'
              placeholder="Ingrese su nombre de negocio..."
            />
            {errors.name ? <p className="error-message">{errors.name}</p> : <p className="error-message"> </p>}
          </div>
          <div className='form-1'>
            <label>Rubro de tu negocio</label>
            <input
              required
              autoComplete='off'
              className="input"
              type='text'
              maxLength={20}
              onChange={handleChange}
              value={ticket.category}
              name='category'
              placeholder="Ingrese el rubro de su negocio..."
            />
            {errors.name ? <p className="error-message">{errors.name}</p> : <p className="error-message"> </p>}
          </div>
          <div>
            <button className='send'>ENVIAR</button>
          </div>
        </div>
      </form>
      <div className='footer'>
        <div className='desc'>
          <div className='smallBox'>
            <h6 style={{ fontSize: '13px' }} className='h6Contact'>Bienvenido a nuestra plataforma de pedidos al por mayor</h6>
            <p style={{ fontSize: '10px' }} className='pContact'>En Indian&Co, entendemos la importancia de satisfacer las necesidades de tu negocio. Nuestros productos de alta calidad están diseñados para ayudarte a tener éxito. ¡Estamos emocionados de ofrecerte la oportunidad de adquirir nuestros productos al por mayor y potenciar tu negocio! </p>
          </div>
          <Divider sx={{width: "100%", background: 'black', marginBottom: '1.2em'}} />
          <div className='smallBox'>
            <h6 style={{ fontSize: '13px' }} className='h6Contact'>Características</h6>
            <p style={{ fontSize: '10px' }} className='pContact'><div style={{ flexDirection: 'column' }}><strong>•Productos de Calidad Superior</strong><p>Ofrecemos una selección cuidadosamente curada de productos que cumplen con los estándares más altos de calidad.</p></div></p>
            <p style={{ fontSize: '10px' }} className='pContact'><div style={{ flexDirection: 'column' }}><strong>•Precios Competitivos</strong><p>Nuestro equipo de expertos está aquí para ayudarte en cada paso del proceso de pedido.</p></div></p>
            <p style={{ fontSize: '10px' }} className='pContact'><div style={{ flexDirection: 'column' }}><strong>•Atención Personalizada</strong><p>Nuestros precios al por mayor te permiten maximizar tus márgenes de beneficio.</p></div></p>
          </div>
          <Divider sx={{width: "100%", background: 'black', marginBottom: '1.2em'}} />
          <div className='smallBox'>
            <h6 style={{ fontSize: '13px' }} className='h6Contact'>Atención</h6>
            <p style={{ fontSize: '10px' }} className='pContact'>Responderemos a los mails con información completa en las proximas 48 hs. </p>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Wholesaler;