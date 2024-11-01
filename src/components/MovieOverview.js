const MovieOverview = ({ overview }) => {
  return (
    <div>
      <div className="overflow-hidden transform transition-all  ease-out w-[21%]">
        <p className="text-white text-sm line-clamp-3 ">{overview}</p>
      </div>
    </div>
  );
};

export default MovieOverview;
