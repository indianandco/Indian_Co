import styles from './Detail.module.css'
import Spinner from 'react-bootstrap/Spinner';
import { useContext, useEffect, useState } from "react";
import { ProductContext } from '../../services/ProductContext';
import { CartContext } from '../../services/CartContext';
import { NavLink, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2'

// eslint-disable-next-line react/prop-types
const Detail = () => {

    const { id } = useParams()

    const { detailProducts, getDetailProducts, clearSearch } = useContext(ProductContext);
    const { addProduct } = useContext(CartContext);
    const [frag, setFragance] = useState(null)
    const [show, setShow] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
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

    const handleSelect = (event) => {
        setFragance(event.target.value)
        setShow(false)
    }

    const sendProductDetail = () => {
        if (detailProducts.fragance !== "--" && (!frag)) {
            setShow(true);
            return;
        } else {
            const productToAdd = {
                ...detailProducts,
                quantity: quant,
                fragance: frag
            };
            addProduct(productToAdd);
            Swal.fire({
                title: 'Agregaste un producto al carrito!',
                icon: 'success',
                position: 'top-end',
                toast: true,
                showConfirmButton: false,
                timer: 4000,
                html: '<a href="/cart" style="padding: 10px; background-color: green; color: white; text-decoration: none; border-radius: 6px;">Ver carrito</a>'
            })
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(true);
        }, 500);
        getDetailProducts(id);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const handleClear = async () => {
        await clearSearch()
    }
    return (
        <div className='all'>
            {!isLoading ? (
                <div className="loading-spinner">
                    <Spinner animation="border" role="status" aria-hidden="true">
                        <span className="visually-hidden">Cargando...</span>
                    </Spinner>
                </div>
            ) : (
                <div className={styles.containerDetail}>
                    <div className={styles.imageDetail}>
                        <img className={styles.imageDetails} alt="" src={detailProducts?.image}></img>
                    </div>
                    <div className={styles.containerDesc}>
                        <div className={styles.firstButtons}>
                            <NavLink to='/'>
                                <button className={styles.firstButton} >Inicio</button >
                            </NavLink>
                            <span className={styles.p}>|</span>
                            <NavLink to='/products'>
                                <button className={styles.firstButton} onClick={handleClear}>Productos</button >
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

                        <div className={styles.boxFooter}>
                            <div className={styles.boxDesc}>
                                <span>- {detailProducts?.description}</span>
                            </div>
                            {detailProducts?.size === true ? (
                                <div className={styles.boxSize}>
                                    <span className={styles.span}>- Tamaño: {detailProducts?.size}</span>
                                </div>
                            ) : (
                                <span className={styles.span}>- Tamaño: No está definido</span>
                            )
                            }

                        </div>
                        <div className={styles.boxAromas}>
                            <h3 className={styles.h3Aromas}>Fragancia:</h3>
                            <Form.Select className={styles.option} onChange={handleSelect}>
                                <option value="" disabled selected>
                                    Selecciona una opción
                                </option>
                                {detailProducts?.fragance?.split(",").map(fragance => {
                                    return (<option key={fragance} className={styles.option} value={fragance}>{fragance}</option>)
                                })
                                }
                            </Form.Select>
                            <span>{show ? "Por favor elija una fragancia" : <span></span>}</span>
                        </div>
                        <div className={styles.cartContainer}>
                            <div className={styles.counter}>
                                <Button className={styles.buttonCounter} variant="light" onClick={restar}>-</Button>
                                <span className={styles.number}>{quant}</span>
                                <Button className={styles.buttonCounter} variant="light" onClick={incrementar}>+</Button>
                            </div>
                            <div className={styles.boxCart}>
                                <Button onClick={sendProductDetail} className={styles.buttonCart} variant="warning">Agregar al Carrito</Button>
                            </div>
                        </div>

                    </div>
                </div>

            )
            }
        </div>
    )
}

export default Detail;