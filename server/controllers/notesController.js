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
      // let savedProduct = {};

      db("products")
        .insert(newProduct)
        .then((result) => {
          db("notes")
            .insert(newNote)
            .then((result) => {
              db("products")
                .join("notes", "products.note_key", "notes.note_key")
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

const getAllNotes = (req, res) => {
  db("products")
    .join("notes", "products.note_key", "notes.note_key")
    .select("*")
    .then((result) => {
      if (result.length < 1) {
        res.status(404).json({ error: "There are no notes" });
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

const getSingleNote = (req, res) => {
  const { note_key } = req.params;

  db("products")
    .join("notes", "products.note_key", "notes.note_key")
    .select("*")
    .where({ "products.note_key": note_key })
    .then((singleNote) => {
      console.log(singleNote);
      if (singleNote.length < 1) {
        res.status(404).json({
          error: "You cannot access the note with this specific key",
        });
      } else {
        res.status(200).json(singleNote);
      }
    })
    .catch((error) => {
      res.status(500).json({
        error: "The note with this specific ID could not be retrieved.",
      });
    });
};

const updateNote = (req, res) => {
  const { note_key } = req.params;

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

  const validationErrors = [];
  if (
    !product_name ||
    !short_description ||
    !long_description ||
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
  console.log(validationErrors);
  if (validationErrors.length) {
    const errorObject = {
      error: true,
      errors: validationErrors,
    };
    res.status(400).send(errorObject);
  } else {
    db("products")
      .where({ note_key })
      .update({
        product_name,
        short_description,
        long_description,
        document,
        language,
      })
      .then((result) => {
        db("notes")
          .where({ note_key })
          .update({
            school,
            grade_level,
            class_name,
            teacher,
          })
          .then((result) => {
            db("products")
              .join("notes", "products.note_key", "notes.note_key")
              .select("*")
              .orderBy("id", "desc")
              .limit(1)
              .then((result) => {
                console.log(result);
                res.status(201).json(result);
              })
              .catch((error) => {
                res.status(500).json({
                  error: "This note could not be retrieved.",
                });
              });
          });
      })
      .catch((error) => {
        res.status(500).json({
          error: "This product could not be retrieved.",
        });
      });
  }
};

const deleteNote = (req, res) => {
  const { note_key } = req.params;

  db("products")
    .where({ note_key })
    .first()
    .then((product) => {
      if (product) {
        db("products").where({ note_key }).del();
        db("notes")
          .where({ note_key })
          .del()
          .then((count) => res.status(200).json(count));
      } else {
        res.status(404).json({
          error: "You cannot access the product with this specific id.",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "This product could not be removed" });
    });
};

module.exports = {
  createNote,
  getAllNotes,
  getSingleNote,
  updateNote,
  deleteNote,
};
