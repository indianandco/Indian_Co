import styles from './Detail.module.css'
import Spinner from 'react-bootstrap/Spinner';
import { useContext, useEffect, useState } from "react";
import { ProductContext } from '../../services/ProductContext';
import { CartContext } from '../../services/CartContext';
import { NavLink, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// eslint-disable-next-line react/prop-types
const Detail = () => {

    const { id } = useParams()

    const { detailProducts, getDetailProducts } = useContext(ProductContext);
    const { addProduct } = useContext(CartContext);

    const [quant, setQuantity] = useState(1);

    const incrementar = () => {
        if (quant < detailProducts?.stock) {
            setQuantity(quant + 1);
        }
    };

    const restar = () => {
        if (quant > 1) {
            setQuantity(quant - 1);
        }
    };

    const sendProductDetail = () => {
        addProduct({
            ...detailProducts,
            quantity: quant
        });
    }

    useEffect(() => {
        getDetailProducts(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='all'>
            {detailProducts ? (
                <div className={styles.containerDetail}>
                    <div className={styles.imageDetail}>
                        <img className={styles.imageDetails} alt="" src={detailProducts?.image}></img>
                    </div>
                    <div className={styles.containerDesc}>
                        <div className={styles.firstButtons}>
                            <NavLink className={styles.firstButtonResponsive} to='/home'>
                                <button className={styles.firstButton} >Inicio</button >
                            </NavLink>
                            <span className={styles.p}>|</span>
                            <NavLink className={styles.firstButtonResponsive} to='/products'>
                                <button className={styles.firstButton} >Productos</button >
                            </NavLink>
                        </div>
                        <div className={styles.boxTitle}>
                            <h1 className={styles.productTitle}>
                                {detailProducts?.title}
                            </h1>
                        </div>
                        <div className={styles.boxPrice}>
                            {detailProducts?.offer === true ? (
                                <h1 className={styles.price}>${detailProducts?.offer_price}</h1>
                            ) : (
                                <h1 className={styles.price}>${detailProducts?.price}</h1>
                            )}
                        </div>
                        <div className={styles.boxAromas}>
                            <h3 className={styles.h3Aromas}>Aromas</h3>
                            <Form.Select className={styles.option}>
                                <option className={styles.option} value="1">I</option>
                                <option className={styles.option} value="2">II</option>
                                <option className={styles.option} value="3">III</option>
                                <option className={styles.option} value="4">IV</option>
                                <option className={styles.option} value="5">V</option>
                            </Form.Select>
                        </div>
                      <div className={styles.containCart}>
                            <div className={styles.counter}>
                                <Button className={styles.buttonCounter} variant="light" onClick={restar}>-</Button>
                                <span className={styles.span}>{quant}</span>
                                <Button className={styles.buttonCounter} variant="light" onClick={incrementar}>+</Button>
                            </div>
                            <div className={styles.boxCart}>
                                <Button onClick={sendProductDetail} className={styles.buttonCart} variant="warning">Agregar al carrito</Button>
                            </div>
                        </div>
                        <div className={styles.boxFooter}>
                            {detailProducts?.size === true ? (
                                <div className={styles.boxSize}>
                                    <span className={styles.span}>Tamaño: {detailProducts?.size}</span>
                                </div>
                            ) : (
                                <span className={styles.span}>Tamaño: No está definido</span>
                            )
                            }
                            <div className={styles.boxDesc}>
                                <span>{detailProducts?.description}</span>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            )}

        </div>
    )
}

export default Detail;