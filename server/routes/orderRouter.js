const express = require("express");
const router = express.Router();
const authenticateUser = require("../util/authenticateUser");

const {
  createOrder,
  getAllOrders,
  getAllSingleOrderItems,
  getAllUserOrders,
  getAllSingleOrderNotes,
  verifyOrderEmail,
} = require("../controllers/orderController");

// Posting an order needs to be restricted
router.post("/", authenticateUser, createOrder);
router.get("/allOrders", getAllOrders);
router.get("/allItems", getAllSingleOrderItems);
router.get("/allNotes", getAllSingleOrderNotes);
router.get("/myOrders", authenticateUser, getAllUserOrders);

router.get("/testing", verifyOrderEmail); // testing

module.exports = router;
