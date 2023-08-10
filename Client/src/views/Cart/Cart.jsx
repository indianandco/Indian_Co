import "./Cart.css"; // Archivo CSS para estilos
import CardCart from './CardCart/CardCart'

const Cart = () => {


  return (
    <div className="carrito-container">
      <h1>Carrito de Compras</h1>
      <CardCart />
      <div className="d-grip gap-2">
        <button className="btn btn-primary boton-comprar">COMPRAR</button>
      </div>
    </div>
  );
};

export default Cart;
