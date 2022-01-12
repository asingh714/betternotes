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
