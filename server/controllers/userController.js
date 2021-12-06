const db = require("../db/dbConfig");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { cloudinary } = require("../util/cloudConfig");

const getAllUsers = (req, res) => {
  db("users").then((result) => res.status(200).send(result));
};

const getUserInfo = (req, res) => {
  const { unique_id } = req.params;
  db("users")
    .where({ unique_id })
    .first()
    .then((user) => {
      if (!user) {
        res.status(404).json({
          error: "You cannot access this user",
        });
      } else {
        const {
          id,
          unique_id,
          name,
          email,
          username,
          profile_image,
          school_name,
          grade_level,
          user_description,
        } = user;
        res.status(200).json({
          id,
          unique_id,
          name,
          email,
          username,
          profile_image,
          school_name,
          grade_level,
          user_description,
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        error: "The user with this specified ID could not be retrieved.",
      });
    });
};

const showCurrentUser = (req, res) => {
  const token = req.headers.authorization;
  // Since this is a restricted route, we know for sure we can verify this token
  const profileData = jwt.verify(token, process.env.JWT_SECRET);
  const username = profileData["username"];

  db("users")
    .where({ username })
    .first()
    .then((user) => {
      if (!user) {
        res.status(404).json({
          error: "You cannot access this user",
        });
      } else {
        const {
          id,
          unique_id,
          name,
          email,
          username,
          profile_image,
          school_name,
          grade_level,
          user_description,
        } = user;
        res.status(200).json({
          id,
          unique_id,
          name,
          email,
          username,
          profile_image,
          school_name,
          grade_level,
          user_description,
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        error: "The user with this specified ID could not be retrieved.",
      });
    });
};

const updateUserInfo = async (req, res) => {
  const { unique_id } = req.params;
  const changes = req.body;

  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path);
    console.log(result);
    db("users")
      .where({ unique_id })
      .update({ ...changes, profile_image: result.url })
      .then((count) => {
        if (count > 0) {
          res.status(200).json(count);
        } else {
          res.status(404).json({
            error: "You cannot access the user with this specific ID",
          });
        }
      })
      .catch((error) => {
        res.status(500).json({
          error: "The user could not be modified.",
        });
      });
  } else {
    db("users")
      .where({ unique_id })
      .update({ ...changes })
      .then((count) => {
        if (count > 0) {
          res.status(200).json(count);
        } else {
          res.status(404).json({
            error: "You cannot access the user with this specific ID",
          });
        }
      })
      .catch((error) => {
        res.status(500).json({
          error: "The user could not be modified HERE",
        });
      });
  }
};

const deleteUserInfo = (req, res) => {
  // const { unique_id } = req.params;
  const subject = req.decodedToken.subject;
  // console.log(unique_id);
  console.log(subject);

  db("users")
    .where({ id: subject })
    .del()
    .then((count) => {
      if (count > 0) {
        res.status(200).json(count);
      } else {
        res.status(404).json({
          error: "You cannot access the user with this id.",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        error: "The user could not be removed",
      });
    });
};

const updatePassword = (req, res) => {
  const { password, new_password, confirm_new_password } = req.body;
  const { unique_id } = req.params;
  const validationErrors = [];

  if (!password || !new_password || new_password.length < 7) {
    validationErrors.push({
      code: "VALIDATION_ERROR",
      field: "password",
      message: "Please provide a password longer than 6 characters",
    });
  }

  if (new_password !== confirm_new_password) {
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
    const token = req.headers.authorization;
    const profileData = jwt.verify(token, process.env.JWT_SECRET);
    const username = profileData["username"];
    db("users")
      .where({ username, unique_id })
      .first()
      .then((user) => {
        if (!user) {
          res.status(404).json({
            error: "You cannot access this user",
          });
        } else if (user && !bcrypt.compareSync(password, user.password)) {
          res.status(401).json({
            error: "The password is incorrect",
          });
        } else {
          const hashed_password = bcrypt.hashSync(new_password, 14);
          console.log(hashed_password);
          db("users")
            .where({ username })
            .update({
              password: hashed_password,
            })
            .then((count) => {
              if (count > 0) {
                res.status(200).json(count);
              } else {
                res.status(404).json({
                  error: "You cannot access the user with this specific ID",
                });
              }
            })
            .catch((error) => {
              res.status(500).json({
                error: "Sorry there was an error making this upate.",
              });
            });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({
          error: "Sorry there was an error.",
        });
      });
  }
};

module.exports = {
  getAllUsers,
  getUserInfo,
  updateUserInfo,
  deleteUserInfo,
  updatePassword,
  showCurrentUser,
};