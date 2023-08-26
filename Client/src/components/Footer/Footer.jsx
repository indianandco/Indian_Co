import "./Footer.css"
import 'bootstrap-icons/font/bootstrap-icons.css';
import { NavLink } from "react-router-dom"
import Modal from 'react-bootstrap/Modal';
import { useState } from "react";

const Footer = () => {

    const [show, setShow] = useState(false);


    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false)

    return (
        <div className="footer_container" >
            <div className="mid-right_container">
                <div className="left_container">
                    <h1>Redes</h1>
                    <div className="icon_container">
                        <NavLink to={"https://www.instagram.com/indianandco/"} className={"iconIg"}>
                            <i className="bi bi-instagram" width="321" height="321"></i>
                        </NavLink>
                        <NavLink to={'https://wa.me/5491134424505'} className={"iconWpp"}>
                            <i className="bi bi-whatsapp"></i>
                        </NavLink>
                        <NavLink to={'https://www.facebook.com/indianandco09'} className={"iconFb"}>
                            <i className="bi bi-facebook"></i>
                        </NavLink>
                    </div>
                </div>

                <div className="mid_container">
                    <h1 className="menu">Menu</h1>
                    <div className="links_container">
                        <NavLink className="links" to={"/home"} >Inicio</NavLink>
                        <NavLink className="links" to={"/products"} >Productos</NavLink>
                        <NavLink className="links" to={"/contact"} >Contacto</NavLink>
                        <NavLink className="links" to={"/about"} >Sobre nosotros</NavLink>
                        <NavLink className="links" to={"/cart"} >Carrito</NavLink>
                    </div>
                </div>
                <div className="right_container">
                    <h1 className="info">Información</h1>
                    <div className="links_container">
                        <button className="modals links" onClick={handleShow} >¿Cómo Comprar?</button>
                    </div>
                </div>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header className="pb-0" closeButton>
                    <Modal.Title className='pb-1 m-1' style={{ color: "black" }} >Comprando en Indian&Co</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ol>
                        <li>Ingresa a productos</li>
                        <li>Una vez elejido al producto a comprar clickeamos en agregar al carrito</li>
                        <li>Nos dirijimos la margen superior derecho y clickeamos en el icono con forma de bolsa de compras</li>
                        <li>Seleccionamos comprar ahora, completamos los datos</li>
                        <li>¡Y listo el producto ya es tuyo!</li>
                    </ol>
                </Modal.Body>

            </Modal>
        </div >
    )
}

export default Footer;