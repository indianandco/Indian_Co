import { useContext } from "react";
import {Row,Col,Button} from "react-bootstrap";
import styles from "./CartItem.module.css";
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
   
      <Row key={item?._id} className="d-flex justify-content-center">
        <div  className={styles.tarjeta}> 

          <Col xs={0} md="auto" lg="auto" >
            <div className={styles.imgContainer}>
              <img className={styles.tarjeta_imagen} src={item?.image} alt={item?.title}/>
            </div>
          </Col>
          <Col xs={7} md={8} lg={7}>
            <div className={styles.contentContainer}>
              <p className={styles.tarjeta_titulo}>{item?.title}</p>
              <p>{item?.fragance}</p>
              {item?.offer_price ? (
                <b className="tarjeta-precio">${applyCustomFormat(item?.offer_price, numberWithCommas)}</b>
              ) : (
                <b className="tarjeta-precio">${applyCustomFormat(item?.price, numberWithCommas)}</b>
              )}
            </div>

          </Col>
          <Col xs={2} md={2} lg={2}>
            <div className={styles.qtyContainer}>
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
            </div>
          </Col>
          <Col xs={2} md={1} lg={1}>
            <div className={styles.deleteButton}>
              <Button
                variant="danger"
                onClick={() => removeStack(item)}
                type="button"
                
              ><i className="bi bi-trash"></i>
              </Button>
            </div>
          </Col>
        </div>
      </Row>
  )
}

export default CartItem