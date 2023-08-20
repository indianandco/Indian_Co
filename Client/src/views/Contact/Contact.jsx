import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Contact.css'

const Contact = () => {

    /* const [value, setValue] = useState(''); */
    const [ticket, setTicket] = useState({
        name: '',
        email: '',
        description: ''
    });

    const handleChange = (event) => {
        setTicket((prevTicket) => ({
          ...prevTicket,
          [event.target.name]: event.target.value
        }));
      };

    const handleSubmit = async (event) => {
        event.preventDefault();
    }

    return (
        <div className='allContact'>
            <div className='headerContact'>
                <NavLink to='/home' className='title'>
                    <h3 className='h3Contact'>DESCUBRE NOVEDADES</h3>
                    <h1 className='h1Contact'>DÓNDE COMPRAR LOS PRODUCTOS</h1>
                </NavLink>
            </div>
            <div>
                <form className='form' onSubmit={handleSubmit}>
                    <div className='formBox'>
                        <div className='form-1'>
                            <label>Nombre completo</label>
                            <input
                            required
                            autoComplete='off'
                            className="input"
                            type='name'
                            maxLength={20}
                            onChange={handleChange}
                            value={ticket.name}
                            name='name'
                            placeholder="Ingrese su nombre..."
                            />
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
                        </div>
                        <div>
                            <button className='send' onClick={(e) => handleSubmit(e)}>ENVIAR</button>
                        </div>
                    </div>
                </form>
            </div>
            <div className='footer'>
                <div className='desc'>
                    <div className='box'>
                        <div className='box-1'>
                            <div className='smallBox'>
                                <h6 className='h6Contact'>Visitanos</h6>
                                <p className='pContact'>Podes contactarnos por Instagram o Facebook, visitar nuestra tienda online y realizar tu pedido.</p>
                            </div>
                            <div className='smallBox'>
                                <h6 className='h6Contact'>Medios de pago</h6>
                                <p className='p1Contact'>· Efectivo</p>
                                <p className='p1Contact'>· Mercado Pago</p>
                                <p className='p1Contact'>· Transferencia bancaria</p>
                            </div>
                            <div className='smallBox'>
                                <h6 className='h6Contact'>Abierto</h6>
                                <p className='pContact'>Lun - Vie [14 a 19 hs] </p>
                            </div>
                            <div className='smallBox'>
                                <h6 className='h6Contact'>CONTACTO</h6>
                                <p className='pContact'>indianandco09@gmail.com</p>
                            </div>
                        </div>
                        <div className='box-2'>
                            <h4 className='h6Contact'>Nuestros Clientes</h4>
                            <p className='p2Contact'>·Grupo Lemark</p>
                            <p className='p2Contact'>·Estudio4k</p>
                            <p className='p2Contact'>·Naranjo_pijamas</p>
                            <p className='p2Contact'>·CFQ Medicina Estética</p>
                            <p className='p2Contact'>·Sinapsiskinesiologíaintegral</p>
                            <p className='p2Contact'>·Queens Home Deco</p>
                            <p className='p2Contact'>·Creando.universos</p>
                            <p className='p2Contact'>·Pijamadas_almacendesuenios</p>
                            <p className='p2Contact'>·hocicosboutique</p>
                            <p className='p2Contact'>·wos_espaciosverdes</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Contact;