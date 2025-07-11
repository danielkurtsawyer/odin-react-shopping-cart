import styles from "./navbar.module.css";
import "./navbar.css";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <header className={styles.navbar}>
      <div className={styles.companyInfo}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Shopping-cart-transparent-icon.png"
          alt=""
        />
        <span className={styles.companyName}>ShoppingCentral</span>
      </div>
      <div className={styles.navlinks}>
        <NavLink className={styles.navlink} to="/">
          Home
        </NavLink>
        <NavLink className={styles.navlink} to="shop">
          Shop
        </NavLink>
        <NavLink className={styles.navlink} to="cart">
          Cart
        </NavLink>
      </div>
    </header>
  );
}
export default NavBar;
