import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import notificationIcon from "../assets/icons/notification-icon.jpg";
import profileIcon from "../assets/icons/netflix-profile-icon.png";
import { BELL_ICON, HOME_ICON, NETFLIX_LOGO } from "../utils/constants";
import { lang } from "../utils/languageConstants";
import ProfileConfig from "./ProfileConfig";

const Header = () => {
  const [profileConfig, setProfileConfig] = useState(false);
  const [isOnGptSearchPage, setIsOnGptSearchPage] = useState(false);

  const langKey = useSelector((store) => store.config.lang);
  const location = useLocation();

  useEffect(() => {
    // Set the state based on the current location
    setIsOnGptSearchPage(location.pathname === "/browse/gpt-search-page");
  }, [location.pathname]);

  const handleProfileConfigToggle = () => {
    setProfileConfig(!profileConfig);
  };

  const handleToggleSearchPage = () => {
    // This logic will toggle the search page and navigate accordingly
    const route = isOnGptSearchPage ? "/browse" : "/browse/gpt-search-page";
    return route;
  };

  return (
    <div className="absolute z-30 w-full">
      <div className="w-full bg-black bg-gradient-to-t from-white/30 md:bg-transparent h-16 md:h-16 md:bg-gradient-to-b md:from-black fixed">
        <div className="flex justify-between items-center px-2 py-2 md:py-0 md:px-6">
          {/* Left Section - Logo and Navigation Links */}
          <div className="flex items-center gap-2">
            {/* Logo */}
            <Link to={"/browse"}>
              <div>
                <img
                  className="w-32 sm:w-28 md:w-36 lg:w-40"
                  alt="netflix-logo"
                  src={NETFLIX_LOGO}
                />
              </div>
            </Link>

            {/* Navigation Links */}
            <div className="hidden lg:flex gap-5 text-white font-semibold text-sm md:text-base">
              <Link to="/browse">
                <p>{lang[langKey].navHomeBtn}</p>
              </Link>
              <p className="cursor-pointer">{lang[langKey].navTvShowBtn}</p>
              <p className="cursor-pointer">{lang[langKey].navMoviesBtn}</p>
              <p className="cursor-pointer">
                {lang[langKey].navNewAndPopularBtn}
              </p>
              <p className="cursor-pointer">{lang[langKey].navMyListBtn}</p>
            </div>
          </div>

          {/* Right Section - Icons and Logout */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to={handleToggleSearchPage()}
              className="flex items-center bg-gray-800/50 px-1 md:p-1 rounded-lg border-2 border-red-600"
            >
              <p className="text-xs sm:text-sm text-white cursor-pointer ml-2 mr-2">
                {isOnGptSearchPage
                  ? lang[langKey].navHomeBtn
                  : lang[langKey].gptSearchBtnPlaceholder}{" "}
              </p>
              <span className="text-xl text-white cursor-pointer ml-1 mr-3">
                {isOnGptSearchPage ? (
                  <img alt="home-icon" src={HOME_ICON} />
                ) : (
                  "⌕"
                )}
              </span>
            </Link>

            <img
              className="hidden md:inline-block w-5 sm:w-6 md:w-7 cursor-pointer"
              src={BELL_ICON || notificationIcon}
              alt="notification-icon"
            />

            <img
              className="w-8 sm:w-8 md:w-8 rounded-sm cursor-pointer"
              src={profileIcon}
              alt="netflix-profile-icon"
              onClick={handleProfileConfigToggle}
            />

            <div onClick={handleProfileConfigToggle}>
              <p
                className={`hidden md:block text-white text-lg sm:text-xl cursor-pointer transition-transform duration-300 ease-in-out ${
                  profileConfig ? "-rotate-90" : "rotate-90"
                }`}
              >
                ⏵
              </p>
            </div>

            {profileConfig && (
              <div className="absolute top-0 right-0 md:right-0 z-40">
                <ProfileConfig />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
