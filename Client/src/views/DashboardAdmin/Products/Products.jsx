import { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { fetcher } from '../../../utils/fetcherGet';
import './Products.css'

const Products = () => {

    const [products, setProducts] = useState([]);
    const [searched, setSearched] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);

    const [modal, setModal] = useState(false)

    const handleModalClose = () => setModal(false);
    const handleModalShow = () => setModal(true);
    const getInfo = async () => {
        const productos = await fetcher(`/products`);
        setProducts(productos.payload);
        setFilteredProducts(productos.payload);
    };

    useEffect(() => {
        getInfo();
    }, []);

    const handleSearch = () => {
        const result = searched
            ? products.filter(product =>
                product.title.toLowerCase().includes(searched.toLowerCase())
            )
            : products;
        setFilteredProducts(result);
    };
    console.log(products)
    // return (
    // <Container className='container'>
    //     <Row className='sale_title'>
    //         <Col><h1>Productos</h1></Col>
    //     </Row>
    //     <Row>
    //         <Col md={9}>
    //             <Form.Control
    //                 type="text"
    //                 placeholder='Buscar producto...'
    //                 value={searched}
    //                 onChange={event => setSearched(event.target.value)}
    //             />
    //         </Col>
    //         <Col>
    //             <Button className='button' onClick={handleSearch}>Buscar</Button>
    //         </Col>
    //     </Row>
    //     <Row className='sales'>
    //         <Col xs={2} className='size'>Nombre</Col>
    //         <Col xs={2} className='size'>Precio</Col>
    //         <Col xs={2} className='size'>Stock</Col>
    //         <Col xs={2} className='size'>Imagen</Col>
    //         <Col xs={2} className='size'>Editar</Col>
    //     </Row>
    //     {filteredProducts.map((product, index) => (
    //         <Row key={index} className='sales_in'>
    //             <Col xs={2} className='size'>{product.title}</Col>
    //             <Col xs={2} className='size'>{product.price}</Col>
    //             <Col xs={2} className='size'>{product.stock}</Col>
    //             <Col xs={2}>
    //                 <Image src={product.image} alt={`Imagen de ${product.title}`} className='image' />
    //             </Col>
    //             <Col xs={2}>
    //                 <Button className='detail' onClick={handleModalShow}>
    //                     <i className="icon_detail bi bi-clipboard-check"></i>
    //                 </Button>
    //             </Col>
    //         </Row>
    //     ))}
    //     <Modal centered show={modal} onHide={handleModalClose}>
    //         <Modal.Header closeButton>
    //             <Modal.Title className='d-flex flex-column' style={{ color: "black" }}>Editar</Modal.Title>
    //         </Modal.Header>
    //         <Modal.Body>
    //         </Modal.Body>
    //         <Modal.Footer>
    //             <Button variant="secondary" onClick={handleModalClose}>
    //                 Close
    //             </Button>
    //         </Modal.Footer>
    //     </Modal>
    // </Container>
    return (
        <Container className='container'>
            <Row className='sale_title'>
                <Col><h1>Productos</h1></Col>
            </Row>
            <Row>
                <Col md={9}>
                    <Form.Control
                        type="text"
                        placeholder='Buscar producto...'
                        value={searched}
                        onChange={event => setSearched(event.target.value)}
                    />
                </Col>
                <Col>
                    <Button className='button' onClick={handleSearch}>Buscar</Button>
                </Col>
            </Row>
            <Row className='sales'>
                <Col xs={2}>Nombre</Col>
                <Col xs={2}>Precio</Col>
                <Col xs={2}>Stock</Col>
                <Col xs={2}>Imagen</Col>
                <Col xs={2}>Editar</Col>
            </Row>
            {filteredProducts.map((product, index) => (
                <Row className="sales" key={index}>
                    <Col xs={2}>{product.title}</Col>
                    <Col xs={2}>{product.price}</Col>
                    <Col xs={2}>{product.stock}</Col>
                    <Col xs={2}><Image src={product.image} alt={`Imagen de ${product.title}`} className='image' /></Col>
                    <Col xs={2}>  <Button className='detail' onClick={handleModalShow}>
                        <i className="icon_detail bi bi-clipboard-check"></i>
                    </Button></Col>
                </Row>
            ))}

            <Modal centered show={modal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title className='d-flex flex-column' style={{ color: "black" }}>Editar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );

}

export default Products;
