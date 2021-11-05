const express = require("express");
const router = express.Router();

const { getAllUsers, register } = require("../controllers/authControllers");

router.get("/test", getAllUsers);
router.post("/register", register);

module.exports = router;
