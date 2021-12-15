const db = require("../db/dbConfig");
const { v4: uuidv4 } = require("uuid");
const { cloudinary } = require("../util/cloudConfig");

const createNote = async (req, res) => {
  const {
    product_name,
    short_description,
    long_description,
    document,
    price,
    pages,
    year,
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
    !pages ||
    !year ||
    !school ||
    !grade_level ||
    !class_name ||
    !teacher ||
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
      // const product_id = uuidv4();
      const result = await cloudinary.uploader.upload(req.file.path);
      const newProduct = {
        unique_id: uniqueId,
        product_name,
        short_description,
        long_description,
        document: result.url,
        price,
        // note_key: product_id,
        pages,
        year,
        language,
        school,
        grade_level,
        class_name,
        teacher,
        user_id: subject,
      };
      // console.log(newProduct);
      // const noteId = uuidv4();
      // const newNote = {
      //   unique_id: noteId,
      //   note_key: product_id,
      // product_id: subject,
      // };
      // console.log(newNote);
      db("notes")
        .insert(newProduct)
        .then((result) => {
          // console.log(result);
          res.status(201).json({
            result,
            message: "New note has been created.",
          });
        })
        .catch((error) => {
          res.status(400).json(error);
        });
      // db("notes")
      // .insert(newNote)
      // .then((result) => {
      // db("products")
      //   .join("notes", "products.note_key", "notes.note_key")
      //   .select("*")
      //   .orderBy("id", "desc")
      //   .limit(1)
      //   .then((result) => {
      //   });
      // });
    } else {
      res.status(500).json({
        message: "We had an error creating your note.",
      });
    }
  }
};

const getAllNotes = (req, res) => {
  db("notes")
    // .join("notes", "products.note_key", "notes.note_key")
    // .select("*")
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

const getAllUserNotes = (req, res) => {
  const subject = req.decodedToken.subject;
  db("notes")
    .where({ user_id: subject })
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
  const { unique_id } = req.params;

  db("notes")
    // .join("notes", "products.note_key", "notes.note_key")
    // .select("*")
    .where({ unique_id })
    .first()
    .then((singleNote) => {
      // console.log(singleNote);
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
  const { unique_id } = req.params;

  const {
    product_name,
    short_description,
    long_description,
    document,
    price,
    pages,
    year,
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
    !pages ||
    !year ||
    !school ||
    !grade_level ||
    !class_name ||
    !teacher ||
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
    db("notes")
      .where({ unique_id })
      .first()
      .then((result) => {
        if (!result) {
          res.status(404).json({
            error: "You cannot access the note with this specific key",
          });
        } else {
          db("notes")
            .where({ unique_id })
            .first()
            .update({
              product_name,
              short_description,
              long_description,
              document,
              price,
              pages,
              year,
              language,
              school,
              grade_level,
              class_name,
              teacher,
            })
            .then((result) => {
              console.log(result);
              res.status(201).json(result);
            })
            .catch((error) => {
              res.status(500).json({
                error: "This note could not be retrieved.",
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
  const { unique_id } = req.params;

  db("notes")
    .where({ unique_id })
    .first()
    .then((product) => {
      if (product) {
        db("notes")
          .where({ unique_id })
          .del()
          // db("notes")
          //   .where({ note_key })
          //   .del()
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
  getAllUserNotes,
};
