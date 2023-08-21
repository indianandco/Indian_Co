import { NavLink } from "react-router-dom";
import "./NavBar.css";
import Nav from 'react-bootstrap/Nav';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Navbar from 'react-bootstrap/Navbar';
import SignUp from "../Login/SignUp/SignUp";
import Badge from '@mui/material/Badge';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../services/CartContext";
import SignIn from "../Login/SignIn/SignIn";
import UserProfile from "../../views/UserProfile/UserProfile";
import { fetcher } from "../../utils/fetcherGet";

const NavBar = () => {

    const { cart } = useContext(CartContext);
    let [cartLength, setCartLength] = useState(null)

    const scrollToTop = () => {
        window.scrollTo(0, 0);
    };

    const handleLogOut = () => {
        fetcher("/users/logout")
        sessionStorage.clear();
    }


    useEffect(() => {
        setCartLength(cart?.length)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cart])

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
                                    <Badge badgeContent={cartLength} color="secondary" className="buttons">
                                        <ShoppingCart color="action" />
                                    </Badge>
                                </NavLink>
                            </div>
                            <div>
                                <SignIn></SignIn>
                            </div>
                            <div>
                                <SignUp></SignUp>
                            </div>
                            <div>
                                <UserProfile></UserProfile>
                            </div>

                            <NavLink onClick={() => handleLogOut()} className="buttons" to="/">SALIR</NavLink>

                            <NavLink onClick={scrollToTop} className="buttons" to="/dashboardadmin">DASHBOARD</NavLink>

                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>


        </div>
    );
};

export default NavBar;