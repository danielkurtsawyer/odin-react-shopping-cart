import styles from "./navbar.module.css";
import "./navbar.css";
import { NavLink, Link } from "react-router-dom";

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
        <NavLink className={styles.navlink} to="cart">
          Cart ({itemsInCart})
        </NavLink>
      </div>
    </header>
  );
}
export default NavBar;
