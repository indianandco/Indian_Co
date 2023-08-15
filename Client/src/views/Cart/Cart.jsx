/* eslint-disable react/prop-types */
import "./Cart.css";
import { useContext, useEffect } from 'react';
import Button from 'react-bootstrap/esm/Button';
import { CartContext } from '../../services/CartContext';
import { NavLink } from "react-router-dom";

// eslint-disable-next-line no-unused-vars
const Cart = () => {
  const { cart, addProduct, removeProduct, removeStack, loadCartData, calcTotal } = useContext(CartContext);

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
  console.log(cart);
  return (
    <div className="carrito-container">
      <div>
        {!cart.length > 0 ? (
          <div className="BannerCart">
            <div className="paddingCart1">
              <div className="pCart">
                <p className="pCart1">¡Empieza un carrito de compras!</p>
                <p className="pCart1">Sumá productos</p>
                <NavLink to='/products'>
                  <Button>VOLVER A TIENDA</Button>
                </NavLink>
              </div>
            </div>
          </div>
        ) : (
          <div className="AllBoxCart">
            <div className="BoxCart1">
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
                      <img onClick={() => removeStack(item)} type='button' className="imgDelete" src="/deleteCart.svg"></img>
                  </div>
                </div>
              ))}
            </div>
            <div className="CartBox2">
            <h3 className="TitleCartBox2">Resumen de su compra</h3>
            {cart?.map((item) => (
                <div className="CartBox2Desc" key={item?.id}>
                  <p className="pCartDesc">{item?.title}</p>
                  <p className="pCartDesc">X{item?.quantity}</p>
                </div>
            ))}
            <div className="totalAmount">
              <h1 className="h1TextCart">Total: ${calcTotal()}</h1>
            </div>
            <button className="btn btn-primary boton-comprar">COMPRAR</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
