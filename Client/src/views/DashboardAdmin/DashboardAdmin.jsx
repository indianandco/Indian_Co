import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./DashboardAdmin.css"
import { useState } from 'react';


const DashboardAdmin = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <div className="dash_container">
                <div className="offcanvas_container">
                    <Button variant="primary" onClick={handleShow} style={{ width: "100%" }} className="me-2 icon border-0 rounded-0">
                        <i className="bi bi-list"></i>
                    </Button>
                    <Nav defaultActiveKey="/home" style={{ height: "100%" }} className=" nav_container flex-column d-flex align-items-start justify-content-start">
                        <Nav.Link className="icon" href="/home"><i className="bi bi-house-door-fill"></i></Nav.Link>
                        <Nav.Link className="icon" eventKey="link-1"><i className="bi bi-people"></i></Nav.Link>
                        <Nav.Link className="icon" eventKey="link-2"><i className="bi bi-ticket"></i></Nav.Link>
                    </Nav>
                </div>
                <div className="banners_container">
                    <h1>Banners, etc...</h1>
                </div>
            </div>
            <div>
                <Offcanvas show={show} onHide={handleClose}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        Some text as placeholder. In real life you can have the elements you
                        have chosen. Like, text, images, lists, etc.
                    </Offcanvas.Body>
                </Offcanvas>
            </div>
        </div>
    )
}

export default DashboardAdmin;