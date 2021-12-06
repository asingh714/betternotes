const express = require("express");
const router = express.Router();

// const db = require("../db/dbConfig");

const {
  register,
  login,
  verifyEmail,
} = require("../controllers/authController");

router.post("/verify-email", verifyEmail);
router.post("/register", register);
router.post("/login", login);

module.exports = router;
