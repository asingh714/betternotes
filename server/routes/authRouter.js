const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  register,
  login,
  getUserInfo,
  updateUserInfo,
} = require("../controllers/authControllers");

router.get("/test", getAllUsers);
router.post("/register", register);
router.post("/login", login);
router.get("/:id", getUserInfo);
router.put("/admin/:id", updateUserInfo);

module.exports = router;
