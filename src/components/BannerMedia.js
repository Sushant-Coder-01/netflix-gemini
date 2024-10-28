import useMovieVideo from "../hooks/useMovieVideo";

const BannerMedia = ({ movieId }) => {
  const trailerVideo = useMovieVideo(movieId);

  return (
    <div className="absolute w-screen overflow-hidden">
      <iframe
        className="w-screen aspect-video"
        src={
          "https://www.youtube.com/embed/" +
          trailerVideo?.key +
          "?si=Sh-f0iq9pI3vVRxR&autoplay=1&mute=1&loop=1"
        }
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
};

export default BannerMedia;
