const express = require("express");
const router = express.Router();
const upload = require("../util/multer");
const authenticateUser = require("../util/authenticateUser");

const {
  createSummary,
  getAllSummaries,
  getSingleSummary,
  // deleteSummary,
  // updateSummary,
} = require("../controllers/summaryController");

router.get("/", getAllSummaries);
router.get("/:summary_key", getSingleSummary);
router.post("/", authenticateUser, upload.single("document"), createSummary);
// router.put(
//   "/:summary_key",
//   authenticateUser,
//   upload.single("document"),
//   updateSummary
// );
// router.delete("/:summary_key", authenticateUser, deleteSummary);

module.exports = router;
