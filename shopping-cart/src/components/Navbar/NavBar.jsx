import styles from "./navbar.module.css";
import "./navbar.css";
import ShoppingCart from "../../assets/shopping cart.svg";
import { NavLink, Link } from "react-router-dom";
import PropTypes from "prop-types";

function NavBar({ itemsInCart }) {
  return (
    <header className={styles.navbar}>
      <Link className={styles.link} to="/">
        <div className={styles.companyInfo}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Shopping-cart-transparent-icon.png"
            alt="ShoppingCentral Logo"
          />
          <div className={styles.companyName}>ShoppingCentral</div>
        </div>
      </Link>

      <div className={styles.navlinks}>
        <NavLink className={styles.navlink} to="/">
          Home
        </NavLink>
        <NavLink className={styles.navlink} to="shop">
          Shop
        </NavLink>
        <NavLink className={`${styles.cart} cart`} to="cart">
          <img src={ShoppingCart} alt="Cart" />
          <span>({+itemsInCart})</span>
        </NavLink>
      </div>
    </header>
  );
}

NavBar.propTypes = {
  itemsInCart: PropTypes.number.isRequired,
};

export default NavBar;
