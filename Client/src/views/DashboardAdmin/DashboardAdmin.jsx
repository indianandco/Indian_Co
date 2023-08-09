import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Pagination from 'react-bootstrap/Pagination';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./DashboardAdmin.css"
import { useState } from 'react';
import LinesChart from './AdminComponents/LineChart/LineChart';
import { DoughnutChart } from './AdminComponents/DoughnutChart/DoughnutChart';
import Sales from './AdminComponents/Sales/Sales';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import CreateProduct from './AdminComponents/CreateProduct/CreateProduct';


const DashboardAdmin = () => {

    const [show, setShow] = useState(false);
    const [modal, setModal] = useState(false)
    const [productsCount, setProductsCount] = useState()
    const [userCount, setUserCount] = useState()
    const [salesCount, setSalesCount] = useState()
    const [totalProfit, setTotalProfits] = useState()

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleModalClose = () => setModal(false);
    const handleModalShow = () => setModal(true);
    const [activeTab, setActiveTab] = useState('general');

    const handleTabs = (tab) => {
        setActiveTab(tab)
    }

    return (
        <div>
            <div>
                <Offcanvas show={show} onHide={handleClose}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Dashboard menu</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <ButtonGroup vertical style={{ width: "50%" }} className='border-0 rounded-0'>
                            <Button variant='ligth' className='buttons_inside d-flex align-items-center justify-content-between p-2 '><i className="icon bi bi-house-door"></i> Inicio</Button>
                            <Button variant='ligth' className='buttons_inside d-flex align-items-center justify-content-between p-2 '><i className="icon bi bi-people"></i> Usuarios</Button>
                            <Button eventKey="profile" variant='ligth' className='buttons_inside d-flex align-items-center justify-content-between p-2 '><i className="icon bi bi-ticket"></i> Ordenes</Button>
                            <Button variant='ligth' className='buttons_inside d-flex align-items-center justify-content-between p-2 '><i className="icon bi bi-upload"></i> Productos</Button>
                        </ButtonGroup>
                    </Offcanvas.Body>
                </Offcanvas>
            </div>
            <div className="dash_container">
                <div className="side_container">
                    <Button variant="primary" onClick={handleShow} style={{ width: "100%", height: "3rem" }} className="me-2 icon border-0 rounded-0">
                        <i className="bi bi-list"></i>
                    </Button>
                    <div className=" nav_container">
                        <Nav defaultActiveKey="/home" style={{ height: "100%" }} className="flex-column d-flex align-items-start justify-content-start">
                            <Nav.Link className="icon" onClick={() => handleTabs("general")}><i className="bi bi-house-door-fill"></i></Nav.Link>
                            <Nav.Link className="icon" onClick={() => handleTabs("users")} eventKey="link-1"><i className="bi bi-people"></i></Nav.Link>
                            <Nav.Link className="icon" onClick={() => handleTabs("sales")} eventKey="link-2"><i className="bi bi-ticket"></i></Nav.Link>
                            <Nav.Link className='icon' onClick={()=>handleTabs("products")} eventKey="link-3"><i className="bi bi-upload"></i></Nav.Link>
                        </Nav>
                    </div>
                </div>
                <div className='tabs_container'>
                    <Tabs
                        defaultActiveKey="general"
                        activeKey={activeTab}
                        id="justify-tab-example"
                        className="m-0 p-0 w-100 d-none"
                        fill
                    >
                        <Tab fill className='w-100' eventKey="general" title="general">
                            <div className="info_container">
                                <div className='title_dashboard'>
                                    <h1>Indian&Co</h1>
                                </div>
                                <div className='metrics_container'>
                                    <div className='box_container'>
                                        <div className='info_metrics_container'>
                                            <p>Ventas totales</p>
                                            <p>2344</p>
                                        </div>
                                        <div className='icon_metrics_container'>
                                            <i className="icon bi bi-house-door-fill"></i>
                                        </div>
                                    </div>
                                    <div className='box_container'>
                                        <div className='info_metrics_container'>
                                            <p>Total de productos</p>
                                            <p>25</p>
                                        </div>
                                        <div className='icon_metrics_container'>
                                            <i className="icon bi bi-house-door-fill"></i>
                                        </div>
                                    </div>
                                    <div className='box_container'>
                                        <div className='info_metrics_container'>
                                            <p>Total de usuarios</p>
                                            <p>60</p>
                                        </div>
                                        <div className='icon_metrics_container'>
                                            <i className="icon bi bi-house-door-fill"></i>
                                        </div>
                                    </div>
                                    <div className='box_container'>
                                        <div className='info_metrics_container'>
                                            <p>hola</p>
                                            <p>hola</p>
                                        </div>
                                        <div className='icon_metrics_container'>
                                            <i className="icon bi bi-house-door-fill"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className='charts_container'>
                                    <div className='line_chart_container'>
                                        <h2 className='sales_title'>Ventas de la semana</h2>
                                        <LinesChart></LinesChart>
                                    </div>
                                    <div className='doughnut_container'>
                                        <h2>Ventas del mes</h2>
                                        <DoughnutChart></DoughnutChart>
                                    </div>
                                </div>
                                <div className='recent_sales_container'>
                                    <div className='sale_title'><h1>Ordenes de compra</h1></div>
                                    <div className='sales'>
                                        <span className='size'>Nombre</span>
                                        <span className='size'>Fecha</span>
                                        <span className='size' >Télefono</span>
                                        <span className='size'>Registrado</span>
                                        <span className='size'>Detalle</span>
                                    </div>
                                    <div className='sales_in'>
                                        <p className='size' >Juan</p>
                                        <p className='size'>07/07/2023</p>
                                        <p className='size'>1134240778</p>
                                        <p className='size'>Sí</p>
                                        <button className='detail' onClick={handleModalShow}><i className="icon_detail bi bi-clipboard-check"></i></button>
                                    </div>
                                    <div className='sales_in'>
                                        <p className='size' >Juan</p>
                                        <p className='size'>07/07/2023</p>
                                        <p className='size'>1134240778</p>
                                        <p className='size'>Sí</p>
                                        <button className='detail' onClick={handleModalShow}><i className="icon_detail bi bi-clipboard-check"></i></button>
                                    </div>
                                    <div className='sales_in'>
                                        <p className='size' >Juan</p>
                                        <p className='size'>07/07/2023</p>
                                        <p className='size'>1134240778</p>
                                        <p className='size'>Sí</p>
                                        <button className='detail' onClick={handleModalShow}><i className="icon_detail bi bi-clipboard-check"></i></button>
                                    </div>
                                    <div className='sales_in'>
                                        <p className='size' >Juan</p>
                                        <p className='size'>07/07/2023</p>
                                        <p className='size'>1134240778</p>
                                        <p className='size'>Sí</p>
                                        <button className='detail' onClick={handleModalShow}><i className="icon_detail bi bi-clipboard-check"></i></button>
                                    </div>
                                    <div className='pagination'>
                                        <Pagination>
                                            <Pagination.First />
                                            <Pagination.Prev />
                                            <Pagination.Item>{1}</Pagination.Item>

                                            <Pagination.Item>{10}</Pagination.Item>
                                            <Pagination.Item>{11}</Pagination.Item>
                                            <Pagination.Item active>{12}</Pagination.Item>
                                            <Pagination.Item>{13}</Pagination.Item>
                                            <Pagination.Item>{14}</Pagination.Item>

                                            <Pagination.Item>{20}</Pagination.Item>
                                            <Pagination.Next />
                                            <Pagination.Last />
                                        </Pagination>
                                        <Modal centered show={modal} onHide={handleModalClose}>
                                            <Modal.Header closeButton>
                                                <Modal.Title className='d-flex flex-column' style={{ color: "black" }}>Orden de compra</Modal.Title>

                                            </Modal.Header>
                                            <Modal.Body>
                                                <div>
                                                    <div>
                                                        <p>Nro de orden:</p>
                                                    </div>
                                                    <div>
                                                        <p>Dirección:</p>
                                                    </div>
                                                    <div>
                                                        <p>total:</p>
                                                    </div>
                                                    <div>
                                                        <p>productos:</p>
                                                    </div>
                                                </div>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={handleModalClose}>
                                                    Close
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>
                                    </div>
                                </div>
                            </div>
                        </Tab>
                        <Tab className='w-100' eventKey="users" title="users">
                            Esto es la vista de users
                        </Tab>
                        <Tab className='w-100' eventKey="sales" title="sales">
                            <Sales></Sales>
                        </Tab>
                        <Tab className='w-100' eventKey="products" title=" products">
                            <CreateProduct></CreateProduct>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

export default DashboardAdmin;