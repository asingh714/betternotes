const db = require("../db/dbConfig");
const { v4: uuidv4 } = require("uuid");

const createOrder = (req, res) => {
  const { items } = req.body;
  const validationErrors = [];

  // if (!items || items.length < 1) {
  //   validationErrors.push({
  //     code: "VALIDATION_ERROR",
  //     field: "Cart Items",
  //     message: "The cart is empty",
  //   });
  // }

  // if (validationErrors.length) {
  //   const errorObject = {
  //     error: true,
  //     errors: validationErrors,
  //   };
  //   res.status(400).send(errorObject);
  // } else {
  for (const item of items) {
    db("products")
      .join("notes", "products.note_key", "notes.note_key")
      .select("*")
      .where({ "products.note_key": item.product_id })
      // .join("summary", "products.summary_key", "notes.summary_key")
      // .select("*")
      // .where({ "products.summary_key": item.product_id })
      .then((result) => res.status(200).json(result));

    // db("products")
    //   .join("summary", "products.summary_key", "notes.summary_key")
    //   .select("*")
    //   .where({ "products.summary_key": item.product_id })
    //   .then((result) => {
    //     cartProducts.push(result);
    //   });
  }
  // }
};

// Create order, update orders, read all my orders, get all orders

module.exports = {
  createOrder,
};
