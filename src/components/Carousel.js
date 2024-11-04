import React, { useState, useEffect } from "react";

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!touchStartX) return;
    const touchEndX = e.touches[0].clientX;
    const distance = touchStartX - touchEndX;

    // Swipe threshold to detect left or right swipe
    if (distance > 50) {
      nextSlide();
      setTouchStartX(null);
    } else if (distance < -50) {
      prevSlide();
      setTouchStartX(null);
    }
  };

  // Center the carousel on the middle item on mobile screens
  useEffect(() => {
    if (window.innerWidth < 768) {
      setCurrentIndex(Math.floor(items.length / 2));
    }
  }, [items.length]);

  // Darker color palette to suit a black-themed website
  const colors = [
    "bg-gray-800",
    "bg-gray-700",
    "bg-gray-600",
    "bg-gray-500",
    "bg-gray-400",
  ];

  return (
    <div className="relative flex flex-col items-center justify-center w-full px-4 space-y-10 md:space-y-20">
      {/* Carousel Container */}
      <div
        className="flex items-center space-x-4 md:space-x-24 overflow-hidden w-full md:w-auto"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        {/* Left Arrow (Hidden on Mobile) */}
        <button
          onClick={prevSlide}
          className="hidden md:block text-5xl text-gray-400 hover:text-gray-300"
        >
          &#10094;
        </button>

        {/* Carousel Items */}
        <div className="flex items-center space-x-4">
          {items?.map((item, index) => {
            const isCurrent = index === currentIndex;

            return (
              <div
                key={index}
                className={`transition-all duration-500 rounded-lg flex items-center justify-center 
                  ${
                    isCurrent
                      ? "w-40 h-56 md:w-56 md:h-72"
                      : "w-6 h-40 md:w-9 md:h-56"
                  } 
                  ${colors[index % colors.length]} text-white p-4 shadow-lg`}
              >
                {isCurrent && (
                  <p className="text-center text-sm md:text-lg font-semibold transition-opacity duration-500 delay-1000 ease-in-out opacity-100 transform scale-95">
                    {item}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Arrow (Hidden on Mobile) */}
        <button
          onClick={nextSlide}
          className="hidden md:block text-5xl text-gray-400 hover:text-gray-300"
        >
          &#10095;
        </button>
      </div>

      {/* Dots */}
      <div className="flex space-x-2">
        {items?.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`cursor-pointer w-2 h-2 md:w-3 md:h-3 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-gray-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
