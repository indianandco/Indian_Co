/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

// eslint-disable-next-line react/prop-types
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    loadCartData();
  }, []);

  useEffect(() => {
    saveCartData();
    
  }, [cart]);

  const loadCartData = () => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (savedCart && savedCart.length > 0) {
      setCart(savedCart);
    }
  };

  const saveCartData = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const addToCart = (id) => {
    const existingProduct = cart.find((p) => p.id === id);

    if (existingProduct) {
      const updatedCart = cart.map((p) =>
        p.id === id ? { ...p, quantity: p.quantity + 1 } : p
      );
      setCart(updatedCart);
    } else {
      setCart((prevCart) => [...prevCart, { ...id, quantity: 1 }]);
    }
  };

  const removeToCart = (product) => {
    const existingProduct = cart.find((p) => p.id === product.id);

    if (existingProduct) {
      const updatedCart = cart.map((p) =>
        p.id === product.id ? { ...p, quantity: p.quantity - 1 } : p
      );
      setCart(updatedCart);
    }
  };


  const removeFromCart = (id) => {
    const updatedCart = cart.filter((product) => product.id !== id);
    setCart(updatedCart);
  };
  
  const removeAllItems = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, removeToCart,removeAllItems }}>
      {children}
    </CartContext.Provider>
  )
}
