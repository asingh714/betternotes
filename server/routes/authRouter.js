const express = require("express");
const router = express.Router();

// const db = require("../db/dbConfig");
const upload = require("../util/multer");

const {
  getAllUsers,
  register,
  login,
  getUserInfo,
  updateUserInfo,
  deleteUserInfo,
} = require("../controllers/authControllers");

router.get("/test", getAllUsers);
router.post("/register", register);
router.post("/login", login);
router.get("/:id", getUserInfo);
router.put("/:id", upload.single("profile_image"), updateUserInfo);
router.delete("/:id", deleteUserInfo);

module.exports = router;
