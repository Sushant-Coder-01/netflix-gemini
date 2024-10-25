import { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignIn, setisSignIn] = useState(false);

  const LoginHandler = () => {
    setisSignIn(!isSignIn);
  };

  return (
    <div className="relative w-full h-screen">
      <div className="absolute w-full h-full overflow-hidden">
        <img
          className="w-full h-full object-cover"
          alt="background-img"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/74d734ca-0eab-4cd9-871f-bca01823d872/web/IN-en-20241021-TRIFECTA-perspective_2277eb50-9da3-4fdf-adbe-74db0e9ee2cf_large.jpg"
        />
      </div>
      <div className="absolute w-full h-full bg-black bg-opacity-50"></div>
      <Header />
      <div className="relative w-3/12 h-4/6 p-8 bg-black bg-opacity-60 rounded-md top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <form className="flex flex-col space-y-5 space-x-6 p-4 text-white">
          <h1 className="text-4xl font-medium m-5">
            {isSignIn ? "Sign In" : "Sign Up"}
          </h1>
          {!isSignIn && (
            <input
              type="text"
              placeholder="Full Name"
              className="p-3 rounded-md  bg-white bg-opacity-20 "
            ></input>
          )}
          {!isSignIn && (
            <input
              type="text"
              placeholder="Username"
              className="p-3 rounded-md bg-white bg-opacity-20"
            ></input>
          )}
          <input
            type="text"
            placeholder="E-mail"
            className="p-3 rounded-md bg-white bg-opacity-20"
          ></input>
          <input
            type="password"
            placeholder="Password"
            className="p-3 rounded-md bg-white bg-opacity-20"
          ></input>
          {isSignIn && (
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="h-4 w-4 rounded-sm cursor-pointer"
              ></input>
              <p>Remember me</p>
            </div>
          )}
          <button
            type="button"
            className="p-2 rounded-md bg-red-700 transition-transform ease-in"
          >
            {isSignIn ? "Sign In" : "Sign Up"}
          </button>
          <div className="flex gap-2 text-gray-400">
            <p className="">
              {isSignIn ? "New to Netflix?" : "Already Registered?"}
            </p>
            <p
              className="font-bold cursor-pointer hover:underline"
              onClick={LoginHandler}
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
