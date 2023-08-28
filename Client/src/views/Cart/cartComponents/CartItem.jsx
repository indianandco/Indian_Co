import { useContext } from "react";
import {Row,Col,Button} from "react-bootstrap";
import styles from "../Cart.module.css";
import {CartContext} from "../../../services/CartContext";

const CartItem = ({item}) => {
    const { applyCustomFormat, numberWithCommas, removeProduct, removeStack, addProduct } = useContext(CartContext)

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

  return (
   
      <Row key={item?._id} >
        <Col xs={0} md={1} lg={2} >
          {/* <img src={item?.image} alt={item?.title}/> */}
        </Col>
        <Col xs={7} md={7} lg={7}>
          <p>{item?.title}</p>
          <p>{item?.fragance}</p>
          {item?.offer_price ? (
            <b className="tarjeta-precio">${applyCustomFormat(item?.offer_price, numberWithCommas)}</b>
          ) : (
            <b className="tarjeta-precio">${applyCustomFormat(item?.price, numberWithCommas)}</b>
          )}
        </Col>
        <Col xs={3} md={2} lg={2}>
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
        <Col xs={2} md={2} lg={1}>
          <Button
            variant="danger"
            onClick={() => removeStack(item)}
            type="button"
          >
            <i className="bi bi-trash"></i>
          </Button>
        </Col>
      </Row>
  )
}

export default CartItem