const ErrorMessages = ({ errorMessage, isSignIn }) => {
  return (
    <>
      {errorMessage && (
        <p className="text-red-700 mx-4">
          {errorMessage}
          {/* Custom error messages based on auth error codes */}
          {errorMessage === "auth/email-already-in-use" && (
            <span>Email already in use! Please Sign In.</span>
          )}
          {errorMessage === "auth/invalid-credential" && (
            <span>No account found with this email! Please Sign Up.</span>
          )}
        </p>
      )}
    </>
  );
};

export default ErrorMessages;