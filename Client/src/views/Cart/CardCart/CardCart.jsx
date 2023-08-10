import { useContext } from 'react';
import Button from 'react-bootstrap/esm/Button';
import { CartContext } from '../../../services/CartContext';
import './CardCart.css'

const CardCart = () => {

    const { buyLists, clickRemove} = useContext(CartContext);

    return(
        <div >
            {buyLists.map((item) => (
            <div key={item?.id}>
                <div className='tarjeta'>
                    <img src='imagen' alt={item?.title} className='tarjeta-imagen' />
                    <div className='tarjeta-contenido' >
                        <h3 className='tarjeta-titulo'>{item?.title}</h3>
                        {item?.offer_price ? (
                            <p className='tarjeta-precio'>{item?.offer_price}</p>
                        ) : (
                            <p className='tarjeta-precio'>{item?.price}</p>
                        )
                        }
                </div>
                    <Button onClick={clickRemove(item?.id)} type='button' className='boton-quitar'>Quitar del Carrito</Button>
                </div>
            </div>
                ))}
        </div>
    )
}


export default CardCart;