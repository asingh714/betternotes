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
    pages,
    year,
    author,
    title,
    isbn,
    price,
  } = req.body;
  const subject = req.decodedToken.subject;
  const validationErrors = [];
  if (
    !product_name ||
    !short_description ||
    !long_description ||
    // !document ||
    !language ||
    !pages ||
    !year ||
    !author ||
    !title ||
    !isbn ||
    !price
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
    if (req.file) {
      const uniqueId = uuidv4();
      const product_id = uuidv4();
      const result = await cloudinary.uploader.upload(req.file.path);
      const newProduct = {
        unique_id: uniqueId,
        product_name,
        short_description,
        long_description,
        document: result.url,
        language,
        summary_key: product_id,
        user_id: subject,
        pages,
        year,
        price,
      };
      const summaryId = uuidv4();
      const newSummary = {
        unique_id: summaryId,
        author,
        title,
        isbn,
        summary_key: product_id,
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

const getAllSummaries = (req, res) => {
  db("products")
    .join("summary", "products.summary_key", "summary.summary_key")
    .select("*")
    .then((result) => {
      if (result.length < 1) {
        res.status(404).json({ error: "There are no summaries" });
      } else {
        res.status(200).json(result);
      }
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
};

const getSingleSummary = (req, res) => {
  const { summary_key } = req.params;

  db("products")
    .join("summary", "products.summary_key", "summary.summary_key")
    .select("*")
    .where({ "products.summary_key": summary_key })
    .first()
    .then((singleSummary) => {
      console.log("singleSummary --> ", singleSummary);
      if (singleSummary.length < 1) {
        res.status(404).json({
          error: "You cannot access the summary with this specific key",
        });
      } else {
        res.status(200).json(singleSummary);
      }
    })
    .catch((error) => {
      res.status(500).json({
        error: "The summary with this specific ID could not be retrieved.",
      });
    });
};

const updateSummary = (req, res) => {
  const { summary_key } = req.params;

  const {
    product_name,
    short_description,
    long_description,
    document,
    pages,
    year,
    language,
    author,
    title,
    isbn,
  } = req.body;

  const validationErrors = [];
  if (
    !product_name ||
    !short_description ||
    !long_description ||
    // !document ||
    !language ||
    !pages ||
    !year ||
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
    db("products")
      .where({ summary_key })
      .first()
      .then((result) => {
        if (!result) {
          res.status(404).json({
            error: "You cannot access the note with this specific key",
          });
        } else {
          db("products").where({ summary_key }).first().update({
            product_name,
            short_description,
            long_description,
            document,
            language,
            pages,
            year,
          });
          db("summary")
            .where({ summary_key })
            .first()
            .update({
              author,
              title,
              isbn,
            })
            .then((result) => {
              db("products")
                .join("summary", "products.summary_key", "summary.summary_key")
                .select("*")
                .orderBy("id", "desc")
                .limit(1)
                .then((result) => {
                  console.log(result);
                  res.status(201).json(result);
                })
                .catch((error) => {
                  res.status(500).json({
                    error: "This summary could not be retrieved.",
                  });
                });
            });
        }
      })
      .catch((error) => {
        res.status(500).json({
          error: "This product could not be retrieved.",
        });
      });
  }
};

const deleteSummary = (req, res) => {
  const { summary_key } = req.params;

  db("products")
    .where({ summary_key })
    .first()
    .then((product) => {
      if (product) {
        db("products").where({ summary_key }).del();
        db("summary")
          .where({ summary_key })
          .del()
          .then((count) => res.status(200).json(count));
      } else {
        res.status(404).json({
          error: "You cannot access the summary with this specific id.",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "This product could not be removed" });
    });
};

module.exports = {
  createSummary,
  getAllSummaries,
  getSingleSummary,
  updateSummary,
  deleteSummary,
};
