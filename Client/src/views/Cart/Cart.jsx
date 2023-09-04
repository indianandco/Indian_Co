import styles from "./Cart.module.css";
import {useContext, useEffect, useState} from "react";
import {Tab,Tabs,Row,Col,Container,Button} from "react-bootstrap";
import {CartContext} from "../../services/CartContext";
import {fetcherPaymentMethod} from "../../utils/fetcherPost";
import { EmptyCart } from "./cartComponents/EmptyCart.jsx"; 
import CartItem from "./cartComponents/CartItem";
import FormularioCompra from "./cartComponents/FormularioCompra";
import { SubtotalColumn } from "./cartComponents/SubtotalColumn";
import  SubTotalCheckout from "./cartComponents/SubTotalCheckout";
import validation from "../../utils/registerValidation";


const Cart = () => {
  const {cart, loadCartData, calcTotal, calcTotalPerItem, applyCustomFormat, numberWithCommas} = useContext(CartContext);

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
  const [error, setError] = useState({
    first_name: 'El campo Nombre es requerido',
    last_name: 'El campo Apellido es requerido',
    phone: 'El campo Telefono es requerido', 
    email: 'El campo Email es requerido',
    zipcode: 'El campo Codigo Postal es requerido',
    city: 'El campo Ciudad es requerido',
    province: 'El campo Provincia es requerido',
    phone: 'El campo Telefono es requerido',
    address: 'El campo Direccion es requerido'
  })


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
        addressDetail: form.addressDetail,
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

      setError((validation({ ...form, [name]: value })))

      if (!Object.keys((validation({ ...form, [name]: value })))) {
        setValidated(false)
      }
      else {
          setValidated(true)
      }
    };

  
    useEffect(() => {
      validation({ ...form })
    }, [form])

  return (
    <Container fluid className="d-flex justify-content-center min-vh-100">
      

        {!cart.length > 0 ? (
          <EmptyCart />
        ) : (
          <div className="w-100 mt-xs-1 mt-md-5">
            <Tabs
              defaultActiveKey="general"
              activeKey={activeTab}
              className="m-0 p-0 w-100 d-none">
              <Tab className='w-100' eventKey="general" title="general">
                  <Row className="d-flex justify-content-center mt-5">
                    <Col xs={12} md={12} lg={6} className="d-flex justify-content-center ">
                      <div className={styles.itemContainer}>
                        {cart?.map((item) => (<CartItem  key={item._id} item={item}/>))}
                      </div>
                    </Col>
                    <Col xs={12} md={12} lg={4}>
                      <SubTotalCheckout handleTabs={handleTabs}/>
                    </Col>
                  </Row>
              </Tab>
              <Tab className='w-100' eventKey="test" title="formPayment">
                <Row className="d-flex justify-content-center mt-4">
                  <Col xs={12} md={12} lg={6}>
                    <FormularioCompra form={form} error={error} handleOnChange={handleOnChange} handleSubmit={handleSubmit} selectedShippingOption={selectedShippingOption} showShippingInfo={showShippingInfo} validated={validated}/>
                  </Col>
                  <Col xs={12} md={12} lg={4}>
                    <SubtotalColumn handlePaymentMethod={handlePaymentMethod} selectedPaymentMethodOpt={selectedPaymentMethodOpt} handleShippingChange={handleShippingChange}  selectedShippingOption={selectedShippingOption} handleSubmit={handleSubmit} showPoints={showPoints} showBanner={showBanner}/>
                  </Col>
                </Row>
              </Tab>
            </Tabs>
          </div>
        )}
      
    </Container>
  );
};

export default Cart;
