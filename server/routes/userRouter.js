const express = require("express");
const router = express.Router();
const upload = require("../util/multer");
const restricted = require("../util/restricted");

const {
  getAllUsers,
  getUserInfo,
  updateUserInfo,
  deleteUserInfo,
} = require("../controllers/userController");

router.get("/test", getAllUsers);
router.get("/:unique_id", getUserInfo);
router.put(
  "/:unique_id",
  restricted,
  upload.single("profile_image"),
  updateUserInfo
);
router.delete("/:unique_id", restricted, deleteUserInfo);

module.exports = router;
