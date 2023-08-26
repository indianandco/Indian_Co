import styles from "./EmptyCart.module.css";
import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";
import React from 'react';

export const EmptyCart = () => {
  return (
    <main className={styles.emptyContainer}>
        <div className={styles.emptyCart}>
                <img className={styles.emptyImg} src="/logoEmptyCart.png" alt="logo Carrito de compras Vacio" width="220" height="220"/>
                <p>¡Empieza un carrito de compras!</p>
            <NavLink to="/products">
            <Button>Descubrir Productos...</Button>
            </NavLink>
        </div>
    </main>
  )
};

export default EmptyCart;
