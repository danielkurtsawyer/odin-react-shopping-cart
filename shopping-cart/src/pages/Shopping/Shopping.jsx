import styles from "./shopping.module.css";
import Shop from "../../components/Shop/Shop";

function Shopping() {
  return (
    <div className={styles.contentContainer}>
      <h1 className={styles.shoppingHeading}>Shop Our Collection</h1>
      <Shop />
    </div>
  );
}

export default Shopping;
