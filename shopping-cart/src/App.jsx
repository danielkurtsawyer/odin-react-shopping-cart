import NavBar from "./components/Navbar/NavBar";
import { Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <NavBar itemsInCart={0} />
      <Outlet />
    </>
  );
}

export default App;
