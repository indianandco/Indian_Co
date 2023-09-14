import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./DashboardAdmin.css"
import { useEffect, useState } from 'react';
import LinesChart from './AdminComponents/LineChart/LineChart';
import { DoughnutChart } from './AdminComponents/DoughnutChart/DoughnutChart';
import Sales from './Sales/Sales';
import Shipping from './Shipping/Shipping'
import CreateProduct from './CreateProduct/CreateProduct';
import { fetcher } from '../../utils/fetcherGet';
import Products from './Products/Products';
import { Tab, Tabs, Card, Row, Col, Container } from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner';



const DashboardAdmin = () => {

    const [show, setShow] = useState(false);
    const [productsCount, setProductsCount] = useState()
    /* const [userCount, setUserCount] = useState() */
    const [salesCount, setSalesCount] = useState()
    const [totalProfit, setTotalProfits] = useState()
    const [isLoading, setIsLoading] = useState(false);

    const calculateProfits = (salesResponse) => {
        console.log(salesResponse);

        const filteredSales = salesResponse.filter(sale => sale.status === true);

        const total = filteredSales.reduce((accumulator, sale) => accumulator + parseFloat(sale.total_amount), 0);

        return total;
    }

    /* const calculateTopProduct = (salesResponse) => {
        salesResponse.filter(sale => {

        })
    } */

    const getInfo = async () => {
        const productsResponse = await fetcher(`/admindashboard/products`)
        const salesResponse = await fetcher(`/admindashboard/tickets`)
        setProductsCount(productsResponse)
        setSalesCount(salesResponse)
        /* setUserCount(calculateTopProduct(salesResponse)) */
        setTotalProfits(calculateProfits(salesResponse))
    }


    useEffect(() => {
        setTimeout(() => {
            setIsLoading(true);
        }, 1700);

        getInfo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [activeTab, setActiveTab] = useState('general');

    const handleTabs = (tab) => {
        setActiveTab(tab)
    }


    return (
        !isLoading ? (
            <div className="loading-spinner">
                <Spinner animation="border" role="status" aria-hidden="true">
                    <span className="visually-hidden">Cargando...</span>
                </Spinner>
            </div>
        ) : (
            <div style={{ marginRight: "70px" }}>
                <div>
                    <div>
                        <Offcanvas style={{ width: "230px" }} show={show} onHide={handleClose}>
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title>Dashboard menú</Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <ButtonGroup vertical style={{ width: "90%" }} className='border-0 rounded-0'>
                                    <Button variant='ligth' href='/' className="buttons_inside my-2 w-100 d-flex align-items-center justify-content-between p-2 rounded-0"><i className="icon bi bi-house-door"></i>Inicio</Button>
                                    <Button variant='ligth' onClick={() => handleTabs("general")} className="buttons_inside my-2 w-100 d-flex align-items-center justify-content-between p-2 rounded-0"><i className="icon bi bi-grid"></i> Dashboard</Button>
                                    <Button variant='ligth' onClick={() => handleTabs("shipping")} className="buttons_inside my-2 w-100 d-flex align-items-center justify-content-between p-2 rounded-0"><i className="bi bi-send-check"></i>Precio de Envio</Button>
                                    <Button variant='ligth' onClick={() => handleTabs("sales")} className="buttons_inside my-2 w-100 d-flex align-items-center justify-content-between p-2 rounded-0"><i className="icon bi bi-ticket"></i> Órdenes</Button>
                                    <Button variant='ligth' onClick={() => handleTabs("create")} className="buttons_inside my-2 w-100 d-flex align-items-center justify-content-between p-2 rounded-0"><i className="icon bi bi-upload"></i> Subir producto</Button>
                                    <Button variant='ligth' onClick={() => handleTabs("products")} className="buttons_inside my-2 w-100 d-flex align-items-center justify-content-between p-2 rounded-0"><i className="icon bi bi-bag"></i> Productos</Button>
                                </ButtonGroup>
                            </Offcanvas.Body>
                        </Offcanvas>
                    </div>
                    <div className="dash_container">
                        <div className="side_container">
                            <Button variant="primary" onClick={handleShow} style={{ width: "100%", height: "3rem" }} className="me-2 icon border-0 rounded-0">
                                <i className="bi bi-list"></i>
                            </Button>
                            <div className=" nav_container2">
                                <Nav defaultActiveKey="/home" style={{ height: "100%" }} className="flex-column d-flex align-items-start justify-content-start">
                                    <Nav.Link className="icon" href="/"><i className="bi bi-house-door-fill"></i></Nav.Link>
                                    <Nav.Link className='icon' onClick={() => handleTabs("general")} eventKey="link-4"><i className='bi bi-grid'></i></Nav.Link>
                                    <Nav.Link className="icon" onClick={() => handleTabs("shipping")} eventKey="link-1"><i className="bi bi-send-check"></i></Nav.Link>
                                    <Nav.Link className="icon" onClick={() => handleTabs("sales")} eventKey="link-2"><i className="bi bi-ticket"></i></Nav.Link>
                                    <Nav.Link className='icon' onClick={() => handleTabs("create")} eventKey="link-3"><i className="bi bi-upload"></i></Nav.Link>
                                    <Nav.Link className='icon' onClick={() => handleTabs("products")} eventKey="link-4"><i className='bi bi-bag'></i></Nav.Link>
                                </Nav>
                            </div>
                        </div>
                        <div className='tabs_container'>
                            <Tabs
                                defaultActiveKey="general"
                                activeKey={activeTab}
                                id="justify-tab-example"
                                className="m-0 p-0 w-100 d-none"
                            >
                                <Tab eventKey="general" title="general">
                                    <Container fluid className="mt-4">
                                        <Row className="mb-4 justify-content-center">
                                            <Col xs={11} className="text"> </Col>
                                        </Row>
                                        <Row className="mb-4">
                                            {[
                                                { title: "Total de productos", value: productsCount?.payload.length, icon: "bi bi-box-seam" },
                                                { title: "Total de usuarios", value: productsCount?.length, icon: "bi bi-people-fill" },
                                                { title: "Total de ventas", value: salesCount?.length, icon: "bi bi-wallet-fill" },
                                                { title: "Ganancias totales", value: totalProfit ? `$${totalProfit}` : null, icon: "bi bi-cash" },
                                            ].map((metric, index) => (
                                                <Col xs={12} sm={6} md={3} key={index} className="mb-4">
                                                    <Card className="h-100 shadow-sm rounded text-center">
                                                        <Card.Body className="d-flex flex-column align-items-center">
                                                            <i className={`icon ${metric.icon} text-primary mb-0`}></i>
                                                            <div className="d-flex align-items-center mb-auto">
                                                                <Card.Title className="mb-0 mr-0">
                                                                    {metric.title}:
                                                                    <Card.Text style={{ fontSize: "18px" }} bg="primary" className="p-2">{metric.value}</Card.Text>
                                                                </Card.Title>
                                                            </div>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>

                                            ))}
                                        </Row>
                                        <Row className="mb-4">
                                            <Col></Col>
                                            <Col xs={12} md={6}>
                                                <h2 className='sales_title mb-4 text-center'>Ventas de la semana</h2>
                                                <LinesChart />
                                            </Col>
                                            <Col>
                                            </Col>

                                            <Col xs={12} md={4}>
                                                <h2 className='mb-4 text-center'>Ventas del mes</h2>
                                                <DoughnutChart />
                                            </Col>
                                            <Col>
                                            </Col>
                                        </Row>


                                    </Container>
                                </Tab>
                                <Tab className='w-100' eventKey="shipping" title="shipping">
                                    <Shipping />
                                </Tab>
                                <Tab className='w-100' eventKey="sales" title="sales">
                                    <Sales />
                                </Tab>
                                <Tab className='w-100' eventKey="create" title="create">
                                    <CreateProduct></CreateProduct>
                                </Tab>
                                <Tab className='w-100' eventKey="products" title="products">
                                    <Products></Products>
                                </Tab>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
        ))
}

export default DashboardAdmin;