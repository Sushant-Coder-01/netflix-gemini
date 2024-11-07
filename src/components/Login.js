import { useRef, useState } from "react";
import HomePageLogo from "./LoginPageHeader";
import {
  validateFormDataForSignIn,
  validateFormDataForSignUp,
} from "../utils/validate";
import { LOGIN_BACKGROUND_IMAGE, USER_AVATAR } from "../utils/constants";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { addUser } from "../redux/userSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const [isSignIn, setisSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState();

  const email = useRef(null);
  const password = useRef(null);
  const fullName = useRef(null);
  const userName = useRef(null);

  const dispatch = useDispatch();

  const handlerSignInBtn = () => {
    setisSignIn(!isSignIn);
  };

  const handleButtonClick = () => {
    const message = isSignIn
      ? validateFormDataForSignIn(
          email.current.value.trim(),
          password.current.value.trim()
        )
      : validateFormDataForSignUp(
          fullName.current.value.trim(),
          userName.current.value.trim(),
          email.current.value.trim(),
          password.current.value.trim()
        );
    setErrorMessage(message);

    if (message) return;

    if (!isSignIn) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed Up
          const user = userCredential.user;

          updateProfile(user, {
            displayName: fullName.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => setErrorMessage(error));
        })
        .catch((error) => {
          const errorCode = error.code;
          setErrorMessage(errorCode);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          setErrorMessage(errorCode);
        });
    }
  };

  return (
    <div className="relative w-full h-screen ">
      <div className="absolute w-full h-full overflow-hidden">
        <img
          className="absolute inset-0 w-full h-full object-cover"
          alt="background-img"
          src={LOGIN_BACKGROUND_IMAGE}
        />
      </div>
      <div className="absolute w-full h-full bg-black bg-opacity-50"></div>
      <HomePageLogo />
      <div
        className="relative w-11/12 sm:w-8/12 md:w-6/12 lg:w-5/12 xl:w-4/12 2xl:w-3/12 
                h-3/4 sm:h-4/5 md:h-5/6 p-4 sm:p-6 md:p-8
                bg-black bg-opacity-70 rounded-md top-1/2 left-1/2 
                transform -translate-x-1/2 -translate-y-1/2"
      >
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col p-4 text-white"
        >
          <h1 className="text-4xl font-medium my-5 mx-4">
            {isSignIn ? "Sign In" : "Sign Up"}
          </h1>
          {!isSignIn && (
            <>
              <input
                ref={fullName}
                type="text"
                placeholder="Full Name"
                className="p-3 my-3 mx-4 rounded-md  bg-white bg-opacity-20 "
              ></input>
              <p className="px-4 text-xs text-gray-400">
                Start with a capital letter (e.g., John Doe)
              </p>
            </>
          )}
          {!isSignIn && errorMessage === "fullName is not valid!" && (
            <div>
              <p className="text-red-700 mx-4">Full Name is not valid!</p>
              <p className="text-red-700 text-sm mx-4 my-2">
                Full Name must be in format: [Tony Stark].
              </p>
            </div>
          )}
          {!isSignIn && (
            <>
              <input
                ref={userName}
                type="text"
                placeholder="Username"
                className="p-3 my-3 mx-4 rounded-md bg-white bg-opacity-20"
              ></input>
              <p className="px-4 text-xs text-gray-400">
                3-20 characters, lowercase, numbers, and underscore (e.g.,
                user_123)
              </p>
            </>
          )}
          {!isSignIn && errorMessage === "userName is not valid!" && (
            <div>
              <p className="text-red-700 mx-4">User Name is Invalid!</p>
              <p className="text-red-700 text-sm my-2 mx-4">
                User Name must be: 3-20 characters using [a-z], [0-9], and [ _ ]
                (e.g., user_name123).
              </p>
            </div>
          )}
          {errorMessage === "Both are Invalid!" && (
            <p className="text-red-700 mx-4">{errorMessage}</p>
          )}
          <>
            <input
              ref={email}
              type="email"
              placeholder="E-mail"
              className="p-3 my-3 mx-4 rounded-md bg-white bg-opacity-20"
            ></input>
            <p className="px-4 text-xs text-gray-400">
              Enter a valid email (e.g., user123@example.com)
            </p>
          </>

          {errorMessage === "E-mail is not valid!" && (
            <p className="text-red-700 mx-4">{errorMessage}</p>
          )}

          {(errorMessage === "E-mail is not valid!" ||
            errorMessage === "Both are Invalid!") && (
            <p className="text-red-700 text-sm mx-4 my-2">
              Email must be in the format:[name@example.com].
            </p>
          )}

          <>
            <input
              ref={password}
              type="password"
              placeholder="Password"
              className="p-3 my-3 mx-4 rounded-md bg-white bg-opacity-20"
            ></input>
            <p className="px-4 text-xs text-gray-400">
              Min. 8 characters, 1 uppercase, 1 number, 1 special char (e.g.,
              Password@123)
            </p>
          </>

          {errorMessage === "Password is not valid!" && (
            <p className="text-red-700 mx-4">{errorMessage}</p>
          )}

          {(errorMessage === "Password is not valid!" ||
            errorMessage === "Both are Invalid!") && (
            <p className="text-red-700 text-sm mx-4 my-2">
              Password must be at least 8 characters, with a combination of
              [A-Z], [a-z], [0-9] & [@$!%*?&].
            </p>
          )}
          {!isSignIn
            ? errorMessage === "auth/email-already-in-use" && (
                <div>
                  <p className="text-red-900 mx-4 my-2 font-semibold">
                    Email Already in Use! Please Sign In.
                  </p>
                </div>
              )
            : errorMessage === "auth/invalid-credential" && (
                <div className="my-2">
                  <p className="text-red-900 mx-4 font-semibold">
                    Invalid Credentials !
                  </p>
                </div>
              )}

          {isSignIn && (
            <div className="flex items-center gap-2 my-2 mx-4">
              <input
                type="checkbox"
                className="h-4 w-4 rounded-sm cursor-pointer"
              ></input>
              <p>Remember me</p>
            </div>
          )}

          <button
            type="submit"
            className="p-2 my-4 mx-4 rounded-md bg-red-700 active:bg-red-600 transition-transform duration-150 ease-in-out transform active:scale-95"
            onClick={handleButtonClick}
          >
            {isSignIn ? "Sign In" : "Sign Up"}
          </button>

          {isSignIn && (
            <div className=" mx-4 my-2 text-gray-400">
              <p className="text-blue-600">Can't remember your password?</p>
              <p className="font-bold cursor-pointer hover:underline">
                Reset It Now.
              </p>
            </div>
          )}
          <div className="flex gap-2 mx-4 my-4 text-gray-400">
            <p className="">
              {isSignIn ? "New to Netflix?" : "Already Registered?"}
            </p>
            <p
              className="font-bold cursor-pointer hover:underline"
              onClick={handlerSignInBtn}
            >
              {isSignIn ? "Sign Up." : "Sign In."}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
