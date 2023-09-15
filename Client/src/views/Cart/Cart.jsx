import styles from "./Cart.module.css";
import {useContext, useEffect, useState} from "react";
import {Tab,Tabs,Row,Col,Container} from "react-bootstrap";
import {CartContext} from "../../services/CartContext";
import { EmptyCart } from "./cartComponents/EmptyCart.jsx"; 
import CartItem from "./cartComponents/CartItem";
import  SubTotalCheckout from "./cartComponents/SubTotalCheckout";
import  NuevoFormulario  from "./cartComponents/NuevoFormulario";


const Cart = () => {
  const {cart, loadCartData} = useContext(CartContext);

  const [activeTab, setActiveTab] = useState("general");
  const handleTabs = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    loadCartData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container fluid className="d-flex justify-content-center min-vh-100 ">

        {!cart.length > 0 ? (
          <EmptyCart />
        ) : (
          <div className="w-100 mt-5">
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
                  <NuevoFormulario/>
                </Row>
              </Tab>
            </Tabs>
          </div>
        )}
      
    </Container>
  );
};

export default Cart;
