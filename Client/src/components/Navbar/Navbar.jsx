import { Link, useLocation } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import "./NavBar.css";

const NavBar = () => {
    const location = useLocation();

    return (
        <div className="navbar">
            <div className="buttons_container">
                <Link className="navbar-brand" to="/">
                    <img className="logo" src="logo.jpeg" alt="logo" />
                </Link>
                <SearchBar></SearchBar>
                <div className="navbar-links">
                    <Link className="nav-link" to="/home">
                        INICIO
                    </Link>
                    {location.pathname !== "/" && (
                        <>
                            <Link className="nav-link" to="/contact">
                                CONTACTO
                            </Link>
                            <Link className="nav-link" to="/about">
                                SOBRE NOSOTROS
                            </Link>
                            <Link className="nav-link" to="/cart">
                                CARRITO
                            </Link>
                            <Link className="nav-link" to="/createProduct">
                                SUBIR PRODUCTO
                            </Link>
                        </>
                    )}
                    <Link className="nav-link" to="/">REGISTRARSE</Link>
                    <Link className="nav-link" to="/">INGRESAR</Link>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
