export const validateFormDataForSignIn = (email, password) => {
  const isEmailValid =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$/.test(email);

  const isPasswordValid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password
    );

  if (!isEmailValid && !isPasswordValid) return "Both are Invalid!";

  if (!isEmailValid) return "E-mail is not valid!";

  if (!isPasswordValid) return "Password is not valid!";

  return null;
};

export const validateFormDataForSignUp = (
  fullName,
  userName,
  email,
  password
) => {
  const isFullNameValid = /^(?!.*\s\s)([A-Z][a-z]+(?:\s[A-Z][a-z]+)+)$/.test(fullName);

  const isUserNameValid = /^(?=.*[a-z])(?=.*\d)(?=.*[_])[a-z\d_]{3,20}$/.test(userName);

  const isEmailValid =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$/.test(email);

  const isPasswordValid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password
    );

  if (!isFullNameValid) return "fullName is not valid!";

  if (!isUserNameValid) return "userName is not valid!";

  if (!isEmailValid) return "E-mail is not valid!";

  if (!isPasswordValid) return "Password is not valid!";

  return null;
};
