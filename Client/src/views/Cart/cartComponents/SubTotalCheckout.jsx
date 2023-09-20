/* eslint-disable react/prop-types */
import { useContext } from "react";
import { CartContext } from "../../../services/CartContext";
import { Button } from "react-bootstrap";
import styles from "./SubTotalCheckout.module.css";

const SubTotalCheckout = ({ handleTabs }) => {

    const { cart, applyCustomFormat, calcTotalPerItem, numberWithCommas, calcTotal } = useContext(CartContext)

    return (
        <div className={styles.subTotalColumn}>
            <p className="text-center mt-2">Detalle del Carrito</p>
            <ol className={styles.product_list}>
                {cart?.map((item) => {
                    return (
                        <li key={item._id} className={styles.product_item}>
                            <span className={styles.product_name}>{item?.title}</span>
                            <span className={styles.product_price}>${applyCustomFormat(calcTotalPerItem(item), numberWithCommas)}</span>
                        </li>
                    );
                })}
                <li className={styles.product_item}>
                    <span className={styles.product_name}>Total:</span>
                    <span><b>${applyCustomFormat(calcTotal(), numberWithCommas)}</b></span>
                </li>
            </ol>
            <Button variant="success" onClick={() => handleTabs("test")}>
                COMPRAR
            </Button>
        </div>
    )
}
export default SubTotalCheckout