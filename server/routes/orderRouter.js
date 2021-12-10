const express = require("express");
const router = express.Router();
const authenticateUser = require("../util/authenticateUser");

const { createOrder } = require("../controllers/orderController");

router.post("/", createOrder);

module.exports = router;
