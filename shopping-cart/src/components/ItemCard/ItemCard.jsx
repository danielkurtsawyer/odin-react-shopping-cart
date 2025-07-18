import styles from "./itemCard.module.css";
import addIcon from "../../assets/add.svg";
import removeIcon from "../../assets/remove.svg";
import { useState } from "react";

function ItemCard({ title, price, image }) {
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
          onChange={(event) => {
            if (event.target.value >= 0) {
              setQuantity(event.target.value);
            }
          }}
        />
        <img src={addIcon} alt="+" onClick={() => setQuantity(quantity + 1)} />
      </div>
      <button>Add to Cart</button>
    </div>
  );
}

export default ItemCard;
