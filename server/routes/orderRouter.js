const express = require("express");
const router = express.Router();
const authenticateUser = require("../util/authenticateUser");

const { createOrder } = require("../controllers/orderController");

router.get("/", createOrder);

module.exports = router;
