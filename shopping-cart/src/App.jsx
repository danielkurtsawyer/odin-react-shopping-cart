import NavBar from "./components/Navbar/NavBar";
import { Outlet } from "react-router-dom";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const cart = [];

  useEffect(() => {
    fetch("https://fakestoreapi.com/products", { mode: "cors" })
      .then((response) => {
        if (response.status >= 400) {
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
      <NavBar itemsInCart={0} />
      <Outlet context={{ cart, products, loading, error }} />
    </>
  );
}

export default App;
