import styles from "./navbar.module.css";
import "./navbar.css";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <div className={styles.navbar}>
      <span>ShoppingCentral</span>
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
    </div>
  );
}
export default NavBar;
