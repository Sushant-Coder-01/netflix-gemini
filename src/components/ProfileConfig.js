import { signOut } from "firebase/auth";
import { changeLanguage } from "../redux/configSlice";
import { auth } from "../utils/firebase";
import { SUPPORTED_LANGUAGES } from "../utils/constants";
import { lang } from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";

const ProfileConfig = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);

  const handleLogoutBtn = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {});
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };
  return (
    <div className="absolute w-[160px] h-44 px-5 py-6 top-16 right-9 rounded-sm bg-gray-400/80 bg-gradient-to-t from-black/70">
      <div className="flex flex-col items-start space-y-3">
        <div>
          <select
            className="text-white px-2 py-1 rounded-sm bg-gray-800 p-2 border border-red-700 focus:outline-none cursor-pointer"
            onClick={handleLanguageChange}
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.identifier} value={lang.identifier}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
        <button className="hidden sm:inline-block text-white text-sm md:text-base lg:text-lg">
          {lang[langKey].profileSettings}
        </button>
        <button
          className="hidden sm:inline-block text-white text-sm md:text-base lg:text-lg"
          onClick={handleLogoutBtn}
        >
          {lang[langKey].logout}
        </button>
      </div>
    </div>
  );
};

export default ProfileConfig;
