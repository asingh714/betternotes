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

  if (password !== confirm_password) {
    errors["password"] = "Please make sure both passwords match";
  }

  return errors;
};

export const validateForgotPassword = (password, confirm_password) => {
  const errors = {};
  if (!password) {
    errors["password"] = "Please provide a password";
  }
  if (!confirm_password) {
    errors["confirm_password"] = "Please provide a password confirmation";
  }

  if (password !== confirm_password) {
    errors["password"] = "Please make sure both passwords match";
  }
  return errors;
};

export const validateNote = (
  document,
  note_name,
  grade_level,
  class_name,
  teacher,
  subject,
  school,
  year,
  language,
  price,
  pages,
  short_description,
  long_description
) => {
  const errors = {};
  if (!document) {
    errors["document"] = "Please provide a document";
  }
  if (!note_name) {
    errors["note_name"] = "Please provide a name for your note";
  }
  if (!grade_level) {
    errors["grade_level"] = "Please provide a grade level";
  }
  if (!class_name) {
    errors["class_name"] = "Please provide a class name";
  }
  if (!teacher) {
    errors["teacher"] = "Please provide a teacher";
  }
  if (!subject) {
    errors["subject"] = "Please provide a subject";
  }
  if (!school) {
    errors["school"] = "Please provide a school";
  }

  if (!year) {
    errors["year"] = "Please provide a year";
  }
  if (!language) {
    errors["language"] = "Please provide a language";
  }
  if (!price) {
    errors["price"] = "Please provide a price";
  }

  if (!pages) {
    errors["pages"] = "Please provide a pages";
  }
  if (!short_description) {
    errors["short_description"] = "Please provide a short description";
  }
  if (!long_description) {
    errors["long_description"] = "Please provide a long description";
  }

  return errors;
};
