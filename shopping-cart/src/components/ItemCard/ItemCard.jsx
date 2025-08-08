import styles from "./itemCard.module.css";
import addIcon from "../../assets/add.svg";
import removeIcon from "../../assets/remove.svg";
import { useState } from "react";
import PropTypes from "prop-types";

function ItemCard({ id, title, price, image, updateCart }) {
  const [quantity, setQuantity] = useState(1);
  return (
    <div className={styles.itemCardContainer}>
      <img className={styles.itemCardImage} src={image} alt={title} />
      <div className={styles.itemCardTitle}>{title}</div>
      <div className={styles.itemCardPrice}>${price}</div>
      <div className={styles.itemCardQuantity}>
        <img
          src={removeIcon}
          alt="-"
          onClick={() => {
            if (quantity > 1) {
              setQuantity(quantity - 1);
            }
          }}
        />
        <input
          type="number"
          value={quantity}
          min="1"
          name="quantity"
          onChange={(event) => {
            if (event.target.value >= 0) {
              setQuantity(event.target.value);
            }
          }}
        />
        <img src={addIcon} alt="+" onClick={() => setQuantity(quantity + 1)} />
      </div>
      <button onClick={() => updateCart(id, quantity)}>Add to Cart</button>
    </div>
  );
}

ItemCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  updateCart: PropTypes.func.isRequired,
};

export default ItemCard;
