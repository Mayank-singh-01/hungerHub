import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./home/footer.jsx";
import Header from "./home/header.jsx";
import { CartProvider } from "./components/contextReducer.jsx";

function App() {
  return (
    <CartProvider>
      <Header />
      <Outlet />
      <Footer />
    </CartProvider>
  );
}

export default App;
