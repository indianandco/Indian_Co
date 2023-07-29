import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import "./NavBar.css";

const NavBar = () => {
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false); // Estado para controlar el despliegue del menú

  // Función para mostrar/ocultar las opciones del menú
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="navbar">
      <div className="buttons_container">
        <NavLink className="navbar-brand" to="/">
          <img className="logo" src="logo.png" alt="logo" />
        </NavLink>
        <SearchBar></SearchBar>
        <div>
          <div className="divButton">
            <button className="menu-button" onClick={toggleMenu}>
              ☰
            </button>
          </div>
          <div className={`navbar-links ${showMenu ? "show" : ""}`} id="navbarLinks">
            <NavLink className="nav-link" to="/home">
              INICIO
            </NavLink>
            {location.pathname !== "/" && (
              <>
                <NavLink className="nav-link" to="/contact">
                  CONTACTO
                </NavLink>
                <NavLink className="nav-link" to="/about">
                  SOBRE NOSOTROS
                </NavLink>
                <NavLink className="nav-link" to="/cart">
                  CARRITO
                </NavLink>
              </>
            )}
            <NavLink className="nav-link" to="/">
              REGISTRARSE
            </NavLink>
            <NavLink className="nav-link" to="/">
              INGRESAR
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
