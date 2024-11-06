import { signOut } from "firebase/auth";
import { changeLanguage } from "../redux/configSlice";
import { auth } from "../utils/firebase";
import { SUPPORTED_LANGUAGES } from "../utils/constants";
import { lang } from "../utils/languageConstants";
import { useDispatch } from "react-redux";

const ProfileConfig = ({langKey}) => {
  const handleLogoutBtn = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {});
  };

  const dispatch = useDispatch();

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="absolute w-40 h-40 sm:w-48 md:w-52 px-4 py-4 top-16 right-4 md:right-8 rounded-md bg-gray-700 bg-gradient-to-t from-black/70 shadow-lg">
      <div className="flex flex-col items-center space-y-3 pt-5">
        {/* Language Selection */}
        <div>
          <select
            className="text-white px-2 py-1 rounded-md bg-gray-800 border border-red-700 focus:outline-none cursor-pointer text-sm sm:text-sm md:text-base"
            onChange={handleLanguageChange}
            value={langKey}
          >
            {SUPPORTED_LANGUAGES.map((language) => (
              <option key={language.identifier} value={language.identifier}>
                {language.name}
              </option>
            ))}
          </select>
        </div>

        {/* Logout Button */}
        <button
          className="text-white text-md sm:text-sm md:text-base lg:text-lg"
          onClick={handleLogoutBtn}
        >
          {lang[langKey].logout}
        </button>
      </div>
    </div>
  );
};

export default ProfileConfig;
