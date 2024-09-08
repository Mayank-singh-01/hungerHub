import React, { useEffect, useState } from "react";

const MyOrder = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch(
        "https://hungerhub-backend-f5g8.onrender.com/api/orders"
      );
      const data = await response.json();
      setOrders(data);
    };

    fetchOrders();
  }, []);

  return (
    <div className="flex flex-col min-h-screen mx-6 mt-16">
      <h2 className="text-3xl font-serif text-center text-teal-500 font-bold py-6">
        My Orders
      </h2>
      {orders.length === 0 ? (
        <div className="flex-grow flex justify-center">
          <p className="text-xl font-serif text-center text-red-700 font-bold mt-10">
            No orders yet!
          </p>
        </div>
      ) : (
        <div className="flex-grow">
          {orders.map((order, index) => (
            <div key={index} className="mb-4 border-b pb-2">
              <h3 className="text-xl text-center text-red-700 font-semibold">
                Order #{index + 1}
              </h3>
              <p className="text-teal-600">
                Date: {new Date(order.date).toLocaleString()}
              </p>
              <div>
                {order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center mb-2"
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      className="h-20 w-32 object-cover rounded"
                    />
                    <div className="flex flex-col flex-grow ml-4">
                      <h4 className="text-lg text-teal-600 font-serif font-bold">
                        {item.name}
                      </h4>
                      <p className="text-red-700">Quantity: {item.qty}</p>
                      <p className="text-red-700">Size: {item.size}</p>
                      <p className="text-red-700">Price: ₹{item.price}</p>
                    </div>
                  </div>
                ))}
                <p className="text-center text-teal-600 font-bold mb-5">
                  Total Amount: ₹{order.totalAmount}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrder;
