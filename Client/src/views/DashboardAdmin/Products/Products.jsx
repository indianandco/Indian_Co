import { useEffect, useState, useContext } from 'react';
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { fetcher } from '../../../utils/fetcherGet';
import formEdit from "./formEdit"
import './Products.css'
import { useFormik } from "formik"
import Swal from 'sweetalert2'
import { ProductContext } from "../../../services/ProductContext";
import Pagination from 'react-bootstrap/Pagination';

const Products = () => {

    const [products, setProducts] = useState([]);
    const [searched, setSearched] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [modal, setModal] = useState(false)
    const { updateProduct } = useContext(ProductContext)
    const [productThumbnail, setProductThumbnail] = useState("")
    const [pagActive, setPagActive] = useState(1)
    const productsPerPage = 4;

    const totalPages = Math.ceil(filteredProducts?.length / productsPerPage)
    let items = []
    for (let i = 1; i <= totalPages; i++) {
        items.push(
            <Pagination.Item key={i} active={i === pagActive} onClick={() => setPagActive(i)}>
                {i}
            </Pagination.Item>
        )
    }
    const paginatedProducts = filteredProducts.slice((pagActive - 1) * productsPerPage, pagActive * productsPerPage)

    const handleModalShow = (product) => {
        setSelectedProduct(product);
        setModal(true);
    };

    const handleModalClose = () => {
        setSelectedProduct(null);
        setModal(false);
    };

    const getInfo = async () => {
        const productos = await fetcher(`/products`);
        setProducts(productos.payload);
        setFilteredProducts(productos.payload);
    };

    useEffect(() => {
        getInfo();
    }, []);

    useEffect(() => {
        if (selectedProduct) {
            formik.setValues({
                title: selectedProduct.title,
                price: selectedProduct.price,
                offer: selectedProduct.offer,
                offer_price: selectedProduct.offer_price,
                description: selectedProduct.description,
                stock: selectedProduct.stock,
                category: selectedProduct.category,
                size: selectedProduct.size,
                fragance: selectedProduct.fragance,
            });
        }
    }, [selectedProduct]);





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
    }

    const formik = useFormik({
        initialValues: contacFormInitialValues,
        // validationSchema: formEdit,
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
                    let updateValues = {
                        ...values
                    }
                    if (productThumbnail) {
                        updateValues.image = productThumbnail
                    }
                    try {

                        const productResponse = await updateProduct(
                            updateValues, selectedProduct.id);

                        await Swal.fire({
                            title: 'Producto actualizado correctamente!',


                        });
                        getInfo()
                    } catch (error) {
                        await Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Algo salio mal, volvé a intentarlo!'
                        });
                    } finally {
                        setSubmitting(false);
                        resetForm();
                        handleModalClose()
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

    const handleSearch = () => {
        const result = searched
            ? products.filter(product =>
                product.title.toLowerCase().includes(searched.toLowerCase())
            )
            : products;
        setFilteredProducts(result);
        setSearched("")
        setPagActive(1)
    };

    const handleReset = () => {
        setFilteredProducts(products)
        setPagActive(1)
    }


    return (
        <Container className='container'>
            <Row className='sale_title'>
                <Col><h3>Búsqueda y edición de productos...</h3></Col>
            </Row>
            <Row>
                <Col md={9}>
                    <Form.Control
                        className='searchBar'
                        type="text"
                        placeholder='Buscar producto...'
                        value={searched}
                        onChange={event => setSearched(event.target.value)}
                    />
                </Col>
                <Col md={3}>
                    <div className="button-group">
                        <Button className='button' onClick={handleSearch}>Buscar</Button>
                        <Button className='button' onClick={handleReset}>Reset</Button>
                    </div>
                </Col>
            </Row>

            <Row className='sales'>
                <Col className='columna' xs={2}>Nombre</Col>
                <Col className='columna' xs={2}>Precio</Col>
                <Col className='columna' xs={2}>Stock</Col>
                <Col className='columna' xs={2}>Imagen</Col>
                <Col className='columna' xs={2}>Editar</Col>
            </Row>
            {paginatedProducts.map((product, index) => (
                <Row className="sales" key={index}>
                    <Col xs={2}>{product.title}</Col>
                    <Col xs={2}>$ {product.price}</Col>
                    <Col xs={2}>{product.stock} unid.</Col>
                    <Col xs={2}><Image src={product.image} alt={`Imagen de ${product.title}`} className='image' /></Col>
                    <Col xs={2}>
                        <Button className="editButton" onClick={() => handleModalShow(product)}>
                            <i className="icon_detail bi bi-pencil"></i>
                        </Button>
                    </Col>
                </Row>
            ))}

            <Modal centered show={modal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title className='d-flex flex-column' style={{ color: "black" }}>Editar Producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="title">
                            <Form.Label className="form-label">Nombre del Producto:</Form.Label>
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
                            {productThumbnail ? (
                                <Image src={productThumbnail} alt="Selected Image" className='image-preview' />
                            ) : (
                                selectedProduct && <Image src={selectedProduct.image} alt="Current Image" className='image-preview' />
                            )}

                            <Form.Label className="form-label">Seleccione una imagen: </Form.Label>
                            <Form.Control className="form-control" type="file" name="image"
                                isInvalid={touched.image && !!errors.image}
                                onBlur={handleBlur} onChange={handleProductThumbnailUpload} />
                            <Form.Control.Feedback type="invalid">{errors.image}</Form.Control.Feedback>
                        </Form.Group>
                        <div className="boton">
                            {/* <Button variant="primary" type="submit" disabled={isSubmitting}>ACTUALIZAR PRODUCTO</Button> */}
                            <Button variant="primary" type="submit" >ACTUALIZAR PRODUCTO</Button>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className='pagination'>
                <Pagination >
                    <Pagination.First onClick={() => setPagActive(1)} />
                    <Pagination.Prev onClick={() => setPagActive(prev => Math.max(prev - 1, 1))} />
                    {items}
                    <Pagination.Next onClick={() => setPagActive(prev => Math.min(prev + 1, totalPages))} />
                    <Pagination.Last onClick={() => setPagActive(totalPages)} />

                </Pagination>

            </div>
        </Container>
    );

}

export default Products;
