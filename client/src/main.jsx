import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import SingleProduct from "./pages/SingleProduct.jsx";
import NotFound from "./pages/Notfound.jsx";
import { Provider } from "react-redux";
import store from "./store.js";
import CartPage from "./pages/CartPage.jsx";
import CheckOutPage from "./pages/CheckOutPage.jsx";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<App />} />
      <Route path="product/:id" element={<SingleProduct />} />
      <Route path="cart" element={<CartPage />} />
      <Route path="checkout" element={<CheckOutPage />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={routes} />
      {/* <App /> */}
    </Provider>
  </React.StrictMode>
);
