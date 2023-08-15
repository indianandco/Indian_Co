/* eslint-disable react/prop-types */
import "./Cart.css";
import { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import { CartContext } from '../../services/CartContext';
import { NavLink } from "react-router-dom";

// eslint-disable-next-line no-unused-vars
const Cart = ({ product }) => {

  const { cart, addProduct, removeProduct, removeStack, loadCartData,calcTotal } = useContext(CartContext);
  // eslint-disable-next-line no-unused-vars
  const [productCounts, setProductCounts] = useState();
  // eslint-disable-next-line no-unused-vars
  const [cartIsEmpty, setCartIsEmpty] = useState(true);

  const incrementar = (item) => {
    if (item.quantity < item?.stock) {
      addProduct(item)
    }

  };

  const restar = (item) => {
    if (item.quantity > 1) {
      removeProduct(item)
    }
    else {
      removeStack(item)
    }
  };

  useEffect(() => {
    loadCartData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="carrito-container">
      <div className="d-grip gap-2">
        {!cart.length > 0 ? (
          <div className="p">
            <p>¡Empieza un carrito de compras!</p>
            <p>Sumá productos</p>
            <NavLink to='/products'>
              <Button>VOLVER A TIENDA</Button>
            </NavLink>
          </div>
        ) : (
          <div>
            <div className="BannerCart1">
              <div className="paddingAmount">
                <div className="titleBoxCart">
                  <p className="titleCart">Productos agregados</p>
                </div>
              </div>
            </div>
            <div>
              {cart?.map((item) => (
                <div key={item?.id}>
                  <div className='tarjeta' key={item?.id}>
                    <img src={item?.image} alt={item?.title} className='tarjeta-imagen' />
                    <div className='tarjeta-contenido'>
                      <h3 className='tarjeta-titulo'>{item?.title}</h3>
                      {item?.offer_price ? (
                        <p className='tarjeta-precio'>${item?.offer_price}</p>
                      ) : (
                        <p className='tarjeta-precio'>${item?.price}</p>
                      )}
                      <div className="counterCart">
                        <Button
                          variant="light"
                          className="buttonCounterCart"
                          onClick={() => restar(item)}
                        >
                          -
                        </Button>
                        <span className='span'>{item?.quantity}</span>
                        <Button
                          variant="light"
                          className="buttonCounterCart"
                          onClick={() => incrementar(item)}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                    <Button onClick={() => removeStack(item)} type='button' className='boton-quitar'>Quitar del Carrito</Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="BannerCart2">
              <div className="paddingAmount">
                <div className="totalAmount">
                  <h1 className="h1TextCart">Total: ${calcTotal()}</h1>
                </div>
              </div>
            </div>
            <button className="btn btn-primary boton-comprar">COMPRAR</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
