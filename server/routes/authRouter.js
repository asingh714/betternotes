const express = require("express");
const router = express.Router();

// const db = require("../db/dbConfig");

const {
  register,
  login,
  verifyEmail,
  sendResetPasswordLink,
  resetForgottenPassword
} = require("../controllers/authController");

router.post("/verify-email", verifyEmail);
router.post("/register", register);
router.post("/login", login);
router.post("/request-new-password", sendResetPasswordLink);
router.post("/reset-password", resetForgottenPassword)

module.exports = router;
