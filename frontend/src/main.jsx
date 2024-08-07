import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./home/home.jsx";
import MyOrder from "./screen/myOrder.jsx";
import Signup from "./screen/signUp.jsx";
import Login from "./screen/login.jsx";
import MyCart from "./screen/myCart.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="CreatUser" element={<Signup />} />
      <Route path="MyOrder" element={<MyOrder />} />
      <Route path="LogIn" element={<Login />} />
      <Route path="MyCart" element={<MyCart />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
