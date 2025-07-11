import styles from "./home.module.css";
function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.welcomeMessage}>
        Welcome to ShoppingCentral, your home for all your online shopping
        needs!
      </div>
      <img
        className={styles.homeImage}
        src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Shopping-cart-transparent-icon.png"
        alt=""
      />
    </div>
  );
}
export default Home;
