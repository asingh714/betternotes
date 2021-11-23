const express = require("express");
const router = express.Router();
const upload = require("../util/multer");
const authenticateUser = require("../util/authenticateUser");

const { createNote, getAllNotes, getSingleNote } = require("../controllers/notesController");

router.get("/", getAllNotes);
router.get("/:note_key", getSingleNote)
router.post("/", authenticateUser, upload.single("document"), createNote);

module.exports = router;
