const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  register,
  login,
} = require("../controllers/authControllers");

router.get("/test", getAllUsers);
router.post("/register", register);
router.post("/login", login);

module.exports = router;
