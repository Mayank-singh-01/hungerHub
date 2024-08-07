import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faOpencart } from "@fortawesome/free-brands-svg-icons";
import "./app.css";
import { useDispatchCart, useCart } from "../ContextReducer/ContextReducer.jsx";

const Card = ({ foodItem, options }) => {
  const data = useCart();
  const priceRef = useRef();
  const priceOptions = Object.keys(options);
  const dispatch = useDispatchCart();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  const handleAddToCart = async () => {
    const price = qty * parseInt(options[size]);
    await dispatch({
      type: "ADD",
      id: foodItem._id,
      name: foodItem.name,
      price: price,
      qty: qty,
      size: size,
      img: foodItem.img,
    });
  };

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <div className="w-full bg-gray-100 text-teal-500 max-w-xs xl:m-5 lg:m-5 md:m-5 shadow-xl rounded-xl">
      <img
        className="w-full h-48 rounded-t-xl object-cover"
        src={foodItem.img}
        alt="Card image"
        style={{ width: "400px" }}
      />
      <div className="pt-2 text-center font-semibold text-red-700 font-serif text-xl">
        {foodItem.name || "Card title"}
      </div>
      <div className="pt-3 flex font-bold justify-evenly">
        <div>
          <label htmlFor="quantity" className="block text-gray-700 sr-only">
            Quantity
          </label>
          <select
            id="quantity"
            className="select-style"
            aria-label="Select quantity"
            onChange={(e) => setQty(parseInt(e.target.value))}
          >
            {Array.from(Array(6), (e, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="size" className="block text-gray-700 sr-only">
            Size
          </label>
          <select
            ref={priceRef}
            id="size"
            className="select-style"
            onChange={(e) => setSize(e.target.value)}
          >
            {priceOptions.map((data) => (
              <option key={data} value={data}>
                {data}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button
            className="border-2 font-bold bg-white active:text-white active:bg-teal-500 border-teal-500 rounded-lg px-2 py-1 flex items-center"
            aria-label="Add to cart"
            onClick={handleAddToCart}
          >
            Add to
            <FontAwesomeIcon
              icon={faOpencart}
              className="ml-1"
              style={{ width: "20px", height: "20px" }}
            />
          </button>
        </div>
      </div>
      <div>
        <p className="text-lg font-bold text-center text-teal-500 pb-3">
          Price : ₹{qty * parseInt(options[size])}/-
        </p>
      </div>
    </div>
  );
};

export default Card;
