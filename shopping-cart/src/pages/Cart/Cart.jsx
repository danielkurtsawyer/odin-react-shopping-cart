import styles from "./cart.module.css";
import CartItemCard from "../../components/CartItemCard/CartItemCard";
import { useOutletContext } from "react-router-dom";

function Cart() {
  const context = useOutletContext();
  const cart = context.cart;
  const products = context.products;
  const totalPrice = cart.reduce(
    (accumulator, object) =>
      accumulator + object.quantity * products[object.id - 1].price,
    0
  );
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
      {cart.length > 0 ? (
        <div className={styles.totalPriceContainer}>
          <h1 className={styles.totalPriceHeading}>Total</h1>
          <p className={styles.totalPrice}>${totalPrice.toFixed(2)}</p>
        </div>
      ) : (
        <p className={styles.noItemsMessage}>
          Nothing&apos;s here. Shop to Add Items to Your Cart
        </p>
      )}
    </div>
  );
}

export default Cart;
