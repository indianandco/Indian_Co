/* import { useLocation } from "react-router-dom"; */
import { NavLink } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import "./NavBar.css";
import Nav from 'react-bootstrap/Nav';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Navbar from 'react-bootstrap/Navbar';
import SignUp from "../Login/SignUp/SignUp";


const NavBar = () => {

    /* const location = useLocation(); */
    const role = "logged out"

    return (
        <div className="nav_container">
            <Navbar fixed="top" collapseOnSelect expand="lg" className="navbar">
                <Navbar.Brand className="logo_container" href="/">
                    <img className="logo" src="/logo.png" alt="logo" />
                </Navbar.Brand>
                {<SearchBar></SearchBar>}
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                    <Nav className="justify-content-end p-4">
                        <NavLink className="buttons" to="/">INICIO</NavLink>
                        <NavLink className="buttons" to="/contact">CONTACTO</NavLink>
                        <NavLink className="buttons" to="/about">SOBRE NOSOTROS</NavLink>
                        <div>
                            <NavLink className="cart_button" to="/cart"><i className="bi bi-bag-check"></i></NavLink>
                        </div>
                        <NavLink className="buttons" to="/products">PRODUCTOS</NavLink>
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
    );
};

export default NavBar;