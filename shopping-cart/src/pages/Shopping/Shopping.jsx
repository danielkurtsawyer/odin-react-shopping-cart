import styles from "./shopping.module.css";
import Shop from "../../components/Shop/Shop";
import { useOutletContext } from "react-router-dom";

function Shopping() {
  const context = useOutletContext();
  return (
    <div className={styles.contentContainer}>
      <h1 className={styles.shoppingHeading}>Shop Our Collection</h1>
      {context.loading && <p>Loading...</p>}
      {context.error && <p>{context.error}</p>}
      {!context.loading && !context.error && (
        <Shop products={context.products} addToCart={context.addToCart} />
      )}
    </div>
  );
}

export default Shopping;
