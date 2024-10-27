import searchBarIcon from "../assets/icons/search-icon.jpg";
import notificationIcon from "../assets/icons/notification-icon.jpg";
import profileIcon from "../assets/icons/netflix-profile-icon.png";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogoutBtn = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        navigate("/error");
      });
  };

  return (
    <div className="relative bg-gray-600">
      <div className="w-full h-16 bg-gradient-to-b from-black/80">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <div>
              <img
                className="
                    sm:w-48 sm:mx-12  
                    md:w-36 md:mx-16 
                    xl:mx-12"
                alt="netflix-logo"
                src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
              />
            </div>
            <div className="flex gap-5 text-white font-semibold">
              <p>Home</p>
              <p>TV Shows</p>
              <p>Movies</p>
              <p>New & Popular</p>
              <p>My List</p>
            </div>
          </div>
          <div className="flex gap-1 items-center mx-2">
            <div>
              <img
                className="w-9 mr-2 rounded-lg cursor-pointer"
                src={searchBarIcon}
                alt="search-icon"
              />
            </div>
            <img
              className="w-9 mr-2 rounded-lg cursor-pointer"
              src={notificationIcon}
              alt="notification-icon"
            />
            <img
              className="w-9 rounded-md cursor-pointer"
              src={profileIcon}
              alt="netflix-profile-icon"
            />
            {/* <img className="w-6 rounded-full focus-visible:" src={downArrowIcon} alt="down-arrow-icon"/> */}
            <button
              className="mx-2 text-white font-semibold cursor-pointer"
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
