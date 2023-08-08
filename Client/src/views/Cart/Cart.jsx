import "./Cart.css"; // Archivo CSS para estilos
import CardCart from '../../components/CardCart/CardCart'

const Cart = () => {


  return (
    <div className="carrito-container">
      <h1>Carrito de Compras</h1>
      <CardCart />
    </div>
  );
};

export default Cart;
