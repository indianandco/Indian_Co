/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

// eslint-disable-next-line react/prop-types
export const CartProvider = ({ children }) => {

  const [cart, setCart] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const loadCartData = () => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (savedCart && savedCart.length > 0) {
      setCart(savedCart);
    }
  }; //función que actualiza el valor de cart al valor del localStorage

  const saveCartData = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }; //función que actualiza el LocalStorage al valor de cart
  console.log(cart);

  const addProduct = (product) => {
    const existingProduct = cart.find((p) => p._id === product._id);
    let existingProductFragance = true

    if (product.fragance !== "--") {
      existingProductFragance = cart.find(p => p.fragance === product.fragance);
    }

    if (existingProduct && existingProductFragance) {
      const updatedCart = cart.map((p) =>
        (p._id === product._id && p.fragance === product.fragance) ? p.quantity < p.stock ? { ...p, quantity: p.quantity + product.quantity } : p : p
      );
      setCart(updatedCart);
    } else {
      setCart((prevCart) => [...prevCart, { ...product }]);
    }

  };

  const removeProduct = (item) => {

    const existingProduct = cart.find((product) => product._id === item._id);
    let existingProductFragance

    if (item.fragance !== "--") {
      existingProductFragance = cart.find(p => p.fragance === item.fragance);
    }
    else {
      existingProductFragance = true
    }

    if (existingProduct && existingProductFragance) {
      const updatedCart = cart.map((product) =>
        (item._id === product._id && item.fragance === product.fragance) ? { ...product, quantity: product.quantity - 1 } : product
      );
      setCart(updatedCart);
    }
  };

  const removeStack = (item) => {
    const updatedCart = cart.filter((product) => product._id !== item._id || product.fragance !== item.fragance);
    setCart(updatedCart);
    if (updatedCart.length === 0) {
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  //Calculo del subtotal de cada articulo:
  const calcTotalPerItem = (item) => {
    return item.price * item.quantity;
  };

  // Calculo total de la compra:
  const calcTotal = () => {
    const result = cart.reduce((total, item) => total + calcTotalPerItem(item), 0);
    return result
  };


  useEffect(() => {
    if (cart.length > 0) {
      saveCartData();
    }
  }, [cart])

  return (
    <CartContext.Provider value={{ addProduct, cart, loadCartData, removeProduct, removeStack, calcTotal, calcTotalPerItem }}>
      {children}
    </CartContext.Provider>
  )
}
