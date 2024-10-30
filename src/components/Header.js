import notificationIcon from "../assets/icons/notification-icon.jpg";
import profileIcon from "../assets/icons/netflix-profile-icon.png";

import { BELL_ICON, HOME_ICON, NETFLIX_LOGO } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { changeGptSearchToggle } from "../redux/gptSlice";
import { lang } from "../utils/languageConstants";
import { useState } from "react";
import ProfileConfig from "./ProfileConfig";

const Header = () => {
  const [profileConfig, setProfileConfig] = useState(false);

  const dispatch = useDispatch();
  const gptSearchToggle = useSelector(
    (store) => store.gptSearchToggle.gptSearchToggleBtn
  );

  const handleGptSearchToggleBtn = () => {
    dispatch(changeGptSearchToggle());
  };

  const handleProfileConfigToggle = () => {
    setProfileConfig(!profileConfig);
  };

  const langKey = useSelector((store) => store.config.lang);

  return (
    <div className="absolute z-30">
      <div className="w-full h-16 sm:h-12 md:h-20 lg:h-16 xl:h-16 bg-gradient-to-b from-black fixed">
        <div className="flex justify-between items-center px-4 sm:px-6 lg:px-8">
          {/* Left Section - Logo and Navigation Links */}
          <div className="flex items-center gap-2">
            {/* Logo */}
            <div>
              <img
                className="w-40 mr-5 sm:w-28 md:w-36 lg:w-36 xl:w-40"
                alt="netflix-logo"
                src={NETFLIX_LOGO}
              />
            </div>

            {/* Navigation Links */}
            <div className="hidden sm:flex gap-5 text-white font-semibold text-sm md:text-base">
              <p className="cursor-pointer">{lang[langKey].navHomeBtn}</p>
              <p className="cursor-pointer">{lang[langKey].navTvShowBtn}</p>
              <p className="cursor-pointer">{lang[langKey].navMoviesBtn}</p>
              <p className="cursor-pointer">
                {lang[langKey].navNewAndPopularBtn}
              </p>
              <p className="cursor-pointer">{lang[langKey].navMyListBtn}</p>
            </div>
          </div>

          {/* Right Section - Icons and Logout */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-4">
              <button
                className="flex items-center bg-gray-800/50 p-1 rounded-lg border-2 border-red-600"
                onClick={handleGptSearchToggleBtn}
              >
                {!gptSearchToggle ? (
                  <>
                    <p className="text-lg text-white cursor-pointer ml-2 mr-2">
                      {lang[langKey].gptSearchBtnPlaceholder}
                    </p>
                    <span className="text-xl text-white cursor-pointer ml-1 mr-3">
                      {/* ⌕ */}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-xl text-white">
                      <img
                        className="w-6 h-6"
                        alt="home-icon"
                        src={HOME_ICON}
                      />
                    </span>
                  </>
                )}
              </button>

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
            <div onClick={handleProfileConfigToggle}>
              {profileConfig ? (
                <p className="text-white text-xl cursor-pointer transition-transform duration-300 ease-in-out transform rotate-90">
                  {/* ⏵ */}
                </p>
              ) : (
                <p className="text-white text-xl cursor-pointer transition-transform duration-300 ease-in-out transform -rotate-90">
                  {/* ⏵ */}
                </p>
              )}
            </div>
            {profileConfig ? null : <ProfileConfig />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
