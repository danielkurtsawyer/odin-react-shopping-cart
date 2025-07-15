import styles from "./cart.module.css";
function Cart() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Your Cart</h1>
      <p className={styles.cartText}>
        This is where your cart items would show up, but we aren&apos;t going to
        implement this logic here
      </p>
    </div>
  );
}

export default Cart;
