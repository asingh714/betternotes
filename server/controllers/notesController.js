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
    pages,
    year,
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
    !pages ||
    !year ||
    !school ||
    !grade_level ||
    !class_name ||
    !teacher
  ) {
    console.log(req.body);
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
        note_key: product_id,
        user_id: subject,
        pages,
        year,
      };
      // console.log(newProduct);
      const noteId = uuidv4();
      const newNote = {
        unique_id: noteId,
        school,
        grade_level,
        class_name,
        teacher,
        note_key: product_id,
        // product_id: subject,
      };
      // console.log(newNote);
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
    .first()
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
    pages,
    year,
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
    !pages ||
    !year ||
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
    db("products")
      .where({ note_key })
      .first()
      .then((result) => {
        if (!result) {
          res.status(404).json({
            error: "You cannot access the note with this specific key",
          });
        } else {
          db("products").where({ note_key }).first().update({
            product_name,
            short_description,
            long_description,
            document,
            language,
            pages,
            year,
          });
          db("notes")
            .where({ note_key })
            .first()
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
        }
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
          error: "You cannot access the note with this specific id.",
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