const db = require("../db/dbConfig");
const { v4: uuidv4 } = require("uuid");
const { cloudinary } = require("../util/cloudConfig");

const createNote = async (req, res) => {
  const {
    product_name,
    short_description,
    long_description,
    document,
    language,
    school,
    grade_level,
    class_name,
    teacher,
  } = req.body;
  const subject = req.decodedToken.subject;
  const validationErrors = [];

  if (
    !product_name ||
    !short_description ||
    !long_description ||
    // !document ||
    !language ||
    !school ||
    !grade_level ||
    !class_name ||
    !teacher
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
      const newId = uuidv4();
      const result = await cloudinary.uploader.upload(req.file.path);
      const newProduct = {
        product_name,
        short_description,
        long_description,
        document: result.url,
        language,
        note_key: newId,
        user_id: subject,
      };
      const newNote = {
        school,
        grade_level,
        class_name,
        teacher,
        note_key: newId,
        user_id: subject,
      };
      let savedProduct = {};

      db("products")
        .insert(newProduct)
        .then((ids) => {
          const id = ids[0];
          console.log(id);
          db("products")
            .where({ id })
            .first()
            .then((product) => {
              savedProduct = { ...savedProduct, ...product };
            })
            .catch((error) => {
              res.status(404).json({
                error: "There was trouble saving the product",
              });
            });
        })
        .catch((error) => {
          res.status(500).json({
            error: "The new product could not be added ",
          });
        });

      db("notes")
        .insert(newNote)
        .then((ids) => {
          const id = ids[0];
          db("notes")
            .where({ id })
            .first()
            .then((note) => {
              savedProduct = { ...savedProduct, ...note };
              console.log(savedProduct);
              res.status(201).json(savedProduct);
            })
            .catch((error) => {
              res.status(404).json({
                error: "There was trouble saving the note",
              });
            });
        })
        .catch((error) => {
          res.status(500).json({
            error: "The new note could not be added ",
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
  createNote,
};
