import React from "react";
import { useCart, useDispatchCart } from "../components/contextReducer.jsx";
import "./app.css";

const MyCart = () => {
  const items = useCart();
  const dispatch = useDispatchCart();

  const handleRemove = (item) => {
    dispatch({
      type: "REMOVE",
      id: item.id,
      name: item.name,
      size: item.size,
      price: item.price,
      img: item.img,
    });
  };

  const handleCheckout = async () => {
    const totalAmount = items.reduce(
      (total, item) => total + item.price * item.qty,
      0
    );
    const response = await fetch(
      "https://hungerhub-backend-f5g8.onrender.com/api/checkout",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items, totalAmount }),
      }
    );

    if (response.ok) {
      alert("Order placed successfully");
      // Clear the cart
      items.forEach((item) => handleRemove(item));
    } else {
      alert("Failed to place order");
    }
  };

  const totalAmount = items.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  return (
    <div className="flex flex-col min-h-screen mx-6 mt-16">
      <h2 className="text-3xl font-serif text-center text-teal-500 font-bold py-6">
        My Cart
      </h2>
      {items.length === 0 ? (
        <div className="flex-grow flex  justify-center">
          <p className="text-xl font-serif text-center text-red-700 font-bold mt-10">
            Your cart is empty!
          </p>
        </div>
      ) : (
        <div className="flex-grow">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center mb-4 border-b pb-2"
            >
              <img
                src={item.img}
                alt={item.name}
                className="h-20 w-32 object-cover rounded"
              />
              <div className="flex flex-col flex-grow ml-4">
                <h3 className="text-xl font-serif text-teal-600 font-semibold">
                  {item.name}
                </h3>
                <p className="text-red-700">Quantity: {item.qty}</p>
                <p className="text-red-700">Size: {item.size}</p>
                <p className="text-red-700">Price: ₹{item.price}</p>
              </div>
              <button
                onClick={() => handleRemove(item)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="flex justify-evenly py-12">
            <div className="mt-4 border-2 text-lg rounded-lg border-teal-500 px-4 pt-1 text-teal-600 font-bold">
              Total Amount: ₹{totalAmount}
            </div>
            <button
              onClick={handleCheckout}
              className="mt-4 bg-green-500 text-white px-6 py-2 rounded"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCart;
