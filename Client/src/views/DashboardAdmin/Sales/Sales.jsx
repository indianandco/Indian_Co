import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap';
import { fetcher } from '../../../utils/fetcherGet';
import Pagination from 'react-bootstrap/Pagination';


const Sales = () => {

    const [modal, setModal] = useState(false)
    const [salesCount, setSalesCount] = useState([]);
    const [users, setUsers] = useState([])
    const [selectedSale, setSelectedSale] = useState(null)
    const [products, setProducts] = useState(null)
    const [filteredSales, setFilteredSales] = useState([]);
    const [pagActive, setPagActive] = useState(1)
    const salesPerPage = 4;

    const totalPages = Math.ceil(filteredSales.length / salesPerPage)
    let items = []
    for (let i = 1; i <= totalPages; i++) {
        items.push(
            <Pagination.Item key={i} active={i === pagActive} onClick={() => setPagActive(i)}>
                {i}
            </Pagination.Item>
        )
    }
    const paginatedSales = filteredSales.slice((pagActive - 1) * salesPerPage, pagActive * salesPerPage)

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${day}-${month}-${year}`;
    };

    const getInfo = async () => {
        const ventas = await fetcher(`/admindashboard/tickets`);
        setSalesCount(ventas);
        setFilteredSales(ventas)
    };

    const getInfoUsers = async () => {
        const users = await fetcher(`/admindashboard/users`)
        setUsers(users)
    }

    const getProductsInfo = async () => {
        const products = await fetcher(`/products`)
        setProducts(products)
    }
    useEffect(() => {
        getInfo();
        getInfoUsers()
        getProductsInfo()
    }, []);


    const handleModalShow = (sale) => {
        setSelectedSale(sale)
        setModal(true);
    };
    const handleModalClose = () => {
        setModal(false);
    };



    return (
        <Container className='container'>
            <Row className='sale_title'>
                <Col><h3>Historial de compras...</h3></Col>
            </Row>


            <Row className='sales'>
                <Col className='columna' xs={3}>Nombre</Col>
               
                <Col className='columna' xs={4}>Fecha</Col>
                <Col className='columna' xs={2}>Detalle</Col>
            </Row>
            {
               paginatedSales?.map((sale, index) => {
                    const user = users.find(u => u._id === sale.owner);
                    return (
                        <Row className='sales' key={index}>
                            <Col xs={3}>{user ? `${user.first_name} ${user.last_name}` : 'Usuario no encontrado'}</Col>
                          
                            <Col xs={4}>{formatDate(sale.purchase_datetime)}</Col>
                            <Col xs={2}>
                                <Button className="editButton" onClick={() => handleModalShow(sale)}>
                                    <i className="icon_detail bi bi-clipboard-check"></i>
                                </Button>
                            </Col>
                        </Row>

                    )

                })

            }

            <Modal centered show={modal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title className='d-flex flex-column' style={{ color: "black" }}>Detalle de orden</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <div>
                            <p>Nro de orden: {selectedSale?._id}</p>
                        </div>
                        <div>
                            <p>Productos:</p>
                            {
                                selectedSale?.products.map((productId, index) => {
                                    const product = products.payload.find(p => p._id === productId);
                                    return (
                                        <span key={index}>
                                            - {product ? product.title : 'Producto no encontrado'}
                                            {index !== selectedSale.products.length - 1 && <br />}
                                        </span>
                                    );
                                })
                            }

                        </div>
                        <br />
                        <div>
                            <p>Total: ${selectedSale?.total_amount}</p>
                        </div>
                        <div>
                            <p></p>
                        </div>
                    </div>
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
    )
}

export default Sales;
