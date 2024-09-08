import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchengin } from "@fortawesome/free-brands-svg-icons";

const Carousel = ({ images, setSearchTerm }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchTerm, setSearchTermLocal] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2200);

    return () => clearInterval(interval);
  }, [images.length]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTermLocal(value);
    if (value === "") {
      setSearchTerm(""); // Reset search term when input is empty
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(searchTerm);
  };

  const handlePrevClick = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="relative w-screen mt-14 h-[260px] sm:h-[460px] flex justify-center ">
      <div className="absolute w-[60%] sm:w-[45%] z-10 top-14 sm:top-28">
        <form onSubmit={handleSearchSubmit} className="relative flex">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="flex-grow p-1 sm:p-2 text-gray-700 bg-slate-50 border rounded-full border-none focus:outline-none"
            aria-label="Search"
          />
          <button
            type="submit"
            className=" absolute right-3 sm:right-5 top-1 sm:top-2 text-slate-700"
            aria-label="Submit search"
          >
            <FontAwesomeIcon
              icon={faSearchengin}
              style={{ width: "15px", height: "15px" }}
            />
          </button>
        </form>
      </div>

      <div className="overflow-hidden relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image}
              alt={`Slide ${index}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* <button
        onClick={handlePrevClick}
        className="absolute top-1/2 left-10 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-2 rounded-full"
        aria-label="Previous slide"
      >
        &#10094;
      </button>

      <button
        onClick={handleNextClick}
        className="absolute top-1/2 right-10 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-2 rounded-full"
        aria-label="Next slide"
      >
        &#10095;
      </button> */}
    </div>
  );
};

export default Carousel;
