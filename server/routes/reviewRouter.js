const express = require("express");
const router = express.Router();
const authenticateUser = require("../util/authenticateUser");

const {
  getAllReviews,
  postReview,
} = require("../controllers/reviewController");

router.get("/:product_id/reviews", getAllReviews);
router.post("/:product_id/review", authenticateUser, postReview);

module.exports = router;
