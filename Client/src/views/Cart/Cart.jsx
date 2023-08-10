import "./Cart.css"; // Archivo CSS para estilos
import { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import { CartContext } from '../../services/CartContext';
import { NavLink } from "react-router-dom";

const Cart = () => {

  const { cart, addProduct, removeProduct, removeStack, loadCartData } = useContext(CartContext);
  const [productCounts, setProductCounts] = useState();
  const [cartIsEmpty, setCartIsEmpty] = useState(true);
  /* let [total, setTotal] = useState(0);

  const totalPrice = () => {
    let totalAux = 0;
    if (cart.length > 0) {
      cart.forEach((product) => {
        product.sale_price
          ? setTotal((totalAux += product.price * product.quantity))
          : setTotal((totalAux += product.original_price * product.quantity));
      });
    }
    setTotal(totalAux)
  }; */

  useEffect(() => {
    loadCartData();
    const savedCart = JSON.parse(localStorage.getItem("cart"));
  }, [])

  return (
    <div className="carrito-container">
      <h1>Carrito de Compras</h1>
      <div>
        {cart?.map((item) => (
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
                <div>
                  <div>
                    <button

                      onClick={() => removeProduct(item?.id)}
                    >
                      -
                    </button>
                    <button
                      onClick={() => addProduct(item)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <Button onClick={() => removeStack(item?.id)} type='button' className='boton-quitar'>Quitar del Carrito</Button>
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
