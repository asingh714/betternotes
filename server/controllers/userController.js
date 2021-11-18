const db = require("../db/dbConfig");

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
          error: "The user could not be modified REQ.FILE!!",
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
  const { unique_id } = req.params;

  db("users")
    .where({ unique_id })
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

module.exports = {
  getAllUsers,
  getUserInfo,
  updateUserInfo,
  deleteUserInfo,
};
