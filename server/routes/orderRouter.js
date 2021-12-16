const express = require("express");
const router = express.Router();
const authenticateUser = require("../util/authenticateUser");

const {
  createOrder,
  getAllOrders,
  getAllSingleOrderItems,
  getAllSingleOrderNotes,
  verifyOrderEmail,
} = require("../controllers/orderController");

// Posting an order needs to be restricted
router.post("/", authenticateUser, createOrder);
router.get("/ALL", getAllOrders);
router.get("/allitems", getAllSingleOrderItems);
router.get("/allNotes", getAllSingleOrderNotes);

router.get("/testing", verifyOrderEmail);

module.exports = router;
