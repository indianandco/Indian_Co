import styles from "./Cart.module.css";
import { useContext, useEffect, useState } from 'react';
import { Tab, Tabs, Row, Col, Container, Button } from 'react-bootstrap'
import { CartContext } from '../../services/CartContext';
import { NavLink } from "react-router-dom";
import logo from '../../../public/logoEmptyCart.png'

// eslint-disable-next-line no-unused-vars
const Cart = () => {
  const { cart, addProduct, removeProduct, removeStack, loadCartData, calcTotal, calcTotalPerItem } = useContext(CartContext);
  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [activeTab, setActiveTab] = useState('general');

  const handleTabs = (tab) => {
      setActiveTab(tab)
  }




  const numberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const applyCustomFormat = (value, formatterFunction) => {
    const formattedValue = formatterFunction(value);
    return formattedValue;
  };


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

    <Container fluid='md'>
    
      {
        !cart.length > 0 ? (
          <div className={styles.container}>
            <div className={styles.emptyCart}>
              <img className={styles.logo} src={logo} alt="logo Carrito de compras Vacio" width="300" height="300" />
              <p className="pCart1">¡Empieza un carrito de compras!</p>
              <NavLink to='/products'>
                <Button>Descubrir Productos...</Button>
              </NavLink>
            </div>
          </div>
        ) : (
        <Tabs defaultActiveKey="general"
        activeKey={activeTab}
        className="d-none">
          <Tab eventKey="general" title="general">
            <Row className={styles.container}>
                  <Col xs={12} md={12} lg={8} className={styles.cart_prueba} >
                    <div className="BannerCart1">
                      <p className="titleCart">Productos agregados:</p>
                    </div>

                    {cart?.map((item) => (
                      <Row className={styles.tarjeta} key={item?.id}>
                        <Col xs={0} md={1} className={styles.imgColumn}>
                          <img src={item?.image} alt={item?.title} className={styles.tarjeta_imagen} />
                        </Col>
                        <Col xs={8} md={7} className={styles.tarjeta_contenido}>
                          <p className={styles.tarjeta_titulo}>{item?.title}</p>
                          {item?.offer_price ? (
                            <b className='tarjeta-precio'>${applyCustomFormat(item?.offer_price, numberWithCommas)}</b>
                          ) : (
                            <b className='tarjeta-precio'>${applyCustomFormat(item?.price, numberWithCommas)}</b>
                          )}
                        </Col>
                        <Col xs={1} md={2} className={styles.counterCart}>

                          <Button
                            variant="light"
                            className={styles.buttonCounterCart}
                            onClick={() => restar(item)}
                          >
                            <b>-</b>
                          </Button>
                          <p className={styles.quantityView}><b>{item?.quantity}</b> </p>
                          <Button
                            variant="light"
                            className={styles.buttonCounterCart}
                            onClick={() => incrementar(item)}
                          >
                            <b>+</b>
                          </Button>

                        </Col>
                        <Col xs={1} md={1} className={styles.deleteButton}>
                          <Button variant="danger" onClick={() => removeStack(item)} type='button' ><i className="bi bi-trash"></i></Button>
                        </Col>
                      </Row>
                    ))}
                  </Col>
              <Col xs={12} md={12} lg={4} className={styles.subTotalColumn}>
                <p>Detalle del Carrito:</p>
                <ol className={styles.product_list}>
                  {
                    cart?.map((item) => {
                      return (
                        <li key={item.id} className={styles.product_item}>
                          <span className={styles.product_name}>{item.title}</span>  <span>x</span> <span className={styles.product_price}>${applyCustomFormat(calcTotalPerItem(item), numberWithCommas)}</span>
                        </li>)
                    })
                  }
                  <li className={styles.product_item}><span className={styles.product_name}>Total:</span> <span><b>${applyCustomFormat(calcTotal(), numberWithCommas)}</b></span> </li>
                </ol>
                <Button variant="success" onClick={() => handleTabs("test")}>CHECKOUT</Button>
              </Col>
            </Row>
          </Tab>
          <Tab eventKey="test">
            <Row className={styles.container}>
              <Col xs={12} md={12} lg={8} className={styles.cart_prueba} >
                <div className="BannerCart1">
                  <p className="titleCart">Tus datos:</p>
                </div>
              </Col>
              <Col xs={12} md={12} lg={4} className={styles.subTotalColumn}>
                <p>Detalle de tu Pedido:</p>
                <ol className={styles.product_list}>
                  {
                    cart?.map((item) => {
                      return (
                        <li key={item.id} className={styles.product_item}>
                          <span className={styles.product_name}>{item.title}</span>  <span>x</span> <span className={styles.product_price}>${applyCustomFormat(calcTotalPerItem(item), numberWithCommas)}</span>
                        </li>)
                    })
                  }
                  <li className={styles.product_item}><span className={styles.product_name}>Total:</span> <span><b>${applyCustomFormat(calcTotal(), numberWithCommas)}</b></span> </li>
                </ol>
                <Button variant="success" onClick={() => handleTabs("test")}>CHECKOUT</Button>
              </Col>
            </Row>
          </Tab>
        </Tabs>
        )}
    </Container>
  );
};

export default Cart;
