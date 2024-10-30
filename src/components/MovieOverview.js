const MovieOverview = ({ overview }) => {
  return (
    <div>
      <div className="overflow-hidden transition-all  ease-out max-w-96 opacity-100">
        <p className="text-white text-sm  ">{overview}</p>
        {console.log(process.env.KEY,"env")}
      </div>
    </div>
  );
};

export default MovieOverview;
