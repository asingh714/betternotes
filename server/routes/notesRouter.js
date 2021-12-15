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
} = require("../controllers/notesController");

router.get("/", getAllNotes);
router.get("/myNotes", authenticateUser, getAllUserNotes);
router.get("/:unique_id", getSingleNote);
router.post("/", authenticateUser, upload.single("document"), createNote);
router.put(
  "/:unique_id",
  authenticateUser,
  upload.single("document"),
  updateNote
);
router.delete("/:unique_id", authenticateUser, deleteNote);

module.exports = router;
