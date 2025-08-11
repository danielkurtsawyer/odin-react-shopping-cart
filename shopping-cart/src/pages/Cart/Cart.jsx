import styles from "./cart.module.css";
import CartItemCard from "../../components/CartItemCard/CartItemCard";
import { useOutletContext } from "react-router-dom";

function Cart() {
  const context = useOutletContext();
  const cart = context.cart;
  const products = context.products;
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Your Cart</h1>
      {cart.map((item) => (
        <CartItemCard
          key={item.id}
          product={products[item.id - 1]}
          numItem={item.quantity}
          updateCart={context.updateCart}
          removeFromCart={context.removeFromCart}
        />
      ))}
      <h1 className={styles.totalPrice}>Total</h1>
    </div>
  );
}

export default Cart;
