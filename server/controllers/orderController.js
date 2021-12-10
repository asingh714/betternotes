const db = require("../db/dbConfig");
const { v4: uuidv4 } = require("uuid");

const createOrder = (req, res) => {
  const { items: cartItems } = req.body;
  const validationErrors = [];

  if (!cartItems || cartItems.length < 1) {
    validationErrors.push({
      code: "VALIDATION_ERROR",
      field: "Cart Items",
      message: "The cart is empty",
    });
  }

  if (validationErrors.length) {
    const errorObject = {
      error: true,
      errors: validationErrors,
    };
    res.status(400).send(errorObject);
  } else {
    for (const item of cartItems) {
      db("products")
        .where({
          unique_id: item.product_id,
        })
        .first()
        .then((result) => res.status(200).json(result));
    }
  }
};

// Create order, update orders, read all my orders, get all orders

module.exports = {
  createOrder,
};
