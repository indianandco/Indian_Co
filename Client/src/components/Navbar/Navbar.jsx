import { NavLink } from "react-router-dom";
import "./NavBar.css";
import Nav from 'react-bootstrap/Nav';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Navbar from 'react-bootstrap/Navbar';
import SignUp from "../Login/SignUp/SignUp";
import Badge from '@mui/material/Badge';
import ShoppingCart from '@mui/icons-material/ShoppingCart';


const NavBar = () => {

    const role = "logged out"

    return (
        <div>
            <div className="nav_container">
                <Navbar fixed="top" collapseOnSelect expand="lg" className="navbar">
                    <Navbar.Brand className="logo_container" href="/">
                        <img className="logo" src="/logo.png" alt="logo" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                        <Nav className="justify-content-end p-4">
                            <NavLink className="buttons" to="/">INICIO</NavLink>
                            <NavLink className="buttons" to="/contact">CONTACTO</NavLink>
                            <NavLink className="buttons" to="/about">SOBRE NOSOTROS</NavLink>
                            <NavLink className="buttons" to="/products">PRODUCTOS</NavLink>
                            <div>
                                <NavLink className="cart_button" to="/cart">
                                    <Badge badgeContent={4} color="secondary" className="buttons">
                                            <ShoppingCart color="action" />
                                    </Badge>
                                </NavLink>
                            </div>
                            {role !== "user"
                                ?
                                <SignUp ></SignUp>
                                :
                                <NavLink className="buttons" to="/">SALIR</NavLink>
                            }
                            {<NavLink className="buttons" to="/dashboardadmin">DASHBOARD</NavLink>}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        </div>
    );
};

export default NavBar;