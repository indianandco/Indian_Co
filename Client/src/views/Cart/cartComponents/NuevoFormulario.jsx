import { Button, Form, Row, Col, Alert } from "react-bootstrap";
import { useState, useContext } from "react";
import { CartContext } from "../../../services/CartContext";
import BannerMp from "./BannerMp";
import styles from "./FormularioCompra.module.css";
import styles1 from "./SubtotalColumn.module.css";
import { useFormik } from "formik"
import Swal from 'sweetalert2'
import validation from "./purchaseFormValidator";
import { fetcher } from "../../../utils/fetcherGet";
import { fetcherPaymentMethod } from "../../../utils/fetcherPost";

const NuevoFormulario = () => {
    const { cart, setCart, applyCustomFormat, numberWithCommas, calcTotal, calcTotalShipping, calcTotalPerItem } = useContext(CartContext)

    const [showPoints, setShowPoints] = useState(false)
    const [showBanner, setShowBanner] = useState(false);
    const [showShippingInfo, setShowShippingInfo] = useState(false);
    const [selectedShippingOption, setSelectedShippingOption] = useState("");
    const [selectedPaymentMethodOpt, setselectedPaymentMethodOpt] = useState("");
    const [priceShipping, setPriceShipping] = useState('');

    //Traer el costo de envio:
    const getShippingPrice = () => {
        fetcher("/admindashboard/shipping/getprice").then(
            (response) => {
                console.log(response)
                setPriceShipping(response.payload)
            }
        );
    }

    const handleShippingChange = (event) => {
        setSelectedShippingOption(event.target.value);
        setShowShippingInfo(true);
        setShowPoints(true);
        handleChange(event);
        getShippingPrice()
    };

    const handlePaymentMethod = (event) => {
        setselectedPaymentMethodOpt(event.target.value);
        setShowBanner(true);
        handleChange(event);
    };

    const contacFormInitialValues = {
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        city: "",
        province: "",
        zipcode: "",
        address: "",
        addressDetail: "",
        notes: "",
        shippingOption: selectedShippingOption,
        paymentMethod: selectedPaymentMethodOpt
    }

    const formik = useFormik({
        initialValues: contacFormInitialValues,
        validationSchema: validation,
        onSubmit: (values, { setSubmitting, resetForm }) => {
            Swal.fire({
                title: 'Deseas confirmar?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Cancelar',
                confirmButtonText: 'Confirmar'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    setSubmitting(true);
                    try {
                        const data = {
                            ...values,
                            shop: {
                                cart,
                                total: (selectedShippingOption === "envio" ? calcTotalShipping(priceShipping) : calcTotal()),
                            },
                        };
                        //console.log("info para el back(ENDPOINT: payment):",data)
                        const response = await fetcherPaymentMethod("/carts/purchase", data);

                        console.log("Respuesta de la compra:", response)
                        if(response.status === 200){          
                            await Swal.fire({
                                title: 'Orden generada Correctamente!',
                                text: "Revise su correo para mas informacion",
                                icon: 'success'
                                    });
                        
                            setCart([])
                            localStorage.clear();
                        }else {
                            await Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Algo salio mal, volvé a intentarlo!'
                            });
                        }
                        
                    } finally {
                        setSubmitting(false);
                        resetForm();
                    }
                }
            });
        }
    });


    const { values, errors, touched, handleSubmit, handleChange, handleBlur, isSubmitting } = formik

    return (
        <>
            <Col xs={12} md={12} lg={6}>
                <Form className={styles.formStyles} onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <h2 className="text-center">Detalles de Facturación</h2>
                        <Form.Group as={Col} md="6" controlId="first_name">
                            <Form.Label className="form-label">Nombre/s</Form.Label>
                            <Form.Control className="form-control" type="text" name="first_name" value={values.first_name}
                                isInvalid={touched.first_name && !!errors.first_name}
                                onBlur={handleBlur} onChange={handleChange} />
                            <Form.Control.Feedback type="invalid">{errors.first_name}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="last_name">
                            <Form.Label>Apellido/s</Form.Label>
                            <Form.Control className="form-control" type="text" name="last_name" value={values.last_name}
                                isInvalid={touched.last_name && !!errors.last_name}
                                onBlur={handleBlur} onChange={handleChange} />
                            <Form.Control.Feedback type="invalid">{errors.last_name}</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="6" controlId="email">
                            <Form.Label>Dirección de correo electrónico</Form.Label>
                            <Form.Control className="form-control" type="email" name="email" value={values.email}
                                isInvalid={touched.email && !!errors.email}
                                onBlur={handleBlur} onChange={handleChange} />
                            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="phone">
                            <Form.Label>Teléfono Personal</Form.Label>
                            <Form.Control className="form-control" type="text" name="phone" value={values.phone}
                                isInvalid={touched.phone && !!errors.phone}
                                onBlur={handleBlur} onChange={handleChange} />
                            <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <hr />
                    {showShippingInfo &&
                        (selectedShippingOption === "envio" ? (
                            <>
                                <Row className="mb-3">
                                    <h3 className="text-center">Datos de Envío</h3>
                                    <Form.Group as={Col} md="6" controlId="city">
                                        <Form.Label>Ciudad</Form.Label>
                                        <Form.Control className="form-control" type="text" name="city" value={values.city}
                                            isInvalid={touched.city && !!errors.city}
                                            onBlur={handleBlur} onChange={handleChange} />
                                        <Form.Control.Feedback type="invalid">{errors.city}</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md="3" controlId="province">
                                        <Form.Label>Provincia</Form.Label>
                                        <Form.Control className="form-control" type="text" name="province" value={values.province}
                                            isInvalid={touched.province && !!errors.province}
                                            onBlur={handleBlur} onChange={handleChange} />
                                        <Form.Control.Feedback type="invalid">{errors.province}</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md="3" controlId="zipcode">
                                        <Form.Label>C.P</Form.Label>
                                        <Form.Control className="form-control" type="text" name="zipcode" value={values.zipcode}
                                            isInvalid={touched.zipcode && !!errors.zipcode}
                                            onBlur={handleBlur} onChange={handleChange} />
                                        <Form.Control.Feedback type="invalid">{errors.zipcode}</Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} md="6" controlId="address">
                                        <Form.Label>Dirección de entrega</Form.Label>
                                        <Form.Control className="form-control" type="text" name="address" value={values.address}
                                            isInvalid={touched.address && !!errors.address}
                                            onBlur={handleBlur} onChange={handleChange} />
                                        <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md="6" controlId="addressDetail">
                                        <Form.Label>Detalle</Form.Label>

                                        <Form.Control className="form-control" type="text" name="addressDetail" value={values.addressDetail}
                                            isInvalid={touched.addressDetail && !!errors.addressDetail}
                                            onBlur={handleBlur} onChange={handleChange} />
                                        <Form.Control.Feedback type="invalid">{errors.addressDetail}</Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <hr />
                            </>) : <></>
                        )}
                    <Row className="mb-3">
                        <Form.Group as={Col} md="12" controlId="notes">
                            <Form.Label>Notas del pedido (opcional)</Form.Label>
                            <Form.Control as="textarea" placeholder="Deja tu comentario aca..." style={{ height: "100px" }} className="form-control" type="text" name="notes" value={values.notes}
                                isInvalid={touched.notes && !!errors.notes}
                                onBlur={handleBlur} onChange={handleChange} />
                            <Form.Control.Feedback type="invalid">{errors.notes}</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                </Form>
            </Col>
            <Col xs={12} md={12} lg={4}>
                <div className={styles1.subTotalColumn}>
                    <b className="text-center mt-2">Detalle de tu Pedido</b>
                    <ol className={styles1.product_list}>
                        <li className={styles1.product_item}><span>Producto</span> <span>Subtotal</span></li>
                        {cart?.map((item) => {
                            return (
                                <li key={item._id} className={styles1.product_item}>
                                    <span className={styles1.product_name}>{item?.title}</span>
                                    <span>x<b>{item?.quantity}</b></span>
                                    <span className={styles1.product_price}>${applyCustomFormat(calcTotalPerItem(item), numberWithCommas)}</span>
                                </li>
                            );
                        })}
                        {values.shippingOption === "envio" ? (
                            <>
                                <li className={styles1.product_item}><span>Costo de envío:</span>${priceShipping}</li>
                                <li className={styles1.product_item}>
                                    <b className={styles1.product_name}>Total:</b>
                                    <span><b>${applyCustomFormat(calcTotalShipping(priceShipping), numberWithCommas)}</b></span>
                                </li>
                            </>
                        ) : <>
                            <li className={styles1.product_item}>
                                <b className={styles1.product_name}>Total:</b>
                                <span><b>${applyCustomFormat(calcTotal(), numberWithCommas)}</b></span>
                            </li>
                        </>}
                    </ol>
                    <div className={styles1.checkbox}>
                        <Form.Group className="mb-2" controlId="shippingOption">
                            <Form.Label as="legend">Opciones de Envío:</Form.Label>
                            <Form.Check
                                type="radio"
                                label="Envío por correo"
                                value="envio"
                                checked={values.shippingOption === "envio"}
                                name="shippingOption"
                                onChange={handleShippingChange}
                                isInvalid={touched.shippingOption && !!errors.shippingOption}
                            />
                            <Form.Check
                                type="radio"
                                label="Punto de encuentro"
                                value="punto_encuentro"
                                checked={values.shippingOption === "punto_encuentro"}
                                name="shippingOption"
                                onChange={handleShippingChange}
                                isInvalid={touched.shippingOption && !!errors.shippingOption}
                            />
                            {showPoints && values.shippingOption === "punto_encuentro" && (
                                <p className="m-2">IMPORTANTE: Zonas de entrega disponibles: CAPITAL FEDERAL</p>
                            )}
                            <Form.Control.Feedback type="invalid">
                                {errors.shippingOption}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </div>
                    <hr />
                    <div className={styles1.checkbox}>
                        <Form.Group className="mb-2" controlId="paymentMethod">
                            <Form.Label as="legend">Opciones de Pago:</Form.Label>
                            <Form.Check
                                type="radio"
                                id="MercadoPago"
                                label={
                                    <>
                                        Mercado Pago <img src="/mpLogos/mercadopagoLogo.png" alt="" />
                                    </>
                                }
                                value="MercadoPago"
                                checked={values.paymentMethod === "MercadoPago"}
                                name="paymentMethod"
                                onChange={handlePaymentMethod}
                                isInvalid={touched.paymentMethod && !!errors.paymentMethod}
                            />
                            <Form.Check
                                type="radio"
                                id="TransferenciaBancaria"
                                label="Transferencia Bancaria"
                                value="TransferenciaBancaria"
                                checked={values.paymentMethod === "TransferenciaBancaria"}
                                name="paymentMethod"
                                onChange={handlePaymentMethod}
                                isInvalid={touched.paymentMethod && !!errors.paymentMethod}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.paymentMethod}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </div>
                    <hr />
                    {showBanner && (
                        <div className={styles1.bannerContainer}>
                            {selectedPaymentMethodOpt === "MercadoPago" ? (
                                <BannerMp />
                            ) : (
                                <i className={styles1.text}>Realiza tu pago directamente en nuestra cuenta bancaria.<b>Por favor, usa el número del pedido como referencia de pago.</b><br />Tu pedido se procesará una vez que hayamos recibido los fondos.</i>
                            )}
                        </div>
                    )}

                    <Button className={styles1.paymentButton} variant="success" type="submit" disabled={isSubmitting} onClick={(event) => handleSubmit(event)}>Realizar Pedido</Button>
                    <div className={styles1.bannerContainer}>
                        <i className={styles1.text}>Sus datos personales se utilizarán para procesar su pedido, respaldar su experiencia en este sitio web y para otros fines descritos en nuestro política de privacidad.</i>
                    </div>

                    {
                        (Object.keys(errors).length > 0 && isSubmitting) && (
                            <Alert variant="danger" className="mt-4">
                                <ul>
                                    {Object.values(errors).map((error, index) => <li key={index}>{error}</li>)}
                                </ul>
                            </Alert>
                        )
                    }
                </div>
            </Col>
        </>
    )
}

export default NuevoFormulario;