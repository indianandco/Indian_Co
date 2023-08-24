/* eslint-disable no-unused-vars */
import styles from "./Cart.module.css";
import {useContext, useEffect, useState} from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import {
  Tab,
  Tabs,
  Row,
  Col,
  Container,
  Button,
  FormGroup,
} from "react-bootstrap";
import {CartContext} from "../../services/CartContext";
import {NavLink} from "react-router-dom";
import {fetcherPaymentMethod} from "../../utils/fetcherPost";

// eslint-disable-next-line no-unused-vars
const Cart = () => {
  const {
    cart,
    addProduct,
    removeProduct,
    removeStack,
    loadCartData,
    calcTotal,
    calcTotalPerItem,
  } = useContext(CartContext);

  const [activeTab, setActiveTab] = useState("general");
  const handleTabs = (tab) => {
    setActiveTab(tab);
  };

  const numberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  const applyCustomFormat = (value, formatterFunction) => {
    const formattedValue = formatterFunction(value);
    return formattedValue;
  };

  const incrementar = (item) => {
    if (item.quantity < item?.stock) {
      addProduct(item);
    }
  };

  const restar = (item) => {
    if (item.quantity > 1) {
      removeProduct(item);
    } else {
      removeStack(item);
    }
  };

  useEffect(() => {
    loadCartData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //OPCIONES DE ENVIO y PAGO
  const [selectedShippingOption, setSelectedShippingOption] = useState("");
  const [selectedPaymentMethodOpt, setselectedPaymentMethodOpt] = useState("");
  const [showBanner, setShowBanner] = useState(false);
  const [showShippingInfo, setShowShippingInfo] = useState(false);

  const handleShippingChange = (event) => {
    setSelectedShippingOption(event.target.value);
    setShowShippingInfo(true);
  };
  const handlePaymentMethod = (event) => {
    setselectedPaymentMethodOpt(event.target.value);
    setShowBanner(true);
  };

  //Formulario:
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    province: "",
    zipcode: "",
    notes: "",
  });
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      userInfo: {
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email,
        phone: form.phone,
      },
      deliverInfo: {
        address: form.address,
        city: form.city,
        province: form.province,
        zipcode: form.zipcode,
      },
      notes: form.notes,
    };

    const data = {
      shippingOption: selectedShippingOption,
      paymentMethod: selectedPaymentMethodOpt,
      user: formData,
      shop: {
        cart,
        total: calcTotal(),
      },
    };
    fetcherPaymentMethod("/carts/purchase", data);
  };

  const handleOnChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    setForm({
      ...form,
      [name]: value,
    });
    setValidated(true);
  };

  return (
    <Container fluid="md">
      {!cart.length > 0 ? (
        <div className={styles.container}>
          <div className={styles.emptyCart}>
            <img
              className={styles.logo}
              src="/logoEmptyCart.png"
              alt="logo Carrito de compras Vacio"
              width="300"
              height="300"
            />
            <p className="pCart1">¡Empieza un carrito de compras!</p>
            <NavLink to="/products">
              <Button>Descubrir Productos...</Button>
            </NavLink>
          </div>
        </div>
      ) : (
        <Tabs
          defaultActiveKey="general"
          activeKey={activeTab}
          className="d-none"
        >
          <Tab eventKey="general" title="general">
            <Row className={styles.container}>
              <Col xs={12} md={12} lg={8}>
                <div className="BannerCart1">
                  <p className="titleCart">Productos agregados:</p>
                </div>

                {cart?.map((item) => (
                  <Row className={styles.tarjeta} key={item?.id}>
                    <Col xs={0} md={1} className={styles.imgColumn}>
                      <img
                        src={item?.image}
                        alt={item?.title}
                        className={styles.tarjeta_imagen}
                      />
                    </Col>
                    <Col xs={8} md={7} className={styles.tarjeta_contenido}>
                      <p className={styles.tarjeta_titulo}>{item?.title}</p>
                      <p className={styles.tarjeta_titulo}>{item?.fragance}</p>
                      {item?.offer_price ? (
                        <b className="tarjeta-precio">
                          $
                          {applyCustomFormat(
                            item?.offer_price,
                            numberWithCommas
                          )}
                        </b>
                      ) : (
                        <b className="tarjeta-precio">
                          ${applyCustomFormat(item?.price, numberWithCommas)}
                        </b>
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
                      <p className={styles.quantityView}>
                        <b>{item?.quantity}</b>
                      </p>
                      <Button
                        variant="light"
                        className={styles.buttonCounterCart}
                        onClick={() => incrementar(item)}
                      >
                        <b>+</b>
                      </Button>
                    </Col>
                    <Col xs={1} md={1} className={styles.deleteButton}>
                      <Button
                        variant="danger"
                        onClick={() => removeStack(item)}
                        type="button"
                      >
                        <i className="bi bi-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                ))}
              </Col>
              <Col xs={12} md={12} lg={4} className={styles.subTotalColumn}>
                <p className="text-center mt-2">Detalle del Carrito</p>
                <ol className={styles.product_list}>
                  {cart?.map((item) => {
                    return (
                      <li key={item.id} className={styles.product_item}>
                        <span className={styles.product_name}>
                          {item?.title}
                        </span>
                        <span className={styles.product_price}>
                          $
                          {applyCustomFormat(
                            calcTotalPerItem(item),
                            numberWithCommas
                          )}
                        </span>
                      </li>
                    );
                  })}
                  <li className={styles.product_item}>
                    <span className={styles.product_name}>Total:</span>
                    <span>
                      <b>${applyCustomFormat(calcTotal(), numberWithCommas)}</b>
                    </span>
                  </li>
                </ol>
                <Button variant="success" onClick={() => handleTabs("test")}>
                  CHECKOUT
                </Button>
              </Col>
            </Row>
          </Tab>
          <Tab eventKey="test">
            <Row className={styles.container}>
              <Col xs={12} md={12} lg={6} className={styles.subTotalColumn}>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Row className="mb-3">
                    <h2 className="text-center">DETALLES DE FACTURACIÓN</h2>
                    <Form.Group as={Col} md="6" controlId="validationCustom01">
                      <Form.Label>Nombre/s</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="nombre"
                        name="first_name"
                        value={form.first_name}
                        onChange={handleOnChange}
                      />
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="validationCustom02">
                      <Form.Label>Apellido/s</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="apellido"
                        name="last_name"
                        value={form.last_name}
                        onChange={handleOnChange}
                      />
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group>
                      <Form.Label>Dirección de correo electrónico</Form.Label>
                      <Form.Control
                        required
                        name="email"
                        type="email"
                        placeholder="ejemplo@ejemplo.com.ar"
                        autoFocus
                        value={form.email}
                        onChange={handleOnChange}
                      />
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="validationCustom02">
                      <Form.Label>Teléfono Personal</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="ej: 1122334455"
                        name="phone"
                        value={form.phone}
                        onChange={handleOnChange}
                      />
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <hr />
                  {showShippingInfo &&
                    (selectedShippingOption === "envio" ? (
                      <>
                        <Row className="mb-3">
                          <h3 className="text-center">DATOS DE ENVÍO</h3>
                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom03"
                          >
                            <Form.Label>Ciudad</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="ciudad"
                              required
                              name="city"
                              value={form.city}
                              onChange={handleOnChange}
                            />
                            <Form.Control.Feedback type="invalid">
                              Please provide a valid city.
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group
                            as={Col}
                            md="3"
                            controlId="validationCustom04"
                          >
                            <Form.Label>Provincia</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="provincia"
                              required
                              name="province"
                              value={form.province}
                              onChange={handleOnChange}
                            />
                            <Form.Control.Feedback type="invalid">
                              Please provide a valid state.
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group
                            as={Col}
                            md="3"
                            controlId="validationCustom05"
                          >
                            <Form.Label>C.P</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="codigo postal"
                              required
                              name="zipcode"
                              value={form.zipcode}
                              onChange={handleOnChange}
                            />
                            <Form.Control.Feedback type="invalid">
                              Please provide a valid zip.
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Row>
                        <Row className="mb-3">
                          <Form.Group
                            as={Col}
                            md="12"
                            controlId="validationCustom05"
                          >
                            <Form.Label>Dirección de entrega</Form.Label>
                            <div className="d-flex justify-content-evenly">
                              <Form.Control
                                className="me-1"
                                type="text"
                                placeholder="Av Mitre 5850 "
                                required
                                name="address"
                                value={form.address}
                                onChange={handleOnChange}
                              />
                              <Form.Control
                                className="ms-1"
                                type="text"
                                placeholder="Apartamento, habitacion, etc(OPCIONAL)"
                                name="address"
                                value={form.address}
                                onChange={handleOnChange}
                              />
                            </div>
                            <Form.Control.Feedback type="invalid">
                              Please provide a valid zip.
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Row>
                        <hr />
                      </>
                    ) : (
                      <></>
                    ))}
                  <Row className="mb-3">
                    <Form.Group>
                      <Form.Label>Notas del pedido (opcional)</Form.Label>
                      <Form.Control
                        as="textarea"
                        placeholder="Deja tu comentario aca"
                        style={{height: "100px"}}
                        name="notes"
                        value={form.notes}
                        onChange={handleOnChange}
                      />
                    </Form.Group>
                  </Row>
                </Form>
              </Col>
              <Col xs={12} md={12} lg={6}>
                <div className={styles.subTotalColumn}>
                  <b className="text-center mt-2">Detalle de tu Pedido</b>
                  <ol className={styles.product_list}>
                    <li className={styles.product_item}>
                      <span>Producto</span> <span>Subtotal</span>
                    </li>
                    {cart?.map((item) => {
                      return (
                        <li key={item.id} className={styles.product_item}>
                          <span className={styles.product_name}>
                            {item?.title}
                          </span>
                          <span>
                            x<b>{item?.quantity}</b>
                          </span>
                          <span className={styles.product_price}>
                            $
                            {applyCustomFormat(
                              calcTotalPerItem(item),
                              numberWithCommas
                            )}
                          </span>
                        </li>
                      );
                    })}
                    <li className={styles.product_item}>
                      <b className={styles.product_name}>Total:</b>
                      <span>
                        <b>
                          ${applyCustomFormat(calcTotal(), numberWithCommas)}
                        </b>
                      </span>
                    </li>
                  </ol>
                  <div className={styles.checkbox}>
                    <b>Opciones de Envío:</b>
                    <label>
                      <input
                        required
                        type="radio"
                        value="envio"
                        checked={selectedShippingOption === "envio"}
                        name="shippingOption"
                        onChange={handleShippingChange}
                      />
                      Envío por correo
                    </label>

                    <label>
                      <input
                        required
                        type="radio"
                        value="punto_encuentro"
                        checked={selectedShippingOption === "punto_encuentro"}
                        name="shippingOption"
                        onChange={handleShippingChange}
                      />
                      Punto de encuentro
                    </label>
                  </div>
                  <hr />
                  <div className={styles.checkbox}>
                    <b>Opciones de Pago: </b>
                    <label>
                      <input
                        type="radio"
                        value="MercadoPago"
                        checked={selectedPaymentMethodOpt === "MercadoPago"}
                        name="paymentMethod"
                        onChange={handlePaymentMethod}
                      />
                      Mercado Pago
                      <img src="/mpLogos/mercadopagoLogo.png" alt="" />
                    </label>

                    <label>
                      <input
                        type="radio"
                        value="TransferenciaBancaria"
                        checked={
                          selectedPaymentMethodOpt === "TransferenciaBancaria"
                        }
                        name="paymentMethod"
                        onChange={handlePaymentMethod}
                      />
                      Transferencia Bancaria
                    </label>
                  </div>
                  <hr />
                  {showBanner && (
                    <div className={styles.checkbox}>
                      {selectedPaymentMethodOpt === "MercadoPago" ? (
                        <>
                          <div className={styles.bannerMp}>
                            <p className={styles.bannerMp_Title}>
                              Inicia sesión en Mercado Pago y obtén beneficios
                            </p>
                            <div className={styles.bannerMp_benefitList}>
                              <div className={styles.bannerMp_benefitList_Item}>
                                <img
                                  className={styles.bannerMp_benefitList_logo}
                                  src="/mpLogos/blue-wallet.png"
                                  alt=""
                                />
                                <div>
                                  <p
                                    className={
                                      styles.bannerMp_benefitList_p_title
                                    }
                                  >
                                    Paga rápido
                                  </p>
                                  <p
                                    className={
                                      styles.bannerMp_benefitList_p_subTitle
                                    }
                                  >
                                    Usa tu dinero disponible o tarjetas
                                    guardadas.
                                  </p>
                                </div>
                              </div>
                              <div className={styles.bannerMp_benefitList_Item}>
                                <img
                                  className={styles.bannerMp_benefitList_logo}
                                  src="/mpLogos/blue-phone-installments.png"
                                  alt=""
                                />
                                <div>
                                  <p
                                    className={
                                      styles.bannerMp_benefitList_p_title
                                    }
                                  >
                                    Accede a cuotas
                                  </p>
                                  <p
                                    className={
                                      styles.bannerMp_benefitList_p_subTitle
                                    }
                                  >
                                    Paga con o sin tarjeta de crédito.
                                  </p>
                                </div>
                              </div>
                              <div className={styles.bannerMp_benefitList_Item}>
                                <img
                                  className={styles.bannerMp_benefitList_logo}
                                  src="/mpLogos/blue-protection.png"
                                  alt=""
                                />
                                <div>
                                  <p
                                    className={
                                      styles.bannerMp_benefitList_p_title
                                    }
                                  >
                                    Compra con confianza
                                  </p>
                                  <p
                                    className={
                                      styles.bannerMp_benefitList_p_subTitle
                                    }
                                  >
                                    Recibe ayuda si tienes algún problema con tu
                                    compra.
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className={styles.bannerMp_redirect}>
                              <i className="bi bi-lock-fill"></i>
                              <p>
                                Al continuar, te llevaremos a Mercado Pago para
                                completar tu compra de forma segura.
                              </p>
                            </div>
                          </div>
                          <p className={styles.bannerMp_benefitList_p_subTitle}>
                            Al continuar, aceptas nuestros
                            <a
                              href="https://www.mercadopago.com.ar/ayuda/terminos-y-politicas_194"
                              target="_blank"
                              rel="noreferrer"
                            >
                              Términos y condiciones
                            </a>
                            .
                          </p>
                        </>
                      ) : (
                        <i>
                          Realiza tu pago directamente en nuestra cuenta
                          bancaria.
                          <b>
                            Por favor, usa el número del pedido como referencia
                            de pago.
                          </b>
                          <br />
                          Tu pedido se procesará una vez que hayamos recibido
                          los fondos.
                        </i>
                      )}
                    </div>
                  )}

                  <Button
                    className={styles.paymentButton}
                    variant="success"
                    type="submit"
                    onClick={(event) => handleSubmit(event)}
                  >
                    Realizar Pedido
                  </Button>
                  <div className={styles.checkbox}>
                    <i>
                      Sus datos personales se utilizarán para procesar su
                      pedido, respaldar su experiencia en este sitio web y para
                      otros fines descritos en nuestro política de privacidad.
                    </i>
                  </div>
                </div>
              </Col>
            </Row>
          </Tab>
        </Tabs>
      )}
    </Container>
  );
};

export default Cart;
