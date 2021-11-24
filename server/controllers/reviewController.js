const db = require("../db/dbConfig");
const { v4: uuidv4 } = require("uuid");

const getAllReviews = (req, res) => {
  const { product_id } = req.params;
  db("reviews")
    .where({ product_id })
    .then((result) => {
      console.log(result);
      res.status(200).send(result);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "There was an error retrieving all the reviews" });
    });
};

const postReview = (req, res) => {
  const { review, rating } = req.body;
  const { product_id } = req.params;
  const reviewer = req.decodedToken.username;
  const validationErrors = [];

  if (!review || !rating || rating > 5 || rating < 0) {
    validationErrors.push({
      code: "VALIDATION_ERROR",
      field: "ALL",
      message: "Some of these fields are missing.",
    });
  }

  if (validationErrors.length) {
    const errorObject = {
      error: true,
      errors: validationErrors,
    };
    res.status(400).send(errorObject);
  } else {
    const newId = uuidv4();
    const newReview = {
      unique_id: newId,
      reviewer,
      review,
      rating,
      product_id,
    };

    db("reviews")
      .insert(newReview)
      .then((result) => {
        console.log(result);
        // const id = ids[0];
        // db("reviews")
        //   .where({ id })
        //   .first()
        //   .then((review) => {
        //     res.status(201).json(review);
        //   })
        //   .catch((err) =>
        //     res.status(500).json({ message: "Something went wrong" })
        //   );
      })
      .catch((error) => {
        res.status(500).json({
          error,
          message: "There was an error retrieving the new user.",
        });
      });
  }
};

module.exports = {
  getAllReviews,
  postReview,
};
