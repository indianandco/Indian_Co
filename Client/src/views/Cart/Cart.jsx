import "./Cart.css"; // Archivo CSS para estilos
import { useContext } from 'react';
import Button from 'react-bootstrap/esm/Button';
import { CartContext } from '../../services/CartContext';
import { NavLink } from "react-router-dom";

const Cart = () => {

  const { cart, addToCart, removeFromCart, removeToCart,removeAllItems } = useContext(CartContext);

  return (
    <div className="carrito-container">
      <h1>Carrito de Compras</h1>
      <div>
            {cart.map((item) => (
            <div key={item?.id}>
                <div className='tarjeta' key={item?.id}>
                    <img src='imagen' alt={item?.title} className='tarjeta-imagen' />
                    <div className='tarjeta-contenido'>
                        <h3 className='tarjeta-titulo'>{item?.title}</h3>
                        {item?.offer_price ? (
                            <p className='tarjeta-precio'>{item?.offer_price}</p>
                        ) : (
                            <p className='tarjeta-precio'>{item?.price}</p>
                        )
                        }
                </div>
                    <Button onClick={removeFromCart(item?.id)} type='button' className='boton-quitar'>Quitar del Carrito</Button>
                </div>
            </div>
                ))}
        </div>
      <div className="d-grip gap-2">
        {cart ? (
          <div className="p">
            <p>¡NO HAY ARTICULOS AGREGADOS!</p>
            <NavLink to='/products'>
              <Button>VOLVER A TIENDA</Button>
            </NavLink>
          </div>
          ) : (
          <button className="btn btn-primary boton-comprar">COMPRAR</button>
        )

        }
      </div>
    </div>
  );
};

export default Cart;
