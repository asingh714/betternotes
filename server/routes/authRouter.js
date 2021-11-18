const express = require("express");
const router = express.Router();

// const db = require("../db/dbConfig");
const restricted = require("../util/restricted");

const {
  register,
  login,
  updatePassword,
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.put("/:unique_id/update_password", restricted, updatePassword);

module.exports = router;
