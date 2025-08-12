import styles from "./cartItemCard.module.css";
import addIcon from "../../assets/add.svg";
import removeIcon from "../../assets/remove.svg";
import { useState } from "react";
import PropTypes from "prop-types";

function CartItemCard({ product, numItem, updateCart, removeFromCart }) {
  const [quantity, setQuantity] = useState(numItem);
  return (
    <div className={styles.cartItemCardContainer}>
      <img
        className={styles.itemCardImage}
        src={product.image}
        alt={product.title}
      />
      <div className={styles.itemCardTextContainer}>
        <div className={styles.itemCardTitle}>{product.title}</div>
        <div className={styles.itemCardDescription}>{product.description}</div>
      </div>

      <div className={styles.itemCardPriceContainer}>
        <div className={styles.itemCardPrice}>
          ${quantity && (product.price * quantity).toFixed(2)}
        </div>
        <div className={styles.itemCardQuantity}>
          <img
            src={removeIcon}
            alt="-"
            onClick={() => {
              if (quantity > 1) {
                setQuantity(+quantity - 1);
                updateCart(product.id, quantity - 1);
              }
            }}
          />
          <input
            type="number"
            value={quantity}
            min="0"
            name="quantity"
            onChange={(event) => {
              if (event.target.value === 0 || event.target.value === "") {
                setQuantity("");
              } else if (event.target.value < 0) {
                setQuantity(1);
              } else if (event.target.value >= 0) {
                setQuantity(parseInt(event.target.value));
                updateCart(product.id, quantity + parseInt(event.target.value));
              }
            }}
          />
          <img
            src={addIcon}
            alt="+"
            onClick={() => {
              setQuantity(+quantity + 1);
              updateCart(product.id, quantity + 1);
            }}
          />
        </div>
        <button onClick={() => removeFromCart(product.id)}>
          Remove From Cart
        </button>
      </div>
    </div>
  );
}

CartItemCard.propTypes = {
  product: PropTypes.object.isRequired,
  numItem: PropTypes.number.isRequired,
  updateCart: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
};

export default CartItemCard;
