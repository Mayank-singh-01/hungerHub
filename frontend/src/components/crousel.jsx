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
    <div className="relative w-screen mt-16 h-[280px] sm:h-[460px] ">
      <div className="absolute sm:w-[50%] left-1/2 transform -translate-x-1/2 z-10 top-12 sm:top-24">
        <form onSubmit={handleSearchSubmit} className="flex items-center">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="flex-grow p-2 text-gray-700 bg-white border rounded-l-full focus:outline-none"
            aria-label="Search"
          />
          <button
            type="submit"
            className="py-2 px-3 sm:px-5 bg-teal-500 text-white rounded-r-full hover:bg-teal-700 focus:outline-none"
            aria-label="Submit search"
          >
            <FontAwesomeIcon
              icon={faSearchengin}
              style={{ width: "22px", height: "22px" }}
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

      <button
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
      </button>
    </div>
  );
};

export default Carousel;
