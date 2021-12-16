const db = require("../db/dbConfig");
const { v4: uuidv4 } = require("uuid");

const sendOrderEmail = require("../util/sendOrderEmail");
const sendEmail = require("../util/sendEmail");

const createOrder = (req, res) => {
  const { items } = req.body;
  const validationErrors = [];
  const subject = req.decodedToken.subject;
  const email = req.decodedToken.email;

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
  // }
  let totalFromCart = 0;

  for (const item of items) {
    totalFromCart += item.price;
  }
  const orderId = uuidv4();
  const order = {
    unique_id: orderId,
    total: totalFromCart,
    purchase_date: Date.now(),
    user_id: subject,
  };
  // console.log(order);
  let order_id;

  db("orders")
    .insert(order)
    .then((result) => {
      order_id = result[0];
      createOrderItems(items, order_id);
      verifyOrderEmail(order_id, email);
      res.status(201).json({
        message: "The order has been created.",
      });
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

const createOrderItems = (items, order_id) => {
  for (const item of items) {
    const singleOrderItemId = uuidv4();

    const singleOrderItem = {
      unique_id: singleOrderItemId,
      note_id: item.unique_id,
      order_id: order_id.toString(),
    };

    db("singleOrderItem").insert(singleOrderItem);
  }
};

const verifyOrderEmail = (order_id, email) => {
  db("singleOrderItem")
    .join("notes", "singleOrderItem.note_id", "notes.unique_id")
    .select("*")
    .where({ "singleOrderItem.order_id": order_id })
    .then((result) => {
      console.log(result);
      result.forEach((order) => {
        // console.log(order);
        //   sendOrderEmail(email, order.document);
      });
    });
  // .catch((error) => {
  //   res.status(500).json(error);
  // });
};

const getAllOrders = (req, res) => {
  db("orders")
    .then((result) => {
      if (result.length < 1) {
        res.status(404).json({ error: "There are no orders" });
      } else {
        res.status(200).json(result);
      }
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

const getAllSingleOrderItems = (req, res) => {
  db("singleOrderItem")
    .then((result) => {
      if (result.length < 1) {
        res.status(404).json({ error: "There are no order items" });
      } else {
        res.status(200).json(result);
      }
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

const getAllSingleOrderNotes = (req, res) => {
  db("singleOrderItem")
    .join("notes", "singleOrderItem.note_id", "notes.unique_id")
    .select("*")
    .then((result) => {
      if (result.length < 1) {
        res.status(404).json({ error: "There are no order items" });
      } else {
        res.status(200).json(result);
      }
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

module.exports = {
  createOrder,
  getAllOrders,
  getAllSingleOrderItems,
  getAllSingleOrderNotes,
  verifyOrderEmail,
};
