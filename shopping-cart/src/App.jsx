import NavBar from "./components/Navbar/NavBar";
import { Outlet } from "react-router-dom";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const cartItems = cart.reduce(
    (accumulator, object) => accumulator + object.quantity,
    0
  );

  function getCartItemIndex(id) {
    return cart.findIndex((object) => object.id === id);
  }

  function addToCart(id, quantity) {
    if (quantity > 0) {
      const index = getCartItemIndex(id);
      // if the cart doesn't have the item already
      if (index < 0) {
        setCart([...cart, { id: id, quantity: quantity }]);
      } else {
        // the item is already in the cart
        cart[index] = {
          ...cart[index],
          quantity: cart[index].quantity + quantity,
        };
        setCart([...cart]);
      }
    }
  }

  function updateCart(id, quantity) {
    if (quantity > 0) {
      const index = getCartItemIndex(id);

      cart[index] = {
        ...cart[index],
        quantity: quantity,
      };
      setCart([...cart]);
    }
  }

  function removeFromCart(id) {
    const index = getCartItemIndex(id);
    cart.splice(index, 1);
    setCart([...cart]);
  }

  useEffect(() => {
    fetch("https://fakestoreapi.com/products", { mode: "cors" })
      .then((response) => {
        if (response.status >= 400) {
          console.log("error");
          throw new Error("server error");
        }
        return response.json();
      })
      .then((response) => setProducts(response))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <NavBar itemsInCart={cartItems} />
      <Outlet
        context={{
          updateCart,
          addToCart,
          removeFromCart,
          products,
          cart,
          loading,
          error,
        }}
      />
    </>
  );
}

export default App;
