const validator = require("validator");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
// const multer = require("multer");

const db = require("../db/dbConfig");
const { generateToken } = require("../util/jwt.js");
// const { imageStorage, docStorage } = require("../util/cloudConfig.js");
// const router = require("../routes/authRouter");
const { cloudinary } = require("../util/cloudConfig");
// const parser = multer({ imageStorage, docStorage });


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
    const newId = uuidv4();
    const newUser = {
      name: name.trim(),
      email: email.trim(),
      username: username.trim(),
      password: hashed_password,
      unique_id: newId,
    };
    db("users")
      .insert(newUser)
      .then((ids) => {
        const id = ids[0];
        db("users")
          .where({ id })
          .first()
          .then(({ id, name, username, email, unique_id }) => {
            const token = generateToken({ id, name, username, email });
            res.status(201).json({
              id,
              name,
              username,
              email,
              unique_id,
              token,
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
          message: "There was an error inserting the new user",
        });
      });
  }
};

const login = (req, res) => {
  const { username, password } = req.body;
  const validationErrors = [];

  if (!username) {
    validationErrors.push({
      code: "VALIDATION_ERROR",
      field: "username",
      message: "Please provide a username for the user",
    });
  }

  if (!password) {
    validationErrors.push({
      code: "VALIDATION_ERROR",
      field: "password",
      message: "Please provide a password",
    });
  } else {
    db("users")
      .where({ username })
      .first()
      .then((user) => {
        if (!user) {
          res.status(401).json({
            error: "This username does not exist",
          });
        } else if (user && !bcrypt.compareSync(password, user.password)) {
          res.status(401).json({
            error: "The password is incorrect",
          });
        } else {
          const token = generateToken(user);
          res.status(200).json({
            id: user.id,
            username: user.username,
            // password: user.password,
            token,
          });
        }
      })
      .catch((error) => {
        res.status(500).json({
          error: "There was an error while logging in",
        });
      });
  }
};



module.exports = {
  register,
  login,
};
