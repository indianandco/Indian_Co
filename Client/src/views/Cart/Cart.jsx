import styles from "./Cart.module.css";
import {useContext, useEffect, useState} from "react";
import Form from "react-bootstrap/Form";
import {Tab,Tabs,Row,Col,Container,Button} from "react-bootstrap";
import {CartContext} from "../../services/CartContext";
import {fetcherPaymentMethod} from "../../utils/fetcherPost";
import { EmptyCart } from "./cartComponents/EmptyCart.jsx"; 
import CartItem from "./cartComponents/CartItem";
import FormularioCompra from "./cartComponents/FormularioCompra";

const Cart = () => {
  const {
    cart,
    loadCartData,
    calcTotal,
    calcTotalPerItem,
    applyCustomFormat,
    numberWithCommas

  } = useContext(CartContext);

  const [activeTab, setActiveTab] = useState("general");
  const handleTabs = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    loadCartData();
  }, []);

  //OPCIONES DE ENVIO y PAGO
  const [selectedShippingOption, setSelectedShippingOption] = useState("");
  const [selectedPaymentMethodOpt, setselectedPaymentMethodOpt] = useState("");
  const [showPoints, setShowPoints] = useState(false)
  const [showBanner, setShowBanner] = useState(false);
  const [showShippingInfo, setShowShippingInfo] = useState(false);

  const handleShippingChange = (event) => {
    setSelectedShippingOption(event.target.value);
    setShowShippingInfo(true);
    setShowPoints(true);
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
    <Container fluid className="d-flex justify-content-center">
      

        {!cart.length > 0 ? (
          <EmptyCart />
        ) : (
          <Tabs
            defaultActiveKey="general"
            activeKey={activeTab}
            className="d-none">
            <Tab eventKey="general" title="general">
              <Row>
                <Col xs={12} md={8} lg={7} >

                      {cart?.map((item) => (
                       <CartItem  key={item.id} item={item}/>
                      ))}

          
                </Col>
                <Col xs={12} md={4} lg={5} >
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
            <Tab eventKey="test" className={styles.container}>
              <Row>
                <Col xs={12} md={12} lg={8} className={styles.formStyles}>
                  <FormularioCompra form={form} handleOnChange={handleOnChange} handleSubmit={handleSubmit} selectedShippingOption={selectedShippingOption} showShippingInfo={showShippingInfo} validated={validated}/>
                </Col>
                <Col xs={12} md={12} lg={4}>
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
                      {showPoints && ( selectedShippingOption==="punto_encuentro" ? <p>Zonas de entrega disponibles: CAPITAL FEDERAL</p>: <></>)}

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
                            <p className={styles.bannerMp_TermnsCondition}>
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
