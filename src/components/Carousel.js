// Carousel.js
import React, { useState } from "react";

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  // Darker color palette to suit a black-themed website
  const colors = [
    "bg-gray-800",
    "bg-gray-700",
    "bg-gray-600",
    "bg-gray-500",
    "bg-gray-400",
  ];

  return (
    <div className="relative flex flex-col items-center justify-center w-full space-y-20">
      {/* Carousel Container */}
      <div className="flex items-center space-x-24 overflow-hidden">
        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="text-5xl text-gray-400 hover:text-gray-300"
        >
          &#10094;
        </button>

        {/* Carousel Items */}
        <div className="flex items-center space-x-4">
          {items.map((item, index) => {
            const isCurrent = index === currentIndex;

            return (
              <div
                key={index}
                className={`transition-all duration-500 rounded-lg flex items-center justify-center 
                  ${isCurrent ? "w-56 h-72" : "w-9 h-56"} 
                  ${colors[index % colors.length]} text-white p-4 shadow-lg`}
              >
                {isCurrent && (
                  <p
                    className="text-center text-lg font-semibold transition-opacity duration-500 delay-1000 ease-in-out opacity-100 transform scale-95"
                  >
                    {item}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="text-5xl text-gray-400 hover:text-gray-300"
        >
          &#10095;
        </button>
      </div>

      {/* Dots */}
      <div className="flex space-x-2">
        {items.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`cursor-pointer w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-gray-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
