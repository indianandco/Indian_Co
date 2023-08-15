import { NavLink } from "react-router-dom";
import "./NavBar.css";
import Nav from 'react-bootstrap/Nav';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Navbar from 'react-bootstrap/Navbar';
import SignUp from "../Login/SignUp/SignUp";
import Badge from '@mui/material/Badge';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import { useEffect, useState } from "react";

const NavBar = () => {

    const [cartLength, setCartLength] = useState()

    const scrollToTop = () => {
        window.scrollTo(0, 0);
      };
    
    useEffect(() => {
        setCartLength(JSON.parse(localStorage.getItem("cart")));
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [cartLength])

    const role = "logged out"

    return (
        <div>
            <div className="nav_container">
                <Navbar fixed="top" collapseOnSelect expand="lg" className="navbar">
                    <Navbar.Brand onClick={scrollToTop} className="logo_container" href="/">
                        <img className="logo" src="/logo.png" alt="logo" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                        <Nav className="justify-content-end p-4 ">
                            <NavLink onClick={scrollToTop} className="buttons" to="/">INICIO</NavLink>
                            <NavLink onClick={scrollToTop} className="buttons" to="/contact">CONTACTO</NavLink>
                            <NavLink onClick={scrollToTop} className="buttons" to="/about">SOBRE NOSOTROS</NavLink>
                            <NavLink onClick={scrollToTop} className="buttons" to="/products">PRODUCTOS</NavLink>
                            <div>
                                <NavLink onClick={scrollToTop} className="cart_button" to="/cart">
                                    <Badge badgeContent={cartLength?.length} color="secondary" className="buttons">
                                            <ShoppingCart color="action" />
                                    </Badge>
                                </NavLink>
                            </div>
                            {role !== "user"
                                ?
                                <SignUp ></SignUp>
                                :
                                <NavLink onClick={scrollToTop} className="buttons" to="/">SALIR</NavLink>
                            }
                            {<NavLink onClick={scrollToTop} className="buttons" to="/dashboardadmin">DASHBOARD</NavLink>}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        </div>
    );
};

export default NavBar;