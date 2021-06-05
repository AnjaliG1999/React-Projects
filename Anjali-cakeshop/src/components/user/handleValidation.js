import { validateEmail, validatePassword } from "./validate";

export const handleEmail = (email) => {
  if (!email) return { errorEmail: "Enter email" };

  if (!validateEmail(email)) return { errorEmail: "Enter valid email" };

  return email;
};

export const handlePassword = (password) => {
  if (!password) return { errorPw: "Password is required" };

  if (!validatePassword(password))
    return {
      errorPw:
        "Password should have minimum eight characters, at least one uppercase letter, one lowercase letter, one number, and one special character",
    };

  return password;
};
