import App from "./App.jsx";
import Home from "./pages/Home/Home.jsx";
import Shopping from "./pages/Shopping/Shopping.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "shop", element: <Shopping /> },
      { path: "cart", element: <Cart /> },
    ],
  },
];

export default routes;
