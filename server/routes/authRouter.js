const express = require("express");
const router = express.Router();

// const db = require("../db/dbConfig");
const upload = require("../util/multer");
const restricted = require("../util/restricted");

const {
  getAllUsers,
  register,
  login,
  getUserInfo,
  updateUserInfo,
  deleteUserInfo,
  updatePassword,
} = require("../controllers/authControllers");

router.get("/test", getAllUsers);
router.post("/register", register);
router.post("/login", login);
router.get("/:unique_id", getUserInfo);
router.put("/:unique_id", restricted, upload.single("profile_image"), updateUserInfo);
router.delete("/:unique_id", restricted, deleteUserInfo);
router.put("/:unique_id/update_password", restricted, updatePassword);

module.exports = router;
