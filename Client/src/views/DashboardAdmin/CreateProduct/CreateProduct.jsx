import "./CreateProduct.css"
import { useState, useContext } from "react";
import { ProductContext } from "../../../services/ProductContext";
import { useFormik } from "formik"
import validation from "./formValidation"
import { Button, Form, Container, Row, Col, Alert } from 'react-bootstrap';
import Swal from 'sweetalert2'

const CreateProduct = () => {

    const { postProduct } = useContext(ProductContext)
    const [productThumbnail, setProductThumbnail] = useState("")

    const contacFormInitialValues = {
        title: "",
        price: "",
        offer: false,
        offer_price: "",
        description: "",
        stock: "",
        category: "Velas",
        size: "",
        fragance: "",
        image: null
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
                        const productResponse = await postProduct({
                            ...values,
                            image: productThumbnail
                        });
                        await Swal.fire({
                            title: 'Producto cargado correctamente!',
                            text: productResponse.payload.title,
                            imageUrl: productResponse.payload.image,
                            imageWidth: 300,
                            imageHeight: 400,
                            imageAlt: 'Custom image',
                        });
                    } catch (error) {
                        await Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Algo salio mal, volvé a intentarlo!'
                        });
                    } finally {
                        setSubmitting(false);
                        resetForm();
                    }
                }
            });
        }
    });


    const { values, errors, touched, handleSubmit, handleChange, handleBlur, isSubmitting, setFieldValue } = formik

    const handleProductThumbnailUpload = (event) => {
        const file = event.target.files[0];
        transformFile(file)
        formik.setFieldValue("image", file);
    }
    const transformFile = (file) => {
        const reader = new FileReader()
        if (file) {
            reader.readAsDataURL(file)
            reader.onloadend = () => {
                setProductThumbnail(reader.result);
            }
        } else {
            setProductThumbnail("")
        }
    }

    return (
        <Container className="container">
            <Row className="justify-content-md-center">
                <Col md={8}>
                    <Form onSubmit={handleSubmit}>
                        <h2 className="titulo text-center">  Nuevo Producto  </h2>

                        <Form.Group controlId="title">
                            <Form.Label className="form-label">Título:</Form.Label>
                            <Form.Control className="form-control" type="text" name="title" value={values.title}
                                isInvalid={touched.title && !!errors.title}
                                onBlur={handleBlur} onChange={handleChange} />
                            <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="price">
                            <Form.Label className="form-label">Precio: </Form.Label>
                            <Form.Control className="form-control" type="number" name="price" value={values.price}
                                isInvalid={touched.price && !!errors.price}
                                onBlur={handleBlur} onChange={handleChange} />
                            <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
                        </Form.Group>


                        <Form.Group controlId="offer">
                            <Form.Label className="form-label">Poner en oferta? </Form.Label>
                            <Form.Select name="offer" value={values.offer}
                                isInvalid={touched.offer && !!errors.offer}
                                onBlur={handleBlur} onChange={handleChange}>
                                <option value={false}>No</option>
                                <option value={true}>Sí</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">{errors.offer}</Form.Control.Feedback>
                        </Form.Group>
                        {(values.offer === 'true') &&
                            <Form.Group controlId="offer_price">
                                <Form.Label className="form-label">Precio en Oferta: </Form.Label>
                                <Form.Control className="form-control" type="number" name="offer_price" value={values.offer_price}
                                    isInvalid={touched.offer_price && !!errors.offer_price}
                                    onBlur={handleBlur} onChange={handleChange} />
                                <Form.Control.Feedback type="invalid">{errors.offer_price}</Form.Control.Feedback>
                            </Form.Group>
                        }

                        <Form.Group controlId="description">
                            <Form.Label className="form-label">Descripción: </Form.Label>
                            <Form.Control className="form-control" rows={5} as="textarea" name="description" value={values.description}
                                isInvalid={touched.description && !!errors.description}
                                onBlur={handleBlur} onChange={handleChange} />
                            <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="stock">
                            <Form.Label className="form-label">Cantidad disponible: </Form.Label>
                            <Form.Control className="form-control" type="number" name="stock" value={values.stock}
                                isInvalid={touched.stock && !!errors.stock}
                                onBlur={handleBlur} onChange={handleChange} />
                            <Form.Control.Feedback type="invalid">{errors.stock}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="category">
                            <Form.Label className="form-label">Seleccione la categoría: </Form.Label>
                            <Form.Select name="category" value={values.category}
                                isInvalid={touched.category && !!errors.category}
                                onBlur={handleBlur} onChange={handleChange}>
                                <option value="Velas">Velas</option>
                                <option value="Perfumes">Perfumes</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">{errors.category}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="size">
                            <Form.Label className="form-label">Dimensiones del producto:</Form.Label>
                            <Form.Control className="form-control" type="text" name="size" value={values.size}
                                onChange={handleChange} />
                        </Form.Group>

                        <Form.Group controlId="fragance">
                            <Form.Label className="form-label">Fragancia: </Form.Label>
                            <Form.Control className="form-control" type="text" name="fragance" value={values.fragance}
                                isInvalid={touched.fragance && !!errors.fragance}
                                onBlur={handleBlur} onChange={handleChange} />
                            <Form.Control.Feedback type="invalid">{errors.fragance}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="image">
                            <Form.Label className="form-label">Seleccione una imagen: </Form.Label>
                            <Form.Control className="form-control" type="file" name="image"
                                isInvalid={touched.image && !!errors.image}
                                onBlur={handleBlur} onChange={handleProductThumbnailUpload} />
                            <Form.Control.Feedback type="invalid">{errors.image}</Form.Control.Feedback>
                        </Form.Group>

                        <div className="boton">
                            <Button variant="primary" type="submit" disabled={isSubmitting}>CARGAR PRODUCTO</Button>
                        </div>
                    </Form>
                    {
                        (Object.keys(errors).length > 0 && isSubmitting) && (
                            <Alert variant="danger" className="mt-4">
                                <ul>
                                    {Object.values(errors).map((error, index) => <li key={index}>{error}</li>)}
                                </ul>
                            </Alert>
                        )
                    }
                </Col>
            </Row>
        </Container>
    );
}
export default CreateProduct;