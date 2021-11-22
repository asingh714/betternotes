const express = require("express");
const router = express.Router();
const upload = require("../util/multer");
const authenticateUser = require("../util/authenticateUser");

const { createNote } = require("../controllers/notesController");

router.post("/", authenticateUser, upload.single("document"), createNote);

module.exports = router;
