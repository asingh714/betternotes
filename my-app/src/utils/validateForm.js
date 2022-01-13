import validator from "validator";

export const validateLogin = (username, password) => {
  const errors = {};
  if (!username) {
    errors["username"] = "Please provide a username";
  }
  if (!password) {
    errors["password"] = "Please provide a password";
  }

  return errors;
};

export const validateRegistration = (
  user_name,
  email,
  username,
  password,
  confirm_password
) => {
  const errors = {};
  const emailIsValid = validator.isEmail(email);
  if (!user_name) {
    errors["user_name"] = "Please provide a name";
  }
  if (!email || !emailIsValid) {
    errors["email"] = "Please provide a email";
  }
  if (!username) {
    errors["username"] = "Please provide a username";
  }
  if (!password) {
    errors["password"] = "Please provide a password";
  }
  if (!confirm_password) {
    errors["confirm_password"] = "Please provide a password confirmation";
  }

  return errors;
};
