import styles from "./shopping.module.css";
import Shop from "../../components/Shop/Shop";
import { useOutletContext } from "react-router-dom";

function Shopping() {
  const context = useOutletContext();
  console.log(context);
  return (
    <div className={styles.contentContainer}>
      <h1 className={styles.shoppingHeading}>Shop Our Collection</h1>
      {context.loading && <p>Loading...</p>}
      {context.error && <p>{context.error}</p>}
      {!context.loading && !context.error && (
        <Shop products={context.products} />
      )}
    </div>
  );
}

export default Shopping;
