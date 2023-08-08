import { useState } from 'react';
import './CardCart.css'

const CardCart = ({image, title, description, price}) => {

    const [added, setAdded] = useState(false)

    return(
        <div className='tarjeta'>
            <img src='imagen' alt={'title'} className='tarjeta-imagen' />
            <div className='tarjeta-contenido'>
                <h3 className='tarjeta-titulo'>{'title'}</h3>
                <p className='tarjeta-descripcion'>{'description'}</p>
                <p className='tarjeta-precio'>{'price'}</p>
            </div>
            {added 
                ? <button type='button' className='boton-quitar'>Quitar del Carrito</button>
                : <button type='button' className='boton-agregar'>Agregar del Carrito</button>
            }
        </div>
    )
}


export default CardCart;