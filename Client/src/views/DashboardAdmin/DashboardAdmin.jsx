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


const DashboardAdmin = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                            <Button variant='ligth' className='buttons_inside d-flex align-items-center justify-content-between p-2 '><i className="icon bi bi-ticket"></i> Ordenes</Button>
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
                            <Nav.Link className="icon" href="/home"><i className="bi bi-house-door-fill"></i></Nav.Link>
                            <Nav.Link className="icon" eventKey="link-1"><i className="bi bi-people"></i></Nav.Link>
                            <Nav.Link className="icon" eventKey="link-2"><i className="bi bi-ticket"></i></Nav.Link>
                            <Nav.Link className="icon" href="/createProduct"><i className="bi bi-upload"></i></Nav.Link>
                        </Nav>
                    </div>

                </div>
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
                            <h2>Ventas de la semana</h2>
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
                            <button className='detail'>Detalle</button>
                        </div>
                        <div className='sales_in'>
                            <p className='size' >Juan</p>
                            <p className='size'>07/07/2023</p>
                            <p className='size'>1134240778</p>
                            <p className='size'>Sí</p>
                            <button className='detail'>Detalle</button>
                        </div>
                        <div className='sales_in'>
                            <p className='size' >Juan</p>
                            <p className='size'>07/07/2023</p>
                            <p className='size'>1134240778</p>
                            <p className='size'>Sí</p>
                            <button className='detail'>Detalle</button>
                        </div>
                        <div className='sales_in'>
                            <p className='size' >Juan</p>
                            <p className='size'>07/07/2023</p>
                            <p className='size'>1134240778</p>
                            <p className='size'>Sí</p>
                            <button className='detail'>Detalle</button>
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
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Modal heading</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Close
                                    </Button>
                                    <Button variant="primary" onClick={handleClose}>
                                        Save Changes
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardAdmin;