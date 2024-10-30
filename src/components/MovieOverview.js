const MovieOverview = ({ overview }) => {
  return (
    <div>
      <div className="overflow-hidden transition-all duration-500 ease-in-out max-w-96 opacity-100">
        <p className="mt-4 text-white text-sm">{overview}</p>
      </div>
    </div>
  );
};

export default MovieOverview;
