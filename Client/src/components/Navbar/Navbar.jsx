import { NavLink } from "react-router-dom";
import "./Navbar.css";
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
import { AuthContext } from "../../services/AuthContext";

const NavBar = () => {

    const { cart } = useContext(CartContext);
    let [cartLength, setCartLength] = useState(null)
    const { user, setUser } = useContext(AuthContext);
    const [scrolled, setScrolled] = useState(false);


    const scrollToTop = () => {
        window.scrollTo(0, 0);
    };

    const handleLogOut = () => {
        fetcher("/users/logout")
        sessionStorage.clear();
        setUser(null);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 1) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        setCartLength(cart?.length)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cart, user])

    return (
        <div>
            <div className="nav_container">
                <Navbar fixed="top" collapseOnSelect expand="lg" className={scrolled ? "navbar_scrolled" : "navbar"}>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                        <Navbar.Brand onClick={scrollToTop} className="logo_container" href="/">
                            <img className={scrolled ? "logo_scrolled" : "logo"} src="/logo-principal.png" alt="Indian&Co" />
                        </Navbar.Brand>
                        <Nav className="justify-content-end p-4 ">
                            <NavLink onClick={scrollToTop} className={scrolled ? "buttons_scrolled" : "buttons"} to="/">Inicio</NavLink>
                            <NavLink onClick={scrollToTop} className={scrolled ? "buttons_scrolled" : "buttons"} to="/contact">Contacto</NavLink>
                            <NavLink onClick={scrollToTop} className={scrolled ? "buttons_scrolled" : "buttons"} to="/about">Sobre nosotros</NavLink>
                            <NavLink onClick={scrollToTop} className={scrolled ? "buttons_scrolled" : "buttons"} to="/products">Productos</NavLink>
                            <div>
                                <NavLink onClick={scrollToTop} className="cart_button" to="/cart">
                                    <Badge badgeContent={cartLength} color="secondary" className={scrolled ? "buttons_scrolled" : "buttons"}>
                                        <ShoppingCart />
                                    </Badge>
                                </NavLink>
                            </div>
                            <div>
                                {!user && <SignIn scrolled={scrolled}></SignIn>}
                            </div>
                            <div>
                                {!user && <SignUp scrolled={scrolled}></SignUp>}
                            </div>
                            <div>
                                {(user?.role === "user") && <UserProfile></UserProfile>}
                            </div>

                            <NavLink onClick={() => handleLogOut()} className={scrolled ? "buttons_scrolled" : "buttons"} to="/">Salir</NavLink>
                            {(user?.role === 'admin') && <NavLink onClick={scrollToTop} className={scrolled ? "buttons_scrolled" : "buttons"} to="/dashboardadmin">Dashboard</NavLink>}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>


        </div>
    );
};

export default NavBar;