const express = require("express");
const router = express.Router();
const upload = require("../util/multer");
const authenticateUser = require("../util/authenticateUser");

const {
  getAllUsers,
  getUserInfo,
  updateUserInfo,
  deleteUserInfo,
  updatePassword,
  showCurrentUser,
} = require("../controllers/userController");

router.get("/test", getAllUsers);
router.get("/profile", authenticateUser, showCurrentUser);
router.get("/:unique_id", getUserInfo);
router.put(
  "/:unique_id",
  authenticateUser,
  upload.single("profile_image"),
  updateUserInfo
);
router.delete("/:unique_id", authenticateUser, deleteUserInfo);
router.put("/:unique_id/update_password", authenticateUser, updatePassword);

module.exports = router;
