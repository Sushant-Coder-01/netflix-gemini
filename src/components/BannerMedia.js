import useMovieVideo from "../hooks/useMovieVideo";

const BannerMedia = ({ movieId }) => {
  const trailerVideo = useMovieVideo(movieId);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <iframe
        className="absolute top-0 left-0 w-full h-full object-cover scale-[1.5]"
        src={`https://www.youtube.com/embed/${trailerVideo?.key}?controls=0&showinfo=0&modestbranding=0&autoplay=1&mute=1&loop=1&playlist=${trailerVideo?.key}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        sandbox="allow-scripts allow-same-origin allow-presentation"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default BannerMedia;
