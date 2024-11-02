const Shimmer = ({ type = "poster" }) => {
  if (type === "poster") {
    return (
      <div>
        <div className="absolute flex flex-wrap gap-4 p-4 mt-12 ml-60 z-30">
          {[...Array(16)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse w-36 sm:w-48 md:w-56 h-48 sm:h-72 md:h-80 bg-gray-700 rounded-md shadow-lg relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 opacity-30 rounded-md"></div>
              <div className="h-8 sm:h-10 bg-gray-600 mt-4 mx-4 rounded"></div>
              <div className="h-3 sm:h-4 bg-gray-600 mt-2 mx-4 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === "text") {
    return (
      <div className="animate-pulse p-4">
        <div className="w-1/2 h-6 bg-gray-600 mb-4 rounded"></div>
        <div className="w-3/4 h-4 bg-gray-600 mb-2 rounded"></div>
        <div className="w-3/5 h-4 bg-gray-600 mb-2 rounded"></div>
      </div>
    );
  }

  return null;
};

export default Shimmer;

export const MovieSuggestionsShimmer = () => {
  return (
    <div className="flex flex-col gap-4 animate-pulse ml-4 mr-4 md:ml-12 md:mr-12 mt-5">
      {/* Placeholder for the section title */}
      <div className="w-36 sm:w-56 h-5 bg-gray-300 shadow-lg mb-2 rounded"></div>
      <div className="flex gap-4 overflow-x-scroll">
        {/* Repeat the shimmer blocks for the number of movie cards you want to display */}
        {Array.from({ length: window.innerWidth < 768 ?  3 : 7 }).map((_, index) => (
          <div
            key={index}
            className="w-48 sm:w-56 md:w-72 h-48 sm:h-80 bg-gray-300 rounded-md shadow-lg relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 opacity-20 rounded-md"></div>
            <div className="h-24 sm:h-32 bg-gray-400 rounded-t-md"></div> {/* Simulate poster */}
            <div className="h-4 sm:h-6 bg-gray-400 mt-2 mx-2 rounded"></div> {/* Movie title */}
            <div className="h-2 sm:h-4 bg-gray-400 mt-1 mx-2 rounded w-3/4"></div> {/* Additional details */}
          </div>
        ))}
      </div>
    </div>
  );
};
