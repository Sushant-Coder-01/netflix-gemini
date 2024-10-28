import { NETFLIX_LOGO } from "../utils/constants";

const Header = () => {
  return (
    <div>
      <div className="absolute inset-0 flex my-2 sm:my-4 md:my-6 lg:my-7 2xl:my-8 ">
        <div className="w-32 h-16 bg-gradient-to-l from-black/70 to-transparent sm:ml-4 md:ml-8 lg:ml-8 xl:ml-20 2xl:w-36 2xl:ml-20"></div>
        <div className="w-32 h-16 bg-gradient-to-r from-black/70 to-transparent sm:w-36 md:w-40 lg:w-48 xl:w-56 2xl:w-36"></div>
      </div>

      <div
        className="absolute w-48 mx-5 bg-gradient-to-radial from-black
                sm:w-48 sm:mx-12 sm:my-2 
                md:w-52 md:mx-16 md:my-3 
                lg:my-5 xl:mx-32 xl:my-5"
      >
        <img alt="netflix-logo" src={NETFLIX_LOGO} />
      </div>
    </div>
  );
};

export default Header;
