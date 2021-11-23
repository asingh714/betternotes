const express = require("express");
const router = express.Router();
const upload = require("../util/multer");
const authenticateUser = require("../util/authenticateUser");

const {
  createNote,
  getAllNotes,
  getSingleNote,
  deleteNote,
  updateNote,
} = require("../controllers/notesController");

router.get("/", getAllNotes);
router.get("/:note_key", getSingleNote);
router.post("/", authenticateUser, upload.single("document"), createNote);
router.put(
  "/:note_key",
  authenticateUser,
  upload.single("document"),
  updateNote
);
router.delete("/:note_key", authenticateUser, deleteNote);

module.exports = router;
