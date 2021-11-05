const validator = require("validator");
const bcrypt = require("bcryptjs");
const db = require("../db/dbConfig");

const getAllUsers = (req, res) => {
  db("users").then((result) => res.status(200).send(result));
};

const register = (req, res) => {
  const { name, email, username, password, confirm_password } = req.body;
  const emailIsValid = email && validator.isEmail(email);

  const validationErrors = [];
  if (!name) {
    validationErrors.push({
      code: "VALIDATION_ERROR",
      field: "name",
      message: "Please provide a name for the user",
    });
  }

  if (!email || emailIsValid === false) {
    validationErrors.push({
      code: "VALIDATION_ERROR",
      field: "email",
      message: "Please provide a valid email address for the user.",
    });
  }

  if (!username) {
    validationErrors.push({
      code: "VALIDATION_ERROR",
      field: "username",
      message: "Please provide a username for the user",
    });
  }

  if (!password || password.length < 7) {
    validationErrors.push({
      code: "VALIDATION_ERROR",
      field: "password",
      message: "Please provide a password longer than 6 characters",
    });
  }

  if (!confirm_password || confirm_password.length < 7) {
    validationErrors.push({
      code: "VALIDATION_ERROR",
      field: "password",
      message: "Please provide a password longer than 6 characters",
    });
  }

  if (password !== confirm_password) {
    validationErrors.push({
      code: "VALIDATION_ERROR",
      field: "password",
      message: "Your passwords do not match",
    });
  }

  if (validationErrors.length) {
    const errorObject = {
      error: true,
      errors: validationErrors,
    };
    res.status(400).send(errorObject);
  } else {
    const hashed_password = bcrypt.hashSync(password, 14);
    const newUser = {
      name: name.trim(),
      email: email.trim(),
      username: username.trim(),
      password: hashed_password,
    };
    db("users")
      .insert(newUser)
      .then((ids) => {
        const id = ids[0];
        db("users")
          .where({ id })
          .first()
          .then(({ id, name, username, email }) => {
            res.status(201).json({
              id,
              name,
              username,
              email,
              //TOKEN
            });
          })
          .catch((error) => {
            res.status(500).json({
              error,
              message: "There was an error retrieving the new user.",
            });
          });
      })
      .catch((error) => {
        res.status(500).json({
          error,
          message: "There was an error inserting the new user.",
        });
      });
  }
};

module.exports = { getAllUsers, register };
