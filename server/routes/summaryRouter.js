const express = require("express");
const router = express.Router();
const upload = require("../util/multer");
const authenticateUser = require("../util/authenticateUser");

const {
  createSummary,
  // getAllSummaries,
  // getSingleSummary,
  // deleteSummary,
  // updateSummary,
} = require("../controllers/summaryController");

// router.get("/", getAllSummaries);
// router.get("/:note_key", getSingleSummary);
router.post("/", authenticateUser, upload.single("document"), createSummary);
// router.put(
//   "/:note_key",
//   authenticateUser,
//   upload.single("document"),
//   updateSummary
// );
// router.delete("/:note_key", authenticateUser, deleteSummary);

module.exports = router;
