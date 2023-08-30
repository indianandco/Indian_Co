import BannerMp from "./BannerMp";
import {useContext} from "react";
import {CartContext} from "../../../services/CartContext";
import styles from "./SubtotalColumn.module.css";
import {Button} from "react-bootstrap";

export const SubtotalColumn = ({selectedShippingOption, handleShippingChange, selectedPaymentMethodOpt, handlePaymentMethod, handleSubmit, showPoints, showBanner }) => {
    
    const { cart, applyCustomFormat, numberWithCommas, calcTotal, calcTotalPerItem } = useContext(CartContext)
    
  return (
    <div className={styles.subTotalColumn}>
        <b className="text-center mt-2">Detalle de tu Pedido</b>
        <ol className={styles.product_list}>
            <li className={styles.product_item}><span>Producto</span> <span>Subtotal</span></li>
            {cart?.map((item) => {
                return (
                    <li key={item._id} className={styles.product_item}>
                        <span className={styles.product_name}>{item?.title}</span>
                        <span>x<b>{item?.quantity}</b></span>
                        <span className={styles.product_price}>${applyCustomFormat(calcTotalPerItem(item), numberWithCommas)}</span>
                      </li>
                    );
              })}
            <li className={styles.product_item}>
                <b className={styles.product_name}>Total:</b>
                <span><b>${applyCustomFormat(calcTotal(), numberWithCommas)}</b></span>
            </li>
        </ol>
        <div className={styles.checkbox}>
          <b>Opciones de Envío:</b>
            <label>
                <input required type="radio" value="envio" checked={selectedShippingOption === "envio"} name="shippingOption" onChange={handleShippingChange}/> Envío por correo
            </label>

            <label>
                <input required type="radio" value="punto_encuentro" checked={selectedShippingOption === "punto_encuentro"} name="shippingOption" onChange={handleShippingChange}/>Punto de encuentro
            </label>
          {showPoints && ( selectedShippingOption==="punto_encuentro" ? <p>Zonas de entrega disponibles: CAPITAL FEDERAL</p>: <></>)}
        </div>
        <hr />
        <div className={styles.checkbox}>
          <b>Opciones de Pago: </b>
            <label>
                <input type="radio" value="MercadoPago" checked={selectedPaymentMethodOpt === "MercadoPago"} name="paymentMethod" onChange={handlePaymentMethod}/>Mercado Pago <img src="/mpLogos/mercadopagoLogo.png" alt="" />
            </label>

            <label>
                <input type="radio" value="TransferenciaBancaria" checked={ selectedPaymentMethodOpt === "TransferenciaBancaria"} name="paymentMethod" onChange={handlePaymentMethod}/>Transferencia Bancaria
            </label>
        </div>
            <hr />
                    {showBanner && (
                      <div className={styles.bannerContainer}>
                        {selectedPaymentMethodOpt === "MercadoPago" ? (
                          <BannerMp />
                        ) : (
                          <i className={styles.text}>Realiza tu pago directamente en nuestra cuentabancaria.<b>Por favor, usa el número del pedido como referenciade pago.</b><br />Tu pedido se procesará una vez que hayamos recibido los fondos.</i>
                        )}
                      </div>
                    )}

        <Button className={styles.paymentButton} variant="success" type="submit" onClick={(event) => handleSubmit(event)}>Realizar Pedido</Button>
        <div className={styles.bannerContainer}>
            <i className={styles.text}>Sus datos personales se utilizarán para procesar su pedido, respaldar su experiencia en este sitio web y para otros fines descritos en nuestro política de privacidad.</i>
        </div>
    </div>
  )
}