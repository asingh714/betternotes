const express = require("express");
const router = express.Router();

const db = require("../db/dbConfig");
const upload = require("../util/multer");
const { cloudinary } = require("../util/cloudConfig");

const {
  getAllUsers,
  register,
  login,
  getUserInfo,
  // updateUserInfo,
} = require("../controllers/authControllers");
router.put("/:id", upload.single("profile_image"), async (req, res, next) => {
  const { id } = req.params;
  const changes = req.body;

  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path);
    console.log(result);
    db("users")
      .where({ id })
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
      .where({ id })
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
});
// router.put("/:id", parser.single("profile_image"), async (req, res) => {
// });
router.get("/test", getAllUsers);
router.post("/register", register);
router.post("/login", login);
router.get("/:id", getUserInfo);

module.exports = router;
