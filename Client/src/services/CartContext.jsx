/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

// eslint-disable-next-line react/prop-types
export const CartProvider = ({ children }) => {

  const [cart, setCart] = useState([]);

  const loadCartData = () => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (savedCart && savedCart.length > 0) {
      setCart(savedCart);
    }
  }; //función que actualiza el valor de cart al valor del localStorage

  const saveCartData = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }; //función que actualiza el LocalStorage al valor de cart


  const addProduct = (product) => {
    const existingProduct = cart.find((p) => p.id === product.id);

    if (existingProduct) {
      const updatedCart = cart.map((p) =>
        p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
      );
      setCart(updatedCart);
    } else {
      setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
    }
  };

  const removeProduct = (id) => {
    const existingProduct = cart.find((product) => product.id === id);

    if (existingProduct) {
      const updatedCart = cart.map((product) =>
        product.id === product.id ? { ...product, quantity: product.quantity - 1 } : product
      );
      setCart(updatedCart);
    }
  };

  const removeStack = (id) => {
    const updatedCart = cart.filter((product) => product.id !== id);
    setCart(updatedCart);
  };

  useEffect(() => {
    if (cart.length > 0) {
      saveCartData();
    }
  }, [cart])

  return (
    <CartContext.Provider value={{ addProduct, cart, loadCartData, removeProduct, removeStack }}>
      {children}
    </CartContext.Provider>
  )
}
