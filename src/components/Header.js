import notificationIcon from "../assets/icons/notification-icon.jpg";
import profileIcon from "../assets/icons/netflix-profile-icon.png";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { BELL_ICON, NETFLIX_LOGO } from "../utils/constants";

const Header = () => {
  const handleLogoutBtn = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {});
  };

  return (
    <div className="absolute z-10">
      <div className="w-full h-16 sm:h-12 md:h-16 lg:h-16 xl:h-16 bg-gradient-to-b from-black fixed">
        <div className="flex justify-between items-center px-4 sm:px-6 lg:px-8">
          {/* Left Section - Logo and Navigation Links */}
          <div className="flex items-center gap-2">
            {/* Logo */}
            <div>
              <img
                className="w-40 sm:w-28 md:w-36 lg:w-36 xl:w-40"
                alt="netflix-logo"
                src={NETFLIX_LOGO}
              />
            </div>

            {/* Navigation Links */}
            <div className="hidden sm:flex gap-3 text-white font-semibold text-sm md:text-base">
              <p>Home</p>
              <p>TV Shows</p>
              <p>Movies</p>
              <p>New & Popular</p>
              <p>My List</p>
            </div>
          </div>

          {/* Right Section - Icons and Logout */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-3">
              <p className="text-4xl text-white cursor-pointer"> ⌕</p>
              <img
                className="w-6 sm:w-7 md:w-8 lg:w-7 cursor-pointer"
                src={BELL_ICON || notificationIcon}
                alt="notification-icon"
              />
              <img
                className="w-6 sm:w-7 md:w-8 lg:w-9 rounded-sm cursor-pointer"
                src={profileIcon}
                alt="netflix-profile-icon"
              />
            </div>
            <p className="rotate-90 text-white text-xl cursor-pointer">⏵</p>

            {/* Logout Button */}
            <button
              className="hidden sm:inline-block text-white font-semibold text-sm md:text-base lg:text-lg"
              onClick={handleLogoutBtn}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
