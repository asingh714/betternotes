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
  getAllUserNotes,
  getAllNotesByOneUser,
} = require("../controllers/notesController");

router.get("/", getAllNotes);
router.get("/myNotes", authenticateUser, getAllUserNotes);
router.get("/:unique_note_id", getSingleNote);
router.post("/", authenticateUser, upload.single("document"), createNote);
router.put(
  "/:unique_note_id",
  authenticateUser,
  upload.single("document"),
  updateNote
);
router.delete("/:unique_note_id", authenticateUser, deleteNote);
router.get("/user/:user_id", getAllNotesByOneUser);

module.exports = router;
