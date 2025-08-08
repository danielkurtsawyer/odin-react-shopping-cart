import styles from "./shop.module.css";
import ItemCard from "../ItemCard/ItemCard";
import PropTypes from "prop-types";

function Shop({ products, updateCart }) {
  return (
    <div className={styles.shopContainer}>
      {products &&
        products.map((product) => {
          return (
            <ItemCard
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              image={product.image}
              updateCart={updateCart}
            />
          );
        })}
    </div>
  );
}

Shop.propTypes = {
  products: PropTypes.object.isRequired,
};

export default Shop;
