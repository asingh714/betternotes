const express = require("express");
const router = express.Router();
const upload = require("../util/multer");
const restricted = require("../util/restricted");

const {
  getAllUsers,
  getUserInfo,
  updateUserInfo,
  deleteUserInfo,
  updatePassword,
  showCurrentUser,
} = require("../controllers/userController");

router.get("/test", getAllUsers);
router.get("/profile", restricted, showCurrentUser);
router.get("/:unique_id", getUserInfo);
router.put(
  "/:unique_id",
  restricted,
  upload.single("profile_image"),
  updateUserInfo
);
router.delete("/:unique_id", restricted, deleteUserInfo);
router.put("/:unique_id/update_password", restricted, updatePassword);

module.exports = router;
