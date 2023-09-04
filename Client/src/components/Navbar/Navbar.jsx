import { NavLink, useLocation } from "react-router-dom";
import "./Navbar.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import Nav from 'react-bootstrap/Nav';
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

    const location = useLocation();
    const { cart } = useContext(CartContext);
    const { user, setUser } = useContext(AuthContext);
    const [userNav, setUserNav] = useState(JSON.parse(sessionStorage.getItem("sessions")))
    const [scrolled, setScrolled] = useState(false);
    const [expanded, setExpanded] = useState(false);

    const validRoutes = [
        "/",
    "/about",
    "/contact",
    "/products",
    "/detail/:id",
    "/cart",
    ];
    
    const isNotFoundPage = !validRoutes.includes(location.pathname);


    const scrollToTop = () => {
        window.scrollTo(0, 0);
    };

    const handleLogOut = () => {
        fetcher("/users/logout")
        sessionStorage.clear();
        setUser(null);
        setUserNav(null);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cart, user])

    return (
        <div>
            <div className="nav_container">
                <Navbar fixed="top" expanded={expanded}onToggle={() => setExpanded(!expanded)} collapseOnSelect expand="lg" className={location.pathname === "/" ? scrolled ? "navbar_scrolled" : "navbar" : "navbar_scrolled"}>
                    <Navbar.Toggle data-bs-theme="dark" aria-controls="responsive-navbar-nav" className="ButtonResponsive" />
                    <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                        <Navbar.Brand onClick={scrollToTop} className="logo_container" href="/">
                            <img className={location.pathname === "/" ? scrolled ? "logo_scrolled" : "logo" : "logo_scrolled"} src="/logo-principal.png" alt="Indian&Co" />
                        </Navbar.Brand>
                       
                        {!isNotFoundPage &&
                            <> 
                           
                            <Nav className="justify-content-end p-1">
                            <NavLink onClick={()=>{scrollToTop(), setExpanded(false)}} className="buttons" to="/">Inicio</NavLink>
                            <NavLink onClick={()=>{scrollToTop(), setExpanded(false)}}className="buttons" to="/contact">Contacto</NavLink>
                            <NavLink onClick={()=>{scrollToTop(), setExpanded(false)}} className="buttons" to="/about">Sobre nosotros</NavLink>
                            <NavLink onClick={()=>{scrollToTop(), setExpanded(false)}} className="buttons" to="/products">Productos</NavLink>
                            <div>
                                <NavLink onClick={()=>{scrollToTop(), setExpanded(false)}} className="cart_button" to="/cart">
                                    <Badge badgeContent={cart?.length} color="secondary" className="buttons">
                                        <ShoppingCart />
                                    </Badge>
                                </NavLink>
                            </div>
                            <div>
                                {!user && <SignIn scrolled={scrolled} onClick={() => setExpanded(false)}></SignIn>}
                            </div>
                            <div>
                                {!user && <SignUp scrolled={scrolled} onClick={() => setExpanded(false)}></SignUp>}
                            </div>
                            <div>
                                {(user?.role === "user") && <UserProfile onClick={() => setExpanded(false)}></UserProfile>}
                            </div>

                            {(user || userNav) && <NavLink onClick={() => {handleLogOut(),setExpanded(false)}} className="buttons" to="/">Salir</NavLink>}
                            {(user?.role === 'admin' || userNav?.role === 'admin') && <NavLink onClick={scrollToTop} className="buttons" to="/dashboardadmin">Dashboard</NavLink>}
                           </Nav> 
                           </>
                            
                        }
                        {isNotFoundPage &&
                            <Nav className="notFound p-1" >

                                 <NavLink onClick={()=>{scrollToTop(), setExpanded(false)}} className="buttons" to="/">Inicio</NavLink>
                            </Nav>
                        }
                        
                  
                        
                    </Navbar.Collapse>
                </Navbar>
            </div>


        </div>
    );
};

export default NavBar;