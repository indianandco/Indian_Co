/* eslint-disable react/prop-types */
import "./Cart.css";
import { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import { CartContext } from '../../services/CartContext';
import { NavLink } from "react-router-dom";

// eslint-disable-next-line no-unused-vars
const Cart = ({ product }) => {

  const { cart, addProduct, removeProduct, removeStack, loadCartData } = useContext(CartContext);
  // eslint-disable-next-line no-unused-vars
  const [productCounts, setProductCounts] = useState();
  // eslint-disable-next-line no-unused-vars
  const [cartIsEmpty, setCartIsEmpty] = useState(true);
  let [total, setTotal] = useState(0);


  const totalPrice = () => {
    let totalAux = 0;
    if (cart?.length > 0) {
      cart.forEach((product) => {
        product.offer
          ? setTotal((totalAux += product.price * product.quantity))
          : setTotal((totalAux += product.offer_price * product.quantity));
      });
    }
  };

  const incrementar = (item) => {
    if (item.quantity < item?.stock) {
      addProduct(item)
      totalPrice();
    }
  };

  const restar = (item) => {
    if (item.quantity > 1) {
      removeProduct(item)
      totalPrice();
    }
    else {
      removeStack(item)
      totalPrice();
    }
  };

  useEffect(() => {
    loadCartData();
    totalPrice();
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
            <p className="titleCart">Productos agregados</p>
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
            <div>
              {total}
            </div>
            <button className="btn btn-primary boton-comprar">COMPRAR</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
