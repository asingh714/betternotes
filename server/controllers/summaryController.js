const db = require("../db/dbConfig");
const { v4: uuidv4 } = require("uuid");
const { cloudinary } = require("../util/cloudConfig");

const createSummary = async (req, res) => {
  const {
    product_name,
    short_description,
    long_description,
    document,
    language,
    author,
    title,
    isbn,
  } = req.body;
  const subject = req.decodedToken.subject;
  const validationErrors = [];

  if (
    !product_name ||
    !short_description ||
    !long_description ||
    // !document ||
    !language ||
    !author ||
    !title ||
    !isbn
  ) {
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
    console.log(req.file);
    if (req.file) {
      const newId = uuidv4();
      const result = await cloudinary.uploader.upload(req.file.path);
      const newProduct = {
        product_name,
        short_description,
        long_description,
        document: result.url,
        language,
        summary_key: newId,
        user_id: subject,
      };
      const newSummary = {
        author,
        title,
        isbn,
        summary_key: newId,
        user_id: subject,
      };

      db("products")
        .insert(newProduct)
        .then((result) => {
          db("summary")
            .insert(newSummary)
            .then((result) => {
              db("products")
                .join("summary", "products.summary_key", "summary.summary_key")
                .select("*")
                .orderBy("id", "desc")
                .limit(1)
                .then((result) => {
                  console.log(result);
                  res.status(201).json(result);
                });
            });
        });
    } else {
      res.status(500).json({
        message: "SOMETHING WENT WRONG",
      });
    }
  }
};

module.exports = {
  createSummary,
};
