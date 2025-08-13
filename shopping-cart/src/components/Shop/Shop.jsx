import styles from "./shop.module.css";
import ItemCard from "../ItemCard/ItemCard";
import PropTypes from "prop-types";

function Shop({ products, addToCart }) {
  console.log(products);
  return (
    <div className={styles.shopContainer} data-testid="shop-container">
      {products &&
        products.map((product) => {
          return (
            <ItemCard
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              image={product.image}
              addToCart={addToCart}
            />
          );
        })}
    </div>
  );
}

Shop.propTypes = {
  products: PropTypes.object.isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default Shop;
